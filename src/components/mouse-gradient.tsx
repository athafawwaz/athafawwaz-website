"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGradient() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        },
        [mouseX, mouseY]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        let animId: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const x = springX.get();
            const y = springY.get();

            // Main radial gradient blob
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
            gradient.addColorStop(0, "rgba(0, 229, 255, 0.07)");
            gradient.addColorStop(0.5, "rgba(0, 124, 240, 0.03)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
        };
    }, [springX, springY]);

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        />
    );
}
