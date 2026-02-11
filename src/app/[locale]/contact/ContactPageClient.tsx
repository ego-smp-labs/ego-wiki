"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Heart, Globe, Github, Mail, ExternalLink } from "lucide-react";

interface ContactPageClientProps {
    locale: string;
}

const TEAM = [
    {
        name: "NirussVn0",
        role: { en: "Lead Developer & Systems Architect", vi: "Trưởng nhóm phát triển & Kiến trúc sư hệ thống" },
        description: {
            en: "Creator of the EGO system, Mace-Exclusive plugin, and this wiki. Passionate about clean OOP code and immersive Minecraft experiences.",
            vi: "Người tạo ra hệ thống EGO, plugin Mace-Exclusive, và wiki này. Đam mê mã code OOP sạch và trải nghiệm Minecraft chìm đắm.",
        },
        links: {
            github: "https://github.com/NirussVn0",
            discord: "https://discord.gg/jRqnNbupj4",
        },
    },
    {
        name: "SabiOfVibe Lab",
        role: { en: "Creative Director & Community Manager", vi: "Giám đốc sáng tạo & Quản lý cộng đồng" },
        description: {
            en: "Designs the Ego SMP server experience, manages the community, and coordinates plugin development.",
            vi: "Thiết kế trải nghiệm server Ego SMP, quản lý cộng đồng, và điều phối phát triển plugin.",
        },
        links: {
            discord: "https://discord.gg/jRqnNbupj4",
        },
    },
];

export default function ContactPageClient({ locale }: ContactPageClientProps) {
    const isVi = locale === "vi";

    return (
        <div className="min-h-screen px-4 py-20">
            <div className="container mx-auto max-w-3xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex p-4 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 mb-6">
                        <Users size={32} className="text-neon-purple" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                        {isVi ? "Liên Hệ" : "Contact Us"}
                    </h1>
                    <p className="text-white/60 max-w-lg mx-auto">
                        {isVi
                            ? "Gặp gỡ đội ngũ đằng sau EGO WIKI và tìm cách kết nối."
                            : "Meet the team behind EGO WIKI and find ways to connect."}
                    </p>
                </motion.div>

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-neon-cyan/5 via-void-surface/80 to-neon-purple/5 border border-void-border"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Heart size={18} className="text-neon-cyan" />
                        <h2 className="text-lg font-semibold text-white">
                            {isVi ? "Sứ mệnh" : "Our Mission"}
                        </h2>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {isVi
                            ? "Chúng tôi xây dựng EGO WIKI để cung cấp tài liệu chính xác, đầy đủ cho hệ thống Ego SMP. Mục tiêu là giúp mọi người chơi hiểu rõ cơ chế game và tận hưởng trải nghiệm PvP tốt nhất."
                            : "We built EGO WIKI to provide accurate, comprehensive documentation for the Ego SMP system. Our goal is to help every player understand game mechanics and enjoy the best PvP experience possible."}
                    </p>
                </motion.div>

                {/* Team */}
                <div className="space-y-6 mb-10">
                    {TEAM.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                            className="p-6 rounded-2xl bg-void-surface/80 border border-void-border hover:border-neon-cyan/30 transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0 border border-void-border group-hover:border-neon-cyan/30 transition-colors">
                                    <span className="text-lg font-bold text-neon-cyan">{member.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                                    <p className="text-neon-cyan text-sm mb-2">
                                        {isVi ? member.role.vi : member.role.en}
                                    </p>
                                    <p className="text-white/60 text-sm leading-relaxed mb-3">
                                        {isVi ? member.description.vi : member.description.en}
                                    </p>
                                    <div className="flex gap-2">
                                        {member.links.github && (
                                            <a
                                                href={member.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-void-bg border border-void-border hover:border-white/50 hover:text-white transition-all text-white/50"
                                            >
                                                <Github size={16} />
                                            </a>
                                        )}
                                        <a
                                            href={member.links.discord}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-void-bg border border-void-border hover:border-[#5865F2]/50 hover:text-[#5865F2] transition-all text-white/50"
                                        >
                                            <MessageCircle size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Connect CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-8 rounded-2xl bg-void-surface/50 border border-void-border"
                >
                    <Globe size={24} className="text-neon-cyan mx-auto mb-3" />
                    <h2 className="text-lg font-semibold text-white mb-2">
                        {isVi ? "Tham gia cộng đồng" : "Join Our Community"}
                    </h2>
                    <p className="text-white/50 text-sm mb-4">
                        {isVi
                            ? "Kết nối với chúng tôi trên Discord để nhận hỗ trợ và cập nhật mới nhất."
                            : "Connect with us on Discord for support and the latest updates."}
                    </p>
                    <a
                        href="https://discord.gg/jRqnNbupj4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-colors text-white font-medium"
                    >
                        <MessageCircle size={18} />
                        {isVi ? "Tham gia Discord" : "Join Discord"}
                        <ExternalLink size={14} />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
