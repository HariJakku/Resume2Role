"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

const NAV = [
  { label: "Dashboard",  href: "/dashboard"      },
  { label: "Resume",     href: "/resume"         },
  { label: "Interview",  href: "/mock-interview" },
  { label: "Companies",  href: "/company-prep"   },
  { label: "Coding",     href: "/coding"         },
  { label: "Resources",  href: "/resources"      },
  { label: "Profile",    href: "/profile"        },
]

export default function Navbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [user,  setUser]  = useState<any>(null)
  const [theme, setTheme] = useState<"dark"|"light">("dark")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark"|"light" || "dark"
    setTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
    // Update body background
    document.body.style.background = next === "light" ? "#f8fafc" : "#0a0a0c"
    document.body.style.color      = next === "light" ? "#0f172a" : "#fafafa"
  }

  const isDark = theme === "dark"

  return (
    <nav style={{
      position:       "fixed",
      top:            0,
      left:           0,
      right:          0,
      zIndex:         50,
      borderBottom:   `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
      background:     isDark ? "rgba(10,10,12,0.92)" : "rgba(248,250,252,0.92)",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo.jpeg" alt="Resume2Role" style={{ width: 38, height: 38, borderRadius: 8, objectFit: "cover", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: isDark ? "#fff" : "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>Resume2Role</div>
            <div style={{ fontSize: 9, color: isDark ? "#71717a" : "#94a3b8", letterSpacing: "0.05em", fontWeight: 500 }}>YOUR AI-POWERED CAREER BRIDGE</div>
          </div>
        </Link>

        {/* Nav links */}
        {user && (
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href)
              return (
                <Link key={n.href} href={n.href} style={{
                  padding:         "6px 11px",
                  borderRadius:    8,
                  fontSize:        13,
                  fontWeight:      500,
                  color:           active ? (isDark ? "#fff" : "#0f172a") : (isDark ? "#71717a" : "#64748b"),
                  background:      active ? (isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)") : "transparent",
                  textDecoration:  "none",
                  transition:      "all 0.15s",
                }}>
                  {n.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

          {/* Theme toggle */}
          <button onClick={toggleTheme}
            style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            {isDark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <Link href="/profile" style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", textDecoration: "none", border: "2px solid rgba(99,102,241,0.3)" }}>
                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
              </Link>
              <button onClick={() => { supabase.auth.signOut(); router.push("/") }}
                style={{ fontSize: 13, padding: "7px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, color: isDark ? "#a1a1aa" : "#64748b", cursor: "pointer" }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: 13, padding: "7px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, color: isDark ? "#a1a1aa" : "#64748b", textDecoration: "none" }}>
                Log in
              </Link>
              <Link href="/register" style={{ fontSize: 13, padding: "7px 16px", borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", textDecoration: "none", fontWeight: 600, boxShadow: "0 0 12px rgba(99,102,241,0.3)" }}>
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}