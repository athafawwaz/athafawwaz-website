"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Code, Monitor, Globe } from "lucide-react";

const EXPERIENCES = [
    {
        title: "Programmer",
        company: "PT. Pupuk Sriwidjaja Palembang",
        period: "Jan 2026 - Present",
        icon: Code,
        bullets: [
            "Architected a K3 Chatbot using n8n, Supabase, and Milvus Vector DB for safety regulation retrieval.",
            "Implemented SSO using Keycloak for centralized authentication across applications.",
            "Built an automated notification system for real-time personnel reminders.",
        ],
    },
    {
        title: "Odoo ERP Developer",
        company: "PT. Pupuk Sriwidjaja Palembang",
        period: "July 2025 - Dec 2025",
        icon: Briefcase,
        bullets: [
            "Developed an External Sales E-Commerce platform for the Jasa Pelayanan Pabrik unit.",
            "Built a full-stack Wisma Management System (Reservation, Billing, Reporting).",
        ],
    },
    {
        title: "Internship Front-End & ERP Developer",
        company: "PT. Pupuk Sriwidjaja Palembang",
        period: "April 2025 - July 2025",
        icon: Monitor,
        bullets: [
            "Conducted R&D on Odoo tech stacks, focusing on module customization and API integration.",
        ],
    },
    {
        title: "Internship Front-End Developer",
        company: "Propertree Investa Cendikia",
        period: "July 2024 - Sept 2024",
        icon: Globe,
        bullets: [
            'Built "Roastkuy" and "Propertree Club" websites using Next.js & Tailwind CSS.',
            "Focused on high-performance, responsive, and user-centered design.",
        ],
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="section-padding relative">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.p
                    className="text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    Career Path
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Professional <span className="text-neon-cyan text-glow">Experience</span>
                </motion.h2>

                {/* Timeline */}
                <div ref={containerRef} className="relative">
                    {/* Background line (gray) */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />

                    {/* Animated progress line */}
                    <motion.div
                        className="absolute left-6 md:left-8 top-0 w-px bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-cyan origin-top"
                        style={{ height: lineHeight }}
                    />

                    {/* Cards */}
                    <div className="space-y-12">
                        {EXPERIENCES.map((exp, i) => {
                            const Icon = exp.icon;
                            return (
                                <motion.div
                                    key={i}
                                    className="relative pl-16 md:pl-20"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                >
                                    {/* Glowing dot */}
                                    <div className="absolute left-[19px] md:left-[27px] top-8 w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_10px_#00e5ff,0_0_30px_#00e5ff40] z-10" />

                                    {/* Glass Card */}
                                    <motion.div
                                        className="glass rounded-2xl p-6 md:p-8"
                                        whileHover={{
                                            borderColor: "var(--color-primary)",
                                            y: -4,
                                            transition: { duration: 0.3 },
                                        }}
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
                                                <Icon className="w-5 h-5 text-neon-cyan" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-black/40 dark:text-white/40 text-sm mt-0.5">
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-neon-cyan/60 text-xs tracking-[0.2em] uppercase mb-4 ml-14">
                                            {exp.period}
                                        </p>

                                        <ul className="space-y-3 ml-14">
                                            {exp.bullets.map((b, j) => (
                                                <li
                                                    key={j}
                                                    className="text-black/50 dark:text-white/50 text-sm leading-relaxed flex items-start gap-2"
                                                >
                                                    <span className="text-neon-cyan/60 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-neon-cyan/60" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
