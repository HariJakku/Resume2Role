import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { chatComplete } from "@/lib/openrouter"

export const runtime = "nodejs"
export const maxDuration = 60

// Use service role to bypass RLS on server side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function extractText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const name   = file.name.toLowerCase()

  if (name.endsWith(".docx")) {
    const mammoth = require("mammoth")
    const result  = await mammoth.extractRawText({ buffer })
    return result.value || ""
  }

  if (name.endsWith(".pdf")) {
    try {
      const pdfParse = require("pdf-parse/lib/pdf-parse")
      const data     = await pdfParse(buffer)
      if (data.text && data.text.trim().length > 30) return data.text
    } catch (_) {}
    return ""
  }

  throw new Error("Only PDF and DOCX files are supported")
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file     = formData.get("resume") as File | null
    const userId   = formData.get("userId") as string | null

    if (!file)   return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 400 })

    if (file.size > 5 * 1024 * 1024)
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 })

    const ext = file.name.toLowerCase().split(".").pop()
    if (!["pdf", "docx"].includes(ext || ""))
      return NextResponse.json({ error: "Only PDF and DOCX supported" }, { status: 400 })

    let resumeText = ""
    try {
      resumeText = await extractText(file)
    } catch (e: any) {
      return NextResponse.json({ error: `Cannot read file: ${e.message}` }, { status: 400 })
    }

    if (!resumeText || resumeText.trim().length < 30)
      return NextResponse.json({
        error: "Could not extract text. Make sure your resume is not a scanned image PDF."
      }, { status: 400 })

    const raw = await chatComplete([
      {
        role: "system",
        content: "You are an expert ATS resume reviewer for Indian campus placements. Always respond with valid JSON only. No markdown, no explanation."
      },
      {
        role: "user",
        content: `Analyze this resume for a B.Tech/IT student applying to Indian companies (TCS, Infosys, Amazon, Google etc).

Resume text:
"""
${resumeText.slice(0, 5000)}
"""

Return ONLY this JSON structure:
{
  "ats_score": <integer 0-100>,
  "breakdown": {
    "contact_info": <0-10>,
    "summary": <0-10>,
    "education": <0-20>,
    "skills": <0-20>,
    "projects": <0-20>,
    "experience": <0-10>,
    "formatting": <0-10>
  },
  "missing_keywords": ["kw1","kw2","kw3","kw4","kw5"],
  "strengths": ["s1","s2","s3"],
  "improvements": ["i1","i2","i3","i4","i5"],
  "missing_sections": ["section1"],
  "overall_feedback": "2-3 sentence honest assessment"
}`
      }
    ], true)

    const parsed = JSON.parse(raw)

    const suggestions = {
      strengths:        parsed.strengths        || [],
      improvements:     parsed.improvements      || [],
      missing_keywords: parsed.missing_keywords  || [],
      missing_sections: parsed.missing_sections  || [],
      overall_feedback: parsed.overall_feedback  || "",
    }

    const { data: existing } = await supabase
      .from("resumes").select("id").eq("user_id", userId).maybeSingle()

    let resumeRow: any
    if (existing?.id) {
      const { data, error } = await supabase.from("resumes").update({
        file_name:     file.name,
        raw_text:      resumeText.slice(0, 10000),
        ats_score:     parsed.ats_score,
        ats_breakdown: parsed.breakdown || {},
        suggestions,
        uploaded_at:   new Date().toISOString(),
      }).eq("id", existing.id).select().single()
      if (error) throw error
      resumeRow = data
    } else {
      const { data, error } = await supabase.from("resumes").insert({
        user_id:       userId,
        file_name:     file.name,
        raw_text:      resumeText.slice(0, 10000),
        ats_score:     parsed.ats_score,
        ats_breakdown: parsed.breakdown || {},
        suggestions,
      }).select().single()
      if (error) throw error
      resumeRow = data
    }

    return NextResponse.json({ resume: resumeRow })

  } catch (err: any) {
    console.error("ATS Error:", err)
    return NextResponse.json(
      { error: err.message || "Analysis failed. Try again." },
      { status: 500 }
    )
  }
}