"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume", href: "/resume" },
  { label: "Interview", href: "/mock-interview" },
  { label: "Companies", href: "/company-prep" },
  { label: "Coding", href: "/coding" },
  { label: "Resources", href: "/resources" },
  { label: "Profile", href: "/profile" },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl bg-(--bg-primary)/80 border-(--border)">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3">
          <img src="/logo.jpeg" className="w-9 h-9 rounded-md border border-(--border)" />
          <div>
            <div className="font-semibold text-sm text-(--text-primary)">Resume2Role</div>
            <div className="text-[10px] text-(--text-tertiary)">AI CAREER PLATFORM</div>
          </div>
        </Link>

        {/* Nav */}
        {user && (
          <div className="flex gap-1">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition ${
                    active
                      ? "bg-indigo-500/10 text-(--text-primary)"
                      : "text-(--text-secondary) hover:text-(--text-primary)"
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold bg-linear-to-br from-indigo-500 to-purple-500"
              >
                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
              </Link>

              <button
                onClick={() => {
                  supabase.auth.signOut()
                  router.push("/")
                }}
                className="px-3 py-1.5 text-sm border border-(--border) rounded-md text-(--text-secondary) hover:text-(--text-primary)"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm border border-(--border) rounded-md text-(--text-secondary) hover:text-(--text-primary)"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="px-4 py-1.5 text-sm rounded-md text-white bg-linear-to-r from-indigo-500 to-purple-500"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}