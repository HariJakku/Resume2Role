"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { PREP_TOPICS } from "@/lib/data/prep"

const CATEGORIES = [
  { id: "dsa",           label: "DSA",          icon: "📐", color: "#6366f1" },
  { id: "hr",            label: "HR & Behavioural", icon: "🤝", color: "#8b5cf6" },
  { id: "aptitude",      label: "Aptitude",     icon: "🔢", color: "#06b6d4" },
  { id: "system-design", label: "System Design", icon: "🏗️", color: "#10b981" },
  { id: "company",       label: "Company-wise", icon: "🏢", color: "#f59e0b" },
]

export default function ResourcesPage() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login")
    })
  }, [router])

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Placement Resources</h1>
        <p style={{ fontSize: 14, color: "#71717a", marginBottom: 36 }}>Structured study material for every round of campus placements</p>

        {CATEGORIES.map((cat, ci) => {
          const topics = PREP_TOPICS.filter(t => t.category === cat.id)
          if (topics.length === 0) return null
          return (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }} style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${cat.color}15`, border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{cat.icon}</div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{cat.label}</h2>
                <span style={{ fontSize: 12, color: "#71717a", marginLeft: 6 }}>{topics.length} topics</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
                {topics.map((t) => (
                  <Link key={t.id} href={`/resources/${t.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ padding: "18px 20px", borderRadius: 14, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}40`; (e.currentTarget as HTMLElement).style.background = `${cat.color}08` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background = "#1c1c1f" }}>
                      <div style={{ fontSize: 26, marginBottom: 10 }}>{t.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{t.title}</div>
                      <div style={{ fontSize: 12, color: "#71717a", lineHeight: 1.4, marginBottom: 10 }}>{t.description}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "#52525b" }}>{t.article_count} articles</span>
                        <span style={{ fontSize: 11, color: "#52525b" }}>·</span>
                        <span style={{ fontSize: 11, color: "#52525b" }}>{t.question_count} questions</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* Quick tips */}
        <div style={{ padding: "28px 32px", borderRadius: 18, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", marginTop: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#818cf8", marginBottom: 16 }}>📌 Quick Placement Tips</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            {[
              "Start DSA prep at least 3 months before campus season",
              "Practice at least 2 coding problems every day consistently",
              "Learn the STAR method for all behavioural questions",
              "Research the company before every interview round",
              "Maintain a GitHub with at least 2-3 strong projects",
              "Practice mock interviews out loud, not just in your head",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
                <span style={{ color: "#818cf8", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}