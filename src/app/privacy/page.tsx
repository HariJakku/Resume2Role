"use client"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <Link href="/" style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}>← Back to home</Link>
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: "#71717a", marginBottom: 40 }}>Last updated: April 2026</p>

      {[
        {
          title: "1. Information We Collect",
          content: `When you register for Resume2Role, we collect:
• Name, email address, college name, and branch
• Resume text extracted from files you upload (PDF or DOCX)
• Interview session transcripts and answers
• Coding problem submission records
• Usage data such as pages visited and features used

We do not collect passwords — authentication uses OTP (one-time password) via email only.`,
        },
        {
          title: "2. How We Use Your Data",
          content: `We use your information to:
• Provide AI-powered ATS analysis and mock interview feedback
• Personalize interview questions based on your resume
• Track your progress across sessions
• Improve platform features and AI models (anonymized, aggregated)

We do not sell your personal data to any third party. Ever.`,
        },
        {
          title: "3. Resume File Handling",
          content: `When you upload a resume:
• The file is processed server-side to extract plain text
• The original file is NOT stored permanently on our servers
• Extracted text (max 10,000 characters) is saved to your secure account database
• You can delete your resume data at any time from your Profile page
• Resume text is sent to OpenRouter (GPT-4o-mini) for AI analysis — this is governed by OpenRouter's privacy policy`,
        },
        {
          title: "4. Third-Party Services",
          content: `Resume2Role uses the following third-party services:
• Supabase (supabase.com) — Database and authentication
• OpenRouter / OpenAI — AI language model for resume analysis and mock interviews
• Vercel — Hosting and content delivery

Each service has its own privacy policy. We recommend reviewing them if you have concerns.`,
        },
        {
          title: "5. Data Retention",
          content: `• Account data is retained until you delete your account
• Interview transcripts are retained indefinitely unless you delete them from your profile
• Resume text is retained until you upload a new resume or delete your account
• You can request complete data deletion by emailing support@resume2role.app`,
        },
        {
          title: "6. Data Security",
          content: `We implement industry-standard security measures:
• Row-Level Security (RLS) on all database tables — users can only access their own data
• HTTPS enforced on all connections
• API keys and secrets are never exposed to the browser
• Authentication via OTP — no password database to breach`,
        },
        {
          title: "7. Your Rights",
          content: `You have the right to:
• Access all data we hold about you
• Correct inaccurate data
• Request deletion of your data
• Export your data

To exercise any of these rights, email support@resume2role.app with subject "Data Request".`,
        },
        {
          title: "8. Cookies",
          content: `Resume2Role uses minimal cookies:
• Authentication session token (essential — cannot be disabled)
• Theme preference (localStorage, not a cookie)

We do not use advertising cookies or third-party tracking cookies.`,
        },
        {
          title: "9. Contact",
          content: `For privacy-related questions or data requests:
📧 support@resume2role.app

We aim to respond within 48 hours.`,
        },
      ].map((s) => (
        <div key={s.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{s.title}</h2>
          <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.8, whiteSpace: "pre-line", padding: "16px 20px", background: "#18181b", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)" }}>
            {s.content}
          </div>
        </div>
      ))}
    </div>
  )
}