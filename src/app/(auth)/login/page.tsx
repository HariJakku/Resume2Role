// ═══════════════════════════════════════════════════════════
// FILE 1: src/app/not-found.tsx  — Custom 404 page
// ═══════════════════════════════════════════════════════════
// "use client"
// import Link from "next/link"
//
// export default function NotFound() {
//   return (
//     <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: "0 24px", textAlign: "center" }}>
//       <div style={{ fontSize: 72, marginBottom: 8 }}>🔍</div>
//       <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>Page not found</h1>
//       <p style={{ fontSize: 15, color: "#71717a", maxWidth: 400 }}>The page you're looking for doesn't exist or has been moved.</p>
//       <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
//         <Link href="/dashboard" style={{ padding: "10px 22px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
//           Go to dashboard
//         </Link>
//         <Link href="/" style={{ padding: "10px 22px", borderRadius: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", textDecoration: "none", fontSize: 14 }}>
//           Home
//         </Link>
//       </div>
//     </div>
//   )
// }

// ═══════════════════════════════════════════════════════════
// FILE 2: src/app/layout.tsx  — Root layout with full metadata
// ═══════════════════════════════════════════════════════════
// import type { Metadata } from "next"
// import "./globals.css"
// import Navbar from "@/components/shared/Navbar"
//
// export const metadata: Metadata = {
//   title: { default: "Resume2Role — AI-Powered Campus Placement Platform", template: "%s | Resume2Role" },
//   description: "Free AI-powered resume ATS checker, mock interviews with voice, 100 DSA problems, and company-wise prep for B.Tech campus placements.",
//   keywords: ["campus placement", "mock interview", "ATS resume checker", "DSA practice", "TCS prep", "Amazon interview", "B.Tech placement"],
//   authors: [{ name: "Resume2Role" }],
//   creator: "Resume2Role",
//   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://resume2role.vercel.app"),
//   icons: {
//     icon: "/logo.jpg",
//     apple: "/logo.jpg",
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: process.env.NEXT_PUBLIC_APP_URL,
//     siteName: "Resume2Role",
//     title: "Resume2Role — AI-Powered Campus Placement Platform",
//     description: "Free AI mock interviews, ATS resume scoring, 100 DSA problems, and company-specific prep for B.Tech students.",
//     images: [{ url: "/logo.jpg", width: 512, height: 512, alt: "Resume2Role" }],
//   },
//   twitter: {
//     card: "summary",
//     title: "Resume2Role — AI Placement Prep",
//     description: "Free AI mock interviews and ATS resume checker for B.Tech students.",
//     images: ["/logo.jpg"],
//   },
//   robots: { index: true, follow: true },
// }
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/logo.jpg" type="image/jpeg" sizes="any" />
//         <meta name="theme-color" content="#4f46e5" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
//       </head>
//       <body style={{ background: "#0a0a0c", color: "#fafafa", minHeight: "100vh" }}>
//         <Navbar />
//         <main style={{ paddingTop: 58 }}>
//           {children}
//         </main>
//       </body>
//     </html>
//   )
// }

// ═══════════════════════════════════════════════════════════
// FILE 3: src/app/(auth)/login/page.tsx  — Improved login
// ═══════════════════════════════════════════════════════════
"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router   = useRouter()
  const [mode,     setMode]    = useState<"login"|"forgot"|"otp">("login")
  const [email,    setEmail]   = useState("")
  const [otp,      setOtp]     = useState("")
  const [showPwd,  setShowPwd] = useState(false)
  const [loading,  setLoading] = useState(false)
  const [error,    setError]   = useState("")
  const [success,  setSuccess] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    const formData = new FormData(e.target as HTMLFormElement)
    const emailVal = formData.get("email") as string
    const passVal  = formData.get("password") as string

    const { error } = await supabase.auth.signInWithPassword({ email: emailVal, password: passVal })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push("/dashboard")
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess(`Password reset OTP sent to ${email}`)
    setMode("otp")
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "recovery" })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push("/dashboard")
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10, background: "#27272a",
    border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none",
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/icon-192.png" alt="Resume2Role" style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover", marginBottom: 12 }} />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
            {mode === "login" ? "Welcome back" : mode === "forgot" ? "Reset password" : "Enter OTP"}
          </h1>
          <p style={{ fontSize: 13, color: "#71717a" }}>
            {mode === "login" ? "Sign in to your Resume2Role account" :
             mode === "forgot" ? "Enter your email and we'll send an OTP" :
             `6-digit code sent to ${email}`}
          </p>
        </div>

        <div style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 28px" }}>
          {error && (
            <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#f87171" }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", fontSize: 13, color: "#4ade80" }}>
              {success}
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 14 }}>
                <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Email address</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 6 }}>
                <label htmlFor="password" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input id="password" name="password" type={showPwd ? "text" : "password"} required
                    placeholder="Your password" autoComplete="current-password"
                    style={{ ...inputStyle, paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#71717a" }}>
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input type="checkbox" name="remember" style={{ accentColor: "#6366f1" }} />
                  <span style={{ fontSize: 12, color: "#71717a" }}>Remember me</span>
                </label>
                <button type="button" onClick={() => { setMode("forgot"); setError("") }}
                  style={{ fontSize: 12, color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
                  Forgot password?
                </button>
              </div>
              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: 10, background: loading ? "#27272a" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: loading ? "#52525b" : "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Signing in..." : "Sign in →"}
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgot}>
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="forgot-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Email address</label>
                <input id="forgot-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" style={inputStyle} />
              </div>
              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
                {loading ? "Sending..." : "Send reset OTP →"}
              </button>
              <button type="button" onClick={() => setMode("login")}
                style={{ width: "100%", padding: "10px", borderRadius: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#71717a", fontSize: 14, cursor: "pointer" }}>
                ← Back to login
              </button>
            </form>
          )}

          {mode === "otp" && (
            <form onSubmit={handleOtp}>
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="otp" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>6-digit OTP</label>
                <input id="otp" type="text" inputMode="numeric" maxLength={6} required value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g,""))}
                  placeholder="123456" style={{ ...inputStyle, letterSpacing: "0.3em", fontSize: 20, textAlign: "center" }} />
                <p style={{ fontSize: 11, color: "#52525b", marginTop: 6 }}>Check your inbox and spam folder. OTP expires in 10 minutes.</p>
              </div>
              <button type="submit" disabled={loading || otp.length !== 6}
                style={{ width: "100%", padding: "12px", borderRadius: 10, background: otp.length === 6 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#27272a", border: "none", color: otp.length === 6 ? "#fff" : "#52525b", fontSize: 15, fontWeight: 700, cursor: otp.length === 6 ? "pointer" : "not-allowed", marginBottom: 12 }}>
                {loading ? "Verifying..." : "Verify OTP →"}
              </button>
              <button type="button" onClick={() => { setMode("forgot"); setError("") }}
                style={{ width: "100%", padding: "10px", borderRadius: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#71717a", fontSize: 14, cursor: "pointer" }}>
                ← Resend OTP
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#71717a" }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>Create one free →</Link>
        </p>
      </div>
    </div>
  )
}