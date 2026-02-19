"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Framer Motion",
    "Git",
    "Docker",
    "Prisma",
    "Odoo",
    "Python",
];

export default function TechStack() {
    return (
        <section className="py-10 overflow-hidden bg-cyber-black/50 backdrop-blur-sm border-y border-white/5">
            <div className="relative flex w-full">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cyber-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cyber-black to-transparent z-10" />

                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: [0, -1035] }} // Adjust based on content width approximation
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center mx-8 group cursor-default"
                        >
                            <span className="text-2xl md:text-3xl font-bold text-black/20 dark:text-white/20 uppercase tracking-widest group-hover:text-neon-cyan group-hover:text-glow transition-all duration-300">
                                {tech}
                            </span>
                            <span className="ml-8 text-neon-cyan/20">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
