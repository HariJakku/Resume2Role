"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { CODING_PROBLEMS } from "@/lib/data/problems"
import { difficultyColor } from "@/lib/utils"

export default function CodingPage() {
  const router = useRouter()
  const [filter,      setFilter]      = useState("all")
  const [company,     setCompany]     = useState("all")
  const [solved,      setSolved]      = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      const { data } = await supabase.from("coding_submissions")
        .select("problem_id, status").eq("user_id", user.id).eq("status", "accepted")
      setSolved((data || []).map((d: any) => d.problem_id))
    })
  }, [router])

  const companies = ["all", "amazon", "google", "microsoft", "tcs", "infosys", "flipkart"]

  const filtered = CODING_PROBLEMS.filter(p => {
    const matchDiff    = filter  === "all" || p.difficulty === filter
    const matchCompany = company === "all" || p.companies.includes(company)
    const matchSearch  = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchDiff && matchCompany && matchSearch
  })

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Coding Practice</h1>
            <p style={{ fontSize: 14, color: "#71717a" }}>{solved.length} of {CODING_PROBLEMS.length} problems solved</p>
          </div>
          <div style={{ height: 6, width: 200, background: "#27272a", borderRadius: 3 }}>
            <div style={{ height: "100%", width: `${(solved.length / CODING_PROBLEMS.length) * 100}%`, background: "linear-gradient(to right,#6366f1,#8b5cf6)", borderRadius: 3 }} />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search problems or topics..."
            style={{ flex: 1, minWidth: 200, padding: "8px 14px", borderRadius: 10, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
          {["all", "easy", "medium", "hard"].map((d) => (
            <button key={d} onClick={() => setFilter(d)}
              style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${filter === d ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: filter === d ? "rgba(99,102,241,0.15)" : "transparent", color: filter === d ? "#818cf8" : "#71717a", fontSize: 12, fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}>
              {d}
            </button>
          ))}
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
          {companies.map((c) => (
            <button key={c} onClick={() => setCompany(c)}
              style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${company === c ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: company === c ? "rgba(99,102,241,0.15)" : "transparent", color: company === c ? "#818cf8" : "#71717a", fontSize: 12, fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Problem list */}
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: 0, padding: "12px 20px", background: "#18181b", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: 11, fontWeight: 600, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <span style={{ width: 32 }}>#</span>
            <span>Title</span>
            <span style={{ width: 80, textAlign: "center" }}>Difficulty</span>
            <span style={{ width: 100, textAlign: "center" }}>Topics</span>
            <span style={{ width: 60, textAlign: "center" }}>Status</span>
          </div>
          {filtered.map((p, i) => {
            const dc      = difficultyColor(p.difficulty)
            const isSolved = solved.includes(p.id)
            return (
              <Link key={p.id} href={`/coding/${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: 0, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", transition: "background 0.15s", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.05)")}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)")}>
                  <span style={{ width: 32, fontSize: 13, color: "#52525b" }}>{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#e4e4e7" }}>{p.title}</span>
                  <span style={{ width: 80, textAlign: "center", fontSize: 12, fontWeight: 600, color: dc.text, background: dc.bg, border: `1px solid ${dc.border}`, padding: "2px 10px", borderRadius: 99, textTransform: "capitalize" }}>{p.difficulty}</span>
                  <div style={{ width: 100, display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
                    {p.topics.slice(0, 1).map(t => (
                      <span key={t} style={{ fontSize: 10, color: "#71717a", background: "rgba(255,255,255,0.05)", padding: "1px 6px", borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ width: 60, textAlign: "center" }}>
                    {isSolved ? <span style={{ fontSize: 16, color: "#4ade80" }}>✓</span> : <span style={{ fontSize: 12, color: "#3f3f46" }}>—</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}