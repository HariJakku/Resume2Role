"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getInitials, scoreColor } from "@/lib/utils"

export default function ProfilePage() {
  const router  = useRouter()
  const [user,         setUser]         = useState<any>(null)
  const [profile,      setProfile]      = useState<any>(null)
  const [resume,       setResume]       = useState<any>(null)
  const [interviews,   setInterviews]   = useState<any[]>([])
  const [submissions,  setSubmissions]  = useState<any[]>([])
  const [editing,      setEditing]      = useState(false)
  const [form,         setForm]         = useState({ full_name: "", college: "", branch: "", graduation_year: "" })
  const [saving,       setSaving]       = useState(false)
  const [saved,        setSaved]        = useState(false)
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)
      const [{ data: prof }, { data: res }, { data: ivs }, { data: subs }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("resumes").select("*").eq("user_id", user.id).order("uploaded_at", { ascending: false }).limit(1).single(),
        supabase.from("interview_sessions").select("*").eq("user_id", user.id).eq("status", "completed").order("created_at", { ascending: false }),
        supabase.from("coding_submissions").select("*").eq("user_id", user.id).eq("status", "accepted").order("created_at", { ascending: false }),
      ])
      setProfile(prof)
      setResume(res)
      setInterviews(ivs || [])
      setSubmissions(subs || [])
      if (prof) setForm({ full_name: prof.full_name || "", college: prof.college || "", branch: prof.branch || "", graduation_year: prof.graduation_year || "" })
      setLoading(false)
    })
  }, [router])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    await supabase.from("profiles").update({
      full_name:       form.full_name,
      college:         form.college,
      branch:          form.branch,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
    }).eq("id", user.id)
    setProfile((p: any) => ({ ...p, ...form }))
    setSaving(false); setSaved(true); setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid #6366f1", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  const avgScore = interviews.length > 0
    ? Math.round(interviews.reduce((s, iv) => s + (iv.overall_score || 0), 0) / interviews.length)
    : 0

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Profile header */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 36, padding: "28px 32px", borderRadius: 20, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
            {getInitials(profile?.full_name || user?.email || "U")}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{profile?.full_name || "Student"}</div>
            <div style={{ fontSize: 14, color: "#71717a", marginBottom: 8 }}>{user?.email}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {profile?.college && <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>{profile.college}</span>}
              {profile?.branch  && <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(255,255,255,0.05)", color: "#71717a" }}>{profile.branch}</span>}
              {profile?.graduation_year && <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(255,255,255,0.05)", color: "#71717a" }}>Class of {profile.graduation_year}</span>}
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} className="btn-secondary" style={{ fontSize: 13, padding: "8px 18px" }}>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Edit form */}
        {editing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 28, padding: "24px 28px", borderRadius: 16, background: "#18181b", border: "1px solid rgba(99,102,241,0.2)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Edit Profile</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Full Name",        key: "full_name",       placeholder: "Hari Krishna"  },
                { label: "College",          key: "college",         placeholder: "SRGEC"         },
                { label: "Branch",           key: "branch",          placeholder: "CSE"           },
                { label: "Graduation Year",  key: "graduation_year", placeholder: "2026"          },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 13, color: "#a1a1aa", marginBottom: 7 }}>{f.label}</label>
                  <input className="input" value={(form as any)[f.key]} placeholder={f.placeholder}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ fontSize: 14 }}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              {saved && <span style={{ fontSize: 13, color: "#4ade80", alignSelf: "center" }}>✓ Saved!</span>}
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "ATS Score",          value: resume?.ats_score ? `${resume.ats_score}/100` : "—",   icon: "📊", color: resume?.ats_score >= 70 ? "#4ade80" : "#fbbf24" },
            { label: "Interviews Done",    value: String(interviews.length),   icon: "🎤", color: "#818cf8" },
            { label: "Avg Interview Score",value: avgScore > 0 ? `${avgScore}%` : "—", icon: "⭐", color: scoreColor(avgScore) },
            { label: "Problems Solved",    value: String(submissions.length),  icon: "💻", color: "#06b6d4" },
            { label: "Day Streak",         value: `${profile?.streak || 0} 🔥`, icon: "📅", color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 3 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#71717a" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Interview history */}
        {interviews.length > 0 && (
          <div style={{ marginBottom: 28, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Interview History</h3>
            {interviews.map((iv) => (
              <div key={iv.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{iv.title}</div>
                  <div style={{ fontSize: 11, color: "#71717a" }}>{new Date(iv.created_at).toLocaleDateString("en-IN")}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(iv.overall_score || 0) }}>{iv.overall_score || 0}%</span>
              </div>
            ))}
          </div>
        )}

        {/* Solved problems */}
        {submissions.length > 0 && (
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Solved Problems ({submissions.length})</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {submissions.map((s) => (
                <span key={s.id} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 8, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}>
                  ✓ {s.problem_title}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}