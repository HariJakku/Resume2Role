"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { HR_QUESTIONS, SYSTEM_DESIGN_QUESTIONS } from "@/lib/data/prep"
import { CODING_PROBLEMS } from "@/lib/data/problems"

const COMPANY_DATA: Record<string, any> = {
  tcs: {
    name: "TCS", emoji: "🔵", color: "#3b82f6", tier: "Mass Recruiter",
    rounds: ["Aptitude Test (NQT)", "Technical Interview", "Managerial Round", "HR Round"],
    topics: ["Data Structures", "OOP Concepts", "DBMS", "OS Basics", "Networking", "C/C++/Java Basics"],
    tips: [
      "Focus heavily on aptitude — verbal, quant, and logical reasoning all tested in NQT",
      "Technical round focuses on OOP, DBMS, and basic DS — not advanced algorithms",
      "Be confident in explaining your final year project in detail",
      "HR round tests communication — speak clearly and use structured answers",
    ],
    hrQuestions: ["hr1", "hr2", "hr3", "hr4", "hr5"],
  },
  infosys: {
    name: "Infosys", emoji: "🟣", color: "#8b5cf6", tier: "Mass Recruiter",
    rounds: ["InfyTQ / Hackwithinfy", "Technical Interview", "HR Round"],
    topics: ["Python / Java", "Data Structures", "DBMS", "Puzzles & Reasoning", "Algorithms"],
    tips: [
      "InfyTQ certification gives direct fast-track interview invite — complete it",
      "Hackwithinfy is competitive — practice medium level DSA problems",
      "Technical interview focuses on one programming language in depth",
      "Prepare 2-3 project explanations with tech stack details",
    ],
    hrQuestions: ["hr1", "hr2", "hr4", "hr5"],
  },
  wipro: {
    name: "Wipro", emoji: "🟡", color: "#eab308", tier: "Mass Recruiter",
    rounds: ["NLTH Online Test", "Technical Interview", "HR Round"],
    topics: ["Aptitude", "Coding (Easy level)", "DBMS", "OOP", "OS"],
    tips: [
      "NLTH has essay writing section — practice writing 300 words on general topics",
      "Coding section has 2 easy problems — arrays and strings usually",
      "Technical interview is conversational — know your resume projects well",
      "ELITE vs TURBO stream — TURBO requires higher coding scores",
    ],
    hrQuestions: ["hr1", "hr3", "hr4", "hr5"],
  },
  amazon: {
    name: "Amazon", emoji: "🟠", color: "#f97316", tier: "Product Company",
    rounds: ["Online Assessment (2 DSA)", "Phone Screen", "Loop Interviews (4-5)", "Bar Raiser"],
    topics: ["Arrays", "Trees", "Dynamic Programming", "System Design", "Leadership Principles"],
    tips: [
      "Every interview at Amazon tests Leadership Principles — know all 16 by heart",
      "Use STAR method for all behavioural questions — Situation, Task, Action, Result",
      "DSA problems are medium to hard level — practice LeetCode medium daily",
      "Bar Raiser interview is the toughest — they decide if you raise the bar",
      "Customer obsession and ownership are the most frequently tested LPs",
    ],
    hrQuestions: ["hr1", "hr2", "hr3", "hr4", "hr5"],
  },
  flipkart: {
    name: "Flipkart", emoji: "🔷", color: "#06b6d4", tier: "Product Company",
    rounds: ["Machine Coding Round", "DSA Round", "System Design", "HR Round"],
    topics: ["Arrays", "Graphs", "LLD", "HLD", "OOP Design"],
    tips: [
      "Machine coding round is 90 minutes — practice building small systems from scratch",
      "LLD (Low Level Design) is very important — practice design patterns",
      "DSA round has 2-3 medium-hard problems",
      "System design for freshers is simpler — focus on basic components",
    ],
    hrQuestions: ["hr1", "hr2", "hr4"],
  },
  google: {
    name: "Google", emoji: "🔴", color: "#ef4444", tier: "FAANG",
    rounds: ["Phone Screen (1-2)", "Onsite / Virtual Onsite (4-5)", "Hiring Committee"],
    topics: ["Algorithms", "Data Structures", "Dynamic Programming", "Graphs", "System Design", "Googliness"],
    tips: [
      "Google cares about how you think — talk through your approach out loud always",
      "Practice writing clean code on a whiteboard or Google Docs (no IDE)",
      "Time and space complexity is asked for every solution — always analyze it",
      "Googliness round tests culture fit — be collaborative and humble",
      "Solve 200+ LeetCode problems — focus on medium and hard",
    ],
    hrQuestions: ["hr1", "hr2", "hr3", "hr4", "hr5"],
  },
  microsoft: {
    name: "Microsoft", emoji: "🟦", color: "#0ea5e9", tier: "FAANG",
    rounds: ["Online Assessment", "Technical Interviews (3-4)", "As-App Interview"],
    topics: ["Data Structures", "Algorithms", "OOP", "System Design", "Behavioural"],
    tips: [
      "Microsoft focuses on problem-solving clarity — explain approach before coding",
      "As-App (as appropriate) interview is with a senior — tests overall fit",
      "OOP design questions are common — practice real-world class designs",
      "Growth mindset is a core Microsoft value — show how you learn from failure",
    ],
    hrQuestions: ["hr1", "hr2", "hr3", "hr5"],
  },
  meta: {
    name: "Meta", emoji: "🔵", color: "#6366f1", tier: "FAANG",
    rounds: ["Recruiter Screen", "Technical Phone Screen", "Onsite (Coding + Design + Behavioural)"],
    topics: ["Algorithms", "Data Structures", "System Design", "Behavioural (Meta values)"],
    tips: [
      "Meta moves extremely fast — entire process in 2-3 weeks usually",
      "Coding interviews are strict on time — practice speed along with correctness",
      "Move fast and be bold — core Meta values to demonstrate in behavioural",
      "System design for freshers focuses on Instagram feed / Facebook newsfeed type problems",
    ],
    hrQuestions: ["hr1", "hr2", "hr4", "hr5"],
  },
  swiggy: {
    name: "Swiggy", emoji: "🟧", color: "#f59e0b", tier: "Product Company",
    rounds: ["Online Test", "Technical Interview (2)", "System Design", "HR"],
    topics: ["DSA", "LLD", "Product thinking", "Microservices basics"],
    tips: [
      "Swiggy values product thinking — understand delivery platform tech challenges",
      "LLD is important — practice designing order management systems",
      "DSA focus on arrays, graphs and trees",
    ],
    hrQuestions: ["hr1", "hr3", "hr4"],
  },
  startup: {
    name: "Startups", emoji: "🚀", color: "#10b981", tier: "Startup",
    rounds: ["Technical Assignment", "Technical Discussion", "Culture Fit"],
    topics: ["Full-stack basics", "REST APIs", "Database design", "System thinking"],
    tips: [
      "Startups care about what you can build — have a strong GitHub portfolio",
      "Be honest about what you know and don't know — they value learning ability",
      "Show initiative — describe projects you built beyond coursework",
      "Understand the startup's product before the interview — ask smart questions",
    ],
    hrQuestions: ["hr1", "hr2", "hr5"],
  },
}

export default function CompanyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const router   = useRouter()
  const company  = COMPANY_DATA[slug]
  const [tab, setTab] = useState<"overview"|"hr"|"coding"|"tips">("overview")
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login")
    })
  }, [router])

  if (!company) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: 18, color: "#fff", marginBottom: 16 }}>Company not found</div>
        <Link href="/company-prep" className="btn-primary">Back to companies</Link>
      </div>
    </div>
  )

  const hrQs     = HR_QUESTIONS.filter(q => company.hrQuestions.includes(q.id))
  const codingQs = CODING_PROBLEMS.filter(p => p.companies.includes(slug)).slice(0, 6)
  const tabs     = ["overview", "hr", "coding", "tips"] as const

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `${company.color}15`, border: `1px solid ${company.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{company.emoji}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{company.name}</h1>
              <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(255,255,255,0.06)", color: "#71717a" }}>{company.tier}</span>
            </div>
            <p style={{ fontSize: 14, color: "#71717a" }}>{company.rounds.length} interview rounds · {company.topics.length} key topics</p>
          </div>
          <Link href="/mock-interview" className="btn-primary" style={{ marginLeft: "auto", fontSize: 13 }}>
            Practice Interview →
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "10px 18px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: "none", color: tab === t ? "#fff" : "#71717a", borderBottom: `2px solid ${tab === t ? "#6366f1" : "transparent"}`, textTransform: "capitalize" }}>
              {t === "hr" ? "HR Questions" : t === "coding" ? "Coding Problems" : t}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>🎯 Interview Rounds</h3>
                {company.rounds.map((r: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${company.color}20`, border: `1px solid ${company.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: company.color, flexShrink: 0 }}>{i+1}</div>
                    <span style={{ fontSize: 14, color: "#d4d4d8" }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>📚 Key Topics to Prepare</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {company.topics.map((t: string) => (
                    <span key={t} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 8, background: `${company.color}12`, border: `1px solid ${company.color}25`, color: "#d4d4d8" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* HR QUESTIONS */}
        {tab === "hr" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>Common HR and behavioural questions asked at {company.name}. Click to see model answers.</p>
            {hrQs.map((q) => (
              <div key={q.id} style={{ marginBottom: 12, borderRadius: 14, border: `1px solid ${expanded === q.id ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)"}`, background: expanded === q.id ? "rgba(99,102,241,0.04)" : "#18181b", overflow: "hidden", transition: "all 0.2s" }}>
                <button onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                  style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", textAlign: "left" }}>{q.question}</span>
                  <span style={{ fontSize: 18, color: "#71717a", flexShrink: 0 }}>{expanded === q.id ? "−" : "+"}</span>
                </button>
                {expanded === q.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ padding: "0 20px 20px", fontSize: 14, color: "#a1a1aa", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, whiteSpace: "pre-wrap" }}>
                    {q.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* CODING */}
        {tab === "coding" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>Problems frequently asked at {company.name} — solve them with the code editor.</p>
            {codingQs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#52525b", fontSize: 14 }}>No tagged problems yet — check back soon</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {codingQs.map((p, i) => {
                  const dc = difficultyColor(p.difficulty)
                  return (
                    <Link key={p.id} href={`/coding/${p.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderRadius: 12, background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)")}>
                        <span style={{ fontSize: 13, color: "#52525b", minWidth: 20 }}>{i + 1}</span>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#e4e4e7" }}>{p.title}</span>
                        <div style={{ display: "flex", gap: 6 }}>
                          {p.topics.slice(0,2).map(t => <span key={t} style={{ fontSize: 11, padding: "2px 7px", borderRadius: 5, background: "rgba(255,255,255,0.04)", color: "#71717a" }}>{t}</span>)}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: dc.text, background: dc.bg, border: `1px solid ${dc.border}`, padding: "2px 10px", borderRadius: 99, textTransform: "capitalize" }}>{p.difficulty}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* TIPS */}
        {tab === "tips" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ marginBottom: 24, padding: "20px 24px", borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#818cf8", marginBottom: 14 }}>💡 Insider Tips for {company.name}</h3>
              {company.tips.map((tip: string, i: number) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <span style={{ color: "#818cf8", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.65 }}>{tip}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "20px 24px", borderRadius: 14, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>🎤 Practice Now</h3>
              <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 16 }}>Start an AI mock interview specifically for {company.name} to apply what you've learned.</p>
              <Link href={`/mock-interview?company=${slug}`} className="btn-primary" style={{ fontSize: 14 }}>
                Start {company.name} Mock Interview →
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function difficultyColor(d: string) {
  if (d === "easy")   return { text: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)"  }
  if (d === "medium") return { text: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)"  }
  return               { text: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" }
}