"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
  })
}
{/* TECH STACK SHOWCASE */}
<section style={{ padding: "60px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
  <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
    <p style={{ fontSize: 13, color: "#52525b", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Powered by industry-standard technology</p>
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
      {[
        { name: "Next.js",     color: "#fff"    },
        { name: "Supabase",    color: "#3ecf8e" },
        { name: "OpenAI",      color: "#74aa9c" },
        { name: "Tailwind",    color: "#38bdf8" },
        { name: "TypeScript",  color: "#3178c6" },
        { name: "Framer",      color: "#ff4d9e" },
        { name: "Monaco",      color: "#007acc" },
        { name: "Vercel",      color: "#fff"    },
      ].map((t) => (
        <div key={t.name} style={{ fontSize: 13, fontWeight: 600, color: t.color, opacity: 0.6, letterSpacing: "0.02em" }}>
          {t.name}
        </div>
      ))}
    </div>
  </div>
</section>

const FEATURES = [
  { icon: "📄", title: "ATS Resume Checker",     desc: "Upload your resume and get an ATS score out of 100 with section-wise breakdown, missing keywords and specific improvement tips." },
  { icon: "🤖", title: "AI Mock Interviews",      desc: "Practice HR, technical and DSA rounds with an AI interviewer. Voice or text. Get instant per-answer feedback and a full report." },
  { icon: "🎙️", title: "Voice Interview Mode",    desc: "Speak your answers naturally. Your voice is transcribed live, analysed by AI, and saved for your feedback report." },
  { icon: "💻", title: "Coding Practice",         desc: "Solve DSA problems in a real code editor with auto-evaluation. Problems tagged by company — TCS, Amazon, Google and more." },
  { icon: "🏢", title: "Company-wise Prep",       desc: "Dedicated prep tracks for TCS, Infosys, Wipro, Amazon, Flipkart, Google, Microsoft. HR questions, topics, and patterns." },
  { icon: "📚", title: "Placement Resources",     desc: "Curated study material — DSA roadmap, HR question bank, aptitude shortcuts, system design guides, and placement tips." },
]

const FLOW = [
  { n: "01", icon: "📤", title: "Upload your resume",    body: "PDF or DOCX. We extract and analyse it instantly."   },
  { n: "02", icon: "📊", title: "Get your ATS score",    body: "See exactly what recruiters see — and how to fix it." },
  { n: "03", icon: "🎤", title: "Practice interviews",   body: "AI asks questions based on your resume and target role." },
  { n: "04", icon: "📈", title: "Track improvement",     body: "Watch your scores improve with every session."         },
]

const COMPANIES = [
  { name: "TCS",       emoji: "🔵", type: "Mass Recruiter"  },
  { name: "Infosys",   emoji: "🟣", type: "Mass Recruiter"  },
  { name: "Wipro",     emoji: "🟡", type: "Mass Recruiter"  },
  { name: "Amazon",    emoji: "🟠", type: "Product Company" },
  { name: "Flipkart",  emoji: "🔷", type: "Product Company" },
  { name: "Swiggy",    emoji: "🟧", type: "Product Company" },
  { name: "Google",    emoji: "🔴", type: "FAANG"           },
  { name: "Microsoft", emoji: "🟦", type: "FAANG"           },
  { name: "Meta",      emoji: "🔵", type: "FAANG"           },
]

const STATS = [
  { num: "500+",  label: "Coding problems"    },
  { num: "1000+", label: "Interview questions" },
  { num: "9+",    label: "Company tracks"     },
  { num: "100%",  label: "Free forever"       },
]


export default function HomePage() {
  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh", color: "#fafafa", fontFamily: "'Inter',sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 1000, height: 700, background: "radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="badge badge-brand" style={{ marginBottom: 28, display: "inline-flex" }}>
              🎓 Built for B.Tech final year students · 100% Free
            </span>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24 }}>
            <span style={{ color: "#fff" }}>Turn your resume</span>
            <br />
            <span style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              into a job offer.
            </span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            style={{ fontSize: 19, color: "#a1a1aa", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.75 }}>
            AI-powered resume analysis, voice mock interviews, coding practice and company-specific prep — everything you need for campus placements, completely free.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px", borderRadius: 14 }}>
              Get started free →
            </Link>
            <Link href="/resume" className="btn-secondary" style={{ fontSize: 16, padding: "14px 32px", borderRadius: 14 }}>
              Check your ATS score
            </Link>
          </motion.div>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={4}
            style={{ marginTop: 18, fontSize: 13, color: "#52525b" }}>
            No credit card · No install · Works on mobile
          </motion.p>
        </div>

        {/* HERO MOCKUP */}
        <motion.div initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
          style={{ maxWidth: 960, margin: "72px auto 0", padding: "0 24px" }}>
          <div style={{ background: "#111113", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.12)" }}>
            {/* chrome bar */}
            <div style={{ background: "#18181b", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#22c55e" }} />
             <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center" }}>
  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1" }} />
  </div>
  <span style={{ fontSize: 12, color: "#52525b", fontFamily: "monospace" }}>resume2role.app/resume</span>
</div>
            </div>
            {/* content */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>
              {/* left — ATS score */}
              <div style={{ padding: 32, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>ATS Analysis</div>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", border: "4px solid #6366f1", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <span style={{ fontSize: 24, fontWeight: 900, color: "#818cf8" }}>78</span>
                    <span style={{ fontSize: 10, color: "#71717a" }}>/100</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Good Score</div>
                    <div style={{ fontSize: 12, color: "#a1a1aa" }}>3 improvements found</div>
                  </div>
                </div>
                {[
                  { label: "Skills section",   score: 18, max: 20 },
                  { label: "Projects",          score: 17, max: 20 },
                  { label: "Education",         score: 19, max: 20 },
                  { label: "Summary",           score: 6,  max: 10 },
                ].map((s) => (
                  <div key={s.label} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "#a1a1aa" }}>{s.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#818cf8" }}>{s.score}/{s.max}</span>
                    </div>
                    <div style={{ height: 4, background: "#27272a", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${(s.score/s.max)*100}%`, background: "linear-gradient(to right,#6366f1,#8b5cf6)", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* right — interview */}
              <div style={{ padding: 32, background: "#0d0d0f" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <img src="/logo.jpeg" alt="Resume2Role" style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>AI Interviewer</div>
                    <div style={{ fontSize: 11, color: "#52525b" }}>HR Round · Amazon</div>
                  </div>
                  <span className="badge badge-success" style={{ marginLeft: "auto", fontSize: 11 }}>● Live</span>
                </div>
                {[
                  { role: "ai",   text: "Tell me about yourself and your key projects." },
                  { role: "user", text: "I'm a final year CSE student. I built a ML-based attendance system using OpenCV..." },
                  { role: "ai",   text: "Great! What was the biggest technical challenge you faced?" },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    <div style={{
                      maxWidth: "85%", padding: "9px 13px", fontSize: 12, lineHeight: 1.55, color: "#d4d4d8",
                      borderRadius: m.role === "ai" ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
                      background: m.role === "ai" ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${m.role === "ai" ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.08)"}`,
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 36, borderRadius: 8, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 12px" }}>
                    <span style={{ fontSize: 12, color: "#52525b" }}>🎙️ Listening...</span>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>▶</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ padding: "44px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#818cf8", letterSpacing: "-0.02em" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#71717a", marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 14 }}>What you get</div>
            <h2 style={{ fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Everything for campus placements.<br />
              <span style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Nothing to pay.
              </span>
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} className="card" custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 14 }}>How it works</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              From resume to{" "}
              <span style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                interview-ready
              </span>
              {" "}in minutes.
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40 }}>
            {FLOW.map((s, i) => (
              <motion.div key={s.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 42, fontWeight: 900, color: "rgba(99,102,241,0.2)", lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="section-label" style={{ marginBottom: 14 }}>Company tracks</div>
            <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 48 }}>
              Prep for the companies<br />that visit your campus
            </h2>
          </motion.div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {COMPANIES.map((c, i) => (
              <motion.div key={c.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.5)" }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 12, background: "#1c1c1f", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.2s" }}>
                <span style={{ fontSize: 22 }}>{c.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#71717a" }}>{c.type}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: "rgba(99,102,241,0.04)", borderTop: "1px solid rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(30px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Your placement season<br />starts now.
          </h2>
          <p style={{ fontSize: 17, color: "#a1a1aa", marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of B.Tech students who are preparing smarter with Resume2Role.
          </p>
          <Link href="/register" className="btn-primary" style={{ fontSize: 17, padding: "15px 38px", borderRadius: 14 }}>
            Create free account →
          </Link>
          <p style={{ marginTop: 14, fontSize: 13, color: "#52525b" }}>100% free · No credit card · Takes 30 seconds</p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "36px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎯</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Resume2Role</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["About", "Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}>
                {l}
              </a>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#52525b" }}>Built for B.Tech students · 100% free · © 2026</span>
        </div>
      </footer>

    </div>
  )
}