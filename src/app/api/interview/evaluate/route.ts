import { NextRequest, NextResponse } from "next/server"
import { chatComplete } from "@/lib/openrouter"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const { question, answer, role, type } = await req.json()

  if (!answer || answer.trim().length < 5) {
    return NextResponse.json({
      score: 1,
      strengths: ["Answer was too short to evaluate"],
      improvements: ["Please give a detailed answer", "Use the STAR method for behavioural questions", "Provide specific examples"],
      ideal_answer_hint: "Give a structured answer with context, your action, and the result",
      communication_score: 1
    })
  }

  const raw = await chatComplete([
    {
      role: "system",
      content: "You are an expert interview coach evaluating a B.Tech fresher's answer. Always respond with valid JSON only."
    },
    {
      role: "user",
      content: `Evaluate this answer for a ${role} ${type} interview.

Question: ${question}
Answer: ${answer}

Return ONLY this JSON:
{
  "score": <integer 1-10>,
  "strengths": ["specific positive 1", "specific positive 2"],
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "ideal_answer_hint": "one sentence on what a great answer would include",
  "communication_score": <integer 1-10>
}

Be honest but encouraging. Consider this is a fresher, not an experienced engineer.`
    }
  ], true)

  try {
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({
      score: 5,
      strengths: ["You attempted the answer"],
      improvements: ["Be more specific", "Use examples from your experience", "Structure your answer better"],
      ideal_answer_hint: "Use the STAR method: Situation, Task, Action, Result",
      communication_score: 5
    })
  }
}