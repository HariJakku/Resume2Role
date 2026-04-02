import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function analyzeResume(resumeText: string) {
  const prompt = `You are an expert ATS (Applicant Tracking System) and resume reviewer for Indian campus placements.

Analyze this resume and return a JSON response with this exact structure:
{
  "ats_score": <number 0-100>,
  "breakdown": {
    "contact_info": <number 0-10>,
    "summary": <number 0-10>,
    "education": <number 0-20>,
    "skills": <number 0-20>,
    "projects": <number 0-20>,
    "experience": <number 0-10>,
    "formatting": <number 0-10>
  },
  "missing_keywords": [<list of important missing keywords>],
  "strengths": [<list of 3-4 strong points>],
  "improvements": [<list of 4-5 specific improvements>],
  "missing_sections": [<sections that are missing>],
  "overall_feedback": "<2-3 sentence summary>"
}

Resume text:
${resumeText}

Return only valid JSON, no markdown, no explanation.`

  const result = await geminiModel.generateContent(prompt)
  const text   = result.response.text()
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return null
  }
}

export async function generateInterviewQuestion(
  context: { role: string; company: string; type: string; questionNumber: number; previousQA: any[] }
) {
  const history = context.previousQA
    .map((qa, i) => `Q${i+1}: ${qa.question}\nA${i+1}: ${qa.answer}`)
    .join('\n\n')

  const prompt = `You are an expert interviewer conducting a ${context.type} interview for a ${context.role} position at ${context.company}.

${history ? `Previous questions and answers:\n${history}\n\n` : ''}

Generate question number ${context.questionNumber} for this interview. 
- Make it relevant to the role and company
- For HR type: ask about background, strengths, goals, situational questions
- For Technical type: ask about CS fundamentals, projects, problem solving
- For DSA type: ask about data structures and algorithms concepts
- Keep it concise and clear
- Do not repeat previous questions

Return only the question text, nothing else.`

  const result = await geminiModel.generateContent(prompt)
  return result.response.text().trim()
}

export async function evaluateAnswer(
  question: string, answer: string, role: string, type: string
) {
  const prompt = `You are an expert interviewer evaluating a candidate's answer for a ${role} interview (${type} round).

Question: ${question}
Candidate's Answer: ${answer}

Evaluate and return JSON:
{
  "score": <number 1-10>,
  "strengths": [<list of 2-3 good points about the answer>],
  "improvements": [<list of 2-3 specific improvements>],
  "ideal_answer_hint": "<brief hint about what a great answer would include>",
  "communication_score": <number 1-10>
}

Return only valid JSON, no markdown.`

  const result = await geminiModel.generateContent(prompt)
  const text   = result.response.text()
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return { score: 5, strengths: [], improvements: [], ideal_answer_hint: '', communication_score: 5 }
  }
}

export async function generateInterviewReport(session: {
  role: string; company: string; type: string; transcript: any[]
}) {
  const qa = session.transcript
    .map((t, i) => `Q${i+1}: ${t.question}\nA${i+1}: ${t.answer}\nScore: ${t.score}/10`)
    .join('\n\n')

  const prompt = `You are an expert interview coach. Analyze this complete interview session and provide detailed feedback.

Role: ${session.role} at ${session.company}
Type: ${session.type} interview

Interview Transcript:
${qa}

Return JSON:
{
  "overall_score": <number 0-100>,
  "recommendation": "<Strong Yes | Yes | Maybe | No>",
  "summary": "<3-4 sentence overall assessment>",
  "top_strengths": [<list of 3 main strengths shown across all answers>],
  "top_improvements": [<list of 3 main areas to improve>],
  "communication_feedback": "<specific feedback on communication style>",
  "technical_feedback": "<specific feedback on technical knowledge if applicable>",
  "next_steps": [<list of 3 actionable steps to prepare better>],
  "readiness_level": "<Not Ready | Needs More Prep | Almost Ready | Ready>"
}

Return only valid JSON, no markdown.`

  const result = await geminiModel.generateContent(prompt)
  const text   = result.response.text()
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return null
  }
}