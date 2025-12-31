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
    title: "Auto-detects missing IDs",
    description: "Scans your project and smartly inserts IDs where needed, saving time and effort.",
  },
  {
    icon: Terminal,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    title: "Zero-config CLI",
    description: "Just run one command — no setup or config files required.",
  },
  {
    icon: Code,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    title: "Framework-agnostic",
    description: "Supports multiple frontend frameworks: HTML, JSX, Vue, and Angular templates.",
  },
  {
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    title: "Test-friendly IDs",
    description: "Adds readable and reliable IDs optimized for automated tests.",
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
