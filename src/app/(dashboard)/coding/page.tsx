"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { problems, Problem } from "@/lib/data/problems"

const TOPICS = ["All", "Array", "String", "Linked List", "Tree", "Graph", "Dynamic Programming",
  "Backtracking", "Binary Search", "Sliding Window", "Stack", "Heap", "Hash Map",
  "Two Pointers", "Greedy", "Matrix", "Math", "Bit Manipulation", "Design",
  "Prefix Sum", "Trie", "Union Find", "Recursion"]

const COMPANIES = ["All", "Amazon", "Google", "Microsoft", "Facebook", "Flipkart",
  "Swiggy", "Uber", "TCS", "Infosys", "Wipro", "Accenture"]

const CATEGORIES = ["All", "Product-Based", "Service-Based", "Both"]

function DiffBadge({ d }: { d: string }) {
  const cfg = d === "Easy"
    ? { bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.25)" }
    : d === "Medium"
    ? { bg: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "rgba(251,191,36,0.25)" }
    : { bg: "rgba(248,113,113,0.1)", color: "#f87171", border: "rgba(248,113,113,0.25)" }
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 99,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, textTransform: "capitalize" }}>
      {d}
    </span>
  )
}

function LeetCodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.4 36.4L26.8 46a3.5 3.5 0 01-4.9 0l-8.3-8.3a3.5 3.5 0 010-4.9l9.6-9.6"
        stroke="#FFA116" strokeWidth="4" strokeLinecap="round"/>
      <path d="M13.6 13.6L23.2 4a3.5 3.5 0 014.9 0l8.3 8.3a3.5 3.5 0 010 4.9l-9.6 9.6"
        stroke="#FFA116" strokeWidth="4" strokeLinecap="round"/>
      <line x1="10" y1="25" x2="40" y2="25" stroke="#FFA116" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export default function CodingPage() {
  const router = useRouter()
  const [user,        setUser]       = useState<any>(null)
  const [solved,      setSolved]     = useState<number[]>([])
  const [diff,        setDiff]       = useState("All")
  const [topic,       setTopic]      = useState("All")
  const [company,     setCompany]    = useState("All")
  const [category,    setCategory]   = useState("All")
  const [search,      setSearch]     = useState("")
  const [page,        setPage]       = useState(1)
  const PER_PAGE = 20

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      setUser(user)
      const { data } = await supabase.from("coding_submissions")
        .select("problem_id, status").eq("user_id", user.id).eq("status", "accepted")
      setSolved((data || []).map((d: any) => Number(d.problem_id)))
    })
  }, [router])

  const filtered = problems.filter(p => {
    if (diff !== "All"    && p.difficulty !== diff)    return false
    if (topic !== "All"   && p.topic !== topic)        return false
    if (category !== "All" && p.category !== category && p.category !== "Both") return false
    if (company !== "All" && !p.companies.includes(company)) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())
               && !p.topic.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const easyCount   = problems.filter(p => p.difficulty === "Easy").length
  const medCount    = problems.filter(p => p.difficulty === "Medium").length
  const hardCount   = problems.filter(p => p.difficulty === "Hard").length
  const solvedCount = solved.length

  function resetFilters() {
    setDiff("All"); setTopic("All"); setCompany("All");
    setCategory("All"); setSearch(""); setPage(1)
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
          Coding Practice
        </h1>
        <p style={{ fontSize: 14, color: "#71717a" }}>
          {problems.length} real LeetCode problems — click the{" "}
          <span style={{ color: "#FFA116", fontWeight: 600 }}>LC</span> icon to open on LeetCode
        </p>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total",    val: problems.length, color: "#818cf8" },
          { label: "Solved",   val: solvedCount,     color: "#4ade80" },
          { label: "Easy",     val: easyCount,       color: "#4ade80" },
          { label: "Medium",   val: medCount,        color: "#fbbf24" },
          { label: "Hard",     val: hardCount,       color: "#f87171" },
        ].map(s => (
          <div key={s.label} style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20, marginBottom: 20 }}>

        {/* Search */}
        <div style={{ marginBottom: 14 }}>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search problems or topics..."
            style={{ width: "100%", padding: "9px 14px", borderRadius: 10, background: "#27272a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none" }}
          />
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Difficulty</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All","Easy","Medium","Hard"].map(d => (
              <button key={d} onClick={() => { setDiff(d); setPage(1) }}
                style={{ padding: "5px 14px", borderRadius: 8, border: `1px solid ${diff === d ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: diff === d ? "rgba(99,102,241,0.15)" : "transparent", color: diff === d ? "#818cf8" : "#71717a", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setCategory(c); setPage(1) }}
                style={{ padding: "5px 14px", borderRadius: 8, border: `1px solid ${category === c ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: category === c ? "rgba(99,102,241,0.15)" : "transparent", color: category === c ? "#818cf8" : "#71717a", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Topic</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {TOPICS.map(t => (
              <button key={t} onClick={() => { setTopic(t); setPage(1) }}
                style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${topic === t ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: topic === t ? "rgba(99,102,241,0.15)" : "transparent", color: topic === t ? "#818cf8" : "#71717a", fontSize: 11, fontWeight: 500, cursor: "pointer" }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Company */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Company</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {COMPANIES.map(c => (
              <button key={c} onClick={() => { setCompany(c); setPage(1) }}
                style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${company === c ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: company === c ? "rgba(99,102,241,0.15)" : "transparent", color: company === c ? "#818cf8" : "#71717a", fontSize: 11, fontWeight: 500, cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <span style={{ fontSize: 12, color: "#71717a" }}>
            Showing <span style={{ color: "#fff", fontWeight: 600 }}>{filtered.length}</span> of {problems.length} problems
          </span>
          {(diff !== "All" || topic !== "All" || company !== "All" || category !== "All" || search) && (
            <button onClick={resetFilters}
              style={{ fontSize: 12, color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
              Clear all filters ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>

        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 100px 120px 80px 140px 60px", padding: "11px 18px", background: "#18181b", borderBottom: "1px solid rgba(255,255,255,0.07)", gap: 8 }}>
          {["#", "Title", "Difficulty", "Topic", "Category", "Companies", "LC"].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h === "LC" ? "center" : "left" }}>
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#52525b", fontSize: 14 }}>
            No problems found. Try different filters.
          </div>
        ) : (
          paginated.map((p, i) => {
            const isSolved = solved.includes(p.id)
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "50px 1fr 100px 120px 80px 140px 60px",
                  padding: "13px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 0.15s",
                }}
                whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
              >
                {/* # */}
                <div style={{ fontSize: 12, color: isSolved ? "#4ade80" : "#52525b", fontWeight: 600 }}>
                  {isSolved ? "✓" : p.id}
                </div>

                {/* Title */}
                <div style={{ fontSize: 13, fontWeight: 600, color: isSolved ? "#4ade80" : "#e4e4e7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.title}
                </div>

                {/* Difficulty */}
                <div><DiffBadge d={p.difficulty} /></div>

                {/* Topic */}
                <div style={{ fontSize: 11, color: "#a1a1aa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.topic}
                </div>

                {/* Category */}
                <div>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 6, background: p.category === "Product-Based" ? "rgba(99,102,241,0.1)" : p.category === "Service-Based" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: p.category === "Product-Based" ? "#818cf8" : p.category === "Service-Based" ? "#34d399" : "#fbbf24", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {p.category === "Product-Based" ? "Product" : p.category === "Service-Based" ? "Service" : "Both"}
                  </span>
                </div>

                {/* Companies */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {p.companies.slice(0, 2).map(c => (
                    <span key={c} style={{ fontSize: 10, padding: "1px 6px", borderRadius: 5, background: "rgba(255,255,255,0.05)", color: "#71717a", whiteSpace: "nowrap" }}>
                      {c}
                    </span>
                  ))}
                  {p.companies.length > 2 && (
                    <span style={{ fontSize: 10, color: "#52525b" }}>+{p.companies.length - 2}</span>
                  )}
                </div>

                {/* LeetCode icon */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a
                    href={p.leetcode_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open "${p.title}" on LeetCode`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: "rgba(255,161,22,0.08)", border: "1px solid rgba(255,161,22,0.2)", cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}
                    onClick={e => e.stopPropagation()}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,161,22,0.18)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,161,22,0.5)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,161,22,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,161,22,0.2)" }}
                  >
                    <LeetCodeIcon />
                  </a>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24 }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: page === 1 ? "#3f3f46" : "#a1a1aa", cursor: page === 1 ? "not-allowed" : "pointer", fontSize: 13 }}>
            ← Prev
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum = i + 1
            if (totalPages > 7) {
              if (page <= 4) pageNum = i + 1
              else if (page >= totalPages - 3) pageNum = totalPages - 6 + i
              else pageNum = page - 3 + i
            }
            return (
              <button key={pageNum} onClick={() => setPage(pageNum)}
                style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${page === pageNum ? "#6366f1" : "rgba(255,255,255,0.08)"}`, background: page === pageNum ? "rgba(99,102,241,0.15)" : "transparent", color: page === pageNum ? "#818cf8" : "#71717a", fontSize: 13, fontWeight: page === pageNum ? 700 : 400, cursor: "pointer" }}>
                {pageNum}
              </button>
            )
          })}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: page === totalPages ? "#3f3f46" : "#a1a1aa", cursor: page === totalPages ? "not-allowed" : "pointer", fontSize: 13 }}>
            Next →
          </button>

          <span style={{ fontSize: 12, color: "#52525b", marginLeft: 8 }}>
            Page {page} of {totalPages}
          </span>
        </div>
      )}

      {/* ── Note ── */}
      <div style={{ marginTop: 24, padding: "14px 18px", borderRadius: 12, background: "rgba(255,161,22,0.06)", border: "1px solid rgba(255,161,22,0.15)", display: "flex", alignItems: "center", gap: 12 }}>
        <LeetCodeIcon />
        <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
          Click the{" "}
          <span style={{ color: "#FFA116", fontWeight: 600 }}>orange LC icon</span>{" "}
          on any row to open that problem directly on LeetCode.
          Solve it there and come back — your progress is tracked here.
        </p>
      </div>

    </div>
  )
}
