"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Will idomatic modify my existing IDs?",
        answer: "No! Idomatic only adds IDs to elements that don't already have one. Your existing IDs remain untouched, ensuring backward compatibility with your tests and styles.",
    },
    {
        question: "Does it work with component libraries like MUI or Chakra?",
        answer: "Yes! Idomatic works at the source code level, so it can add IDs to any JSX/HTML elements in your codebase, including those from component libraries when you're extending or wrapping them.",
    },
    {
        question: "Can I customize the ID naming pattern?",
        answer: "Absolutely! You can configure the prefix, attribute name (id, data-testid, etc.), and exclude specific tags or files. Check the .idomatic.config.json for all options.",
    },
    {
        question: "Is it safe to run on production code?",
        answer: "Yes! We recommend using the --dry flag first to preview changes. Idomatic is designed to be non-destructive and only adds attributes without modifying existing code structure.",
    },
    {
        question: "How does it handle dynamic components?",
        answer: "Idomatic processes your source files statically. For dynamic components, the IDs are added to the template/JSX, so they'll be present when the component renders.",
    },
    {
        question: "Can I use it in my CI/CD pipeline?",
        answer: "Yes! Run 'npx idomatic scan --dry' in your pipeline to check for missing IDs. It returns a non-zero exit code if issues are found, perfect for automated checks.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 bg-zinc-900 border-t border-zinc-800 overflow-hidden">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                    >
                        <HelpCircle className="w-8 h-8 text-red-400" />
                    </motion.div>
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Got questions? We&apos;ve got answers.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className={`rounded-xl border transition-colors ${openIndex === index
                                        ? 'bg-zinc-800/50 border-red-500/30'
                                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                >
                                    <span className="text-white font-medium pr-4">{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex-shrink-0 ${openIndex === index ? 'text-red-400' : 'text-zinc-500'}`}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-zinc-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
