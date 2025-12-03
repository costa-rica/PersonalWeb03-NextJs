"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface BlogEntry {
  id: string
  title: string
  description?: string
  image?: string
}

export default function BlogSection() {
  const [blogEntries, setBlogEntries] = useState<BlogEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
          console.log("[v0] NEXT_PUBLIC_API_BASE_URL not set")
          setError(true)
          setLoading(false)
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`)
        if (response.ok) {
          const data = await response.json()
          setBlogEntries(data.slice(0, 3)) // Get last 3 entries
        } else {
          setError(true)
        }
      } catch (err) {
        console.log("[v0] API not available yet:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogEntries()
  }, [])

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return blogEntries

    const query = searchQuery.toLowerCase()
    return blogEntries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query) ||
        (entry.description && entry.description.toLowerCase().includes(query)),
    )
  }, [blogEntries, searchQuery])

  return (
    <section id="blog" className="h-screen py-12 px-6">
      <div className="h-full border-2 border-black rounded-3xl bg-white flex flex-col overflow-hidden">
        {/* Header with search */}
        <div className="p-8 border-b-2 border-black">
          <h2 className="text-3xl font-bold font-mono mb-6 text-black">blog</h2>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 border-black rounded-xl font-mono bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Scrollable blog entries */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="text-center text-gray-600 font-mono">loading...</div>
          ) : error ? (
            <div className="text-center text-gray-600 font-mono space-y-2">
              <p>⚠️ API not connected</p>
              <p className="text-sm">Set NEXT_PUBLIC_API_BASE_URL in your environment variables</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center text-gray-600 font-mono">
              {searchQuery ? "no posts found" : "no blog posts yet"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/blog/${entry.id}`}
                  className="block border-2 border-black rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-mono mb-2 text-black">{entry.title}</h3>
                      {entry.description && <p className="text-gray-700 leading-relaxed">{entry.description}</p>}
                    </div>

                    {/* Image */}
                    {entry.image && (
                      <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden border-2 border-black flex-shrink-0">
                        <Image
                          src={entry.image || "/placeholder.svg"}
                          alt={entry.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
