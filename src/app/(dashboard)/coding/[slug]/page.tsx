"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { CODING_PROBLEMS } from "@/lib/data/problems"
import { difficultyColor } from "@/lib/utils"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const STARTER: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python:     "python",
  java:       "java",
  cpp:        "cpp",
  go:         "go",
}

export default function CodingProblemPage() {
  const { slug } = useParams<{ slug: string }>()
  const router   = useRouter()
  const problem = CODING_PROBLEMS.find(p => p.slug === slug) as (typeof CODING_PROBLEMS)[number]

  const [user,     setUser]     = useState<any>(null)
  const [language, setLanguage] = useState("javascript")
  const [code,     setCode]     = useState("")
  const [output,   setOutput]   = useState("")
  const [running,  setRunning]  = useState(false)
  const [result,   setResult]   = useState<"accepted"|"wrong"|"error"|null>(null)
  const [tab,      setTab]      = useState<"problem"|"hints">("problem")
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45 * 60)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)
    })
    if (problem) setCode(problem.starter_code[language] || "")
  }, [problem])

  useEffect(() => {
    timerRef.current = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (problem) setCode(problem.starter_code[language] || "// Write your solution here")
  }, [language])

  if (!problem) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: 18, color: "#fff", marginBottom: 8 }}>Problem not found</div>
        <button onClick={() => router.push("/coding")} className="btn-primary">Back to problems</button>
      </div>
    </div>
  )

  const dc = difficultyColor(problem.difficulty)

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timerColor = timeLeft < 300 ? "#f87171" : timeLeft < 600 ? "#fbbf24" : "#a1a1aa"

  async function runCode() {
    if (!code.trim() || !user) return
    setRunning(true); setOutput(""); setResult(null)

    try {
      const res  = await fetch("/api/execute", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ code, language, problemId: problem.id }),
      })
      const data = await res.json()

      setOutput(data.output || data.stderr || "No output")

      const passed = data.passed
      setResult(passed ? "accepted" : data.error ? "error" : "wrong")

      if (passed && user) {
        await supabase.from("coding_submissions").insert({
          user_id:       user.id,
          problem_id:    problem.id,
          problem_title: problem.title,
          code,
          language,
          status:        "accepted",
          runtime_ms:    data.runtime_ms || 0,
          score:         100,
        })
        await supabase.from("profiles")
          .update({ total_tests: user.total_tests + 1 })
          .eq("id", user.id)
      } else if (user) {
        await supabase.from("coding_submissions").insert({
          user_id:       user.id,
          problem_id:    problem.id,
          problem_title: problem.title,
          code,
          language,
          status:        "wrong-answer",
          score:         0,
        })
      }
    } catch (err) {
      setOutput("Execution failed. Check your code.")
      setResult("error")
    }
    setRunning(false)
  }

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", background: "#0a0a0c" }}>

      {/* Top bar */}
      <div style={{ height: 48, borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: "#111113", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => router.push("/coding")} style={{ background: "none", border: "none", color: "#71717a", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{problem.title}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: dc.text, background: dc.bg, border: `1px solid ${dc.border}`, padding: "2px 10px", borderRadius: 99, textTransform: "capitalize" }}>{problem.difficulty}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: timerColor }}>⏱ {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</span>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            style={{ background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "5px 10px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
            {Object.keys(problem.starter_code).map(l => (
              <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
            ))}
          </select>
          <button onClick={runCode} disabled={running} className="btn-primary"
            style={{ fontSize: 13, padding: "7px 18px" }}>
            {running ? "Running..." : "▶ Run Code"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "420px 1fr", overflow: "hidden" }}>

        {/* Left — problem */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)", overflow: "auto", display: "flex", flexDirection: "column" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#111113", flexShrink: 0 }}>
            {(["problem", "hints"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: "none", color: tab === t ? "#fff" : "#71717a", borderBottom: `2px solid ${tab === t ? "#6366f1" : "transparent"}` }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ padding: 24, overflow: "auto", flex: 1 }}>
            {tab === "problem" && (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {problem.topics.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8" }}>{t}</span>
                  ))}
                  {problem.companies.map(c => (
                    <span key={c} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#71717a" }}>{c}</span>
                  ))}
                </div>

                <p style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.75, marginBottom: 24, whiteSpace: "pre-wrap" }}>{problem.description}</p>

                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <div key={i} style={{ marginBottom: 12, padding: "14px 16px", borderRadius: 10, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ fontSize: 12, color: "#71717a", marginBottom: 6 }}>Example {i + 1}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#a1a1aa", marginBottom: 4 }}>Input: <span style={{ color: "#e4e4e7" }}>{ex.input}</span></div>
                      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#a1a1aa", marginBottom: ex.explanation ? 4 : 0 }}>Output: <span style={{ color: "#4ade80" }}>{ex.output}</span></div>
                      {ex.explanation && <div style={{ fontSize: 12, color: "#71717a", marginTop: 4 }}>💡 {ex.explanation}</div>}
                    </div>
                  ))}
                </div>

                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Constraints</h3>
                  {problem.constraints.map((c, i) => (
                    <div key={i} style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 5, fontFamily: "monospace" }}>• {c}</div>
                  ))}
                </div>
              </>
            )}

            {tab === "hints" && (
              <div>
                <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 20 }}>
                  Try solving it yourself first. Hints reveal one at a time.
                </p>
                {problem.hints.map((hint, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <button onClick={() => setShowHint(true)}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: showHint ? "rgba(99,102,241,0.08)" : "#1c1c1f", border: `1px solid ${showHint ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.07)"}`, color: showHint ? "#d4d4d8" : "#52525b", cursor: "pointer", fontSize: 13, textAlign: "left", lineHeight: 1.5 }}>
                      {showHint ? `💡 Hint ${i + 1}: ${hint}` : `🔒 Hint ${i + 1} — Click to reveal`}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — editor + output */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <MonacoEditor
              height="100%"
              language={STARTER[language] || "javascript"}
              value={code}
              onChange={v => setCode(v || "")}
              theme="vs-dark"
              options={{
                fontSize:          14,
                minimap:           { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers:       "on",
                roundedSelection:  false,
                padding:           { top: 16 },
                fontFamily:        "'JetBrains Mono', monospace",
                fontLigatures:     true,
              }}
            />
          </div>

          {/* Output panel */}
          <div style={{ height: 180, borderTop: "1px solid rgba(255,255,255,0.07)", background: "#111113", flexShrink: 0 }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.06em" }}>Output</span>
              {result && (
                <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 99,
                  background: result === "accepted" ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)",
                  color:      result === "accepted" ? "#4ade80"               : "#f87171" }}>
                  {result === "accepted" ? "✓ Accepted" : result === "wrong" ? "✗ Wrong Answer" : "✗ Error"}
                </span>
              )}
            </div>
            <div style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: result === "accepted" ? "#4ade80" : result === "error" ? "#f87171" : "#a1a1aa", lineHeight: 1.6, overflow: "auto", height: "calc(100% - 40px)", whiteSpace: "pre-wrap" }}>
              {running ? "Running your code..." : output || "Click 'Run Code' to test your solution"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}