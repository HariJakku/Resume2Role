// ═══════════════════════════════════════════════════════════
// FILE: src/app/not-found.tsx
// ═══════════════════════════════════════════════════════════
// "use client"
// import Link from "next/link"
// export default function NotFound() {
//   return (
//     <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:"0 24px", textAlign:"center" }}>
//       <div style={{ fontSize:72 }}>🔍</div>
//       <h1 style={{ fontSize:28, fontWeight:800, color:"#fff" }}>Page not found</h1>
//       <p style={{ fontSize:15, color:"#71717a", maxWidth:400 }}>This page doesn't exist or has been moved.</p>
//       <div style={{ display:"flex", gap:10 }}>
//         <Link href="/dashboard" style={{ padding:"10px 22px", borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", textDecoration:"none", fontSize:14, fontWeight:600 }}>Dashboard</Link>
//         <Link href="/"          style={{ padding:"10px 22px", borderRadius:10, background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:"#a1a1aa", textDecoration:"none", fontSize:14 }}>Home</Link>
//       </div>
//     </div>
//   )
// }

// ═══════════════════════════════════════════════════════════
// FILE: src/app/(dashboard)/coding/page.tsx  — MOBILE FIXED
// ═══════════════════════════════════════════════════════════
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { problems, Problem } from "@/lib/data/problems"

const TOPICS = ["All","Array","String","Linked List","Tree","Graph","Dynamic Programming",
  "Backtracking","Binary Search","Sliding Window","Stack","Heap","Hash Map",
  "Two Pointers","Greedy","Matrix","Math","Bit Manipulation","Design","Prefix Sum","Trie","Union Find","Recursion"]

const COMPANIES = ["All","Amazon","Google","Microsoft","Facebook","Flipkart","Swiggy","Uber","TCS","Infosys","Wipro","Accenture"]
const CATEGORIES = ["All","Product-Based","Service-Based","Both"]
const PER_PAGE = 20

function DiffBadge({ d }: { d: string }) {
  const cfg = d === "Easy"
    ? { bg:"rgba(74,222,128,0.1)",   color:"#4ade80", border:"rgba(74,222,128,0.25)"  }
    : d === "Medium"
    ? { bg:"rgba(251,191,36,0.1)",   color:"#fbbf24", border:"rgba(251,191,36,0.25)"  }
    : { bg:"rgba(248,113,113,0.1)",  color:"#f87171", border:"rgba(248,113,113,0.25)" }
  return (
    <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99,
      background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, whiteSpace:"nowrap" }}>
      {d}
    </span>
  )
}

function LCIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 50 50" fill="none">
      <path d="M36 36L27 46a3.5 3.5 0 01-5 0l-8-8a3.5 3.5 0 010-5l10-10" stroke="#FFA116" strokeWidth="4" strokeLinecap="round"/>
      <path d="M14 14L23 4a3.5 3.5 0 015 0l8 8a3.5 3.5 0 010 5L26 27" stroke="#FFA116" strokeWidth="4" strokeLinecap="round"/>
      <line x1="10" y1="25" x2="40" y2="25" stroke="#FFA116" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export default function CodingPage() {
  const router = useRouter()
  const [solved,    setSolved]   = useState<number[]>([])
  const [diff,      setDiff]     = useState("All")
  const [topic,     setTopic]    = useState("All")
  const [company,   setCompany]  = useState("All")
  const [category,  setCategory] = useState("All")
  const [search,    setSearch]   = useState("")
  const [page,      setPage]     = useState(1)
  const [isMobile,  setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/login"); return }
      const { data } = await supabase.from("coding_submissions")
        .select("problem_id,status").eq("user_id", user.id).eq("status","accepted")
      setSolved((data || []).map((d: any) => Number(d.problem_id)))
    })
  }, [router])

  const filtered = problems.filter(p => {
    if (diff !== "All"     && p.difficulty !== diff)  return false
    if (topic !== "All"    && p.topic !== topic)       return false
    if (category !== "All" && p.category !== category && p.category !== "Both") return false
    if (company !== "All"  && !p.companies.includes(company)) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())
               && !p.topic.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)
  const solvedCount = solved.length

  function reset() { setDiff("All"); setTopic("All"); setCompany("All"); setCategory("All"); setSearch(""); setPage(1) }
  const hasFilters = diff !== "All" || topic !== "All" || company !== "All" || category !== "All" || search

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 16px" }}>
      <style>{`
        .coding-row:hover { background: rgba(99,102,241,0.04) !important }
        @media (max-width: 640px) {
          .filter-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 6px }
          .filter-scroll::-webkit-scrollbar { height: 3px }
          .filter-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:isMobile?22:26, fontWeight:800, color:"#fff", marginBottom:4, letterSpacing:"-0.02em" }}>
          Coding Practice
        </h1>
        <p style={{ fontSize:13, color:"#71717a" }}>
          {problems.length} LeetCode problems · tap <span style={{ color:"#FFA116", fontWeight:600 }}>LC</span> to open on LeetCode
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:20 }}>
        {[["Total",problems.length,"#818cf8"],["Solved",solvedCount,"#4ade80"],
          ["Easy",problems.filter(p=>p.difficulty==="Easy").length,"#4ade80"],
          ["Medium",problems.filter(p=>p.difficulty==="Medium").length,"#fbbf24"],
          ["Hard",problems.filter(p=>p.difficulty==="Hard").length,"#f87171"]].map(([l,v,c]) => (
          <div key={l as string} style={{ background:"#18181b", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"10px 12px", textAlign:"center" }}>
            <div style={{ fontSize:isMobile?16:20, fontWeight:800, color:c as string }}>{v}</div>
            <div style={{ fontSize:10, color:"#71717a" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background:"#18181b", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"16px", marginBottom:16 }}>
        {/* Search */}
        <input value={search} onChange={e=>{ setSearch(e.target.value); setPage(1) }}
          placeholder="Search problems or topics..."
          aria-label="Search coding problems"
          style={{ width:"100%", padding:"9px 12px", borderRadius:9, background:"#27272a", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontSize:13, outline:"none", marginBottom:12 }} />

        {/* Difficulty */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, color:"#71717a", marginBottom:5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Difficulty</div>
          <div className="filter-scroll" style={{ display:"flex", gap:6 }}>
            {["All","Easy","Medium","Hard"].map(d => (
              <button key={d} onClick={()=>{ setDiff(d); setPage(1) }}
                style={{ padding:"4px 12px", borderRadius:8, flexShrink:0, border:`1px solid ${diff===d?"#6366f1":"rgba(255,255,255,0.08)"}`, background:diff===d?"rgba(99,102,241,0.15)":"transparent", color:diff===d?"#818cf8":"#71717a", fontSize:12, fontWeight:500, cursor:"pointer" }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, color:"#71717a", marginBottom:5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Topic</div>
          <div className="filter-scroll" style={{ display:"flex", gap:6 }}>
            {TOPICS.map(t => (
              <button key={t} onClick={()=>{ setTopic(t); setPage(1) }}
                style={{ padding:"4px 10px", borderRadius:7, flexShrink:0, border:`1px solid ${topic===t?"#6366f1":"rgba(255,255,255,0.08)"}`, background:topic===t?"rgba(99,102,241,0.15)":"transparent", color:topic===t?"#818cf8":"#71717a", fontSize:11, fontWeight:500, cursor:"pointer", whiteSpace:"nowrap" }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Company — scrollable on mobile */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, color:"#71717a", marginBottom:5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Company</div>
          <div className="filter-scroll" style={{ display:"flex", gap:6 }}>
            {COMPANIES.map(c => (
              <button key={c} onClick={()=>{ setCompany(c); setPage(1) }}
                style={{ padding:"4px 10px", borderRadius:7, flexShrink:0, border:`1px solid ${company===c?"#6366f1":"rgba(255,255,255,0.08)"}`, background:company===c?"rgba(99,102,241,0.15)":"transparent", color:company===c?"#818cf8":"#71717a", fontSize:11, fontWeight:500, cursor:"pointer", whiteSpace:"nowrap" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
          <span style={{ fontSize:12, color:"#71717a" }}>
            <span style={{ color:"#fff", fontWeight:600 }}>{filtered.length}</span> problems
          </span>
          {hasFilters && (
            <button onClick={reset} style={{ fontSize:12, color:"#818cf8", background:"none", border:"none", cursor:"pointer" }}>
              Clear filters ✕
            </button>
          )}
        </div>
      </div>

      {/* Table — responsive */}
      <div style={{ border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
        {/* Header — hide columns on mobile */}
        {!isMobile && (
          <div style={{ display:"grid", gridTemplateColumns:"48px 1fr 90px 110px 130px 52px", padding:"10px 16px", background:"#18181b", borderBottom:"1px solid rgba(255,255,255,0.07)", gap:8 }}>
            {["#","Title","Difficulty","Topic","Companies","LC"].map(h => (
              <div key={h} style={{ fontSize:10, fontWeight:700, color:"#71717a", textTransform:"uppercase", letterSpacing:"0.06em", textAlign: h==="LC"?"center":"left" }}>{h}</div>
            ))}
          </div>
        )}

        {paginated.length === 0 ? (
          <div style={{ padding:"40px", textAlign:"center", color:"#52525b", fontSize:13 }}>No problems match these filters.</div>
        ) : (
          paginated.map((p, i) => {
            const isSolved = solved.includes(p.id)
            return (
              <motion.div key={p.id} className="coding-row"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: i*0.015 }}
                style={{
                  display:"grid",
                  gridTemplateColumns: isMobile ? "36px 1fr 68px 40px" : "48px 1fr 90px 110px 130px 52px",
                  padding: isMobile ? "12px 12px" : "12px 16px",
                  borderBottom:"1px solid rgba(255,255,255,0.04)",
                  background: i%2===0?"transparent":"rgba(255,255,255,0.01)",
                  alignItems:"center", gap:8, transition:"background 0.15s",
                }}>
                {/* # */}
                <div style={{ fontSize:11, color:isSolved?"#4ade80":"#52525b", fontWeight:600 }}>
                  {isSolved ? "✓" : p.id}
                </div>

                {/* Title */}
                <div style={{ fontSize:isMobile?12:13, fontWeight:600, color:isSolved?"#4ade80":"#e4e4e7", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {p.title}
                </div>

                {/* Difficulty */}
                <div><DiffBadge d={p.difficulty} /></div>

                {/* Topic — hidden on mobile */}
                {!isMobile && (
                  <div style={{ fontSize:11, color:"#a1a1aa", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.topic}</div>
                )}

                {/* Companies — hidden on mobile */}
                {!isMobile && (
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {p.companies.slice(0,2).map(c => (
                      <span key={c} style={{ fontSize:10, padding:"1px 6px", borderRadius:5, background:"rgba(255,255,255,0.05)", color:"#71717a" }}>{c}</span>
                    ))}
                    {p.companies.length > 2 && <span style={{ fontSize:10, color:"#52525b" }}>+{p.companies.length-2}</span>}
                  </div>
                )}

                {/* LC icon */}
                <div style={{ display:"flex", justifyContent:"center" }}>
                  <a href={p.leetcode_link} target="_blank" rel="noopener noreferrer"
                    aria-label={`Open ${p.title} on LeetCode`}
                    title={`Open on LeetCode`}
                    onClick={e => e.stopPropagation()}
                    style={{ display:"flex", alignItems:"center", justifyContent:"center", width:30, height:30, borderRadius:7, background:"rgba(255,161,22,0.08)", border:"1px solid rgba(255,161,22,0.2)", textDecoration:"none", transition:"all 0.2s" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,161,22,0.2)"}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,161,22,0.08)"}}>
                    <LCIcon />
                  </a>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:20, flexWrap:"wrap" }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
            style={{ padding:"7px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:page===1?"#3f3f46":"#a1a1aa", cursor:page===1?"not-allowed":"pointer", fontSize:13 }}>
            ← Prev
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pg = i + 1
            if (totalPages > 5) pg = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i))
            return (
              <button key={pg} onClick={()=>setPage(pg)}
                style={{ width:34, height:34, borderRadius:8, border:`1px solid ${page===pg?"#6366f1":"rgba(255,255,255,0.08)"}`, background:page===pg?"rgba(99,102,241,0.15)":"transparent", color:page===pg?"#818cf8":"#71717a", fontSize:13, fontWeight:page===pg?700:400, cursor:"pointer" }}>
                {pg}
              </button>
            )
          })}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
            style={{ padding:"7px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:page===totalPages?"#3f3f46":"#a1a1aa", cursor:page===totalPages?"not-allowed":"pointer", fontSize:13 }}>
            Next →
          </button>
        </div>
      )}

      {/* LeetCode notice */}
      <div style={{ marginTop:20, padding:"12px 16px", borderRadius:10, background:"rgba(255,161,22,0.06)", border:"1px solid rgba(255,161,22,0.15)", display:"flex", alignItems:"center", gap:10 }}>
        <LCIcon />
        <p style={{ fontSize:12, color:"#a1a1aa", margin:0, lineHeight:1.6 }}>
          Tap the <span style={{ color:"#FFA116", fontWeight:600 }}>orange icon</span> on any row to open it on LeetCode.
          Solved problems are tracked here with a green ✓.
        </p>
      </div>
    </div>
  )
}