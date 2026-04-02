"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } })
}

const QUICK_ACTIONS = [
  { icon: "📤", label: "Upload Resume",    sub: "Check ATS score",         href: "/resume",         color: "#6366f1" },
  { icon: "🤖", label: "Mock Interview",   sub: "Start AI session",         href: "/mock-interview", color: "#8b5cf6" },
  { icon: "💻", label: "Coding Test",      sub: "Solve DSA problems",       href: "/coding",         color: "#06b6d4" },
  { icon: "🏢", label: "Company Prep",     sub: "TCS, Amazon, Google...",   href: "/company-prep",   color: "#10b981" },
  { icon: "📚", label: "Resources",        sub: "Study material & tips",    href: "/resources",      color: "#f59e0b" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user,    setUser]    = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [resume,  setResume]  = useState<any>(null)
  const [interviews, setInterviews] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { router.push("/login"); return }
  setUser(user)

  const [{ data: prof }, { data: res }, { data: ivs }, { data: subs }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("resumes").select("*").eq("user_id", user.id).order("uploaded_at", { ascending: false }).limit(1).single(),
    supabase.from("interview_sessions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    supabase.from("coding_submissions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
  ])

  // If profile has no name, sync from auth metadata
  if (prof && !prof.full_name && user.user_metadata?.full_name) {
    await supabase.from("profiles").update({
      full_name: user.user_metadata.full_name,
    }).eq("id", user.id)
    prof.full_name = user.user_metadata.full_name
  }

  setProfile(prof)
  setResume(res)
  setInterviews(ivs || [])
  setSubmissions(subs || [])
  setLoading(false)
}
    load()
  }, [router])

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#71717a", fontSize: 14 }}>Loading your dashboard...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  const firstName = profile?.full_name?.split(" ")[0] || user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Student"
  const atsScore  = resume?.ats_score ?? null

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

      {/* HEADER */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
              Good {getGreeting()}, {firstName} 👋
            </h1>
            <p style={{ fontSize: 14, color: "#71717a" }}>
              {profile?.college ? `${profile.college} · ${profile.branch || "B.Tech"}` : "Complete your profile to get started"}
            </p>
          </div>
          <Link href="/resume" className="btn-primary" style={{ fontSize: 14 }}>
            {resume ? "Update Resume" : "Upload Resume →"}
          </Link>
        </div>
      </motion.div>

      {/* STATS ROW */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 36 }}>
        {[
          {
            label: "ATS Score",
            value: atsScore !== null ? `${atsScore}/100` : "—",
            sub:   atsScore !== null ? (atsScore >= 70 ? "Good score" : "Needs work") : "Upload resume",
            color: atsScore !== null ? (atsScore >= 70 ? "#4ade80" : atsScore >= 50 ? "#fbbf24" : "#f87171") : "#71717a",
            icon:  "📊",
          },
          {
            label: "Interviews Done",
            value: String(profile?.total_interviews || 0),
            sub:   "Mock sessions",
            color: "#818cf8",
            icon:  "🎤",
          },
          {
            label: "Problems Solved",
            value: String(profile?.total_tests || 0),
            sub:   "Coding practice",
            color: "#06b6d4",
            icon:  "💻",
          },
          {
            label: "Day Streak",
            value: `${profile?.streak || 0} 🔥`,
            sub:   "Keep it going!",
            color: "#f59e0b",
            icon:  "📅",
          },
        ].map((s) => (
          <div key={s.label} style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#71717a" }}>{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* RESUME BANNER — shown if no resume */}
      {!resume && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
          style={{ marginBottom: 32, padding: "24px 28px", borderRadius: 16, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>📤 Upload your resume to get started</div>
            <div style={{ fontSize: 13, color: "#a1a1aa" }}>Get your ATS score, personalized interview questions, and improvement tips.</div>
          </div>
          <Link href="/resume" className="btn-primary" style={{ fontSize: 14 }}>Upload now →</Link>
        </motion.div>
      )}

      {/* ATS SCORE BANNER — shown if resume uploaded */}
      {resume && atsScore !== null && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
          style={{ marginBottom: 32, padding: "24px 28px", borderRadius: 16, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", border: `4px solid ${atsScore >= 70 ? "#4ade80" : atsScore >= 50 ? "#fbbf24" : "#f87171"}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{atsScore}</span>
            <span style={{ fontSize: 10, color: "#71717a" }}>/100</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              {atsScore >= 70 ? "✅ Good ATS Score" : atsScore >= 50 ? "⚠️ Average ATS Score" : "❌ Low ATS Score"}
            </div>
            <div style={{ fontSize: 13, color: "#a1a1aa" }}>
              {resume.file_name} · {atsScore >= 70 ? "Your resume looks strong." : "Your resume needs improvements."}
            </div>
          </div>
          <Link href="/resume" className="btn-secondary" style={{ fontSize: 13 }}>View full report →</Link>
        </motion.div>
      )}

      {/* QUICK ACTIONS */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Quick actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
          {QUICK_ACTIONS.map((a, i) => (
            <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ y: -4, borderColor: `${a.color}40` }}
                style={{ padding: "22px 20px", borderRadius: 14, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: "#71717a" }}>{a.sub}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* RECENT ACTIVITY */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* Recent Interviews */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
          style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Recent Interviews</h3>
            <Link href="/mock-interview" style={{ fontSize: 12, color: "#818cf8", textDecoration: "none" }}>View all →</Link>
          </div>
          {interviews.length === 0 ? (
            <EmptyState icon="🎤" text="No interviews yet" sub="Start your first AI mock interview" href="/mock-interview" />
          ) : (
            interviews.map((iv) => (
              <div key={iv.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎤</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{iv.title || `${iv.company || "General"} Interview`}</div>
                  <div style={{ fontSize: 11, color: "#71717a" }}>{new Date(iv.created_at).toLocaleDateString("en-IN")}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: iv.overall_score >= 70 ? "#4ade80" : iv.overall_score >= 50 ? "#fbbf24" : "#f87171" }}>
                  {iv.overall_score ? `${iv.overall_score}%` : iv.status === "active" ? "In progress" : "—"}
                </span>
              </div>
            ))
          )}
        </motion.div>

        {/* Recent Submissions */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
          style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Recent Coding</h3>
            <Link href="/coding" style={{ fontSize: 12, color: "#818cf8", textDecoration: "none" }}>Practice more →</Link>
          </div>
          {submissions.length === 0 ? (
            <EmptyState icon="💻" text="No problems solved yet" sub="Start with an easy problem" href="/coding" />
          ) : (
            submissions.map((s) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💻</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.problem_title}</div>
                  <div style={{ fontSize: 11, color: "#71717a" }}>{s.language} · {new Date(s.created_at).toLocaleDateString("en-IN")}</div>
                </div>
                <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 99, fontWeight: 600, background: s.status === "accepted" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: s.status === "accepted" ? "#4ade80" : "#f87171" }}>
                  {s.status === "accepted" ? "Passed" : "Failed"}
                </span>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}

function EmptyState({ icon, text, sub, href }: { icon: string; text: string; sub: string; href: string }) {
  return (
    <div style={{ textAlign: "center", padding: "28px 0" }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#52525b", marginBottom: 6 }}>{text}</div>
      <div style={{ fontSize: 12, color: "#3f3f46", marginBottom: 14 }}>{sub}</div>
      <Link href={href} className="btn-secondary" style={{ fontSize: 12, padding: "6px 16px" }}>Get started</Link>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "morning"
  if (h < 17) return "afternoon"
  return "evening"
}