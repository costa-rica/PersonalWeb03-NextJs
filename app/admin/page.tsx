"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"

export default function AdminPage() {
  const router = useRouter()
  const token = useAppSelector((state) => state.user.token)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  // Show nothing while checking auth or redirecting
  if (!token) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl border-2 border-black p-12 flex items-center justify-center min-h-[400px]">
        <h1 className="text-3xl font-mono font-bold">Manage Blogs</h1>
      </div>
    </div>
  )
}
