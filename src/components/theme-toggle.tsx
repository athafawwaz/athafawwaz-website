"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-12 h-6" />; // Placeholder to avoid hydration mismatch
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-12 h-6 bg-cyber-black dark:bg-cyber-black bg-white border border-black/10 dark:border-white/20 rounded-full flex items-center px-1 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
            <motion.div
                className="absolute inset-0 bg-neon-cyan/10"
                initial={false}
                animate={{
                    opacity: theme === "light" ? 1 : 0,
                }}
            />

            <motion.div
                className="relative z-10 w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)] flex items-center justify-center text-cyber-black text-[10px]"
                initial={false}
                animate={{
                    x: theme === "light" ? 22 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {theme === "dark" ? <Moon size={10} /> : <Sun size={10} />}
            </motion.div>
        </motion.button>
    );
}
