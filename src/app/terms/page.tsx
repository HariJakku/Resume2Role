"use client"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <Link href="/" style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}>← Back to home</Link>
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ fontSize: 13, color: "#71717a", marginBottom: 40 }}>Last updated: April 2026</p>

      {[
        { title: "1. Acceptance of Terms", content: "By creating an account or using Resume2Role, you agree to these Terms of Service. If you do not agree, please do not use the platform." },
        { title: "2. Description of Service", content: "Resume2Role provides a free, AI-powered campus placement preparation platform including resume analysis, mock interviews, coding practice resources, and company-specific preparation materials. The service is provided free of charge." },
        { title: "3. User Accounts", content: "You must be 13 years or older to create an account. You are responsible for maintaining the confidentiality of your account. You agree to provide accurate information during registration. You may not share your account with others." },
        { title: "4. Acceptable Use", content: `You agree NOT to:
• Upload malicious files or attempt to harm the platform
• Attempt to access other users' data
• Use the AI features to generate harmful, discriminatory, or illegal content
• Scrape or bulk-download platform content
• Create multiple accounts to circumvent any limitations
• Use the platform for commercial purposes without written consent` },
        { title: "5. AI-Generated Content", content: "Resume2Role uses AI models (GPT-4o-mini via OpenRouter) to generate interview questions, analyze resumes, and provide feedback. AI output is provided for educational purposes only and does not constitute professional career advice. We do not guarantee accuracy of AI-generated content." },
        { title: "6. Intellectual Property", content: "The Resume2Role platform, branding, code, and content are owned by Resume2Role. You retain ownership of content you upload (resume files, interview answers). You grant Resume2Role a limited license to process your content for the purpose of providing the service." },
        { title: "7. Privacy", content: "Your use of Resume2Role is also governed by our Privacy Policy. By using the service, you consent to the data practices described in the Privacy Policy." },
        { title: "8. Disclaimer of Warranties", content: `Resume2Role is provided "as is" without warranties of any kind. We do not guarantee:
• That the service will be uninterrupted or error-free
• That AI analysis will be accurate for every resume or interview
• That using the platform will result in a job offer
• Availability of specific features at all times` },
        { title: "9. Limitation of Liability", content: "Resume2Role shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed INR 0 (as the service is free)." },
        { title: "10. Termination", content: "We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from your Profile page." },
        { title: "11. Changes to Terms", content: "We may update these Terms of Service from time to time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of material changes via email." },
        { title: "12. Contact", content: "Questions about these terms: support@resume2role.app" },
      ].map((s) => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.title}</h2>
          <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.8, whiteSpace: "pre-line", padding: "14px 18px", background: "#18181b", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)" }}>
            {s.content}
          </div>
        </div>
      ))}
    </div>
  )
}