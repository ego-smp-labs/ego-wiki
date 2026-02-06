"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import HeroSearchBar from "@presentation/components/ui/HeroSearchBar";

interface HeroSectionProps {
    locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
    // We'll use a hardcoded fallback for now if useTranslations isn't fully set up for client components in this specific way,
    // or assume it wraps correctly. Ideally we pass strings as props or use a client-safe hook.
    // For this refactor, let's keep it simple and safe.

    const subtitle = locale === "vi"
        ? "Chào mừng đến với EGO SMP - Máy chủ Minecraft Việt Nam độc đáo với hệ thống kỹ năng, vật phẩm và cốt truyện chuyên sâu."
        : "Welcome to EGO SMP - A unique Vietnamese Minecraft server with in-depth skills, items, and lore.";

    const searchPlaceholder = locale === "vi"
        ? "Tìm kiếm bài viết..."
        : "Search documentation...";

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
            </div>

            <div className="max-w-4xl mx-auto text-center z-10 relative">
                {/* System Online Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-void-surface/80 border border-void-border text-xs text-secondary mb-8 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
                    <span className="tracking-widest font-mono text-neon-cyan">SYSTEM ONLINE</span>
                </motion.div>

                {/* Main Title - EGO SMP */}
                <div className="relative mb-6 perspective-1000">
                    <motion.h1
                        className="text-6xl md:text-9xl font-black tracking-tighter flex justify-center items-center gap-4 md:gap-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* EGO - Glowing Gradient */}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-neon-purple via-white to-black/50 drop-shadow-[0_0_15px_rgba(157,0,255,0.5)]">
                            EGO
                        </span>

                        {/* SMP - Deconstructed / Floating Effect */}
                        <span className="relative flex gap-1">
                            {["S", "M", "P"].map((char, index) => (
                                <motion.span
                                    key={index}
                                    className="text-white/90 inline-block"
                                    initial={{ y: 0, rotate: 0 }}
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                                    }}
                                    transition={{
                                        duration: 4 + index,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.2,
                                    }}
                                    style={{
                                        textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                >
                    {subtitle}
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <HeroSearchBar placeholder={searchPlaceholder} />
                </motion.div>

                {/* CTA - Get Started */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8"
                >
                    <a
                        href="/api/auth/signin"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                        GET STARTED <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

import { ArrowRight } from "lucide-react";
