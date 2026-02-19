"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
// If UI components don't exist, I'll fallback to standard HTML elements with Tailwind classes in the next step if this fails or I'll just use standard HTML now to be safe.
// Given the user mentioned "ShadCN UI" in previous context (from conversation history), I will assume standard shadcn paths or just use raw tailwind for now to avoid dependency issues if components aren't exactly there.
// Actually, to be safe and self-contained, I will use raw Tailwind + Framer Motion.

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
        { role: "assistant", content: "Hello! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Replace with your actual n8n webhook URL
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://your-n8n-webhook-url.com";

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            // Assuming the n8n agent returns a JSON with a 'output' or 'text' field. 
            // Adjust based on your actual n8n workflow response structure.
            const botResponse = data.output || data.text || data.message || "I received your message but couldn't process a response.";

            setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-8 sm:right-8">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] overflow-hidden rounded-2xl border border-border bg-background shadow-xl dark:bg-card sm:w-[380px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b bg-muted/50 p-4 dark:bg-muted/20">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                    <Bot className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                                    <p className="text-xs text-muted-foreground">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-muted transition-colors"
                            >
                                <X className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex gap-3 text-sm",
                                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-muted border-border"
                                        )}
                                    >
                                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-2 max-w-[80%]",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted text-foreground rounded-tl-none border border-border/50"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 text-sm">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted border-border">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="bg-muted text-foreground rounded-2xl rounded-tl-none border border-border/50 px-4 py-2">
                                        <div className="flex gap-1 h-5 items-center">
                                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="border-t p-4 bg-background dark:bg-card">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-muted/50 border-0 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 dark:bg-muted/20"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.button>
        </div>
    );
}
