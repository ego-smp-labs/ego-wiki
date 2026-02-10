"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroSearchBar from "@presentation/components/ui/HeroSearchBar";
import { HeroLogo } from "@presentation/components/ui/HeroLogo";
import { NeonBorderButton } from "@presentation/components/ui/NeonBorderButton";

interface HeroSectionProps {
    subtitle: string;
    searchPlaceholder: string;
    ctaText?: string;
}

export default function HeroSection({ subtitle, searchPlaceholder, ctaText = "GET STARTED" }: HeroSectionProps) {



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
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="tracking-widest font-mono text-neon-cyan">SYSTEM ONLINE</span>
                </motion.div>

                {/* Main Title - EGO WIKI (Animated) */}
                <HeroLogo />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
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

                {/* CTA - Get Started (Animated) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8 flex justify-center"
                >
                    <Link href="/api/auth/signin">
                        <NeonBorderButton>
                            <span className="flex items-center gap-2">
                                {ctaText} <ArrowRight size={18} />
                            </span>
                        </NeonBorderButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}


