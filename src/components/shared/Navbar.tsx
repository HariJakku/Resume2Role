"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

const NAV = [
  { label: "Dashboard",  href: "/dashboard",      icon: "🏠" },
  { label: "Resume",     href: "/resume",          icon: "📄" },
  { label: "Interview",  href: "/mock-interview",  icon: "🎤" },
  { label: "Companies",  href: "/company-prep",    icon: "🏢" },
  { label: "Coding",     href: "/coding",          icon: "💻" },
  { label: "Resources",  href: "/resources",       icon: "📚" },
  { label: "Profile",    href: "/profile",         icon: "👤" },
]

export default function Navbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [user,      setUser]      = useState<any>(null)
  const [theme,     setTheme]     = useState<"dark"|"light">("dark")
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark"|"light") || "dark"
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

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    document.body.setAttribute("data-theme", next)
    document.body.style.background = next === "light" ? "#f8fafc" : "#0a0a0c"
    document.body.style.color      = next === "light" ? "#0f172a" : "#fafafa"
    localStorage.setItem("theme", next)
  }

  const isDark = theme === "dark"
  const NAV_BG = isDark ? "rgba(10,10,12,0.96)" : "rgba(248,250,252,0.96)"
  const BORDER  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"
  const TEXT    = isDark ? "#fff" : "#0f172a"
  const MUTED   = isDark ? "#71717a" : "#64748b"

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: `1px solid ${BORDER}`,
        background: NAV_BG,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
            <img src="/logo.jpeg" alt="Resume2Role" style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 800, fontSize: 16, color: TEXT, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Resume2Role</span>
              <span style={{ fontSize: 8, color: MUTED, letterSpacing: "0.04em", fontWeight: 500, display: "none" }}
                className="tagline-desktop">YOUR AI-POWERED CAREER BRIDGE</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          {user && (
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}
              className="desktop-nav">
              {NAV.map((n) => {
                const active = pathname.startsWith(n.href)
                return (
                  <Link key={n.href} href={n.href} style={{
                    padding: "6px 10px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                    color:      active ? TEXT   : MUTED,
                    background: active ? (isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)") : "transparent",
                    textDecoration: "none", transition: "all 0.15s",
                  }}>
                    {n.label}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Theme toggle */}
            {/* <button onClick={toggleTheme}
              style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isDark ? "☀️" : "🌙"}
            </button> */}

            {user ? (
              <>
                {/* Avatar — desktop */}
                <Link href="/profile" style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", textDecoration: "none" }}
                  className="desktop-only">
                  {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                </Link>
                <button onClick={() => { supabase.auth.signOut(); router.push("/") }}
                  style={{ fontSize: 13, padding: "7px 12px", borderRadius: 8, background: "transparent", border: `1px solid ${BORDER}`, color: MUTED, cursor: "pointer" }}
                  className="desktop-only">
                  Out
                </button>
              </>
            ) : (
              <>
                {/* <Link href="/login" style={{ fontSize: 13, padding: "7px 12px", borderRadius: 8, background: "transparent", border: `1px solid ${BORDER}`, color: MUTED, textDecoration: "none" }}
                  className="desktop-only">
                  Log in
                </Link> */}
                <Link href="/login" style={{ fontSize: 13, padding: "7px 14px", borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                  Login
                </Link>
                <Link href="/register" style={{ fontSize: 13, padding: "7px 14px", borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                  New User?
                </Link>
              </>
            )}

            {/* Hamburger — mobile only */}
            {user && (
              <button onClick={() => setMenuOpen(o => !o)}
                style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}
                className="mobile-only">
                <div style={{ width: 18, height: 2, background: MUTED, borderRadius: 1, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
                <div style={{ width: 18, height: 2, background: MUTED, borderRadius: 1, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
                <div style={{ width: 18, height: 2, background: MUTED, borderRadius: 1, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && user && (
          <div style={{
            borderTop: `1px solid ${BORDER}`,
            background: NAV_BG,
            padding: "8px 0 16px",
          }}>
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href)
              return (
                <Link key={n.href} href={n.href}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", fontSize: 14, fontWeight: 500, color: active ? "#818cf8" : TEXT, background: active ? "rgba(99,102,241,0.08)" : "transparent", textDecoration: "none", borderLeft: active ? "3px solid #6366f1" : "3px solid transparent", transition: "all 0.15s" }}>
                  <span style={{ fontSize: 18 }}>{n.icon}</span>
                  {n.label}
                </Link>
              )
            })}
            <div style={{ margin: "12px 20px 0", paddingTop: 12, borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: MUTED }}>
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>
              <button onClick={() => { supabase.auth.signOut(); router.push("/"); setMenuOpen(false) }}
                style={{ fontSize: 13, color: "#f87171", background: "none", border: "none", cursor: "pointer" }}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom nav — mobile only, logged in */}
      {user && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          background: NAV_BG, borderTop: `1px solid ${BORDER}`,
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }} className="mobile-bottom-nav">
          {NAV.slice(0, 5).map((n) => {
            const active = pathname.startsWith(n.href)
            return (
              <Link key={n.href} href={n.href}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 0", textDecoration: "none", color: active ? "#818cf8" : MUTED, fontSize: 9, fontWeight: active ? 700 : 400, gap: 3, borderTop: active ? "2px solid #6366f1" : "2px solid transparent", transition: "all 0.15s" }}>
                <span style={{ fontSize: 20 }}>{n.icon}</span>
                {n.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 901px) {
          .desktop-nav    { display: flex !important; }
          .mobile-only    { display: none !important; }
          .desktop-only   { display: flex !important; }
          .mobile-bottom-nav { display: none !important; }
        }
        @media (max-width: 900px) {
          .desktop-nav    { display: none !important; }
          .mobile-only    { display: flex !important; }
          .desktop-only   { display: none !important; }
          .mobile-bottom-nav { display: grid !important; }
          main { padding-bottom: 70px !important; }
        }
      `}</style>
    </>
  )
}