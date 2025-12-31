"use client";

import Link from "next/link";
import { Github, BookOpen, Mail, Package2 } from "lucide-react";
import BuyMeCoffeButton from "@/components/ui/BuyMeCoffeButton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Project Info */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-1">
            <span className="text-red-500">#</span>idomatic
          </h4>
          <p className="text-sm">
            Built with ❤️ by Amar Smajlovic.
            <br />
            Open-source under the MIT License.
          </p>
        </motion.div>

        {/* Useful Links */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white text-lg font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="https://github.com/AmarSmajlovic/idomatic"
                target="_blank"
                className="hover:text-white flex items-center gap-2 transition-colors group"
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Github className="w-4 h-4" />
                </motion.div>
                <span className="group-hover:translate-x-1 transition-transform">GitHub</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.npmjs.com/package/@idomatic/core"
                target="_blank"
                className="hover:text-white flex items-center gap-2 transition-colors group"
              >
                <Package2 className="w-4 h-4" />
                <span className="group-hover:translate-x-1 transition-transform">NPM Package</span>
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="hover:text-white flex items-center gap-2 transition-colors group"
              >
                <BookOpen className="w-4 h-4" />
                <span className="group-hover:translate-x-1 transition-transform">Documentation</span>
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white text-lg font-semibold mb-4">
            Get in touch
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:amarsmajlovic27@gmail.com"
                className="hover:text-white flex items-center gap-2 transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span className="group-hover:translate-x-1 transition-transform">amarsmajlovic27@gmail.com</span>
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Support / Donate */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <BuyMeCoffeButton />
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-10 text-center text-xs text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        © {new Date().getFullYear()} idomatic. All rights reserved.
      </motion.div>
    </footer>
  );
}
