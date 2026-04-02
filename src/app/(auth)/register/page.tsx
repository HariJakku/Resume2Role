"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Step = "register" | "otp"

export default function RegisterPage() {
  const router = useRouter()
  const [step,    setStep]    = useState<Step>("register")
  const [form,    setForm]    = useState({ fullName: "", email: "", password: "", college: "", branch: "" })
  const [otp,     setOtp]     = useState("")
  const [error,   setError]   = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  function startResendTimer() {
    setResendTimer(30)
    const interval = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) { clearInterval(interval); return 0 }
        return t - 1
      })
    }, 1000)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return }
    setLoading(true); setError("")

    const { data, error } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options: {
        data:         { full_name: form.fullName, college: form.college, branch: form.branch },
        emailRedirectTo: undefined,
      }
    })

    if (error) { setError(error.message); setLoading(false); return }

    setLoading(false)
    setStep("otp")
    setSuccess(`OTP sent to ${form.email}`)
    startResendTimer()
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) { setError("Enter the 6-digit OTP"); return }
    setLoading(true); setError("")

    const { error } = await supabase.auth.verifyOtp({
      email: form.email,
      token: otp,
      type:  "signup",
    })

    if (error) { setError(error.message); setLoading(false); return }

    // Update profile with extra info
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("profiles").update({
        full_name: form.fullName,
        college:   form.college,
        branch:    form.branch,
      }).eq("id", user.id)
    }

    router.push("/dashboard")
  }

  async function handleResendOtp() {
    if (resendTimer > 0) return
    setLoading(true); setError(""); setSuccess("")

    const { error } = await supabase.auth.resend({
      type:  "signup",
      email: form.email,
    })

    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess("OTP resent successfully!")
    startResendTimer()
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#0a0a0c" }}>
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 460, position: "relative" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>Resume2Role</span>
          </Link>

          <AnimatePresence mode="wait">
            {step === "register" ? (
              <motion.div key="register-head" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>Create your account</h1>
                <p style={{ fontSize: 14, color: "#71717a" }}>Free forever · No credit card needed</p>
              </motion.div>
            ) : (
              <motion.div key="otp-head" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📧</div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>Check your email</h1>
                <p style={{ fontSize: 14, color: "#71717a" }}>We sent a 6-digit OTP to</p>
                <p style={{ fontSize: 14, color: "#818cf8", fontWeight: 600 }}>{form.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <AnimatePresence mode="wait">

            {/* STEP 1 — Register form */}
            {step === "register" && (
              <motion.form key="register-form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                onSubmit={handleRegister}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Full name</label>
                  <input className="input" type="text" placeholder="Enter Your Full Name(Ex: Hari Jakku)" value={form.fullName} onChange={set("fullName")} required />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Email address</label>
                  <input className="input" type="email" placeholder="you@college.edu" value={form.email} onChange={set("email")} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>College</label>
                    <input className="input" type="text" placeholder="(Ex: SRGEC)" value={form.college} onChange={set("college")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Branch</label>
                    <input className="input" type="text" placeholder="(Ex:CSE / IT)" value={form.branch} onChange={set("branch")} />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 7 }}>Password</label>
                  <input className="input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={set("password")} required />
                </div>

                {error && <ErrorBox msg={error} />}

                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 12, fontSize: 15 }}>
                  {loading ? "Sending OTP..." : "Continue →"}
                </button>
              </motion.form>
            )}

            {/* STEP 2 — OTP form */}
            {step === "otp" && (
              <motion.form key="otp-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}>

                {success && (
                  <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", fontSize: 13, color: "#4ade80" }}>
                    {success}
                  </div>
                )}

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#a1a1aa", marginBottom: 10 }}>Enter 6-digit OTP</label>
                  <input className="input" type="text" inputMode="numeric" maxLength={6}
                    placeholder="000000" value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.3em", textAlign: "center" }}
                    required autoFocus />
                  <p style={{ fontSize: 12, color: "#71717a", marginTop: 8, textAlign: "center" }}>
                    OTP expires in 10 minutes
                  </p>
                </div>

                {error && <ErrorBox msg={error} />}

                <button type="submit" className="btn-primary" disabled={loading || otp.length !== 6}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 12, fontSize: 15, marginBottom: 14 }}>
                  {loading ? "Verifying..." : "Verify & Create Account →"}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button type="button" onClick={() => { setStep("register"); setError(""); setOtp("") }}
                    className="btn-ghost" style={{ fontSize: 13, padding: "6px 0" }}>
                    ← Change email
                  </button>
                  <button type="button" onClick={handleResendOtp} disabled={resendTimer > 0 || loading}
                    style={{ fontSize: 13, color: resendTimer > 0 ? "#52525b" : "#818cf8", background: "none", border: "none", cursor: resendTimer > 0 ? "not-allowed" : "pointer", fontWeight: 500 }}>
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#71717a" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#f87171" }}>
      {msg}
    </div>
  )
}