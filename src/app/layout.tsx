import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/shared/Navbar"

export const metadata: Metadata = {
  title: { default: "Resume2Role — Your AI-Powered Career Bridge", template: "%s | Resume2Role" },
  description: "AI-powered resume analysis, mock interviews, coding practice and company-wise prep.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/logo.jpeg" />
      </head>

      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}