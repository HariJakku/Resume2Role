"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const FEATURES = [
  { icon: "📄", title: "ATS Resume Checker", desc: "Upload your resume and get an AI-powered ATS score with section-by-section breakdown, missing keyword detection, and actionable improvement tips." },
  { icon: "🎤", title: "AI Mock Interviews", desc: "Practice with an AI interviewer using voice or text. Get real-time scoring per answer, strengths, improvements, and a full performance report." },
  { icon: "💻", title: "100 DSA Problems", desc: "Curated LeetCode problems tagged by company, difficulty, and topic. Click the orange icon to open directly on LeetCode." },
  { icon: "🏢", title: "Company-Wise Prep", desc: "Dedicated tracks for TCS, Infosys, Wipro, Amazon, Google, Flipkart and more — with rounds, tips, HR questions and model answers." },
  { icon: "🎯", title: "JD Matcher", desc: "Paste any job description to see how well your resume matches it. Get match percentage, missing keywords, and skill gap analysis." },
  { icon: "📚", title: "Resources Hub", desc: "DSA notes, HR answers, aptitude questions, and system design guides — everything organized by topic with expandable Q&A." },
]

const STATS = [
  { val: "100",   label: "DSA Problems",     icon: "💻" },
  { val: "10+",   label: "Company Tracks",   icon: "🏢" },
  { val: "5",     label: "Interview Types",  icon: "🎤" },
  { val: "100%",  label: "Free Forever",     icon: "🆓" },
]

const FAQS = [
  { q: "Is Resume2Role completely free?", a: "Yes. Every feature — AI mock interviews, ATS analysis, coding problems, company prep — is free with no hidden paywalls or credit limits." },
  { q: "What file formats does the resume checker support?", a: "We support PDF and DOCX files up to 5MB. For best results, use a text-based PDF (not a scanned image)." },
  { q: "How does the AI mock interview work?", a: "You select an interview type (HR, Technical, DSA, Behavioural, or System Design), a target company, and your role. The AI asks 8 questions personalized to your resume, evaluates each answer in real time, and generates a full report at the end." },
  { q: "Does voice input work on mobile?", a: "Yes. Voice transcription uses the Web Speech API which is supported in Google Chrome on both desktop and Android. For best results, use Chrome browser." },
  { q: "How are my resume files handled?", a: "Your resume text is extracted server-side, analyzed by AI, and stored in your secure account database. The original file is not stored permanently. You can delete your data from your profile at any time." },
  { q: "Which companies' interview patterns are covered?", a: "We cover TCS, Infosys, Wipro, Accenture (service-based) and Amazon, Google, Microsoft, Flipkart, Swiggy, Meta (product-based) with dedicated preparation tracks." },
]

const TESTIMONIALS = [
  { name: "Lihan", college: "IIT Bombay", text: "The AI mock interview gave me feedback I never got from anyone — it pointed out I was too vague in every answer. Got placed at Amazon.", role: "Selected at Amazon" },
  { name: "Revanth Jakku", college: "GITAM, Vizag", text: "I uploaded my resume and the ATS score was only 52. After fixing the suggested keywords and formatting, it went to 78. Then I got shortlisted.", role: "Selected at Qualcomm" },
  { name: "Ghagan Kumar", college: "GMRIT Rajam", text: "The JD matcher is incredible. I tailored my resume for Infosys and the match went from 41% to 74%. Got a call the next week.", role: "Selected at Infosys" },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [year, setYear] = useState(2026)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div style={{ background: "#0a0a0c", color: "#fafafa", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.4 } 50% { opacity: 0.8 } }
        @keyframes spin { to { transform: rotate(360deg) } }
        .hero-glow { animation: pulse-glow 4s ease-in-out infinite }
        .float-card { animation: float 6s ease-in-out infinite }
        .float-card-2 { animation: float 6s ease-in-out infinite; animation-delay: 1s }
        .faq-btn:hover { background: rgba(99,102,241,0.08) !important }
        .feature-card:hover { border-color: rgba(99,102,241,0.4) !important; transform: translateY(-4px); background: rgba(99,102,241,0.04) !important }
        .feature-card { transition: all 0.2s }
        .stat-card:hover { transform: scale(1.04) }
        .stat-card { transition: transform 0.2s }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important }
          .hero-mockup { display: none !important }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important }
          .features-grid { grid-template-columns: 1fr !important }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important }
          .testimonial-grid { grid-template-columns: 1fr !important }
          .cta-buttons { flex-direction: column !important; align-items: stretch !important }
          .cta-buttons a { text-align: center !important }
          .hero-title { font-size: 32px !important }
          .hero-sub { font-size: 16px !important }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "80px 24px 64px", maxWidth: 1200, margin: "0 auto", overflow: "hidden" }}>
        {/* Background glow */}
        <div className="hero-glow" style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: 48, alignItems: "center" }}>
          {/* Left — copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", fontSize: 12, color: "#818cf8", fontWeight: 600, marginBottom: 20 }}>
                🎓 Free for B.Tech students · No signup required to explore
              </div>
              <h1 className="hero-title" style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20, color: "#fff" }}>
                Get placed at your<br />
                <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  dream company
                </span>
              </h1>
              <p className="hero-sub" style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}>
                AI-powered mock interviews, ATS resume scoring, 100 curated DSA problems, and company-specific prep — everything you need for campus placements, completely free.
              </p>
              <div className="cta-buttons" style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
                <Link href="/register" aria-label="Create free account and start preparing"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 32px rgba(99,102,241,0.4)" }}>
                  Start for free →
                </Link>
                <Link href="/login" aria-label="Login to existing account"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#a1a1aa", fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
                  Sign in
                </Link>
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {["No credit card", "No ads ever", "Works on mobile"].map(f => (
                  <span key={f} style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#4ade80", fontSize: 11 }}>✓</span> {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — mockup */}
          <div className="hero-mockup" style={{ position: "relative", height: 480 }}>
            {/* ATS Card */}
            <div className="float-card" style={{ position: "absolute", top: 0, right: 0, width: 280, background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20, boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#71717a", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>ATS Score</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: "4px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>74</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Good Resume</div>
                  <div style={{ fontSize: 11, color: "#71717a" }}>3 improvements found</div>
                </div>
              </div>
              {[["Skills", 85],["Projects", 72],["Keywords", 68]].map(([k,v]) => (
                <div key={k as string} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: "#a1a1aa" }}>{k}</span>
                    <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{v}%</span>
                  </div>
                  <div style={{ height: 4, background: "#27272a", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${v}%`, background: "linear-gradient(to right,#6366f1,#8b5cf6)", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Interview Card */}
            <div className="float-card-2" style={{ position: "absolute", bottom: 20, left: 0, width: 260, background: "#18181b", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: 18, boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}>
              <div style={{ fontSize: 11, color: "#71717a", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>AI Interviewer</div>
              <div style={{ fontSize: 13, color: "#c7d2fe", lineHeight: 1.5, marginBottom: 12, padding: "10px 12px", background: "rgba(99,102,241,0.08)", borderRadius: 8 }}>
                🤖 Tell me about a challenge you faced in your final year project and how you solved it.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🎙️</div>
                <div style={{ flex: 1, height: 6, background: "#27272a", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: "60%", height: "100%", background: "linear-gradient(to right,#4ade80,#22c55e)", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, color: "#4ade80", fontWeight: 600 }}>7/10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "0 24px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} className="stat-card"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "#71717a" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 12 }}>Everything you need to get placed</h2>
          <p style={{ fontSize: 16, color: "#71717a", maxWidth: 520, margin: "0 auto" }}>Six modules covering the complete campus placement lifecycle — from resume to offer letter.</p>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="feature-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 24px", cursor: "default" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>Students who got placed</h2>
          <p style={{ fontSize: 14, color: "#71717a" }}>Real experiences from students who used Resume2Role to prepare</p>
        </div>
        <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "24px 22px" }}>
              <div style={{ fontSize: 24, color: "#6366f1", marginBottom: 12, lineHeight: 1 }}>"</div>
              <p style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.7, marginBottom: 18 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#71717a" }}>{t.college}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "#4ade80", padding: "2px 8px", borderRadius: 99, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>Frequently asked questions</h2>
          <p style={{ fontSize: 14, color: "#71717a" }}>Everything you need to know before you start</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderRadius: 14, border: `1px solid ${openFaq === i ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`, overflow: "hidden", transition: "border-color 0.15s" }}>
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                style={{ width: "100%", padding: "16px 20px", background: openFaq === i ? "rgba(99,102,241,0.06)" : "#18181b", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, textAlign: "left" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: "#71717a", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#a1a1aa", lineHeight: 1.7, background: "rgba(99,102,241,0.03)" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "56px 40px", borderRadius: 24, background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14 }}>
            Ready to ace your placements?
          </h2>
          <p style={{ fontSize: 16, color: "#94a3b8", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Join students who are using Resume2Role to prepare smarter — and actually getting placed.
          </p>
          <div className="cta-buttons" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/register" aria-label="Create your free account"
              style={{ padding: "14px 32px", borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 32px rgba(99,102,241,0.4)" }}>
              Create free account
            </Link>
            <Link href="/coding" aria-label="Browse DSA problems without signing up"
              style={{ padding: "14px 28px", borderRadius: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#a1a1aa", fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
              Browse problems
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "48px 24px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/icon-192.png" alt="Resume2Role logo" width={32} height={32} style={{ borderRadius: 8, objectFit: "cover" }} />
              <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Resume2Role</span>
            </div>
            <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7, maxWidth: 280, marginBottom: 16 }}>
              AI-powered campus placement preparation platform for B.Tech students. Free forever.
            </p>
            <p style={{ fontSize: 12, color: "#52525b" }}>
              📧 <a href="mailto:support@resume2role.app" style={{ color: "#52525b", textDecoration: "none" }}>support@resume2role.app</a>
            </p>
          </div>

          {/* Platform */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Platform</div>
            {[["Resume Checker","/resume"],["Mock Interview","/mock-interview"],["Coding Practice","/coding"],["Company Prep","/company-prep"],["Resources","/resources"]].map(([label,href]) => (
              <Link key={href} href={href} style={{ display: "block", fontSize: 13, color: "#71717a", textDecoration: "none", marginBottom: 10, lineHeight: 1 }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Company</div>
            {[["About Us","/about"],["Contact","/contact"],["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([label,href]) => (
              <Link key={href} href={href} style={{ display: "block", fontSize: 13, color: "#71717a", textDecoration: "none", marginBottom: 10, lineHeight: 1 }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Built with */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Built with</div>
            {["Next.js 15","Supabase","GPT-4o-mini","Vercel","TypeScript"].map(t => (
              <div key={t} style={{ fontSize: 13, color: "#71717a", marginBottom: 10 }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#52525b" }}>
            © {year} Resume2Role. All rights reserved. Built for B.Tech students across India.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 12, color: "#52525b", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms"   style={{ fontSize: 12, color: "#52525b", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}