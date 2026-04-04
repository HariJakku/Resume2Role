"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ReportPage() {
  const { id }   = useParams<{ id: string }>()
  const router   = useRouter()
  const [session,    setSession]    = useState<any>(null)
  const [loading,    setLoading]    = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }

      const { data } = await supabase
        .from("interview_sessions").select("*").eq("id", id).single()

      if (!data) { router.push("/mock-interview"); return }

      // If session ended but no feedback yet — generate it now
      if (data.status === "completed" && !data.feedback?.summary) {
        setGenerating(true)
        try {
          const res = await fetch("/api/interview/report", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId:  id,
              role:       data.role,
              company:    data.company,
              type:       data.interview_type,
              transcript: data.transcript || [],
            }),
          })
          const report = await res.json()
          await supabase.from("interview_sessions").update({
            overall_score: report.overall_score,
            feedback:      report,
          }).eq("id", id)
          setSession({ ...data, feedback: report, overall_score: report.overall_score })
        } catch {
          setSession(data)
        }
        setGenerating(false)
      } else {
        setSession(data)
      }
      setLoading(false)
    })
  }, [id])

  if (loading || generating) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <p style={{ color: "#71717a", fontSize: 14 }}>
        {generating ? "Generating your AI report..." : "Loading report..."}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!session) return null

  const report  = session.feedback || {}
  const score   = session.overall_score || report.overall_score || 0
  const color   = score >= 70 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171"
  const transcript = session.transcript || []

  // Calculate score manually if AI gave 0
  const manualAvg = transcript.length > 0
    ? Math.round(transcript.reduce((s: number, t: any) => s + (Number(t.score) || 0), 0) / transcript.length * 10)
    : 0
  const displayScore = score || manualAvg

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Interview Report</h1>
            <p style={{ fontSize: 13, color: "#71717a" }}>
              {session.title} · {new Date(session.created_at).toLocaleDateString("en-IN")}
            </p>
          </div>
          <Link href="/mock-interview" className="btn-secondary" style={{ fontSize: 13 }}>
            New interview
          </Link>
        </div>

        {/* Score card */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", padding: "24px 28px", borderRadius: 18, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", border: `5px solid ${color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{displayScore}</span>
            <span style={{ fontSize: 11, color: "#71717a" }}>/100</span>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
              {report.recommendation || (displayScore >= 70 ? "Yes" : displayScore >= 50 ? "Maybe" : "Keep Practising")}
            </div>
            <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.65, marginBottom: 12 }}>
              {report.summary || `You completed ${transcript.length} questions. Focus on giving detailed, structured answers using the STAR method.`}
            </p>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 99,
              background: displayScore >= 70 ? "rgba(74,222,128,0.12)" : displayScore >= 50 ? "rgba(251,191,36,0.12)" : "rgba(248,113,113,0.12)",
              color }}>
              {report.readiness_level || (displayScore >= 70 ? "Ready" : displayScore >= 50 ? "Almost Ready" : "Needs More Prep")}
            </span>
          </div>
        </div>

        {/* Score breakdown from transcript */}
        {transcript.length > 0 && (
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22, marginBottom: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>📊 Score Breakdown</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {transcript.map((t: any, i: number) => {
                const s = Number(t.score) || 0
                const c = s >= 7 ? "#4ade80" : s >= 5 ? "#fbbf24" : "#f87171"
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", minWidth: 60 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: c }}>{s}</div>
                    <div style={{ fontSize: 10, color: "#52525b" }}>Q{i+1}</div>
                    <div style={{ fontSize: 10, color: c }}>/10</div>
                  </div>
                )
              })}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 14px", borderRadius: 10, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", minWidth: 60 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#818cf8" }}>{displayScore}</div>
                <div style={{ fontSize: 10, color: "#71717a" }}>Avg</div>
                <div style={{ fontSize: 10, color: "#818cf8" }}>/100</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* Strengths */}
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#4ade80", marginBottom: 14 }}>✅ Top Strengths</h3>
            {(report.top_strengths?.length > 0 ? report.top_strengths : ["Completed the interview", "Attempted all questions"]).map((s: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #4ade80" }}>
                <span style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Improvements */}
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f87171", marginBottom: 14 }}>💡 Top Improvements</h3>
            {(report.top_improvements?.length > 0 ? report.top_improvements : ["Give detailed answers with examples", "Use STAR method", "Prepare specific project stories"]).map((s: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #f87171" }}>
                <span style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Communication + Technical */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>🗣️ Communication</h3>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>
              {report.communication_feedback || "Your answers were brief. Aim for 60-90 second structured answers using Situation → Task → Action → Result format."}
            </p>
          </div>
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>⚙️ Technical Knowledge</h3>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>
              {report.technical_feedback || "Demonstrate technical depth by mentioning specific technologies, algorithms, or design decisions in your project answers."}
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 22, marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#818cf8", marginBottom: 16 }}>🚀 Your Next Steps</h3>
          {(report.next_steps?.length > 0 ? report.next_steps : ["Practice with detailed answers", "Study STAR method", "Do 2 interviews daily"]).map((s: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <span style={{ color: "#818cf8", fontWeight: 700, fontSize: 14, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.55 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Full transcript */}
        {transcript.length > 0 && (
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>📝 Full Transcript</h3>
            {transcript.map((t: any, i: number) => {
              const s = Number(t.score) || 0
              return (
                <div key={i} style={{ marginBottom: 22, paddingBottom: 22, borderBottom: i < transcript.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ fontSize: 11, color: "#71717a", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Question {i + 1}
                  </div>
                  <div style={{ fontSize: 14, color: "#818cf8", marginBottom: 8, fontWeight: 500, lineHeight: 1.55 }}>
                    Q: {t.question}
                  </div>
                  <div style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 10, lineHeight: 1.65, paddingLeft: 12, borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                    A: {t.answer || "(No answer provided)"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, padding: "3px 12px", borderRadius: 99, fontWeight: 700,
                      background: s >= 7 ? "rgba(74,222,128,0.1)" : s >= 5 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)",
                      color: s >= 7 ? "#4ade80" : s >= 5 ? "#fbbf24" : "#f87171" }}>
                      Score: {s}/10
                    </span>
                    {t.feedback?.ideal_answer_hint && (
                      <span style={{ fontSize: 12, color: "#71717a" }}>
                        💡 {t.feedback.ideal_answer_hint}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Retry CTA */}
        <div style={{ marginTop: 24, padding: "20px 24px", borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ready to improve?</div>
            <div style={{ fontSize: 13, color: "#a1a1aa" }}>Give detailed answers — aim for 60 seconds per response</div>
          </div>
          <Link href="/mock-interview" className="btn-primary" style={{ fontSize: 14 }}>
            Start new interview →
          </Link>
        </div>

      </motion.div>
    </div>
  )
}