"use client"
import Link from "next/link"
import { useState } from "react"

export default function AboutPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <Link href="/" style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}>← Back to home</Link>
      </div>

      {/* About */}
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>About Resume2Role</h1>
      <p style={{ fontSize: 15, color: "#a1a1aa", lineHeight: 1.8, marginBottom: 32, maxWidth: 660 }}>
        Resume2Role was built by engineering students who went through campus placements and felt the pain of fragmented, expensive preparation tools.
        We wanted one platform — free, AI-powered, and built specifically for Indian B.Tech students — that covers everything from resume to offer letter.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
        {[
          { icon: "🎯", title: "Mission", desc: "Make quality placement preparation accessible to every B.Tech student in India, regardless of college tier or financial background." },
          { icon: "🏗️", title: "Built by Students", desc: "Resume2Role was built as a final year B.Tech project at SRGEC, Gudlavalleru — designed from lived experience of campus placement struggles." },
          { icon: "🤖", title: "AI-First", desc: "Every feature is powered by large language models — not templates or rule-based systems. Real intelligence behind every score and suggestion." },
          { icon: "🔒", title: "Privacy First", desc: "No ads. No data selling. No tracking. Your resume and interview data is yours and yours alone, protected by row-level database security." },
        ].map(item => (
          <div key={item.title} style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Contact Us</h2>
        <p style={{ fontSize: 14, color: "#71717a", marginBottom: 32 }}>
          Questions, bug reports, feature requests, or just want to say hi? We read every message.
          <br />
          📧 Direct email: <a href="mailto:support@resume2role.app" style={{ color: "#818cf8", textDecoration: "none" }}>support@resume2role.app</a>
        </p>

        {sent ? (
          <div style={{ padding: "24px 28px", borderRadius: 14, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", fontSize: 15, color: "#4ade80", fontWeight: 600 }}>
            ✅ Message sent! We'll reply within 48 hours.
          </div>
        ) : (
          <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 28px" }}>
            {[
              { label: "Your name", key: "name", type: "text", placeholder: "Hari Kumar" },
              { label: "Email address", key: "email", type: "email", placeholder: "hari@example.com" },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 16 }}>
                <label htmlFor={field.key} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>{field.label}</label>
                <input
                  id={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(form as any)[field.key]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#27272a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none" }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="message" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Message</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#27272a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>
            <button
              onClick={() => { if (form.name && form.email && form.message) setSent(true) }}
              disabled={!form.name || !form.email || !form.message}
              style={{ padding: "11px 28px", borderRadius: 10, background: !form.name || !form.email || !form.message ? "#27272a" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: !form.name || !form.email || !form.message ? "#52525b" : "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Send message →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}