"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Bot, Building, Coffee, Shield, Bell, ShoppingCart, Layout } from "lucide-react";

const PROJECTS = [
    {
        title: "K3 Safety Chatbot",
        description:
            "An intelligent chatbot for safety regulation retrieval built with n8n workflow automation, Supabase, and Milvus Vector DB. Enables fast, semantic search across complex safety documentation.",
        tags: ["n8n", "Supabase", "Milvus", "Vector DB", "AI"],
        icon: Bot,
        gradient: "from-cyan-500/20 to-blue-500/20",
    },
    // {
    //     title: "Enterprise SSO System",
    //     description:
    //         "Architected a centralized Single Sign-On (SSO) system using Keycloak to secure internal office applications, enforcing robust identity management and improving login experiences.",
    //     tags: ["Keycloak", "Security", "SSO", "Identity Mgmt"],
    //     icon: Shield,
    //     gradient: "from-emerald-500/20 to-teal-500/20",
    // },
    {
        title: "Automated Reminder System",
        description:
            "Real-time notification workflow orchestrator using n8n to fetch database signals and trigger personalized personnel reminders, significantly improving task adherence.",
        tags: ["n8n", "Automation", "Workflow", "Real-time"],
        icon: Bell,
        gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
        title: "Industrial E-Commerce Platform",
        description:
            "Web-based sales platform for the 'Jasa Pelayanan Pabrik' unit built on Odoo ERP. Enables external clients to browse and purchase industrial services via an integrated digital storefront.",
        tags: ["Odoo ERP", "E-Commerce", "Sales", "Web"],
        icon: ShoppingCart,
        gradient: "from-indigo-500/20 to-purple-500/20",
    },
    {
        title: "Wisma Management System",
        description:
            "Full-stack accommodation management platform handling reservations, billing, and comprehensive reporting for PT Pupuk Sriwidjaja Palembang's guest house operations.",
        tags: ["Odoo ERP", "Python", "Full-Stack", "Reporting"],
        icon: Building,
        gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
        title: "Propertree Club Platform",
        description:
            "Exclusive investment management website for Propertree members. Features a sleek, responsive dashboard for managing and exploring investment opportunities with high performance.",
        tags: ["Next.js", "Tailwind CSS", "Investment", "Web App"],
        icon: Layout,
        gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
        title: "Roastkuy",
        description:
            "A high-performance, responsive company profile website built for Propertree Investa Cendikia using Next.js and Tailwind CSS, focusing on user-centered design and modern aesthetics.",
        tags: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive"],
        icon: Coffee,
        gradient: "from-purple-500/20 to-pink-500/20",
    },
];

function ProjectCard({
    project,
    index,
}: {
    project: (typeof PROJECTS)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const Icon = project.icon;

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setRotation({
            x: ((y - centerY) / centerY) * -8,
            y: ((x - centerX) / centerX) * 8,
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative group cursor-pointer"
            style={{ perspective: "1000px" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="glass rounded-2xl p-6 md:p-8 h-full relative overflow-hidden"
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                    scale: isHovered ? 1.02 : 1,
                    borderColor: isHovered ? "var(--color-primary)" : "var(--color-glass-border)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Gradient overlay on hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-neon-cyan" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-3">
                        {project.title}
                    </h3>
                    <p className="text-black/40 dark:text-white/40 text-sm leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs text-neon-cyan/70 border border-neon-cyan/20 bg-neon-cyan/5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover shine effect */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background:
                            "linear-gradient(105deg, transparent 40%, rgba(0,229,255,0.03) 45%, rgba(0,229,255,0.05) 50%, rgba(0,229,255,0.03) 55%, transparent 60%)",
                        backgroundSize: "200% 100%",
                    }}
                    animate={isHovered ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
                    transition={{ duration: 1.5, ease: "linear" }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="section-padding relative">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.p
                    className="text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    Portfolio
                </motion.p>
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Featured <span className="text-neon-cyan text-glow">Projects</span>
                </motion.h2>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
