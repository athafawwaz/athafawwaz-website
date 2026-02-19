"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
    {
        title: "Core",
        skills: ["Next.js", "Node.js", "TypeScript", "Python", "PHP", "C# (ASP.NET)"],
    },
    {
        title: "ERP & Automation",
        skills: ["Odoo ERP", "n8n Workflow Automation", "Claude Code", "OpenClaw"],
    },
    {
        title: "Database & Backend",
        skills: ["Supabase", "MySQL", "Milvus (Vector DB)"],
    },
    {
        title: "Tools",
        skills: ["GitHub", "Docker", "Tailwind CSS"],
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 },
    },
};

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative">
            <div className="max-w-5xl mx-auto">
                {/* Section Label */}
                <motion.p
                    className="text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    Technical Arsenal
                </motion.p>

                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Skills & <span className="text-neon-cyan text-glow">Technologies</span>
                </motion.h2>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {SKILL_CATEGORIES.map((cat) => (
                        <motion.div
                            key={cat.title}
                            className="glass rounded-2xl p-6 md:p-8"
                            variants={categoryVariants}
                            whileHover={{
                                borderColor: "var(--color-primary)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            <h3 className="text-xs tracking-[0.3em] uppercase text-neon-cyan/70 mb-5 font-medium">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {cat.skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        variants={tagVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 0 15px rgba(0, 229, 255, 0.3)",
                                            borderColor: "rgba(0, 229, 255, 0.5)",
                                            transition: { duration: 0.2 },
                                        }}
                                        className="px-4 py-2 rounded-full text-sm text-black/70 dark:text-white/70 border border-black/20 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] hover:text-black dark:hover:text-white transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
