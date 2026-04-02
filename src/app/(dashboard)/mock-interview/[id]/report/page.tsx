"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ReportPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      const { data } = await supabase.from("interview_sessions").select("*").eq("id", id).single()
      setSession(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#71717a" }}>Loading report...</div></div>
  if (!session) return null

  const report  = session.feedback || {}
  const score   = session.overall_score || 0
  const color   = score >= 70 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171"
  const readiness = report.readiness_level || "Needs More Prep"

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Interview Report</h1>
            <p style={{ fontSize: 14, color: "#71717a" }}>{session.title} · {new Date(session.created_at).toLocaleDateString("en-IN")}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/mock-interview" className="btn-secondary" style={{ fontSize: 13 }}>New interview</Link>
          </div>
        </div>

        {/* Score card */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center", padding: "28px 32px", borderRadius: 18, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", border: `5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{score}</span>
            <span style={{ fontSize: 11, color: "#71717a" }}>/100</span>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{report.recommendation || "Review completed"}</div>
            <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 500 }}>{report.summary}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Readiness</div>
            <span style={{ fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 99, background: score >= 70 ? "rgba(74,222,128,0.12)" : score >= 50 ? "rgba(251,191,36,0.12)" : "rgba(248,113,113,0.12)", color }}>
              {readiness}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Strengths */}
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#4ade80", marginBottom: 14 }}>✅ Top Strengths</h3>
            {(report.top_strengths || []).map((s: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #4ade80" }}>
                <span style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>
          {/* Improvements */}
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f87171", marginBottom: 14 }}>💡 Top Improvements</h3>
            {(report.top_improvements || []).map((s: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #f87171" }}>
                <span style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>🗣️ Communication</h3>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>{report.communication_feedback}</p>
          </div>
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>⚙️ Technical Knowledge</h3>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>{report.technical_feedback}</p>
          </div>
        </div>

        {/* Next steps */}
        <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 24, marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#818cf8", marginBottom: 16 }}>🚀 Your Next Steps</h3>
          {(report.next_steps || []).map((s: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <span style={{ color: "#818cf8", fontWeight: 700, fontSize: 14, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.55 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Transcript */}
        <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>📝 Full Transcript</h3>
          {(session.transcript || []).map((t: any, i: number) => (
            <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < session.transcript.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontSize: 12, color: "#71717a", marginBottom: 6 }}>Question {i + 1}</div>
              <div style={{ fontSize: 14, color: "#818cf8", marginBottom: 8, fontWeight: 500 }}>Q: {t.question}</div>
              <div style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 8, lineHeight: 1.6 }}>A: {t.answer}</div>
              <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 99, fontWeight: 600, background: t.score >= 7 ? "rgba(74,222,128,0.1)" : t.score >= 5 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)", color: t.score >= 7 ? "#4ade80" : t.score >= 5 ? "#fbbf24" : "#f87171" }}>
                Score: {t.score}/10
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}