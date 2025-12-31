"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Terminal, Sparkles, Github, Shield, Code, Zap } from "lucide-react";
import InteractiveGrid from "@/components/ui/InteractiveGrid";

export default function CTA() {
    return (
        <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-800 overflow-hidden relative">
            {/* Interactive grid background */}
            <InteractiveGrid />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Sparkles className="w-4 h-4" />
                        Ready to automate your IDs?
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        Stop adding IDs manually.
                        <br />
                        <span className="text-red-500">Start shipping faster.</span>
                    </h2>

                    <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                        Join developers who save hours every week by automating their ID attributes.
                        Get started in under a minute.
                    </p>

                    {/* Terminal command */}
                    <motion.div
                        className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-8"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Terminal className="w-5 h-5 text-green-400" />
                        <code className="text-white font-mono">npm init @idomatic</code>
                        <motion.button
                            className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-400 text-sm hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigator.clipboard.writeText('npm init @idomatic')}
                        >
                            Copy
                        </motion.button>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/docs#installation">
                            <Button className="bg-red-600 hover:bg-red-500 text-white text-lg px-8 py-6 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 group">
                                Get Started Now
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="https://github.com/AmarSmajlovic/idomatic" target="_blank">
                            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 text-lg px-8 py-6 h-auto bg-transparent">
                                <Github className="w-5 h-5 mr-2" />
                                View on GitHub
                            </Button>
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <motion.div
                        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-green-500" />
                            Open Source
                        </span>
                        <span className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            MIT License
                        </span>
                        <span className="flex items-center gap-2">
                            <Code className="w-4 h-4 text-purple-500" />
                            TypeScript Ready
                        </span>
                        <span className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            Zero Dependencies
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
