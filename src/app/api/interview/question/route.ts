import { NextRequest, NextResponse } from "next/server"
import { chatComplete } from "@/lib/openrouter"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const { role, company, type, questionNumber, previousQA, resumeText } = await req.json()

  const history = previousQA.map((qa: any, i: number) =>
    `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`
  ).join("\n\n")

  const typeGuide: Record<string, string> = {
    hr:            "Ask about background, strengths, weaknesses, career goals, team experiences, why this company, conflict resolution. Use the candidate's resume context.",
    technical:     "Ask about CS fundamentals — OOP concepts, DBMS, OS, networking, data structures. Reference their projects from resume.",
    dsa:           "Ask about data structures and algorithm concepts, time/space complexity, problem solving approach.",
    behavioural:   "Ask STAR-method situational questions about leadership, handling failure, achievement, teamwork. Reference resume projects.",
    "system-design": "Ask about designing simple systems. Keep it fresher-level — URL shortener, chat app basics, REST vs GraphQL.",
  }

  const resumeContext = resumeText
    ? `\n\nCandidate's resume summary:\n${resumeText.slice(0, 800)}`
    : ""

  const question = await chatComplete([
    {
      role: "system",
      content: `You are an expert interviewer at ${company} conducting a ${type} interview for a ${role} position. Ask questions appropriate for a B.Tech fresher. Return ONLY the question text, nothing else.`
    },
    {
      role: "user",
      content: `${resumeContext}

${history ? `Previous Q&A:\n${history}\n\n` : ""}

Generate interview question number ${questionNumber} of 8.
Guidelines: ${typeGuide[type] || typeGuide.hr}

Rules:
- Do NOT repeat previous questions
- Question ${questionNumber === 1 ? "should be a warm-up (easy)" : questionNumber <= 4 ? "should be moderate difficulty" : "should be more challenging"}
- Make it specific to ${company} culture and the candidate's background if resume is available
- Be conversational, not robotic

Return ONLY the question. No numbering, no "Question:", no extra text.`
    }
  ])

  return NextResponse.json({ question: question.trim() })
}