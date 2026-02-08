"use client";

import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";
import { getTranslations } from "@core/lib/i18n";
import { env } from "@core/config/env";

interface FooterProps {
    locale: string;
}

export default function Footer({ locale }: FooterProps) {
    const t = getTranslations(locale);

    const description = locale === "vi"
        ? "Tri thức từ Vực Thẳm. Hướng dẫn đầy đủ cho Ego SMP."
        : "Knowledge from the Abyss. Complete guide for Ego SMP.";

    return (
        <footer className="relative mt-20 border-t border-void-border bg-void-surface/50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Link href={`/${locale}`} className="inline-block mb-4">
                            <span className="font-display text-2xl font-bold text-neon-cyan text-glow-cyan">
                                EGO
                            </span>
                            <span className="font-display text-2xl font-bold text-white ml-1">
                                WIKI
                            </span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-center">
                        <span className="text-xs text-white/40 uppercase tracking-wider mb-2">
                            Join Server / Support
                        </span>
                        <a
                            href={env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-2 rounded-lg bg-void-bg border border-void-border hover:border-[#5865F2] transition-colors"
                        >
                            <MessageCircle size={20} className="text-[#5865F2]" />
                            <span className="font-mono text-white/80 group-hover:text-white transition-colors">
                                {env.NEXT_PUBLIC_DISCORD_INVITE_URL.replace("https://", "")}
                            </span>
                        </a>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                        <span className="text-xs text-white/40 uppercase tracking-wider mb-3">
                            Connect
                        </span>
                        <div className="flex gap-3">
                            <a
                                href={env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-void-bg border border-void-border hover:border-[#5865F2]/50 hover:text-[#5865F2] transition-all text-white/60"
                                aria-label="Discord"
                            >
                                <MessageCircle size={20} />
                            </a>
                            <a
                                href="https://github.com/egosmp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-void-bg border border-void-border hover:border-white/50 hover:text-white transition-all text-white/60"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-void-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <span>{t.footer.copyright}</span>
                    <div className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
