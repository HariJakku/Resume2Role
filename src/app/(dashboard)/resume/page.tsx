"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Step = "upload" | "processing" | "results"

const ROLE_MAP: Record<string, string[]> = {
  "React":         ["Frontend Developer", "Full Stack Developer"],
  "Vue":           ["Frontend Developer"],
  "Angular":       ["Frontend Developer"],
  "Node.js":       ["Backend Developer", "Full Stack Developer"],
  "Python":        ["Backend Developer", "Data Analyst", "ML Engineer"],
  "TensorFlow":    ["ML Engineer", "AI Engineer"],
  "PyTorch":       ["ML Engineer", "AI Engineer"],
  "Machine Learning": ["ML Engineer", "Data Scientist"],
  "SQL":           ["Data Analyst", "Backend Developer", "Database Engineer"],
  "MongoDB":       ["Backend Developer", "Full Stack Developer"],
  "Java":          ["Backend Developer", "Android Developer"],
  "Kotlin":        ["Android Developer"],
  "Swift":         ["iOS Developer"],
  "Flutter":       ["Mobile Developer"],
  "Docker":        ["DevOps Engineer", "Backend Developer"],
  "Kubernetes":    ["DevOps Engineer", "Cloud Engineer"],
  "AWS":           ["Cloud Engineer", "DevOps Engineer"],
  "TypeScript":    ["Frontend Developer", "Full Stack Developer"],
  "C++":           ["Systems Engineer", "Game Developer"],
  "Blockchain":    ["Blockchain Developer"],
  "Django":        ["Backend Developer"],
  "Spring":        ["Backend Developer", "Java Developer"],
}

function predictRoles(skills: string[]): string[] {
  const roleCount: Record<string, number> = {}
  for (const skill of skills) {
    const roles = ROLE_MAP[skill] || []
    for (const role of roles) {
      roleCount[role] = (roleCount[role] || 0) + 1
    }
  }
  return Object.entries(roleCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([role]) => role)
}

export default function ResumePage() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [user,       setUser]       = useState<any>(null)
  const [resume,     setResume]     = useState<any>(null)
  const [step,       setStep]       = useState<Step>("upload")
  const [progress,   setProgress]   = useState(0)
  const [dragging,   setDragging]   = useState(false)
  const [error,      setError]      = useState("")
  const [jd,         setJd]         = useState("")
  const [jdResult,   setJdResult]   = useState<any>(null)
  const [jdLoading,  setJdLoading]  = useState(false)
  const [processMsg, setProcessMsg] = useState("Uploading your resume...")

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)
      const { data } = await supabase.from("resumes").select("*")
        .eq("user_id", user.id).order("uploaded_at", { ascending: false }).limit(1).single()
      if (data) { setResume(data); setStep("results") }
    })
  }, [router])

  async function handleFile(file: File) {
    if (!file || !user) return
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!["pdf","docx"].includes(ext || "")) { setError("Only PDF or DOCX files supported"); return }
    if (file.size > 5 * 1024 * 1024) { setError("File size must be under 5MB"); return }

    setError("")
    setStep("processing")
    setProgress(0)

    // Animated progress messages
    const messages = [
      "Uploading your resume...",
      "Extracting text from document...",
      "Analysing sections and keywords...",
      "Running ATS scoring engine...",
      "Generating improvement suggestions...",
      "Almost done...",
    ]
    let msgIdx = 0
    setProcessMsg(messages[0])
    const msgInterval = setInterval(() => {
      msgIdx = Math.min(msgIdx + 1, messages.length - 1)
      setProcessMsg(messages[msgIdx])
    }, 2500)

    const progInterval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 12, 90))
    }, 600)

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("userId", user.id)

    try {
      const res  = await fetch("/api/resume/analyze", { method: "POST", body: formData })
      const data = await res.json()
      clearInterval(msgInterval)
      clearInterval(progInterval)

      if (!res.ok) { setError(data?.error || "Analysis failed"); setStep("upload"); return }

      setProgress(100)
      await new Promise(r => setTimeout(r, 400))
      setResume(data.resume)
      setStep("results")
    } catch (e: any) {
      clearInterval(msgInterval)
      clearInterval(progInterval)
      setError(e.message || "Something went wrong")
      setStep("upload")
    }
  }

  async function analyzeJD() {
    if (!jd.trim() || !resume?.raw_text) return
    setJdLoading(true)
    setJdResult(null)

    const res  = await fetch("/api/resume/match-jd", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: resume.raw_text, jobDescription: jd }),
    })
    const data = await res.json()
    setJdLoading(false)
    setJdResult(data)
  }

  function downloadReport() {
    if (!resume) return
    const score      = resume.ats_score || 0
    const breakdown  = resume.ats_breakdown || {}
    const suggestions = resume.suggestions || {}
    const skills     = extractSkills(resume.raw_text || "")
    const roles      = predictRoles(skills)

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Resume2Role Report — ${resume.file_name}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; color: #1e293b; padding: 0 24px; }
    h1 { color: #4f46e5; border-bottom: 3px solid #4f46e5; padding-bottom: 10px; }
    h2 { color: #334155; margin-top: 32px; }
    .score { font-size: 64px; font-weight: 900; color: ${score >= 70 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626"}; }
    .bar { height: 10px; background: #e2e8f0; border-radius: 5px; margin: 6px 0 16px; }
    .bar-fill { height: 100%; border-radius: 5px; background: #4f46e5; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; margin: 4px; }
    .good { background: #dcfce7; color: #16a34a; }
    .bad  { background: #fef2f2; color: #dc2626; }
    .tip  { background: #eff6ff; color: #1d4ed8; }
    li { margin-bottom: 8px; line-height: 1.6; }
    .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <h1>Resume2Role — ATS Analysis Report</h1>
  <p><strong>File:</strong> ${resume.file_name} &nbsp;|&nbsp; <strong>Date:</strong> ${new Date().toLocaleDateString("en-IN")}</p>

  <h2>Overall ATS Score</h2>
  <div class="score">${score}<span style="font-size:24px;color:#94a3b8">/100</span></div>
  <p>${score >= 80 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Average — needs improvement" : "Low — significant improvements needed"}</p>

  <h2>Section Breakdown</h2>
  ${Object.entries(breakdown).map(([k, v]: any) => {
    const maxMap: any = { contact_info:10, summary:10, education:20, skills:20, projects:20, experience:10, formatting:10 }
    const max  = maxMap[k] || 10
    const pct  = Math.round((v/max)*100)
    return `<p><strong>${k.replace(/_/g," ")}</strong>: ${v}/${max}</p><div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>`
  }).join("")}

  <h2>Strengths</h2>
  <ul>${(suggestions.strengths||[]).map((s: string) => `<li class="badge good">✓ ${s}</li>`).join("")}</ul>

  <h2>Missing Keywords</h2>
  ${(suggestions.missing_keywords||[]).map((k: string) => `<span class="badge bad">${k}</span>`).join("")}

  <h2>Improvements Needed</h2>
  <ul>${(suggestions.improvements||[]).map((i: string) => `<li>${i}</li>`).join("")}</ul>

  <h2>Predicted Best Roles</h2>
  ${roles.map(r => `<span class="badge tip">🎯 ${r}</span>`).join("")}

  <h2>Overall Feedback</h2>
  <p>${suggestions.overall_feedback || ""}</p>

  <div class="footer">Generated by Resume2Role — Your AI-Powered Career Bridge</div>
</body>
</html>`

    const blob = new Blob([html], { type: "text/html" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href     = url
    a.download = `Resume2Role_Report_${resume.file_name.replace(/\.[^.]+$/, "")}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  function extractSkills(text: string): string[] {
    const all = Object.keys(ROLE_MAP)
    return all.filter(s => text.toLowerCase().includes(s.toLowerCase()))
  }

  const score      = resume?.ats_score || 0
  const breakdown  = resume?.ats_breakdown || {}
  const suggestions = resume?.suggestions || {}
  const skills     = extractSkills(resume?.raw_text || "")
  const roles      = predictRoles(skills)
  const scoreColor = score >= 70 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171"

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>

      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
        {[
          { num: 1, label: "Upload",     key: "upload"     },
          { num: 2, label: "Processing", key: "processing" },
          { num: 3, label: "Results",    key: "results"    },
        ].map((s, i) => {
          const done    = (step === "processing" && s.key === "upload") || step === "results"
          const active  = step === s.key
          return (
            <div key={s.key} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? "#6366f1" : active ? "#6366f1" : "rgba(255,255,255,0.08)", border: `2px solid ${done || active ? "#6366f1" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done || active ? "#fff" : "#71717a", transition: "all 0.3s" }}>
                  {done ? "✓" : s.num}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : "#71717a" }}>{s.label}</span>
              </div>
              {i < 2 && <div style={{ width: 48, height: 2, background: done ? "#6366f1" : "rgba(255,255,255,0.08)", margin: "0 12px", transition: "all 0.3s" }} />}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">

        {/* ── UPLOAD STEP ── */}
        {step === "upload" && (
          <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Resume & ATS Checker</h1>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 28 }}>Upload your resume to get an ATS score, role predictions, and detailed improvement tips</p>

            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              onClick={() => fileRef.current?.click()}
              style={{ border: `2px dashed ${dragging ? "#6366f1" : "rgba(255,255,255,0.12)"}`, borderRadius: 20, padding: "64px 40px", textAlign: "center", cursor: "pointer", background: dragging ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)", transition: "all 0.2s" }}>
              <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display: "none" }}
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              <div style={{ fontSize: 52, marginBottom: 16 }}>📄</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Drop your resume here</div>
              <div style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>PDF or DOCX · Max 5MB</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 12, background: "#6366f1", color: "#fff", fontSize: 14, fontWeight: 600 }}>
                Browse file
              </div>
            </div>

            {error && (
              <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#f87171" }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["✅ Instant ATS score", "🎯 Role prediction", "💡 Improvement tips", "📊 Detailed breakdown", "📄 Download report"].map(f => (
                <span key={f} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8" }}>{f}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── PROCESSING STEP ── */}
        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", border: "4px solid rgba(99,102,241,0.2)", borderTop: "4px solid #6366f1", animation: "spin 1s linear infinite", margin: "0 auto 28px" }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{processMsg}</div>
            <div style={{ fontSize: 13, color: "#71717a", marginBottom: 32 }}>This takes about 15–20 seconds</div>
            <div style={{ maxWidth: 400, margin: "0 auto", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <motion.div style={{ height: "100%", background: "linear-gradient(to right,#6366f1,#8b5cf6)", borderRadius: 3 }}
                animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#52525b" }}>{Math.round(progress)}%</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </motion.div>
        )}

        {/* ── RESULTS STEP ── */}
        {step === "results" && resume && (
          <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Analysis Results</h1>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={downloadReport}
                  style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 10, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", color: "#818cf8", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  📄 Download Report
                </button>
                <button onClick={() => { setResume(null); setStep("upload"); setJdResult(null) }}
                  style={{ padding: "8px 18px", borderRadius: 10, background: "#27272a", border: "1px solid rgba(255,255,255,0.08)", color: "#a1a1aa", cursor: "pointer", fontSize: 13 }}>
                  Upload new
                </button>
              </div>
            </div>

            {/* Score + Role prediction */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "24px 28px", borderRadius: 18, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", border: `5px solid ${scoreColor}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: "#fff" }}>{score}</span>
                <span style={{ fontSize: 11, color: "#71717a" }}>/100</span>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                  {score >= 80 ? "🏆 Excellent Resume" : score >= 70 ? "✅ Good Resume" : score >= 50 ? "⚠️ Average Resume" : "❌ Needs Improvement"}
                </div>
                <div style={{ fontSize: 13, color: "#71717a", marginBottom: 14 }}>{resume.file_name}</div>
                {roles.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>🎯 Best suited roles</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {roles.map(r => (
                        <span key={r} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", fontWeight: 500 }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              {/* Section breakdown */}
              <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 18 }}>📊 Section Breakdown</h3>
                {Object.entries(breakdown).map(([key, val]: any) => {
                  const maxMap: any = { contact_info:10, summary:10, education:20, skills:20, projects:20, experience:10, formatting:10 }
                  const max = maxMap[key] || 10
                  const pct = Math.round((val / max) * 100)
                  return (
                    <div key={key} style={{ marginBottom: 13 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: "#a1a1aa", textTransform: "capitalize" }}>{key.replace(/_/g," ")}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 70 ? "#4ade80" : pct >= 50 ? "#fbbf24" : "#f87171" }}>{val}/{max}</span>
                      </div>
                      <div style={{ height: 5, background: "#27272a", borderRadius: 3 }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.1 }}
                          style={{ height: "100%", borderRadius: 3, background: pct >= 70 ? "linear-gradient(to right,#4ade80,#22c55e)" : pct >= 50 ? "linear-gradient(to right,#fbbf24,#f59e0b)" : "linear-gradient(to right,#f87171,#ef4444)" }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Strengths + missing keywords */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 18, flex: 1 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#4ade80", marginBottom: 12 }}>✅ Strengths</h3>
                  {(suggestions.strengths || []).map((s: string, i: number) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                      <span style={{ color: "#4ade80", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span style={{ fontSize: 12, color: "#d4d4d8", lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 18, flex: 1 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#f87171", marginBottom: 12 }}>⚠️ Missing Keywords</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {(suggestions.missing_keywords || []).map((k: string, i: number) => (
                      <span key={i} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Improvements */}
            <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22, marginBottom: 18 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>💡 How to Improve</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
                {(suggestions.improvements || []).map((tip: string, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "12px 14px", borderRadius: 10, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.14)" }}>
                    <span style={{ color: "#818cf8", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ fontSize: 12, color: "#d4d4d8", lineHeight: 1.55 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall feedback */}
            {suggestions.overall_feedback && (
              <div style={{ padding: "18px 22px", borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)", marginBottom: 24 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", marginBottom: 8 }}>Overall Feedback</h3>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7 }}>{suggestions.overall_feedback}</p>
              </div>
            )}

            {/* ── JD MATCHER ── */}
            <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🎯 Job Description Matcher</h3>
              <p style={{ fontSize: 13, color: "#71717a", marginBottom: 16 }}>Paste a job description to see how well your resume matches it</p>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                rows={5}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#27272a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.6 }}
              />
              <button onClick={analyzeJD} disabled={jdLoading || !jd.trim()}
                style={{ marginTop: 12, padding: "10px 22px", borderRadius: 10, background: !jd.trim() || jdLoading ? "#27272a" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: !jd.trim() || jdLoading ? "#52525b" : "#fff", fontSize: 14, fontWeight: 600, cursor: !jd.trim() || jdLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                {jdLoading ? (
                  <>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite" }} />
                    Analysing...
                  </>
                ) : "Analyse Match →"}
              </button>

              {jdResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 20 }}>
                  {/* Match score */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 20px", borderRadius: 14, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", marginBottom: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 36, fontWeight: 900, color: jdResult.match_percent >= 70 ? "#4ade80" : jdResult.match_percent >= 50 ? "#fbbf24" : "#f87171" }}>
                        {jdResult.match_percent}%
                      </div>
                      <div style={{ fontSize: 11, color: "#71717a" }}>Match</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                        {jdResult.match_percent >= 80 ? "🏆 Excellent match" : jdResult.match_percent >= 60 ? "✅ Good match" : jdResult.match_percent >= 40 ? "⚠️ Moderate match" : "❌ Low match"}
                      </div>
                      <div style={{ fontSize: 13, color: "#a1a1aa" }}>{jdResult.summary}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ background: "#111113", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", marginBottom: 10 }}>✅ Matching keywords</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {(jdResult.matching_keywords || []).map((k: string) => (
                          <span key={k} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>{k}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ background: "#111113", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#f87171", marginBottom: 10 }}>❌ Missing from resume</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {(jdResult.missing_keywords || []).map((k: string) => (
                          <span key={k} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}>{k}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {(jdResult.skill_gaps || []).length > 0 && (
                    <div style={{ marginTop: 14, padding: "14px 18px", borderRadius: 12, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24", marginBottom: 8 }}>🔧 Skill gaps to address</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {jdResult.skill_gaps.map((s: string) => (
                          <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}