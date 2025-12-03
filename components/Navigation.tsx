"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
      <Link href="/" className="text-xl font-mono font-bold">
        nick.dev
      </Link>
      <div className="flex gap-6 font-mono text-sm">
        <Link href="#projects" className="hover:text-gray-600 transition-colors">
          projects
        </Link>
        <Link href="#resume" className="hover:text-gray-600 transition-colors">
          resume
        </Link>
        <Link href="#blog" className="hover:text-gray-600 transition-colors">
          blog
        </Link>
      </div>
    </nav>
  )
}
