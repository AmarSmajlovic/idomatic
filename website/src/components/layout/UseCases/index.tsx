"use client";

import { motion } from "framer-motion";
import { TestTube, Accessibility, Bug, Users, Workflow, Shield } from "lucide-react";
import InteractiveGrid from "@/components/ui/InteractiveGrid";

const useCases = [
    {
        icon: TestTube,
        title: "E2E Testing",
        description: "Stable selectors for Cypress, Playwright, and Selenium. No more flaky tests due to changing class names.",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        example: "cy.get('#login-btn').click()",
    },
    {
        icon: Accessibility,
        title: "Accessibility",
        description: "Proper IDs enable better screen reader navigation and ARIA label associations.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        example: "<label for=\"email-input\">",
    },
    {
        icon: Bug,
        title: "Debugging",
        description: "Quickly identify elements in DevTools. Meaningful IDs make debugging a breeze.",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        example: "document.querySelector('#error-msg')",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Consistent naming conventions across your codebase. Everyone speaks the same language.",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        example: "Standardized ID patterns",
    },
    {
        icon: Workflow,
        title: "CI/CD Integration",
        description: "Run idomatic in your pipeline to ensure all new components have proper IDs before merge.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/20",
        example: "npx idomatic scan --dry",
    },
    {
        icon: Shield,
        title: "Analytics & Tracking",
        description: "Reliable element identification for analytics tools and heatmap tracking.",
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20",
        example: "trackClick('#cta-button')",
    },
];

export default function UseCases() {
    return (
        <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-800 overflow-hidden relative">
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
                        Built for real-world use cases
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Whether you&apos;re writing tests, improving accessibility, or debugging —
                        idomatic has you covered.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className={`h-full p-6 rounded-xl bg-zinc-900/50 border ${useCase.borderColor} backdrop-blur-sm group`}
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className={`w-14 h-14 rounded-xl ${useCase.bgColor} border ${useCase.borderColor} flex items-center justify-center mb-4`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <useCase.icon className={`w-7 h-7 ${useCase.color}`} />
                                </motion.div>

                                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                                <p className="text-zinc-400 text-sm mb-4">{useCase.description}</p>

                                {/* Code example */}
                                <div className={`px-3 py-2 rounded-lg ${useCase.bgColor} border ${useCase.borderColor} font-mono text-xs ${useCase.color}`}>
                                    {useCase.example}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
