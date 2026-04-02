"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ResumePage() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [user,      setUser]      = useState<any>(null)
  const [resume,    setResume]    = useState<any>(null)
  const [dragging,  setDragging]  = useState(false)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error,     setError]     = useState("")

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)
      const { data } = await supabase.from("resumes").select("*").eq("user_id", user.id).order("uploaded_at", { ascending: false }).limit(1).single()
      if (data) setResume(data)
    })
  }, [router])

  async function handleFile(file: File) {
    if (!file || !user) return
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!["pdf", "docx"].includes(ext || "")) { setError("Only PDF or DOCX files are supported"); return }
    if (file.size > 5 * 1024 * 1024) { setError("File size must be under 5MB"); return }

    setError(""); setUploading(true)
    const formData = new FormData()
    formData.append("resume", file)
    formData.append("userId", user.id)

    let res: Response
let data: any
try {
  res  = await fetch("/api/resume/analyze", { method: "POST", body: formData })
  data = await res.json()
} catch (fetchErr) {
  setError("Network error — check your connection and try again")
  setUploading(false)
  return
}

if (!res.ok) {
  setError(data?.error || "Failed to analyze resume. Please try again.")
  setUploading(false)
  return
}
    setResume(data.resume)
    setUploading(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const score     = resume?.ats_score
  const scoreColor = score >= 70 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171"
  const breakdown  = resume?.ats_breakdown || {}
  const suggestions = resume?.suggestions || {}

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Resume & ATS Checker</h1>
        <p style={{ fontSize: 14, color: "#71717a" }}>Upload your resume to get an ATS score and personalized improvement tips</p>
      </motion.div>

      {/* UPLOAD ZONE */}
      {!resume || uploading ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#6366f1" : "rgba(255,255,255,0.12)"}`,
            borderRadius: 20, padding: "64px 40px", textAlign: "center", cursor: "pointer",
            background: dragging ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
            transition: "all 0.2s", marginBottom: 32,
          }}>
          <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display: "none" }}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          {uploading ? (
            <>
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Analyzing your resume...</div>
              <div style={{ fontSize: 13, color: "#71717a" }}>This takes about 10–15 seconds</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </>
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📤</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Drop your resume here</div>
              <div style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>PDF or DOCX · Max 5MB</div>
              <div className="btn-primary" style={{ display: "inline-flex", fontSize: 14, padding: "10px 24px" }}>Browse file</div>
            </>
          )}
        </motion.div>
      ) : null}

      {error && (
        <div style={{ marginBottom: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#f87171" }}>
          {error}
        </div>
      )}

      {/* RESULTS */}
      {resume && !uploading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Score header */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center", padding: "28px 32px", borderRadius: 18, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", border: `5px solid ${scoreColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#fff" }}>{score}</span>
              <span style={{ fontSize: 12, color: "#71717a" }}>/100</span>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                {score >= 80 ? "🏆 Excellent Resume" : score >= 70 ? "✅ Good Resume" : score >= 50 ? "⚠️ Average Resume" : "❌ Needs Improvement"}
              </div>
              <div style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 16 }}>{resume.file_name}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={() => { setResume(null); fileRef.current?.click() }} className="btn-secondary" style={{ fontSize: 13, padding: "7px 16px" }}>
                  Upload new resume
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

            {/* Section breakdown */}
            <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Section Breakdown</h3>
              {Object.entries(breakdown).map(([key, val]: any) => {
                const maxMap: any = { contact_info: 10, summary: 10, education: 20, skills: 20, projects: 20, experience: 10, formatting: 10 }
                const max = maxMap[key] || 10
                const pct = (val / max) * 100
                return (
                  <div key={key} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, color: "#a1a1aa", textTransform: "capitalize" }}>{key.replace(/_/g, " ")}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: pct >= 70 ? "#4ade80" : pct >= 50 ? "#fbbf24" : "#f87171" }}>{val}/{max}</span>
                    </div>
                    <div style={{ height: 5, background: "#27272a", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct >= 70 ? "linear-gradient(to right,#4ade80,#22c55e)" : pct >= 50 ? "linear-gradient(to right,#fbbf24,#f59e0b)" : "linear-gradient(to right,#f87171,#ef4444)", borderRadius: 3, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Strengths & Missing keywords */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20, flex: 1 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#4ade80", marginBottom: 14 }}>✅ Strengths</h3>
                {(suggestions.strengths || []).map((s: string, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "#4ade80", fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20, flex: 1 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f87171", marginBottom: 14 }}>⚠️ Missing Keywords</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(suggestions.missing_keywords || []).map((k: string, i: number) => (
                    <span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Improvements */}
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 18 }}>💡 How to Improve</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
              {(suggestions.improvements || []).map((tip: string, i: number) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "14px 16px", borderRadius: 10, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <span style={{ color: "#818cf8", fontSize: 14, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.55 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall feedback */}
          {suggestions.overall_feedback && (
            <div style={{ padding: "20px 24px", borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#818cf8", marginBottom: 10 }}>Overall Feedback</h3>
              <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7 }}>{suggestions.overall_feedback}</p>
            </div>
          )}

        </motion.div>
      )}
    </div>
  )
}