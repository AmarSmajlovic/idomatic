"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [{ label: "Docs", href: "/docs" }];

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/85 backdrop-blur"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group">
          <motion.span
            className="text-white text-xl font-semibold tracking-tight flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              className="text-red-600 inline-block"
              animate={{
                textShadow: [
                  "0 0 0px rgba(220, 38, 38, 0)",
                  "0 0 8px rgba(220, 38, 38, 0.5)",
                  "0 0 0px rgba(220, 38, 38, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              #
            </motion.span>
            IDomatic
          </motion.span>
        </Link>

        {/* Right Side Nav + GitHub */}
        <div className="flex items-center space-x-6">
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Link
              href="https://github.com/AmarSmajlovic/idomatic"
              target="_blank"
              className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white transition-colors group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Github suppressHydrationWarning className="w-5 h-5" />
              </motion.div>
              <span className="relative">
                GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
