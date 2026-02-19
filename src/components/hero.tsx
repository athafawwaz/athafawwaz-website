
"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/* ===== Particle System ===== */
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    connections: number[];
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const animRef = useRef<number>(0);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particles.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            connections: [],
        }));
    }, [canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        init();

        const handleResize = () => init();
        const handleMouse = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouse);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p, i) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse attraction
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    p.vx += dx * 0.00005;
                    p.vy += dy * 0.00005;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.current.length; j++) {
                    const p2 = particles.current[j];
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (d < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - d / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(animRef.current);
        };
    }, [canvasRef, init]);
}

/* ===== Staggered Text Animation ===== */
const headline = "Building the Future of Digital Workflows.";
const words = headline.split(" ");

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.5,
        },
    },
};

const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useParticles(canvasRef);

    const scrollToWork = () => {
        document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Radial ambient glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                {/* Eyebrow */}
                <motion.p
                    className="text-neon-cyan text-sm md:text-base tracking-[0.3em] uppercase mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Atha Fawwaz Firjatullah
                </motion.p>

                {/* Headline */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mr-[0.3em]"
                            variants={wordVariants}
                        >
                            {word === "Future" || word === "Digital" ? (
                                <span className="text-glow text-neon-cyan">{word}</span>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-6 md:mt-8 text-black/60 dark:text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                >
                    {/* Web &amp; Odoo ERP Developer · Automation Specialist */}
                    Web Developer · Automation Specialist
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                    className="mt-10"
                >
                    <Button
                        size="lg"
                        onClick={scrollToWork}
                        className="relative group bg-transparent border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan rounded-full px-8 py-6 text-sm tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer"
                    >
                        <span className="relative z-10">Explore My Work</span>
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-neon-cyan/5 blur-xl" />
                        <div className="absolute inset-0 rounded-full animate-glow-pulse" />
                    </Button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-6 h-6 text-black/20 dark:text-white/20" />
            </motion.div>
        </section>
    );
}
