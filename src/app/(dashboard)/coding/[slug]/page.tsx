"use client"
import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { CODING_PROBLEMS } from "@/lib/data/problems"
import { difficultyColor } from "@/lib/utils"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const LANG_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  python:     "Python",
  java:       "Java",
  cpp:        "C++",
}

type RunStatus = "idle" | "running" | "accepted" | "wrong" | "error"

export default function CodingProblemPage() {
  const { slug }  = useParams<{ slug: string }>()
  const router    = useRouter()
  const problem   = CODING_PROBLEMS.find(p => p.slug === slug)

  const [user,       setUser]       = useState<any>(null)
  const [language,   setLanguage]   = useState("javascript")
  const [code,       setCode]       = useState("")
  const [status,     setStatus]     = useState<RunStatus>("idle")
  const [results,    setResults]    = useState<any[]>([])
  const [summary,    setSummary]    = useState("")
  const [errorMsg,   setErrorMsg]   = useState("")
  const [activeTab,  setActiveTab]  = useState<"problem"|"hints"|"submissions">("problem")
  const [resultTab,  setResultTab]  = useState<"testcases"|"output">("testcases")
  const [submissions, setSubmissions] = useState<any[]>([])
  const [showHints,  setShowHints]  = useState<number[]>([])
  const [outputOpen, setOutputOpen] = useState(false)
  const [timeLeft,   setTimeLeft]   = useState(45 * 60)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)
      loadSubmissions(user.id)
    })

    if (problem) {
      setCode(problem.starter_code[language] || "")
    }

    timerRef.current = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(timerRef.current)
  }, [problem])

  useEffect(() => {
    if (problem) setCode(problem.starter_code[language] || "// Write your solution here")
  }, [language])

  async function loadSubmissions(userId: string) {
    const { data } = await supabase.from("coding_submissions")
      .select("*").eq("user_id", userId)
      .eq("problem_id", problem?.id || "").order("created_at", { ascending: false }).limit(10)
    setSubmissions(data || [])
  }

  async function runCode() {
    if (!code.trim() || !user || !problem) return
    setStatus("running")
    setResults([])
    setSummary("")
    setErrorMsg("")
    setOutputOpen(true)
    setResultTab("testcases")

    try {
      const res  = await fetch("/api/execute", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemId: problem.id,
        }),
      })

      const data = await res.json()

      if (data.error && !data.results?.length) {
        setStatus("error")
        setErrorMsg(data.error)
        return
      }

      setResults(data.results || [])
      setSummary(data.summary || "")

      if (data.passed) {
        setStatus("accepted")
        // Save accepted submission
        await supabase.from("coding_submissions").insert({
          user_id:       user.id,
          problem_id:    problem.id,
          problem_title: problem.title,
          code,
          language,
          status:        "accepted",
          runtime_ms:    0,
          score:         100,
        })
        loadSubmissions(user.id)
      } else {
        setStatus("wrong")
      }
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err.message || "Execution failed")
    }
  }

  if (!problem) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: 18, color: "#fff", marginBottom: 12 }}>Problem not found</div>
        <button onClick={() => router.push("/coding")} style={{ padding: "10px 24px", borderRadius: 10, background: "#6366f1", border: "none", color: "#fff", cursor: "pointer", fontSize: 14 }}>
          Back to problems
        </button>
      </div>
    </div>
  )

  const dc         = difficultyColor(problem.difficulty)
  const mins       = Math.floor(timeLeft / 60)
  const secs       = timeLeft % 60
  const statusColor = status === "accepted" ? "#4ade80" : status === "wrong" || status === "error" ? "#f87171" : status === "running" ? "#fbbf24" : "#71717a"
  const statusLabel = status === "accepted" ? "✅ Accepted" : status === "wrong" ? "❌ Wrong Answer" : status === "error" ? "🔥 Runtime Error" : status === "running" ? "⏳ Running..." : ""

  const publicResults = results.filter(r => !r.hidden)
  const hiddenResults = results.filter(r => r.hidden)

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", background: "#0a0a0c", overflow: "hidden" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* ── Top bar ── */}
      <div style={{ height: 48, background: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => router.push("/coding")}
            style={{ fontSize: 13, color: "#71717a", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            ← Problems
          </button>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{problem.title}</span>
          <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 99, color: dc.text, background: dc.bg, border: `1px solid ${dc.border}`, textTransform: "capitalize" }}>
            {problem.difficulty}
          </span>
          {statusLabel && (
            <span style={{ fontSize: 12, fontWeight: 700, color: statusColor }}>{statusLabel}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, fontFamily: "monospace", color: timeLeft < 300 ? "#f87171" : "#71717a" }}>
            ⏱ {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
          </span>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            style={{ background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "5px 10px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
            {Object.entries(LANG_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <button onClick={runCode} disabled={status === "running"}
            style={{ padding: "7px 20px", borderRadius: 8, background: status === "running" ? "#27272a" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: status === "running" ? "#71717a" : "#fff", fontSize: 13, fontWeight: 600, cursor: status === "running" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 7 }}>
            {status === "running" ? (
              <>
                <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite" }} />
                Running...
              </>
            ) : "▶ Run Code"}
          </button>
        </div>
      </div>

      {/* ── Main panels ── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "420px 1fr", overflow: "hidden" }}>

        {/* ── Left panel ── */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#111113", flexShrink: 0 }}>
            {(["problem","hints","submissions"] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: "none", color: activeTab === t ? "#fff" : "#71717a", borderBottom: `2px solid ${activeTab === t ? "#6366f1" : "transparent"}`, textTransform: "capitalize" }}>
                {t}
                {t === "submissions" && submissions.length > 0 && (
                  <span style={{ marginLeft: 5, fontSize: 10, padding: "1px 5px", borderRadius: 99, background: "rgba(99,102,241,0.2)", color: "#818cf8" }}>{submissions.length}</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: 20 }}>

            {/* Problem tab */}
            {activeTab === "problem" && (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {problem.topics.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8" }}>{t}</span>
                  ))}
                  {problem.companies.slice(0, 3).map(c => (
                    <span key={c} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#71717a" }}>{c}</span>
                  ))}
                </div>

                <div style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.8, marginBottom: 20, whiteSpace: "pre-wrap" }}>
                  {problem.description}
                </div>

                {problem.examples.map((ex, i) => (
                  <div key={i} style={{ marginBottom: 16, padding: "14px 16px", borderRadius: 10, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: 12, color: "#71717a", fontWeight: 600, marginBottom: 8 }}>Example {i+1}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, marginBottom: 3 }}>
                      <span style={{ color: "#71717a" }}>Input:  </span>
                      <span style={{ color: "#e4e4e7" }}>{ex.input}</span>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, marginBottom: ex.explanation ? 6 : 0 }}>
                      <span style={{ color: "#71717a" }}>Output: </span>
                      <span style={{ color: "#4ade80" }}>{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div style={{ fontSize: 12, color: "#71717a", marginTop: 4 }}>
                        Explanation: {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Constraints</div>
                  {problem.constraints.map((c, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#a1a1aa", marginBottom: 5, fontFamily: "monospace", paddingLeft: 12, borderLeft: "2px solid rgba(255,255,255,0.1)" }}>{c}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Hints tab */}
            {activeTab === "hints" && (
              <div>
                <p style={{ fontSize: 13, color: "#71717a", marginBottom: 16, lineHeight: 1.6 }}>
                  Try solving it yourself first. Hints reveal one at a time.
                </p>
                {problem.hints.map((hint, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <button onClick={() => setShowHints(h => h.includes(i) ? h.filter(x => x !== i) : [...h, i])}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: showHints.includes(i) ? "rgba(99,102,241,0.08)" : "#1c1c1f", border: `1px solid ${showHints.includes(i) ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.07)"}`, cursor: "pointer", textAlign: "left", color: showHints.includes(i) ? "#d4d4d8" : "#52525b", fontSize: 13, lineHeight: 1.5 }}>
                      {showHints.includes(i) ? `💡 Hint ${i+1}: ${hint}` : `🔒 Hint ${i+1} — Click to reveal`}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submissions tab */}
            {activeTab === "submissions" && (
              <div>
                {submissions.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px", color: "#52525b", fontSize: 14 }}>
                    No submissions yet
                  </div>
                ) : (
                  submissions.map((s, i) => (
                    <div key={i} style={{ marginBottom: 10, padding: "12px 16px", borderRadius: 10, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: s.status === "accepted" ? "#4ade80" : "#f87171" }}>
                          {s.status === "accepted" ? "✅ Accepted" : "❌ Failed"}
                        </span>
                        <span style={{ fontSize: 11, color: "#52525b" }}>{s.language}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>
                        {new Date(s.created_at).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Editor */}
          <div style={{ flex: outputOpen ? "1 1 60%" : "1", overflow: "hidden" }}>
            <MonacoEditor
              height="100%"
              language={language === "cpp" ? "cpp" : language}
              value={code}
              onChange={v => setCode(v || "")}
              theme="vs-dark"
              options={{
                fontSize:               14,
                minimap:                { enabled: false },
                scrollBeyondLastLine:   false,
                lineNumbers:            "on",
                padding:                { top: 16, bottom: 16 },
                fontFamily:             "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures:          true,
                tabSize:                4,
                automaticLayout:        true,
                suggestOnTriggerCharacters: true,
                wordWrap:               "on",
              }}
            />
          </div>

          {/* ── Output panel ── */}
          {outputOpen && (
            <div style={{ flex: "0 0 40%", borderTop: "1px solid rgba(255,255,255,0.07)", background: "#111113", display: "flex", flexDirection: "column", overflow: "hidden" }}>

              {/* Output tabs */}
              <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 12px", background: "#0d0d0f", flexShrink: 0 }}>
                {(["testcases","output"] as const).map(t => (
                  <button key={t} onClick={() => setResultTab(t)}
                    style={{ padding: "8px 14px", fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: "none", color: resultTab === t ? "#fff" : "#71717a", borderBottom: `2px solid ${resultTab === t ? "#6366f1" : "transparent"}`, textTransform: "capitalize" }}>
                    {t === "testcases" ? "Test Cases" : "Output"}
                  </button>
                ))}
                <div style={{ flex: 1 }} />
                {summary && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: status === "accepted" ? "#4ade80" : "#f87171", marginRight: 8 }}>
                    {summary}
                  </span>
                )}
                <button onClick={() => setOutputOpen(false)}
                  style={{ fontSize: 14, color: "#71717a", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>
                  ✕
                </button>
              </div>

              {/* Test case results */}
              <div style={{ flex: 1, overflow: "auto", padding: 14 }}>

                {resultTab === "testcases" && (
                  <div>
                    {status === "running" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#71717a", fontSize: 13 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                        Running test cases...
                      </div>
                    )}

                    {errorMsg && (
                      <div style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 12, color: "#f87171", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                        {errorMsg}
                      </div>
                    )}

                    {/* Public test cases */}
                    {publicResults.length > 0 && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                          Public Test Cases ({publicResults.filter(r => r.passed).length}/{publicResults.length} passed)
                        </div>
                        {publicResults.map((r, i) => (
                          <div key={i} style={{ marginBottom: 10, borderRadius: 10, border: `1px solid ${r.passed ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`, background: r.passed ? "rgba(74,222,128,0.04)" : "rgba(248,113,113,0.04)", overflow: "hidden" }}>
                            <div style={{ padding: "8px 12px", background: r.passed ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: r.passed ? "#4ade80" : "#f87171" }}>
                                {r.passed ? "✓" : "✗"} Case {i+1}
                              </span>
                              {r.runtime_ms > 0 && (
                                <span style={{ fontSize: 10, color: "#52525b" }}>{r.runtime_ms}ms</span>
                              )}
                            </div>
                            <div style={{ padding: "10px 12px" }}>
                              <div style={{ marginBottom: 5 }}>
                                <span style={{ fontSize: 11, color: "#71717a" }}>Input: </span>
                                <span style={{ fontSize: 11, color: "#a1a1aa", fontFamily: "monospace" }}>{r.input}</span>
                              </div>
                              <div style={{ marginBottom: 5 }}>
                                <span style={{ fontSize: 11, color: "#71717a" }}>Expected: </span>
                                <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "monospace" }}>{r.expected}</span>
                              </div>
                              <div>
                                <span style={{ fontSize: 11, color: "#71717a" }}>Your output: </span>
                                <span style={{ fontSize: 11, color: r.passed ? "#4ade80" : "#f87171", fontFamily: "monospace" }}>
                                  {r.error ? <span style={{ color: "#f87171" }}>Error: {r.error.slice(0,100)}</span> : r.actual || "(no output)"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Hidden test cases summary */}
                        {hiddenResults.length > 0 && results.length > 0 && (
                          <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#a1a1aa", marginBottom: 4 }}>
                              🔒 Hidden Test Cases
                            </div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                              {hiddenResults.map((r, i) => (
                                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: r.passed ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", border: `1px solid ${r.passed ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                                  {r.passed ? "✓" : "✗"}
                                </div>
                              ))}
                            </div>
                            <div style={{ fontSize: 11, color: "#71717a", marginTop: 6 }}>
                              {hiddenResults.filter(r => r.passed).length}/{hiddenResults.length} hidden cases passed
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {resultTab === "output" && (
                  <div>
                    {results.map((r, i) => (
                      <div key={i} style={{ marginBottom: 6, fontFamily: "monospace", fontSize: 12 }}>
                        <span style={{ color: "#71717a" }}>Case {r.id}: </span>
                        <span style={{ color: r.passed ? "#4ade80" : "#f87171" }}>
                          {r.actual || r.error || "(no output)"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Open output button when closed */}
          {!outputOpen && (status !== "idle") && (
            <button onClick={() => setOutputOpen(true)}
              style={{ padding: "8px 20px", background: "#111113", borderTop: "1px solid rgba(255,255,255,0.07)", border: "none", color: statusColor, fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
              {statusLabel} — Click to see results ↑
            </button>
          )}

        </div>
      </div>
    </div>
  )
}