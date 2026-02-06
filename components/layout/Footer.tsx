"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Github, MessageCircle } from "lucide-react";
import { getTranslations } from "@/lib/i18n";

interface FooterProps {
    locale: string;
}

const SERVER_IP = "play.egosmp.net";
const COPY_FEEDBACK_DURATION = 2000;

export default function Footer({ locale }: FooterProps) {
    const [copied, setCopied] = useState(false);
    const t = getTranslations(locale);

    const handleCopyIp = async () => {
        try {
            await navigator.clipboard.writeText(SERVER_IP);
            setCopied(true);
            setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

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
                            {t.footer.serverIp}
                        </span>
                        <button
                            onClick={handleCopyIp}
                            className="group flex items-center gap-3 px-4 py-2 rounded-lg bg-void-bg border border-void-border hover:border-neon-cyan/50 transition-all"
                        >
                            <span className="font-mono text-neon-cyan text-lg">
                                {SERVER_IP}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-white/50 group-hover:text-neon-cyan transition-colors">
                                {copied ? (
                                    <>
                                        <Check size={14} className="text-green-400" />
                                        {t.footer.copied}
                                    </>
                                ) : (
                                    <>
                                        <Copy size={14} />
                                        {t.footer.copyIp}
                                    </>
                                )}
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                        <span className="text-xs text-white/40 uppercase tracking-wider mb-3">
                            Connect
                        </span>
                        <div className="flex gap-3">
                            <a
                                href="https://discord.gg/egosmp"
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
