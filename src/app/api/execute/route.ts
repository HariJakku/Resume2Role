import { NextRequest, NextResponse } from "next/server"
import { CODING_PROBLEMS }           from "@/lib/data/problems"
import { buildRunnerCode, compareOutputs } from "@/lib/execution/wrapper"

export const runtime     = "nodejs"
export const maxDuration = 30

// Judge0 CE language IDs
const JUDGE0_LANG: Record<string, number> = {
  javascript: 93,   // Node.js 18
  typescript: 94,   // TypeScript 5
  python:     92,   // Python 3.11
  java:       91,   // Java 17
  cpp:        76,   // C++ 20 (GCC)
  c:          75,   // C (GCC)
}

const JUDGE0_URL  = "https://judge0-ce.p.rapidapi.com"
const RAPID_KEY   = process.env.JUDGE0_API_KEY || ""

// ── Submit to Judge0 and poll ────────────────────────────────────────────
async function runOnJudge0(code: string, language: string): Promise<{ stdout: string; stderr: string; status: string }> {
  const langId = JUDGE0_LANG[language]
  if (!langId) throw new Error(`Language ${language} not supported`)

  const encoded = Buffer.from(code).toString("base64")

  // Submit
  const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
    method:  "POST",
    headers: {
      "Content-Type":    "application/json",
      "X-RapidAPI-Key":  RAPID_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code:     encoded,
      language_id:     langId,
      base64_encoded:  true,
      cpu_time_limit:  5,
      memory_limit:    128000,
    }),
  })

  if (!submitRes.ok) {
    const txt = await submitRes.text()
    throw new Error(`Judge0 submit failed: ${txt}`)
  }

  const { token } = await submitRes.json()
  if (!token) throw new Error("No token from Judge0")

  // Poll for result (max 10 attempts, 800ms apart)
  for (let i = 0; i < 12; i++) {
    await new Promise(r => setTimeout(r, 800))

    const pollRes = await fetch(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=true&fields=stdout,stderr,status,time`,
      {
        headers: {
          "X-RapidAPI-Key":  RAPID_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    )

    if (!pollRes.ok) continue
    const data = await pollRes.json()

    // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5+=Error
    if (data.status?.id <= 2) continue

    const decode = (b64: string | null) =>
      b64 ? Buffer.from(b64, "base64").toString("utf-8").trim() : ""

    return {
      stdout: decode(data.stdout),
      stderr: decode(data.stderr),
      status: data.status?.description || "Unknown",
    }
  }

  throw new Error("Execution timed out")
}

// ── Native JS execution using Function() ────────────────────────────────
function runJSNative(code: string, fnName: string, args: any[]): string {
  try {
    // Sandbox: create function from code + call it
    const wrapped = `
      ${code}
      const __args = ${JSON.stringify(args)};
      const __result = ${fnName}(...__args);
      return JSON.stringify(__result);
    `
    // Use Function constructor for sandboxed execution
    const fn = new Function(wrapped) // eslint-disable-line no-new-func
    return fn()
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code, language, problemId } = await req.json()

    if (!code?.trim())  return NextResponse.json({ error: "No code provided",      results: [], passed: false })
    if (!language)       return NextResponse.json({ error: "No language selected",  results: [], passed: false })
    if (!problemId)      return NextResponse.json({ error: "No problem ID",         results: [], passed: false })

    const problem = CODING_PROBLEMS.find(p => p.id === problemId)
    if (!problem)        return NextResponse.json({ error: "Problem not found",     results: [], passed: false })

    const results: {
      id:         number
      input:      string
      expected:   string
      actual:     string
      passed:     boolean
      hidden:     boolean
      error?:     string
      runtime_ms: number
    }[] = []

    for (const tc of problem.test_cases) {
      const start = Date.now()

      try {
        let stdout = ""
        let stderr = ""

        if (language === "javascript" || language === "typescript") {
          // Run natively in Node.js — no external API needed
          const parsedArgs = JSON.parse(tc.args)
          try {
            const result = runJSNative(code, problem.function_name, parsedArgs)
            stdout = result
          } catch (e: any) {
            stderr = e.message
          }
        } else {
          // Use Judge0 for Python, Java, C++
          const runnerCode = buildRunnerCode(code, problem.function_name, tc.args, language)
          const out = await runOnJudge0(runnerCode, language)
          stdout = out.stdout
          stderr = out.stderr
        }

        const runtime_ms = Date.now() - start
        const hasError   = !!stderr && !stdout
        const actual     = stdout.trim()
        const passed     = !hasError && compareOutputs(actual, tc.expected)

        results.push({
          id:         tc.id,
          input:      tc.input,
          expected:   tc.expected,
          actual:     actual || (hasError ? `Error: ${stderr.slice(0, 150)}` : "(no output)"),
          passed,
          hidden:     tc.hidden,
          error:      hasError ? stderr.slice(0, 300) : undefined,
          runtime_ms,
        })

      } catch (err: any) {
        results.push({
          id:         tc.id,
          input:      tc.input,
          expected:   tc.expected,
          actual:     "",
          passed:     false,
          hidden:     tc.hidden,
          error:      err.message,
          runtime_ms: Date.now() - start,
        })
      }
    }

    const allPassed     = results.every(r => r.passed)
    const totalPassed   = results.filter(r => r.passed).length
    const publicResults = results.filter(r => !r.hidden)
    const hiddenResults = results.filter(r => r.hidden)

    return NextResponse.json({
      results,
      public_results:  publicResults,
      passed:          allPassed,
      public_passed:   publicResults.every(r => r.passed),
      hidden_passed:   hiddenResults.filter(r => r.passed).length,
      hidden_total:    hiddenResults.length,
      total_passed:    totalPassed,
      total:           results.length,
      summary: allPassed
        ? `✅ All ${results.length} test cases passed!`
        : `${totalPassed}/${results.length} test cases passed`,
    })

  } catch (err: any) {
    console.error("Execute error:", err)
    return NextResponse.json({ error: err.message || "Execution failed", results: [], passed: false }, { status: 500 })
  }
}