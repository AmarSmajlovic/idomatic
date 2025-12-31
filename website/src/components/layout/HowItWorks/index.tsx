"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle, Terminal, Settings, Search } from "lucide-react";
import { TerminalBlock } from "@/components/ui/TerminalBlock";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Initialize",
    icon: Terminal,
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
    content: (
      <>
        <TerminalBlock command="npm init @idomatic" />
        <p className="text-sm mt-3 text-zinc-400">
          Choose your framework: React/JSX or HTML/Vue/Angular. A config
          file is generated.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "Customize config",
    icon: Settings,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
    content: (
      <>
        <CodeBlock
          code={`{
  "attributeName": "id",
  "prefix": "auto-id-",
  "excludeTags": ["html", "head"],
  "includeExtensions": ["html", "vue"]
}`}
        />
        <p className="text-sm mt-3 text-zinc-400">
          Adjust the rules in <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-red-400">.idomatic.config.json</code> to match
          your project structure.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "Scan your code",
    icon: Search,
    color: "from-green-500 to-emerald-500",
    borderColor: "border-green-500/30",
    content: (
      <>
        <TerminalBlock command="npx idomatic scan" className="mb-4" />
        <p className="text-sm mt-3 text-zinc-400">
          Run a full scan or preview which files will be modified using the{" "}
          <code className="bg-zinc-800 px-1.5 py-0.5 rounded font-semibold text-zinc-300">--dry</code> flag.
        </p>
      </>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-zinc-900 border-t border-zinc-800 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            How idomatic works
          </h2>
          <p className="text-zinc-400 text-lg">
            From install to improved markup — here&apos;s how simple it is.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-green-500/30" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`bg-zinc-900/80 border ${step.borderColor} h-full relative overflow-hidden backdrop-blur-sm`}>
                  {/* Gradient top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />

                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      {/* Step number badge */}
                      <motion.div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {step.number}
                      </motion.div>
                      <CardTitle className="text-lg text-white">{step.title}</CardTitle>
                    </div>
                    {index < steps.length - 1 && (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRightCircle className="w-5 h-5 text-zinc-600 hidden md:block" />
                      </motion.div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {step.content}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
