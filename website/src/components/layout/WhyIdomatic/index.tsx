"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Terminal, Zap, Code } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveGrid from "@/components/ui/InteractiveGrid";

const features = [
  {
    icon: CheckCircle,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    title: "Semantic, readable IDs",
    description: "Names come from context — aria-label, name, text or tag — so you get button-submit-login, not a random hash.",
  },
  {
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    title: "Idempotent & test-ready",
    description: "Re-runs never rename or duplicate existing IDs, so diffs stay clean and your Playwright & Cypress selectors stay stable.",
  },
  {
    icon: Code,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    title: "Framework-aware",
    description: "React, HTML, Vue and Angular — JSX/TSX is rewritten through a real AST, not string hacks.",
  },
  {
    icon: Terminal,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    title: "One command, safe by default",
    description: "Run npx idomatic scan. Preview every change with --dry before you write.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const WhyIdomatic = () => {
  return (
    <section className="py-24 px-6 bg-zinc-950 overflow-hidden relative">
      {/* Interactive grid background */}
      <InteractiveGrid />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Why use idomatic?
          </h2>
          <p className="text-zinc-400 text-lg">
            Speed up your test automation and maintain clean markup with zero
            effort.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full bg-zinc-900/50 border ${feature.borderColor} backdrop-blur-sm relative overflow-hidden group hover:border-opacity-50 transition-colors`}>
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <CardHeader className="relative z-10">
                    <motion.div
                      className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3 border ${feature.borderColor}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </motion.div>
                    <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 text-zinc-400">
                    {feature.description}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyIdomatic;
