import { NextRequest, NextResponse } from "next/server"
import { CODING_PROBLEMS }            from "@/lib/data/problems"

export const runtime    = "nodejs"
export const maxDuration = 30

const PISTON_API = "https://emkc.org/api/v2/piston"

const LANG_MAP: Record<string, { language: string; version: string }> = {
  javascript: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3"   },
  python:     { language: "python",     version: "3.10.0"  },
  java:       { language: "java",       version: "15.0.2"  },
  cpp:        { language: "c++",        version: "10.2.0"  },
  go:         { language: "go",         version: "1.16.2"  },
}

export async function POST(req: NextRequest) {
  const { code, language, problemId } = await req.json()

  if (!code || !language) return NextResponse.json({ error: "Missing code or language" }, { status: 400 })

  const langConfig = LANG_MAP[language]
  if (!langConfig)  return NextResponse.json({ error: "Unsupported language" }, { status: 400 })

  const problem = CODING_PROBLEMS.find(p => p.id === problemId)

  try {
    const start = Date.now()

    const res  = await fetch(`${PISTON_API}/execute`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: langConfig.language,
        version:  langConfig.version,
        files:    [{ content: code }],
        stdin:    problem?.test_cases[0]?.input || "",
      }),
    })

    const data       = await res.json()
    const runtime_ms = Date.now() - start

    const stdout = data.run?.stdout?.trim() || ""
    const stderr = data.run?.stderr?.trim() || ""
    const output = stdout || stderr || "No output"

    // Check against visible test cases
    let passed = false
    if (problem && stdout) {
      const expected = problem.test_cases
        .filter(tc => !tc.is_hidden)
        .map(tc => tc.expected_output.trim())
      passed = expected.some(exp => stdout.includes(exp) || exp.includes(stdout))
    }

    return NextResponse.json({ output, passed, runtime_ms, stderr })

  } catch (err: any) {
    return NextResponse.json({ output: "Execution service unavailable. Try again.", error: true, passed: false }, { status: 200 })
  }
}