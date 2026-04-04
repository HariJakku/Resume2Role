"use client"

import { useParams } from "next/navigation"

export default function CodingDetailPage() {
  const { slug } = useParams()

  return (
    <div style={{ padding: 20, color: "white" }}>
      Problem: {slug}
    </div>
  )
}