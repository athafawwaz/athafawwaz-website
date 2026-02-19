"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="section-padding relative">
            <div className="max-w-4xl mx-auto">
                {/* Section Label */}
                <motion.p
                    className="text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.p>

                {/* Heading */}
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Bridging <span className="text-neon-cyan text-glow">Logic</span> &{" "}
                    <span className="text-neon-cyan text-glow">Design</span>
                </motion.h2>

                {/* Bio */}
                <motion.p
                    className="text-black/60 dark:text-white/50 text-base md:text-lg leading-relaxed max-w-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    A visionary IT student and Developer specializing in Web Development and ERP Systems.
                    Currently optimizing enterprise workflows at{" "}
                    <span className="text-black/80 dark:text-white/80 font-medium">PT Pupuk Sriwidjaja Palembang</span>{" "}
                    using Odoo, n8n, and Next.js. I bridge the gap between complex backend logic
                    and sleek frontend experiences.
                </motion.p>

                {/* Stats Row */}
                <motion.div
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {[
                        { value: "1", label: "Years Experience" },
                        { value: "5+", label: "Projects Built" },
                        { value: "2", label: "Companies" },
                        { value: "∞", label: "Curiosity" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="glass rounded-xl p-5 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{
                                borderColor: "var(--color-primary)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            <p className="text-2xl md:text-3xl font-bold text-neon-cyan text-glow">
                                {stat.value}
                            </p>
                            <p className="text-black/40 dark:text-white/40 text-xs tracking-[0.15em] uppercase mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
