"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const GithubIcon = dynamic(
  () => import("lucide-react").then((mod) => mod.Github),
  { ssr: false }
);

const navItems = [{ label: "Docs", href: "/docs" }];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-xl font-semibold tracking-tight"
        >
          <span className="text-red-600">#</span>IDomatic
        </Link>

        {/* Right Side Nav + GitHub */}
        <div className="flex items-center space-x-6">
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* GitHub CTA */}
          <Link
            href="https://github.com/your-org/idomatic"
            target="_blank"
            className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
