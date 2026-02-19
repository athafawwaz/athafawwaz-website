"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="section-padding relative">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.p
                    className="text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Let&apos;s <span className="text-neon-cyan text-glow">Connect</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <form
                            className="space-y-5"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-white/40 text-xs tracking-[0.15em] uppercase mb-2 block"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your Name"
                                        className="bg-black/[0.03] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 h-12 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-white/40 text-xs tracking-[0.15em] uppercase mb-2 block"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="bg-black/[0.03] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 h-12 rounded-xl"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="text-white/40 text-xs tracking-[0.15em] uppercase mb-2 block"
                                >
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="bg-black/[0.03] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 rounded-xl resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="relative group bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/50 rounded-xl px-6 py-3 h-12 text-sm tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-neon-cyan/5 blur-xl" />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="flex flex-col justify-center space-y-8"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-black/40 dark:text-white/40 text-sm leading-relaxed">
                            I&apos;m always open to discussing new projects, creative ideas, or
                            opportunities to be part of your vision. Feel free to reach out!
                        </p>

                        <div className="space-y-5">
                            {[
                                // {
                                //     icon: Mail,
                                //     label: "Email",
                                //     value: "atha.fawwaz@gmail.com",
                                //     href: "mailto:atha.fawwaz@gmail.com",
                                // },
                                {
                                    icon: Mail,
                                    label: "Email",
                                    value: "athafawwazfirjatullah@pusri.co.id",
                                    href: "mailto:athafawwazfirjatullah@pusri.co.id",
                                },
                                {
                                    icon: Phone,
                                    label: "Phone",
                                    value: "+62 811-7878-733",
                                    href: "tel:+62811-7878-733",
                                },
                                {
                                    icon: MapPin,
                                    label: "Location",
                                    value: "Palembang, Indonesia",
                                    href: null,
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-neon-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-black/30 dark:text-white/30 text-xs tracking-[0.15em] uppercase">
                                                {item.label}
                                            </p>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-black/70 dark:text-white/70 text-sm hover:text-neon-cyan transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-black/70 dark:text-white/70 text-sm">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer
                    className="mt-24 pt-12 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-black/20 dark:text-white/20 text-sm">
                            &copy; {new Date().getFullYear()} Atha Fawwaz Firjatullah. All rights reserved.
                        </div>

                        <div className="flex items-center gap-4">
                            {[
                                {
                                    icon: Github,
                                    label: "GitHub",
                                    href: "https://github.com",
                                },
                                {
                                    icon: Mail,
                                    label: "Email",
                                    href: "mailto:atha.fawwaz@gmail.com",
                                },
                            ].map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-black/40 dark:text-white/40 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </motion.footer>
            </div>
        </section>
    );
}
