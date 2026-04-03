import { NextRequest, NextResponse } from "next/server"
import { chatComplete } from "@/lib/openrouter"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const { resumeText, jobDescription } = await req.json()

  if (!resumeText || !jobDescription) {
    return NextResponse.json({ error: "Missing resume or job description" }, { status: 400 })
  }

  const raw = await chatComplete([
    {
      role: "system",
      content: "You are an expert ATS system and career coach. Analyze resume vs job description match. Return only valid JSON."
    },
    {
      role: "user",
      content: `Compare this resume with the job description and return a detailed match analysis.

RESUME:
${resumeText.slice(0, 3000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 2000)}

Return ONLY this JSON:
{
  "match_percent": <integer 0-100>,
  "summary": "<2 sentence assessment>",
  "matching_keywords": ["kw1","kw2","kw3","kw4","kw5","kw6"],
  "missing_keywords": ["kw1","kw2","kw3","kw4","kw5"],
  "skill_gaps": ["gap1","gap2","gap3"],
  "recommendation": "<specific advice on how to tailor the resume for this JD>"
}`
    }
  ], true)

  try {
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ match_percent: 0, summary: "Analysis failed", matching_keywords: [], missing_keywords: [], skill_gaps: [] })
  }
}