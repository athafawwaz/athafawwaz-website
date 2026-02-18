"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const sections = NAV_ITEMS.map((item) =>
            document.querySelector(item.href)
        ).filter(Boolean) as Element[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                className="absolute inset-0 glass"
                style={{ opacity: bgOpacity }}
            />
            <div className="relative flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="group flex items-center gap-0.5"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <span className="text-2xl md:text-3xl font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,229,255,0.5)] group-hover:text-neon-cyan transition-colors duration-300">
                        AF
                    </span>
                    <span className="text-neon-cyan text-3xl md:text-4xl animate-pulse font-black">.</span>
                </motion.a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <motion.button
                            key={item.href}
                            onClick={() => handleClick(item.href)}
                            className={`relative text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${activeSection === item.href
                                ? "text-neon-cyan"
                                : "text-white/60 hover:text-white"
                                }`}
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            {item.label}
                            {activeSection === item.href && (
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-neon-cyan"
                                    layoutId="nav-underline"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        className="block w-6 h-px bg-white"
                        animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    />
                    <motion.span
                        className="block w-6 h-px bg-white"
                        animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    />
                    <motion.span
                        className="block w-6 h-px bg-white"
                        animate={
                            mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                        }
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className="md:hidden fixed inset-0 bg-cyber-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                initial={false}
                animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
                transition={{ duration: 0.3 }}
            >
                {NAV_ITEMS.map((item, i) => (
                    <motion.button
                        key={item.href}
                        onClick={() => handleClick(item.href)}
                        className="text-2xl tracking-[0.2em] uppercase text-white/80 hover:text-neon-cyan transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                        {item.label}
                    </motion.button>
                ))}
            </motion.div>
        </motion.nav>
    );
}
