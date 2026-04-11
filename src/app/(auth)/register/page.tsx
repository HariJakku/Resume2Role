"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8)           score++
  if (pw.length >= 12)          score++
  if (/[A-Z]/.test(pw))         score++
  if (/[0-9]/.test(pw))         score++
  if (/[^A-Za-z0-9]/.test(pw))  score++
  if (score <= 1) return { score, label: "Weak",   color: "#f87171" }
  if (score <= 3) return { score, label: "Medium", color: "#fbbf24" }
  return                        { score, label: "Strong", color: "#4ade80" }
}

export default function RegisterPage() {
  const router = useRouter()

  // ── Form fields ───────────────────────────────────────────
  const [fullName,  setFullName]  = useState("")
  const [email,     setEmail]     = useState("")
  const [college,   setCollege]   = useState("")
  const [branch,    setBranch]    = useState("")
  const [gradYear,  setGradYear]  = useState("")
  const [password,  setPassword]  = useState("")
  const [confirm,   setConfirm]   = useState("")
  const [showPw,    setShowPw]    = useState(false)
  const [consent,   setConsent]   = useState(false)

  // ── UI state ──────────────────────────────────────────────
  const [step,      setStep]      = useState<"form" | "otp">("form")
  const [otp,       setOtp]       = useState("")
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState("")
  const [fieldErrs, setFieldErrs] = useState<Record<string, string>>({})

  const pwStrength = passwordStrength(password)

  // ── Validation ────────────────────────────────────────────
  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!fullName.trim())      errs.fullName  = "Full name is required"
    if (!email.trim())         errs.email     = "Email is required"
    if (!college.trim())       errs.college   = "College name is required"
    if (!branch.trim())        errs.branch    = "Branch is required"
    if (!gradYear.trim())      errs.gradYear  = "Graduation year is required"
    else if (
      isNaN(Number(gradYear)) ||
      Number(gradYear) < 2020 ||
      Number(gradYear) > 2035
    )                          errs.gradYear  = "Enter a valid year e.g. 2026"
    if (password.length < 6)   errs.password  = "Password must be at least 6 characters"
    if (password !== confirm)  errs.confirm   = "Passwords do not match"
    if (!consent)              errs.consent   = "You must agree to the Terms of Service"
    setFieldErrs(errs)
    return Object.keys(errs).length === 0
  }

  // ── Submit registration ───────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name:       fullName.trim(),
          college:         college.trim(),
          branch:          branch.trim(),
          graduation_year: Number(gradYear),
        },
      },
    })

    setLoading(false)
    if (error) { setError(error.message); return }
    setStep("otp")
  }

  // ── Verify OTP ────────────────────────────────────────────
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type:  "signup",
    })

    setLoading(false)
    if (error) { setError(error.message); return }
    router.push("/dashboard")
  }

  // ── Shared styles ─────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width:        "100%",
    padding:      "10px 14px",
    borderRadius: 10,
    background:   "#27272a",
    border:       "1px solid rgba(255,255,255,0.1)",
    color:        "#fff",
    fontSize:     14,
    outline:      "none",
    fontFamily:   "inherit",
  }
  const labelStyle: React.CSSProperties = {
    display:      "block",
    fontSize:     13,
    fontWeight:   600,
    color:        "#a1a1aa",
    marginBottom: 6,
  }
  const errStyle: React.CSSProperties = {
    fontSize:   12,
    color:      "#f87171",
    marginTop:  4,
  }
  const fieldWrap: React.CSSProperties = {
    marginBottom: 16,
  }

  // ─────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight:       "100vh",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      padding:         "32px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: 460 }}>

        {/* ── Logo + heading ── */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img
            src="/icon-512.png"
            alt="Resume2Role"
            style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", marginBottom: 12 }}
          />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
            {step === "form" ? "Create your account" : "Verify your email"}
          </h1>
          <p style={{ fontSize: 13, color: "#71717a" }}>
            {step === "form"
              ? "Free forever — no credit card required"
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* ── Card ── */}
        <div style={{
          background:   "#18181b",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding:      "28px 28px",
        }}>

          {/* Error banner */}
          {error && (
            <div style={{
              marginBottom: 16,
              padding:      "10px 14px",
              borderRadius: 8,
              background:   "rgba(239,68,68,0.1)",
              border:       "1px solid rgba(239,68,68,0.2)",
              fontSize:     13,
              color:        "#f87171",
            }}>
              {error}
            </div>
          )}

          {/* ════════════════════════════════
              STEP 1 — Registration form
          ════════════════════════════════ */}
          {step === "form" && (
            <form onSubmit={handleSubmit} noValidate>

              {/* Full name */}
              <div style={fieldWrap}>
                <label htmlFor="full_name" style={labelStyle}>Full name *</label>
                <input
                  id="full_name"
                  type="text"
                  required
                  placeholder="e.g. Hari Jakku "
                  autoComplete="name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={inputStyle}
                />
                {fieldErrs.fullName && <p style={errStyle}>{fieldErrs.fullName}</p>}
              </div>

              {/* Email */}
              <div style={fieldWrap}>
                <label htmlFor="reg-email" style={labelStyle}>Email address *</label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                />
                {fieldErrs.email && <p style={errStyle}>{fieldErrs.email}</p>}
              </div>

              {/* College */}
              <div style={fieldWrap}>
                <label htmlFor="college" style={labelStyle}>College / University *</label>
                <input
                  id="college"
                  type="text"
                  required
                  placeholder="e.g. SRGEC, Gudlavalleru"
                  autoComplete="organization"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  style={inputStyle}
                />
                {fieldErrs.college && <p style={errStyle}>{fieldErrs.college}</p>}
              </div>

              {/* Branch + Graduation year — side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

                {/* Branch */}
                <div>
                  <label htmlFor="branch" style={labelStyle}>Branch *</label>
                  <input
                    id="branch"
                    type="text"
                    required
                    placeholder="e.g. CSE, IT, ECE"
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    style={inputStyle}
                  />
                  {fieldErrs.branch && <p style={errStyle}>{fieldErrs.branch}</p>}
                </div>

                {/* Graduation year */}
                <div>
                  <label htmlFor="grad_year" style={labelStyle}>Graduation Year *</label>
                  <input
                    id="grad_year"
                    type="text"
                    inputMode="numeric"
                    required
                    maxLength={4}
                    placeholder="e.g. 2026"
                    value={gradYear}
                    onChange={e => setGradYear(e.target.value.replace(/\D/g, ""))}
                    style={inputStyle}
                  />
                  {fieldErrs.gradYear && <p style={errStyle}>{fieldErrs.gradYear}</p>}
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 6 }}>
                <label htmlFor="reg-password" style={labelStyle}>Password *</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="reg-password"
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    style={{
                      position:  "absolute",
                      right:     12,
                      top:       "50%",
                      transform: "translateY(-50%)",
                      background:"none",
                      border:    "none",
                      cursor:    "pointer",
                      fontSize:  16,
                      color:     "#71717a",
                    }}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Strength meter */}
                {password.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} style={{
                          flex:       1,
                          height:     3,
                          borderRadius: 2,
                          background: n <= pwStrength.score ? pwStrength.color : "#27272a",
                          transition: "background 0.2s",
                        }} />
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: pwStrength.color }}>
                      {pwStrength.label} password
                    </p>
                  </div>
                )}
                {fieldErrs.password && <p style={errStyle}>{fieldErrs.password}</p>}
              </div>

              {/* Confirm password */}
              <div style={{ ...fieldWrap, marginTop: 12 }}>
                <label htmlFor="confirm-password" style={labelStyle}>Confirm password *</label>
                <input
                  id="confirm-password"
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  style={inputStyle}
                />
                {confirm.length > 0 && confirm !== password && (
                  <p style={errStyle}>Passwords do not match</p>
                )}
                {confirm.length > 0 && confirm === password && password.length >= 6 && (
                  <p style={{ fontSize: 11, color: "#4ade80", marginTop: 4 }}>✓ Passwords match</p>
                )}
                {fieldErrs.confirm && <p style={errStyle}>{fieldErrs.confirm}</p>}
              </div>

              {/* Consent checkbox */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 4 }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  style={{ marginTop: 3, accentColor: "#6366f1", flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: "#71717a", lineHeight: 1.6 }}>
                  I agree to Resume2Role's{" "}
                  <Link href="/terms"   target="_blank" style={{ color: "#818cf8", textDecoration: "underline" }}>
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" target="_blank" style={{ color: "#818cf8", textDecoration: "underline" }}>
                    Privacy Policy
                  </Link>.
                  I understand my resume will be processed by AI.
                </span>
              </label>
              {fieldErrs.consent && (
                <p style={{ ...errStyle, marginBottom: 10 }}>{fieldErrs.consent}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !consent}
                style={{
                  width:        "100%",
                  padding:      "12px",
                  borderRadius: 10,
                  marginTop:    16,
                  background:   !consent || loading
                    ? "#27272a"
                    : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  border:       "none",
                  color:        !consent || loading ? "#52525b" : "#fff",
                  fontSize:     15,
                  fontWeight:   700,
                  cursor:       !consent || loading ? "not-allowed" : "pointer",
                  transition:   "all 0.2s",
                }}>
                {loading ? "Creating account..." : "Create account — OTP will be sent →"}
              </button>
            </form>
          )}

          {/* ════════════════════════════════
              STEP 2 — OTP verification
          ════════════════════════════════ */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>

              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>📬</div>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7 }}>
                  Verification code sent to<br />
                  <strong style={{ color: "#fff" }}>{email}</strong>
                </p>
                <p style={{ fontSize: 12, color: "#52525b", marginTop: 6 }}>
                  Check your inbox and spam folder. Expires in 10 minutes.
                </p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label htmlFor="otp-input" style={labelStyle}>Enter 6-digit code</label>
                <input
                  id="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoFocus
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="1 2 3 4 5 6"
                  style={{
                    ...inputStyle,
                    letterSpacing: "0.4em",
                    fontSize:      22,
                    textAlign:     "center",
                    fontWeight:    700,
                  }}
                />
                <p style={{ fontSize: 11, color: "#52525b", marginTop: 6 }}>
                  {otp.length}/6 digits entered
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                style={{
                  width:        "100%",
                  padding:      "12px",
                  borderRadius: 10,
                  background:   otp.length === 6
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : "#27272a",
                  border:       "none",
                  color:        otp.length === 6 ? "#fff" : "#52525b",
                  fontSize:     15,
                  fontWeight:   700,
                  cursor:       otp.length === 6 ? "pointer" : "not-allowed",
                }}>
                {loading ? "Verifying..." : "Verify & go to dashboard →"}
              </button>

              <button
                type="button"
                onClick={() => { setStep("form"); setOtp(""); setError("") }}
                style={{
                  width:        "100%",
                  padding:      "10px",
                  borderRadius: 10,
                  marginTop:    10,
                  background:   "transparent",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  color:        "#71717a",
                  fontSize:     13,
                  cursor:       "pointer",
                }}>
                ← Change email address
              </button>
            </form>
          )}
        </div>

        {/* Sign in link */}
        {step === "form" && (
          <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#71717a" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>
              Sign in →
            </Link>
          </p>
        )}

      </div>
    </div>
  )
}