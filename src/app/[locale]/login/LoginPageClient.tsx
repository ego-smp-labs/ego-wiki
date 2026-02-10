"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Shield, Lock } from "lucide-react";

interface LoginPageClientProps {
    locale: string;
    callbackUrl?: string;
}

export default function LoginPageClient({ locale, callbackUrl }: LoginPageClientProps) {
    const isVi = locale === "vi";

    const title = isVi ? "Đăng Nhập Để Tiếp Tục" : "Login to Continue";
    const subtitle = isVi
        ? "Bạn cần đăng nhập bằng Discord và tham gia server để xem wiki."
        : "You must login with Discord and join our server to access the wiki.";
    const loginLabel = isVi ? "Đăng nhập bằng Discord" : "Login with Discord";
    const joinLabel = isVi ? "Tham gia Discord Server" : "Join Discord Server";
    const features = isVi
        ? [
            "Xem toàn bộ tài liệu wiki",
            "Truy cập hướng dẫn nâng cao",
            "Nhận thông báo cập nhật mới",
        ]
        : [
            "Access all wiki documentation",
            "View advanced guides",
            "Get notified of new updates",
        ];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="relative p-8 rounded-2xl bg-void-surface/80 backdrop-blur-xl border border-void-border">
                    {/* Glow effect */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-purple/20 -z-10 blur-sm" />

                    {/* Lock icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl bg-void-bg border border-void-border">
                            <Lock size={32} className="text-neon-cyan" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white text-center mb-2">{title}</h1>
                    <p className="text-white/60 text-sm text-center mb-8">{subtitle}</p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-3 text-sm text-white/70"
                            >
                                <Shield size={14} className="text-neon-cyan flex-shrink-0" />
                                <span>{feature}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={() => signIn("discord", { callbackUrl: callbackUrl || `/${locale}` })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all text-white font-medium group"
                    >
                        <MessageCircle size={20} />
                        <span>{loginLabel}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Join Discord */}
                    <div className="mt-4 text-center">
                        <a
                            href="https://discord.gg/jRqnNbupj4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/50 hover:text-neon-cyan transition-colors"
                        >
                            {joinLabel} →
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
