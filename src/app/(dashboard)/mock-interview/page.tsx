"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

const TYPES = [
  { id: "hr",            icon: "🤝", label: "HR Round",        desc: "Tell me about yourself, strengths, goals" },
  { id: "technical",     icon: "⚙️", label: "Technical Round", desc: "CS fundamentals, OOP, DBMS, OS, Networks" },
  { id: "dsa",           icon: "🧩", label: "DSA Round",       desc: "Data structures and algorithm concepts" },
  { id: "behavioural",   icon: "💬", label: "Behavioural",     desc: "STAR method, situational questions" },
  { id: "system-design", icon: "🏗️", label: "System Design",  desc: "Design scalable systems and architecture" },
]

const COMPANIES = [
  { id: "amazon",    name: "Amazon",    emoji: "🟠" },
  { id: "google",    name: "Google",    emoji: "🔴" },
  { id: "microsoft", name: "Microsoft", emoji: "🟦" },
  { id: "tcs",       name: "TCS",       emoji: "🔵" },
  { id: "infosys",   name: "Infosys",   emoji: "🟣" },
  { id: "wipro",     name: "Wipro",     emoji: "🟡" },
  { id: "flipkart",  name: "Flipkart",  emoji: "🔷" },
  { id: "startup",   name: "Startup",   emoji: "🚀" },
]

export default function MockInterviewPage() {
  const router  = useRouter()
  const [user,    setUser]    = useState<any>(null)
  const [resume,  setResume]  = useState<any>(null)
  const [type,    setType]    = useState("hr")
  const [company, setCompany] = useState("amazon")
  const [role,    setRole]    = useState("Software Engineer")
  const [loading, setLoading] = useState(false)
  const [past,    setPast]    = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)

      const [{ data: res }, { data: ivs }] = await Promise.all([
        supabase.from("resumes").select("id,file_name,ats_score").eq("user_id", user.id).order("uploaded_at", { ascending: false }).limit(1).single(),
        supabase.from("interview_sessions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ])

      setResume(res || null)
      setPast(ivs || [])
    })
  }, [router])

  async function startInterview() {
    if (!user) return
    setLoading(true)

    const { data, error } = await supabase
  .from("interview_sessions")
  .insert([
    {
      user_id: user.id,
      title: `${COMPANIES.find(c => c.id === company)?.name} — ${TYPES.find(t => t.id === type)?.label}`,
      company,
      role,
      interview_type: type,
      status: "active",
      transcript: [],
    }
  ])
  .select()
  .single()

    if (error || !data) {
      console.error("Session create error:", error)
      setLoading(false)
      return
    }

    router.push(`/mock-interview/${data.id}`)
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
          AI Mock Interview
        </h1>
        <p style={{ fontSize: 14, color: "#71717a", marginBottom: 32 }}>
          Practice with an AI interviewer and get instant per-answer feedback
        </p>

        {/* Resume status */}
        <div style={{ marginBottom: 28, padding: "16px 20px", borderRadius: 14, background: resume ? "rgba(74,222,128,0.06)" : "rgba(245,158,11,0.06)", border: `1px solid ${resume ? "rgba(74,222,128,0.2)" : "rgba(245,158,11,0.2)"}`, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 24 }}>{resume ? "✅" : "⚠️"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>
              {resume ? `Resume loaded: ${resume.file_name}` : "No resume uploaded yet"}
            </div>
            <div style={{ fontSize: 12, color: "#71717a" }}>
              {resume
                ? "AI will ask questions based on your projects and skills"
                : "Upload your resume for personalized questions — interview still works without it"}
            </div>
          </div>
          {!resume && (
            <Link href="/resume" style={{ fontSize: 12, padding: "7px 14px", borderRadius: 8, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
              Upload resume
            </Link>
          )}
        </div>

        {/* Interview Type */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Interview Type
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
            {TYPES.map((t) => (
              <div key={t.id} onClick={() => setType(t.id)}
                style={{ padding: "16px 14px", borderRadius: 12, border: `1px solid ${type === t.id ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: type === t.id ? "rgba(99,102,241,0.1)" : "#1c1c1f", cursor: "pointer", transition: "all 0.15s" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: "#71717a", lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Company */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Target Company
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {COMPANIES.map((c) => (
              <button key={c.id} onClick={() => setCompany(c.id)}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 10, border: `1px solid ${company === c.id ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: company === c.id ? "rgba(99,102,241,0.12)" : "#1c1c1f", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                <span>{c.emoji}</span>{c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Role */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Role
          </div>
          <input
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="e.g. Software Engineer, Data Analyst, DevOps Engineer"
            style={{ width: "100%", maxWidth: 420, padding: "10px 16px", borderRadius: 12, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none" }}
          />
        </div>

        {/* START BUTTON */}
        <button
          onClick={startInterview}
          disabled={loading || !role.trim()}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 36px", borderRadius: 14, background: loading ? "#3f3f46" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", fontSize: 17, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", boxShadow: loading ? "none" : "0 0 24px rgba(99,102,241,0.35)" }}>
          {loading ? (
            <>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite" }} />
              Starting...
            </>
          ) : (
            <>🎤 Start Interview</>
          )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

        {/* Past sessions */}
        {past.length > 0 && (
          <div style={{ marginTop: 52 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Past Sessions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {past.map((s) => (
                <div key={s.id}
                  onClick={() => router.push(s.status === "active" ? `/mock-interview/${s.id}` : `/mock-interview/${s.id}/report`)}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 12, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎤</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>{new Date(s.created_at).toLocaleDateString("en-IN")} · {s.interview_type}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: s.status === "active" ? "#fbbf24" : s.overall_score >= 70 ? "#4ade80" : "#f87171" }}>
                      {s.status === "active" ? "Resume →" : `${s.overall_score || 0}%`}
                    </span>
                    <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>
                      {s.status === "active" ? "Continue" : "View report"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}