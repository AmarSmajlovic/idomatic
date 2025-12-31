"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Star, Package, GitBranch } from "lucide-react";

interface StatsData {
    downloads: number;
    stars: number;
    version: string;
    forks: number;
}

export default function Stats() {
    const [stats, setStats] = useState<StatsData>({
        downloads: 0,
        stars: 0,
        version: "1.0.0",
        forks: 0,
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Fetch NPM downloads
        fetch('https://api.npmjs.org/downloads/point/last-month/@idomatic/core')
            .then(res => res.json())
            .then(data => {
                if (data.downloads) {
                    setStats(prev => ({ ...prev, downloads: data.downloads }));
                }
            })
            .catch(() => { });

        // Fetch NPM version
        fetch('https://registry.npmjs.org/@idomatic/core/latest')
            .then(res => res.json())
            .then(data => {
                if (data.version) {
                    setStats(prev => ({ ...prev, version: data.version }));
                }
            })
            .catch(() => { });

        // Fetch GitHub stats
        fetch('https://api.github.com/repos/AmarSmajlovic/idomatic')
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count !== undefined) {
                    setStats(prev => ({
                        ...prev,
                        stars: data.stargazers_count,
                        forks: data.forks_count || 0
                    }));
                }
            })
            .catch(() => { });
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const statsItems = [
        {
            icon: Download,
            label: "Monthly Downloads",
            value: formatNumber(stats.downloads),
            color: "text-green-400",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20",
        },
        {
            icon: Star,
            label: "GitHub Stars",
            value: formatNumber(stats.stars),
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
            borderColor: "border-yellow-500/20",
        },
        {
            icon: Package,
            label: "Latest Version",
            value: `v${stats.version}`,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
        },
        {
            icon: GitBranch,
            label: "Forks",
            value: formatNumber(stats.forks),
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
        },
    ];

    return (
        <section className="py-16 px-6 bg-zinc-900 border-y border-zinc-800">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {statsItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`text-center p-6 rounded-xl ${item.bgColor} border ${item.borderColor} backdrop-blur-sm`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <motion.div
                                className={`w-12 h-12 mx-auto mb-3 rounded-full ${item.bgColor} border ${item.borderColor} flex items-center justify-center`}
                                whileHover={{ rotate: 10 }}
                            >
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </motion.div>
                            <motion.div
                                className={`text-3xl font-bold ${item.color} mb-1`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                {mounted ? item.value : "..."}
                            </motion.div>
                            <div className="text-sm text-zinc-400">{item.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
