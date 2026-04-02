const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!
const MODEL = "openai/gpt-4o-mini"

export async function chatComplete(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  json = false
): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Resume2Role",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenRouter error: ${err}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() || ""
}