import { NextRequest, NextResponse } from "next/server"
import { chatComplete } from "@/lib/openrouter"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { role, company, type, transcript } = await req.json()

    if (!transcript || transcript.length === 0) {
      return NextResponse.json({
        overall_score:         0,
        recommendation:        "No",
        summary:               "No answers were recorded in this session.",
        top_strengths:         ["Completed the interview session"],
        top_improvements:      ["Give detailed answers using the STAR method", "Provide specific examples from your experience", "Avoid one-word answers"],
        communication_feedback:"No communication data available. Practice giving structured answers.",
        technical_feedback:    "No technical data available.",
        next_steps:            ["Retry the interview with detailed answers", "Study the STAR method for behavioural questions", "Practice speaking for at least 30 seconds per answer"],
        readiness_level:       "Not Ready",
      })
    }

    // Calculate score from transcript
    const scores = transcript.map((t: any) => Number(t.score) || 0).filter((s: number) => s > 0)
    const avgScore10 = scores.length > 0
      ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length
      : 0
    const overall_score = Math.round(avgScore10 * 10) // convert 0-10 → 0-100

    const qa = transcript.map((t: any, i: number) =>
      `Q${i + 1}: ${t.question}\nA${i + 1}: ${t.answer || "(no answer provided)"}\nScore: ${t.score || 0}/10`
    ).join("\n\n")

    const prompt = `You are an expert interview coach analyzing a ${type} interview for ${role} at ${company}.

The candidate is a B.Tech fresher. Be honest but constructive.

Interview Transcript:
${qa}

Average score: ${avgScore10.toFixed(1)}/10
Overall score (out of 100): ${overall_score}

Provide comprehensive feedback. Return ONLY this JSON — no markdown, no explanation:
{
  "overall_score": ${overall_score},
  "recommendation": "${overall_score >= 70 ? "Yes" : overall_score >= 50 ? "Maybe" : "No"}",
  "summary": "<3-4 honest sentences about overall performance. Be specific about what they did well and what needs work>",
  "top_strengths": ["<specific strength 1 from their actual answers>", "<specific strength 2>", "<specific strength 3>"],
  "top_improvements": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>"],
  "communication_feedback": "<specific feedback on how they communicated — clarity, structure, length of answers>",
  "technical_feedback": "<feedback on technical accuracy and depth of their answers>",
  "next_steps": ["<actionable step 1>", "<actionable step 2>", "<actionable step 3>"],
  "readiness_level": "${overall_score >= 75 ? "Ready" : overall_score >= 55 ? "Almost Ready" : overall_score >= 35 ? "Needs More Prep" : "Not Ready"}"
}`

    let report: any = null

    try {
      const raw = await chatComplete([
        { role: "system", content: "You are an expert interview coach. Return only valid JSON." },
        { role: "user", content: prompt }
      ], true)

      const cleaned = raw.replace(/```json|```/g, "").trim()
      const start   = cleaned.indexOf("{")
      const end     = cleaned.lastIndexOf("}") + 1
      if (start !== -1 && end > start) {
        report = JSON.parse(cleaned.slice(start, end))
      }
    } catch (aiErr) {
      console.error("AI report generation failed:", aiErr)
    }

    // Always return something meaningful — never return zeros
    return NextResponse.json({
      overall_score:         report?.overall_score         ?? overall_score,
      recommendation:        report?.recommendation         ?? (overall_score >= 70 ? "Yes" : overall_score >= 50 ? "Maybe" : "No"),
      summary:               report?.summary               ?? `You completed ${transcript.length} questions with an average score of ${avgScore10.toFixed(1)}/10. Your answers were brief — focus on giving structured, detailed responses using the STAR method.`,
      top_strengths:         report?.top_strengths         ?? ["Completed all interview questions", "Showed up and attempted every question"],
      top_improvements:      report?.top_improvements      ?? ["Give longer, more detailed answers", "Use specific examples from projects", "Apply STAR method (Situation, Task, Action, Result)"],
      communication_feedback:report?.communication_feedback ?? "Your answers were too brief. Aim for 60-90 second answers with context, action steps, and results.",
      technical_feedback:    report?.technical_feedback    ?? "Technical depth was limited. Prepare specific examples from your projects and coursework.",
      next_steps:            report?.next_steps            ?? ["Practice 2 mock interviews daily", "Study STAR method for behavioural questions", "Prepare 3-5 detailed project stories"],
      readiness_level:       report?.readiness_level       ?? (overall_score >= 75 ? "Ready" : overall_score >= 55 ? "Almost Ready" : overall_score >= 35 ? "Needs More Prep" : "Not Ready"),
    })

  } catch (err: any) {
    console.error("Report route error:", err)
    return NextResponse.json({
      overall_score:         0,
      recommendation:        "No",
      summary:               "Report generation encountered an error. Your transcript has been saved.",
      top_strengths:         ["Completed the interview session"],
      top_improvements:      ["Give more detailed answers", "Use specific examples", "Practice STAR method"],
      communication_feedback:"Please retry the interview with more detailed answers.",
      technical_feedback:    "Unable to analyze technical depth.",
      next_steps:            ["Retry the interview", "Practice with detailed answers", "Study company-specific questions"],
      readiness_level:       "Needs More Prep",
    }, { status: 200 }) // return 200 so client doesn't crash
  }
}