"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { PREP_TOPICS } from "@/lib/data/prep"

const COMPANIES = [
  { id: "tcs",       name: "TCS",       emoji: "🔵", tier: "Mass Recruiter",  desc: "NQT + Technical + HR rounds",         color: "#3b82f6" },
  { id: "infosys",   name: "Infosys",   emoji: "🟣", tier: "Mass Recruiter",  desc: "InfyTQ + Hackwithinfy prep",          color: "#8b5cf6" },
  { id: "wipro",     name: "Wipro",     emoji: "🟡", tier: "Mass Recruiter",  desc: "NLTH + Coding + Aptitude",            color: "#eab308" },
  { id: "amazon",    name: "Amazon",    emoji: "🟠", tier: "Product Company", desc: "Leadership Principles + DSA",         color: "#f97316" },
  { id: "flipkart",  name: "Flipkart",  emoji: "🔷", tier: "Product Company", desc: "Coding + System Design + HR",         color: "#06b6d4" },
  { id: "swiggy",    name: "Swiggy",    emoji: "🟧", tier: "Product Company", desc: "DSA + Product thinking rounds",       color: "#f59e0b" },
  { id: "google",    name: "Google",    emoji: "🔴", tier: "FAANG",           desc: "DSA + System Design + Googliness",    color: "#ef4444" },
  { id: "microsoft", name: "Microsoft", emoji: "🟦", tier: "FAANG",           desc: "Coding + Design + Behavioural",       color: "#0ea5e9" },
  { id: "meta",      name: "Meta",      emoji: "🔵", tier: "FAANG",           desc: "Coding + System Design + Culture",    color: "#6366f1" },
  { id: "startup",   name: "Startups",  emoji: "🚀", tier: "Startups",        desc: "Full-stack + problem solving",        color: "#10b981" },
]

export default function CompanyPrepPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login")
    })
  }, [router])

  const tiers   = ["all", "Mass Recruiter", "Product Company", "FAANG", "Startups"]
  const visible = COMPANIES.filter(c => filter === "all" || c.tier === filter)

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Company-wise Prep</h1>
        <p style={{ fontSize: 14, color: "#71717a", marginBottom: 32 }}>Dedicated prep tracks with real interview questions and patterns</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {tiers.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{ padding: "7px 16px", borderRadius: 10, border: `1px solid ${filter === t ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: filter === t ? "rgba(99,102,241,0.15)" : "transparent", color: filter === t ? "#818cf8" : "#71717a", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          {visible.map((c, i) => (
            <motion.div key={c.id} custom={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link href={`/company-prep/${c.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 24, cursor: "pointer" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${c.color}40`)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)")}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{c.emoji}</div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{c.name}</div>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.06)", color: "#71717a" }}>{c.tier}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.55, marginBottom: 16 }}>{c.desc}</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { label: `${PREP_TOPICS.filter(t => t.company === c.id).length || 3} Topics` },
                      { label: "HR Questions" },
                      { label: "Coding Patterns" },
                    ].map((tag) => (
                      <span key={tag.label} style={{ fontSize: 11, color: "#71717a", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "3px 8px", borderRadius: 6 }}>{tag.label}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* DSA Topics */}
        <div style={{ marginTop: 52 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Core Prep Topics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {PREP_TOPICS.filter(t => !t.company).map((t, i) => (
              <Link key={t.id} href={`/resources/${t.slug}`} style={{ textDecoration: "none" }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  style={{ padding: "18px 20px", borderRadius: 14, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)")}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "#71717a", marginBottom: 10, lineHeight: 1.4 }}>{t.description}</div>
                  <div style={{ fontSize: 11, color: "#52525b" }}>{t.question_count} questions</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}