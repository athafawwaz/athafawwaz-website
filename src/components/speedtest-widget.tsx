"use client";

import { useState } from "react";
import { Activity, X, WifiHigh, Gauge, Server } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SpeedtestWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [metrics, setMetrics] = useState({ ping: 0, testCount: 0 });

    const runSpeedtest = async () => {
        if (isTesting) return;
        setIsTesting(true);
        setMetrics({ ping: 0, testCount: 0 });

        let totalPing = 0;
        const testRuns = 5;

        for (let i = 0; i < testRuns; i++) {
            const start = performance.now();
            try {
                // Fetch current page to measure ping
                await fetch(window.location.href, { cache: 'no-store', method: 'HEAD' });
            } catch (error) {
                console.error("Ping error", error);
            }
            const end = performance.now();
            const latency = Math.round(end - start);

            totalPing += latency;
            setMetrics({ ping: Math.round(totalPing / (i + 1)), testCount: i + 1 });

            // Add a small delay between pings
            await new Promise(res => setTimeout(res, 300));
        }

        setIsTesting(false);
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start sm:bottom-8 sm:left-8">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[280px] overflow-hidden rounded-2xl border border-border bg-background shadow-xl dark:bg-card sm:w-[320px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b bg-muted/50 p-4 dark:bg-muted/20">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-cyan/20">
                                    <Activity className="h-5 w-5 text-neon-cyan dark:text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Network Status</h3>
                                    <p className="text-xs text-muted-foreground">Check connection to server</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-muted transition-colors"
                            >
                                <X className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col items-center justify-center space-y-6">
                            <div className="relative flex items-center justify-center">
                                <div className={cn("absolute inset-0 rounded-full blur-xl opacity-20", isTesting ? "bg-neon-cyan animate-pulse" : "bg-primary")}></div>
                                <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-neon-cyan/30 bg-background shadow-inner dark:bg-card">
                                    <span className="text-2xl font-black text-foreground">
                                        {metrics.ping > 0 ? metrics.ping : "--"}
                                    </span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">ms</span>
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center p-3 rounded-xl bg-muted/30 border border-border/50">
                                    <Server className="h-5 w-5 mb-2 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Server</span>
                                    <span className="text-sm font-semibold truncate max-w-full">Auto</span>
                                </div>
                                <div className="flex flex-col items-center p-3 rounded-xl bg-muted/30 border border-border/50">
                                    <WifiHigh className="h-5 w-5 mb-2 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Status</span>
                                    <span className="text-sm font-semibold text-green-500">
                                        {isTesting ? "Testing..." : (metrics.ping > 0 ? "Connected" : "Ready")}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={runSpeedtest}
                                disabled={isTesting}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Gauge className="h-4 w-4" />
                                {isTesting ? "Measuring Ping..." : "Run Test"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background dark:bg-card text-foreground shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-border hover:border-neon-cyan/50 focus:outline-none transition-colors"
                title="Network Speedtest"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Activity className="h-5 w-5 text-neon-cyan dark:text-cyan-400" />}
            </motion.button>
        </div>
    );
}
