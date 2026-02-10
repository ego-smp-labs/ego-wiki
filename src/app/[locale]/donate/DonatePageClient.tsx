"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, ExternalLink, Sparkles } from "lucide-react";

interface DonatePageClientProps {
    locale: string;
}

export default function DonatePageClient({ locale }: DonatePageClientProps) {
    const isVi = locale === "vi";

    return (
        <div className="min-h-screen px-4 py-20">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-6">
                        <Coffee size={32} className="text-amber-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                        {isVi ? "Ủng Hộ Chúng Tôi" : "Support Us"}
                    </h1>
                    <p className="text-white/60 max-w-lg mx-auto">
                        {isVi
                            ? "Mua cho chúng tôi một ly cà phê để giữ server và wiki hoạt động!"
                            : "Buy us a coffee to keep the server and wiki running!"}
                    </p>
                </motion.div>

                {/* Why Donate */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 p-6 rounded-2xl bg-void-surface/80 border border-void-border"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={18} className="text-amber-400" />
                        <h2 className="text-lg font-semibold text-white">
                            {isVi ? "Tại sao ủng hộ?" : "Why Donate?"}
                        </h2>
                    </div>
                    <ul className="space-y-3">
                        {(isVi
                            ? [
                                "💸 Chi phí hosting server Minecraft",
                                "🌐 Duy trì wiki và cập nhật liên tục",
                                "🔧 Phát triển plugin và tính năng mới",
                                "❤️ Giữ cộng đồng phát triển",
                            ]
                            : [
                                "💸 Minecraft server hosting costs",
                                "🌐 Wiki maintenance and continuous updates",
                                "🔧 Plugin development and new features",
                                "❤️ Keep the community thriving",
                            ]
                        ).map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="text-white/70 text-sm"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Buy Me a Coffee */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 via-void-surface/80 to-amber-500/5 border border-amber-500/20 text-center"
                >
                    <Coffee size={48} className="text-amber-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">
                        Buy Me a Coffee ☕
                    </h2>
                    <p className="text-white/50 text-sm mb-6">
                        {isVi
                            ? "Mỗi đóng góp giúp wiki và server tồn tại. Cảm ơn bạn!"
                            : "Every contribution helps keep the wiki and server alive. Thank you!"}
                    </p>
                    <a
                        href="https://buymeacoffee.com/sow-lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 transition-all text-black font-bold text-lg group"
                    >
                        <Coffee size={22} />
                        {isVi ? "Mua Cà Phê" : "Buy a Coffee"}
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

                {/* Thank You */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-white/40 text-sm">
                        <Heart size={14} className="text-red-400" />
                        {isVi
                            ? "Cảm ơn sự ủng hộ của bạn!"
                            : "Thank you for your support!"}
                        <Heart size={14} className="text-red-400" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
