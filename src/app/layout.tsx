import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/shared/Navbar"

export const metadata: Metadata = {
  title: { default: "Resume2Role — Your AI-Powered Career Bridge", template: "%s | Resume2Role" },
  description: "AI-powered resume analysis, mock interviews, coding practice and company-wise prep for B.Tech students. 100% free.",
  icons: {
    icon:  "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title:       "Resume2Role — Your AI-Powered Career Bridge",
    description: "AI mock interviews, ATS resume checker, coding practice for B.Tech students.",
    images:      ["/logo.jpeg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
      </head>
      <body style={{ background: "#0a0a0c", color: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ paddingTop: 64 }}>
          {children}
        </main>
      </body>
    </html>
  )
}