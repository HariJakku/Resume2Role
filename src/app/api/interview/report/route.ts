 import { NextRequest, NextResponse } from "next/server"
import { chatComplete } from "@/lib/openrouter"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const { role, company, type, transcript } = await req.json()

  if (!transcript || transcript.length === 0) {
    return NextResponse.json({
      overall_score: 0,
      recommendation: "No",
      summary: "Interview was not completed.",
      top_strengths: [],
      top_improvements: ["Complete the interview to get a report"],
      communication_feedback: "No data",
      technical_feedback: "No data",
      next_steps: ["Try the interview again"],
      readiness_level: "Not Ready"
    })
  }

  const qa = transcript.map((t: any, i: number) =>
    `Q${i + 1}: ${t.question}\nA${i + 1}: ${t.answer || "(no answer)"}\nScore: ${t.score || 0}/10`
  ).join("\n\n")

  const avgScore = Math.round(
    transcript.reduce((s: number, t: any) => s + (t.score || 0), 0) / transcript.length * 10
  )

  const raw = await chatComplete([
    {
      role: "system",
      content: "You are an expert interview coach. Provide comprehensive, honest, constructive feedback. Always respond with valid JSON only."
    },
    {
      role: "user",
      content: `Analyze this complete ${type} interview for ${role} at ${company} (B.Tech fresher candidate).

Interview transcript:
${qa}

The candidate's average answer score was ${avgScore}/100.

Return ONLY this JSON:
{
  "overall_score": ${avgScore},
  "recommendation": "<Strong Yes | Yes | Maybe | No>",
  "summary": "<3-4 honest sentences about overall performance>",
  "top_strengths": ["strength1", "strength2", "strength3"],
  "top_improvements": ["improvement1", "improvement2", "improvement3"],
  "communication_feedback": "<specific feedback on communication clarity and structure>",
  "technical_feedback": "<feedback on technical knowledge depth shown>",
  "next_steps": ["actionable step1", "actionable step2", "actionable step3"],
  "readiness_level": "<Not Ready | Needs More Prep | Almost Ready | Ready>"
}`
    }
  ], true)

  try {
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({
      overall_score: avgScore,
      recommendation: "Maybe",
      summary: "Interview completed. Review individual question scores for details.",
      top_strengths: ["Completed the full interview"],
      top_improvements: ["Practice more mock interviews", "Work on answer structure", "Give more specific examples"],
      communication_feedback: "Keep practicing to improve clarity.",
      technical_feedback: "Review core concepts for your target role.",
      next_steps: ["Practice daily", "Study company-specific questions", "Do peer mock interviews"],
      readiness_level: "Needs More Prep"
    })
  }
}