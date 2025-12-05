"use client";

import Link from "next/link";
import { useAppSelector } from "@/src/lib/hooks";

export default function Navigation() {
  const token = useAppSelector((state) => state.user.token);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
      <Link href="/" className="text-xl font-mono font-bold">
        nick.dev
      </Link>
      <div className="flex gap-6 font-mono text-sm">
        <Link
          href="#projects"
          className="hover:text-gray-600 transition-colors"
        >
          projects
        </Link>
        <Link href="#resume" className="hover:text-gray-600 transition-colors">
          resume
        </Link>
        <Link href="#blog" className="hover:text-gray-600 transition-colors">
          blog
        </Link>
        {token && (
          <Link
            href="/admin"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            admin
          </Link>
        )}
      </div>
    </nav>
  );
}
