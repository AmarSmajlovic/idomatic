import Link from "next/link";
import { Github, BookOpen, Mail, Package2, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Project Info */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">idomatic</h4>
          <p className="text-sm">
            Built with ❤️ by Amar Smajlovic.
            <br />
            Open-source under the MIT License.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="https://github.com/AmarSmajlovic/idomatic"
                target="_blank"
                className="hover:underline flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://www.npmjs.com/package/@idomatic/core"
                target="_blank"
                className="hover:underline flex items-center gap-2"
              >
                <Package2 className="w-4 h-4" /> NPM Package
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="hover:underline flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Documentation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">
            Get in touch
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:hey@idomatic.dev"
                className="hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> hey@idomatic.dev
              </a>
            </li>
          </ul>
        </div>

        {/* Support / Donate */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.buymeacoffee.com/amarjs"
                target="_blank"
                className="hover:underline flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-pink-400" /> Buy me a
                coffee
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} idomatic. All rights reserved.
      </div>
    </footer>
  );
}
