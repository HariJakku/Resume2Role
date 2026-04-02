"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Mode = "login" | "forgot" | "forgot-otp" | "reset"

export default function LoginPage() {
  const router = useRouter()
  const [mode,     setMode]     = useState<Mode>("login")
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [newPass,  setNewPass]  = useState("")
  const [otp,      setOtp]      = useState("")
  const [error,    setError]    = useState("")
  const [success,  setSuccess]  = useState("")
  const [loading,  setLoading]  = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  function startResendTimer() {
    setResendTimer(30)
    const interval = setInterval(() => {
      setResendTimer(t => { if (t <= 1) { clearInterval(interval); return 0 } return t - 1 })
    }, 1000)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push("/dashboard")
  }

  async function handleForgotPassword(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true); setError(""); setSuccess("")

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: undefined,
  })

  setLoading(false)
  if (error) { setError(error.message); return }

  setSuccess(`OTP sent to ${email}. Check your inbox.`)
  setMode("forgot-otp")
  startResendTimer()
}

  async function handleVerifyResetOtp(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) { setError("Enter the 6-digit OTP"); return }
    setLoading(true); setError("")

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type:  "recovery",
    })

    setLoading(false)
    if (error) { setError(error.message); return }
    setMode("reset")
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPass.length < 6) { setError("Password must be at least 6 characters"); return }
    setLoading(true); setError("")

    const { error } = await supabase.auth.updateUser({ password: newPass })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess("Password updated! Redirecting...")
    setTimeout(() => router.push("/dashboard"), 1500)
  }

  async function handleResendOtp() {
    if (resendTimer > 0) return
    setLoading(true); setError(""); setSuccess("")
    await supabase.auth.resetPasswordForEmail(email)
    setLoading(false)
    setSuccess("OTP resent!")
    startResendTimer()
  }

  const goBack = () => { setMode("login"); setError(""); setSuccess(""); setOtp("") }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#0a0a0c" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 420, position: "relative" }}>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>Resume2Role</span>
          </Link>

          <AnimatePresence mode="wait">
            {mode === "login" && (
              <motion.div key="login-h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Welcome back</h1>
                <p style={{ fontSize: 14, color: "#71717a" }}>Sign in to continue your prep</p>
              </motion.div>
            )}
            {mode === "forgot" && (
              <motion.div key="forgot-h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🔑</div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Forgot password?</h1>
                <p style={{ fontSize: 14, color: "#71717a" }}>Enter your email to receive an OTP</p>
              </motion.div>
            )}
            {mode === "forgot-otp" && (
              <motion.div key="fotp-h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📧</div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Check your email</h1>
                <p style={{ fontSize: 14, color: "#71717a" }}>Enter the OTP sent to</p>
                <p style={{ fontSize: 14, color: "#818cf8", fontWeight: 600 }}>{email}</p>
              </motion.div>
            )}
            {mode === "reset" && (
              <motion.div key="reset-h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Set new password</h1>
                <p style={{ fontSize: 14, color: "#71717a" }}>Choose a strong password</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <AnimatePresence mode="wait">

            {/* LOGIN */}
            {mode === "login" && (
              <motion.form key="login-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleLogin}>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Email</label>
                  <input className="input" type="email" placeholder="you@college.edu"
                    value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Password</label>
                  <input className="input" type="password" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div style={{ textAlign: "right", marginBottom: 24 }}>
                  <button type="button" onClick={() => { setMode("forgot"); setError(""); setSuccess("") }}
                    style={{ fontSize: 13, color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
                    Forgot password?
                  </button>
                </div>
                {error && <ErrorBox msg={error} />}
                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 12, fontSize: 15 }}>
                  {loading ? "Signing in..." : "Sign in →"}
                </button>
              </motion.form>
            )}

            {/* FORGOT PASSWORD — enter email */}
            {mode === "forgot" && (
              <motion.form key="forgot-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleForgotPassword}>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Email address</label>
                  <input className="input" type="email" placeholder="name@gmail.com"
                    value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
                </div>
                {error && <ErrorBox msg={error} />}
                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 12, fontSize: 15, marginBottom: 14 }}>
                  {loading ? "Sending OTP..." : "Send OTP →"}
                </button>
                <button type="button" onClick={goBack} className="btn-ghost"
                  style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>
                  ← Back to login
                </button>
              </motion.form>
            )}

            {/* FORGOT OTP — verify */}
            {mode === "forgot-otp" && (
              <motion.form key="fotp-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleVerifyResetOtp}>
                {success && <SuccessBox msg={success} />}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 10 }}>Enter 6-digit OTP</label>
                  <input className="input" type="text" inputMode="numeric" maxLength={6}
                    placeholder="000000" value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.3em", textAlign: "center" }}
                    required autoFocus />
                  <p style={{ fontSize: 12, color: "#71717a", marginTop: 8, textAlign: "center" }}>OTP expires in 10 minutes</p>
                </div>
                {error && <ErrorBox msg={error} />}
                <button type="submit" className="btn-primary" disabled={loading || otp.length !== 6}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 12, fontSize: 15, marginBottom: 14 }}>
                  {loading ? "Verifying..." : "Verify OTP →"}
                </button>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button type="button" onClick={() => setMode("forgot")} className="btn-ghost" style={{ fontSize: 13 }}>← Back</button>
                  <button type="button" onClick={handleResendOtp} disabled={resendTimer > 0}
                    style={{ fontSize: 13, color: resendTimer > 0 ? "#52525b" : "#818cf8", background: "none", border: "none", cursor: resendTimer > 0 ? "not-allowed" : "pointer" }}>
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </motion.form>
            )}

            {/* RESET PASSWORD */}
            {mode === "reset" && (
              <motion.form key="reset-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleResetPassword}>
                {success && <SuccessBox msg={success} />}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>New password</label>
                  <input className="input" type="password" placeholder="Min. 6 characters"
                    value={newPass} onChange={e => setNewPass(e.target.value)} required autoFocus />
                </div>
                {error && <ErrorBox msg={error} />}
                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 12, fontSize: 15 }}>
                  {loading ? "Updating..." : "Update password →"}
                </button>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#71717a" }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 500 }}>Create one free</Link>
        </p>
      </motion.div>
    </div>
  )
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#f87171" }}>{msg}</div>
  )
}
function SuccessBox({ msg }: { msg: string }) {
  return (
    <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", fontSize: 13, color: "#4ade80" }}>{msg}</div>
  )
}