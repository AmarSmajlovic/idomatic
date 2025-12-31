"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveGrid from "@/components/ui/InteractiveGrid";
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiAstro,
  SiHandlebarsdotjs,
  SiSolid
} from "react-icons/si";

const supportedItems = [
  { name: "JavaScript / JSX / TSX", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React & React Native", icon: SiReact, color: "#61DAFB" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
];

const comingSoonItems = [
  { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
  { name: "Astro", icon: SiAstro, color: "#FF5D01" },
  { name: "Handlebars", icon: SiHandlebarsdotjs, color: "#f0772b" },
  { name: "SolidJS", icon: SiSolid, color: "#2C4F7C" },
];

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const WhatItSupport = () => {
  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-800 overflow-hidden relative">
      {/* Interactive grid background */}
      <InteractiveGrid />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">What it supports</h2>
          <p className="text-zinc-400 text-lg">
            IDomatic is built for the modern frontend ecosystem — with more
            support on the way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Currently Supported */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-zinc-900/50 border-2 border-green-500/30 h-full relative overflow-hidden backdrop-blur-sm">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />

                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl flex items-center gap-3 text-white">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.4)",
                          "0 0 0 10px rgba(34, 197, 94, 0)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="text-green-400 w-5 h-5" />
                    </motion.div>
                    Currently Supported
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.ul
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {supportedItems.map((item, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-green-500/20 hover:border-green-500/40 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                        <span className="text-zinc-200 font-medium">{item.name}</span>
                        <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-zinc-900/50 border-2 border-yellow-500/30 h-full relative overflow-hidden backdrop-blur-sm">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent" />

                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl flex items-center gap-3 text-white">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <Sparkles className="text-yellow-400 w-5 h-5" />
                    </motion.div>
                    Coming Soon
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.ul
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {comingSoonItems.map((item, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                        <span className="text-zinc-200 font-medium">{item.name}</span>
                        <motion.div
                          className="ml-auto px-2 py-0.5 bg-yellow-500/20 rounded-full text-xs text-yellow-400 font-medium border border-yellow-500/30"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Soon
                        </motion.div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatItSupport;
