"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const TOTAL_QUESTIONS = 8

export default function InterviewSessionPage() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()

  const [session,     setSession]     = useState<any>(null)
  const [user,        setUser]        = useState<any>(null)
  const [resumeText,  setResumeText]  = useState("")
  const [question,    setQuestion]    = useState("")
  const [answer,      setAnswer]      = useState("")
  const [feedback,    setFeedback]    = useState<any>(null)
  const [transcript,  setTranscript]  = useState<any[]>([])
  const [qNum,        setQNum]        = useState(1)
  const [loadingQ,    setLoadingQ]    = useState(true)
  const [loadingEval, setLoadingEval] = useState(false)
  const [finishing,   setFinishing]   = useState(false)
  const [listening,   setListening]   = useState(false)
  const [timeLeft,    setTimeLeft]    = useState(120)
  const [timerOn,     setTimerOn]     = useState(false)
  const [error,       setError]       = useState("")

  const timerRef       = useRef<any>(null)
  const recognitionRef = useRef<any>(null)
  const bottomRef      = useRef<HTMLDivElement>(null)

  // ── Load session ────────────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }
      setUser(user)

      const { data: sess, error: sessErr } = await supabase
        .from("interview_sessions").select("*").eq("id", id).single()

      if (sessErr || !sess) { router.push("/mock-interview"); return }
      setSession(sess)

      const { data: res } = await supabase
        .from("resumes").select("raw_text").eq("user_id", user.id).single()
      const rText = res?.raw_text || ""
      setResumeText(rText)

      const existing = sess.transcript || []
      setTranscript(existing)
      if (existing.length > 0) setQNum(existing.length + 1)

      await askQuestion(sess, existing, rText)
    }
    init()
  }, [id])

  // ── Timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerOn && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    } else if (timerOn && timeLeft === 0) {
      submitAnswer()
    }
    return () => clearTimeout(timerRef.current)
  }, [timerOn, timeLeft])

  // ── Scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript, question, feedback])

  // ── Ask question ────────────────────────────────────────────────────
  async function askQuestion(sess: any, prev: any[], rText: string) {
    setLoadingQ(true)
    setFeedback(null)
    setAnswer("")
    setError("")

    try {
      const res = await fetch("/api/interview/question", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role:           sess.role,
          company:        sess.company,
          type:           sess.interview_type,
          questionNumber: prev.length + 1,
          previousQA:     prev,
          resumeText:     rText,
        }),
      })
      if (!res.ok) throw new Error("Failed to get question")
      const data = await res.json()
      setQuestion(data.question)
      setTimeLeft(120)
      setTimerOn(true)
    } catch {
      setError("Failed to load question. Please try again.")
    } finally {
      setLoadingQ(false)
    }
  }

  // ── Submit answer ───────────────────────────────────────────────────
  async function submitAnswer() {
    if (!answer.trim() || loadingEval || !session) return
    setTimerOn(false)
    setLoadingEval(true)
    setError("")

    try {
      const res = await fetch("/api/interview/evaluate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer,
          role: session.role,
          type: session.interview_type,
        }),
      })
      if (!res.ok) throw new Error("Evaluation failed")
      const evalData = await res.json()
      setFeedback(evalData)

      const newEntry = {
        question,
        answer,
        score:     evalData.score,
        feedback:  evalData,
        timestamp: new Date().toISOString(),
      }
      const newTranscript = [...transcript, newEntry]
      setTranscript(newTranscript)

      await supabase.from("interview_sessions")
        .update({ transcript: newTranscript })
        .eq("id", id)

    } catch {
      setError("Evaluation failed. Click Next to continue.")
    } finally {
      setLoadingEval(false)
    }
  }

  // ── Next question ───────────────────────────────────────────────────
  async function nextQuestion() {
    const nextNum = qNum + 1
    if (nextNum > TOTAL_QUESTIONS) {
      await finishInterview()
    } else {
      setQNum(nextNum)
      setFeedback(null)
      await askQuestion(session, transcript, resumeText)
    }
  }

  // ── Finish interview ────────────────────────────────────────────────
  async function finishInterview() {
    if (finishing) return
    setFinishing(true)
    setTimerOn(false)

    try {
      const res = await fetch("/api/interview/report", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId:  id,
          role:       session.role,
          company:    session.company,
          type:       session.interview_type,
          transcript,
        }),
      })
      const report = await res.json()

      await supabase.from("interview_sessions").update({
        status:        "completed",
        overall_score: report.overall_score,
        feedback:      report,
        completed_at:  new Date().toISOString(),
      }).eq("id", id)

      router.push(`/mock-interview/${id}/report`)
    } catch {
      router.push(`/mock-interview/${id}/report`)
    }
  }

  // ── Voice ───────────────────────────────────────────────────────────
 function startVoice() {
  if (typeof window === "undefined") return
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!SR) { alert("Use Google Chrome for voice support."); return }

  try {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    const recognition = new SR()
    recognition.continuous      = false   // ← KEY FIX: false stops repeat
    recognition.interimResults  = false   // ← KEY FIX: only final results
    recognition.lang            = "en-US"
    recognition.maxAlternatives = 1

    recognition.onstart = () => { setListening(true); setError("") }

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript
      setAnswer(prev => {
        const base = prev.trim()
        return base ? base + " " + transcript : transcript
      })
      // Auto-restart for continuous feel
      if (recognitionRef.current) {
        try { recognitionRef.current.start() } catch {}
      }
    }

    recognition.onerror = (e: any) => {
      if (e.error === "not-allowed") {
        setError("Microphone blocked. Allow access in browser settings.")
      } else if (e.error === "no-speech") {
        // Silently restart on no-speech
        try { if (recognitionRef.current) recognitionRef.current.start() } catch {}
        return
      } else if (e.error === "aborted") {
        return
      } else {
        setError(`Voice error: ${e.error}`)
      }
      setListening(false)
    }

    recognition.onend = () => {
      // Only mark as not listening if user stopped
      if (recognitionRef.current) {
        setListening(true) // still active
      } else {
        setListening(false)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)

  } catch (err) {
    setError("Could not start voice. Use Chrome browser.")
    setListening(false)
  }
}

function stopVoice() {
  if (recognitionRef.current) {
    recognitionRef.current.stop()
    recognitionRef.current = null
  }
  setListening(false)
}

  // ── Loading screen ──────────────────────────────────────────────────
  if (!session) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#71717a", fontSize: 14 }}>Preparing your interview...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  const progress   = ((qNum - 1) / TOTAL_QUESTIONS) * 100
  const mins       = Math.floor(timeLeft / 60)
  const secs       = timeLeft % 60
  const timerColor = timeLeft < 30 ? "#f87171" : timeLeft < 60 ? "#fbbf24" : "#71717a"

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>
      <style>{`
        @keyframes spin  { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)} 50%{box-shadow:0 0 0 12px rgba(239,68,68,0)} }
        @keyframes wave  { from { transform: scaleY(0.5) } to { transform: scaleY(1.5) } }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{session.title}</div>
          <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>
            Question {qNum} of {TOTAL_QUESTIONS}
            {resumeText ? " · Resume-based" : " · General"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {!loadingQ && !feedback && (
            <div style={{ fontSize: 14, fontWeight: 700, color: timerColor, fontFamily: "monospace" }}>
              ⏱ {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
            </div>
          )}
          <button onClick={finishInterview} disabled={finishing}
            style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#71717a", cursor: "pointer" }}>
            {finishing ? "Finishing..." : "End session"}
          </button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{ height: 4, background: "#27272a", borderRadius: 2, marginBottom: 28 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(to right,#6366f1,#8b5cf6)", borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>

      {/* ── Past Q&A ── */}
      {transcript.map((t, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div style={{ padding: "14px 18px", borderRadius: "4px 16px 16px 16px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", marginBottom: 8, fontSize: 14, color: "#c7d2fe", lineHeight: 1.6 }}>
            🤖 {t.question}
          </div>
          <div style={{ padding: "12px 16px", borderRadius: "16px 4px 16px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", marginLeft: 20, fontSize: 14, color: "#a1a1aa", lineHeight: 1.6 }}>
            {t.answer || "(no answer)"}
          </div>
          {t.score && (
            <div style={{ marginLeft: 20, marginTop: 5 }}>
              <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 99, fontWeight: 600, background: t.score >= 7 ? "rgba(74,222,128,0.1)" : t.score >= 5 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)", color: t.score >= 7 ? "#4ade80" : t.score >= 5 ? "#fbbf24" : "#f87171" }}>
                Score: {t.score}/10
              </span>
            </div>
          )}
        </div>
      ))}

      {/* ── Current question ── */}
      <AnimatePresence mode="wait">
        {loadingQ ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: "20px 22px", borderRadius: "4px 16px 16px 16px", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
              <span style={{ fontSize: 14, color: "#71717a" }}>AI is preparing your question...</span>
            </div>
          </motion.div>
        ) : !feedback && question ? (
          <motion.div key={`q-${qNum}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: "20px 22px", borderRadius: "4px 16px 16px 16px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)", marginBottom: 20, fontSize: 16, color: "#e4e4e7", lineHeight: 1.65, fontWeight: 500 }}>
            🤖 {question}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── Feedback ── */}
      {feedback && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 24, padding: "20px 24px", borderRadius: 16, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: feedback.score >= 7 ? "#4ade80" : feedback.score >= 5 ? "#fbbf24" : "#f87171" }}>
                {feedback.score}
              </span>
              <span style={{ fontSize: 14, color: "#71717a" }}>/10</span>
            </div>
            <span style={{ fontSize: 13, color: "#a1a1aa" }}>Answer evaluated</span>
            <button onClick={nextQuestion}
              style={{ marginLeft: "auto", padding: "9px 20px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {qNum >= TOTAL_QUESTIONS ? "Finish & get report →" : "Next question →"}
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4ade80", marginBottom: 8 }}>✅ What worked</div>
              {(feedback.strengths || []).map((s: string, i: number) => (
                <div key={i} style={{ fontSize: 13, color: "#d4d4d8", marginBottom: 6, paddingLeft: 10, borderLeft: "2px solid #4ade80", lineHeight: 1.5 }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#f87171", marginBottom: 8 }}>💡 Improve this</div>
              {(feedback.improvements || []).map((s: string, i: number) => (
                <div key={i} style={{ fontSize: 13, color: "#d4d4d8", marginBottom: 6, paddingLeft: 10, borderLeft: "2px solid #f87171", lineHeight: 1.5 }}>{s}</div>
              ))}
            </div>
          </div>
          {feedback.ideal_answer_hint && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", fontSize: 13, color: "#818cf8" }}>
              💡 Ideal answer: {feedback.ideal_answer_hint}
            </div>
          )}
        </motion.div>
      )}

      {/* ── Error ── */}
      {error && (
        <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#f87171", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {error}
          {!feedback && (
            <button onClick={nextQuestion}
              style={{ fontSize: 12, color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
              Skip →
            </button>
          )}
        </div>
      )}

      {/* ── Answer input — voice + text together ── */}
      {!feedback && !loadingQ && (
        <div>

          {/* Mic row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "14px 18px", borderRadius: 12, background: "#1c1c1f", border: `1px solid ${listening ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.08)"}`, transition: "border-color 0.2s" }}>
            <button
              onClick={listening ? stopVoice : startVoice}
              style={{ width: 48, height: 48, borderRadius: "50%", border: "none", background: listening ? "#ef4444" : "#6366f1", color: "#fff", fontSize: 22, cursor: "pointer", flexShrink: 0, transition: "all 0.2s", animation: listening ? "pulse 1.5s infinite" : "none" }}>
              🎙️
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: listening ? "#4ade80" : "#a1a1aa", marginBottom: 2 }}>
                {listening ? "● Listening — speak now" : "Click mic to speak your answer"}
              </div>
              <div style={{ fontSize: 11, color: "#52525b" }}>
                {listening
                  ? "Your words appear in the box below automatically"
                  : "Works best on Chrome · Voice fills the text box below"}
              </div>
            </div>
            {listening && (
              <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                  <div key={i} style={{ width: 3, borderRadius: 2, background: "#4ade80", height: h * 6, animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite alternate` }} />
                ))}
              </div>
            )}
          </div>

          {/* Text area */}
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder={listening
              ? "Speaking... your words appear here automatically"
              : "Type your answer here, or use the mic above to speak..."}
            rows={5}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "#1c1c1f", border: `1px solid ${listening ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.1)"}`, color: "#fff", fontSize: 14, resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.65, transition: "border-color 0.2s" }}
            onFocus={e => (e.target.style.borderColor = "#6366f1")}
            onBlur={e => { if (!listening) e.target.style.borderColor = "rgba(255,255,255,0.1)" }}
          />

          {answer && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <button onClick={() => setAnswer("")}
                style={{ fontSize: 11, color: "#71717a", background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>
                Clear
              </button>
            </div>
          )}

          {/* Submit + Skip */}
          <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center" }}>
            <button
              onClick={submitAnswer}
              disabled={!answer.trim() || loadingEval}
              style={{ padding: "12px 28px", borderRadius: 12, background: !answer.trim() || loadingEval ? "#27272a" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: !answer.trim() || loadingEval ? "#52525b" : "#fff", fontSize: 15, fontWeight: 600, cursor: !answer.trim() || loadingEval ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
              {loadingEval ? (
                <>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite" }} />
                  Evaluating...
                </>
              ) : "Submit answer →"}
            </button>
            <button onClick={nextQuestion}
              style={{ padding: "12px 20px", borderRadius: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#71717a", fontSize: 13, cursor: "pointer" }}>
              Skip question
            </button>
          </div>

        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}