"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const EDUCATION = [
    {
        degree: "Bachelor of Information Technology",
        institution: "Asia E University",
        period: "Expected Oct 2026",
        status: "In Progress",
    },
    {
        degree: "Diploma in Web Development",
        institution: "CCIT FTUI",
        period: "Nov 2024",
        status: "Completed",
    },
];

export default function Education() {
    return (
        <section id="education" className="section-padding relative">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.p
                    className="text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    Education
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Academic <span className="text-neon-cyan text-glow">Background</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EDUCATION.map((edu, i) => (
                        <motion.div
                            key={edu.institution}
                            className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{
                                borderColor: "rgba(0, 229, 255, 0.2)",
                                y: -4,
                                transition: { duration: 0.3 },
                            }}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center mb-5">
                                <GraduationCap className="w-6 h-6 text-neon-cyan" />
                            </div>

                            <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                                {edu.degree}
                            </h3>
                            <p className="text-white/40 text-sm mb-3">{edu.institution}</p>

                            <div className="flex items-center gap-3">
                                <span className="text-neon-cyan/60 text-xs tracking-[0.15em] uppercase">
                                    {edu.period}
                                </span>
                                <span
                                    className={`text-xs px-2.5 py-0.5 rounded-full ${edu.status === "In Progress"
                                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"
                                            : "bg-white/5 text-white/40 border border-white/10"
                                        }`}
                                >
                                    {edu.status}
                                </span>
                            </div>

                            {/* Decorative gradient */}
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-neon-cyan/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
