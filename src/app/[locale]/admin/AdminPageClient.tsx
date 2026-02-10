"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Send, AlertTriangle, CheckCircle, FileText, Bell, Loader2 } from "lucide-react";

interface NotificationForm {
    title: string;
    category: string;
    action: "created" | "updated" | "deleted";
}

export default function AdminPageClient({ locale }: { locale: string }) {
    const { data: session } = useSession();
    const isVi = locale === "vi";
    const [form, setForm] = useState<NotificationForm>({
        title: "",
        category: "general",
        action: "updated",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    // Check admin
    if (!session?.user?.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-8 rounded-2xl bg-void-surface/80 border border-red-500/30"
                >
                    <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">
                        {isVi ? "Truy cập bị từ chối" : "Access Denied"}
                    </h2>
                    <p className="text-white/60">
                        {isVi
                            ? "Bạn không có quyền admin để truy cập trang này."
                            : "You do not have admin privileges to access this page."}
                    </p>
                </motion.div>
            </div>
        );
    }

    const handleSendNotification = async () => {
        if (!form.title.trim()) return;

        setStatus("sending");
        try {
            const response = await fetch("/api/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title,
                    category: form.category,
                    author: session.user?.name || "Admin",
                    action: form.action,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setStatusMessage(isVi ? "Thông báo đã gửi thành công!" : "Notification sent successfully!");
                setForm({ ...form, title: "" });
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setStatusMessage(isVi ? "Gửi thông báo thất bại." : "Failed to send notification.");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch {
            setStatus("error");
            setStatusMessage(isVi ? "Lỗi kết nối." : "Connection error.");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const categories = ["general", "ego-system", "items", "advanced"];
    const actions: { value: NotificationForm["action"]; label: string; labelVi: string }[] = [
        { value: "created", label: "Created", labelVi: "Tạo mới" },
        { value: "updated", label: "Updated", labelVi: "Cập nhật" },
        { value: "deleted", label: "Deleted", labelVi: "Xóa" },
    ];

    return (
        <div className="min-h-screen px-4 py-20">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="p-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30">
                        <Shield size={24} className="text-neon-cyan" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {isVi ? "Bảng Điều Khiển Admin" : "Admin Dashboard"}
                        </h1>
                        <p className="text-white/50 text-sm">
                            {isVi ? "Quản lý nội dung wiki và thông báo" : "Manage wiki content and notifications"}
                        </p>
                    </div>
                </motion.div>

                {/* User Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 p-4 rounded-xl bg-void-surface/80 border border-void-border"
                >
                    <div className="flex items-center gap-3">
                        {session.user?.image && (
                            <img src={session.user.image} alt="" className="w-10 h-10 rounded-full" />
                        )}
                        <div>
                            <p className="font-medium text-white">{session.user?.name}</p>
                            <p className="text-xs text-neon-cyan flex items-center gap-1">
                                <Shield size={12} /> Admin
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Webhook Notification Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl bg-void-surface/80 border border-void-border"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Bell size={20} className="text-neon-cyan" />
                        <h2 className="text-lg font-semibold text-white">
                            {isVi ? "Gửi Thông Báo Discord" : "Send Discord Notification"}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* Article Title */}
                        <div>
                            <label className="block text-sm text-white/70 mb-1.5">
                                <FileText size={14} className="inline mr-1" />
                                {isVi ? "Tiêu đề bài viết" : "Article Title"}
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder={isVi ? "Nhập tiêu đề..." : "Enter article title..."}
                                className="w-full px-4 py-2.5 rounded-lg bg-void-bg border border-void-border focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm text-white/70 mb-1.5">
                                {isVi ? "Danh mục" : "Category"}
                            </label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg bg-void-bg border border-void-border focus:border-neon-cyan/50 focus:outline-none text-white transition-colors"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-void-bg">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Action */}
                        <div>
                            <label className="block text-sm text-white/70 mb-1.5">
                                {isVi ? "Hành động" : "Action"}
                            </label>
                            <div className="flex gap-2">
                                {actions.map((action) => (
                                    <button
                                        key={action.value}
                                        onClick={() => setForm({ ...form, action: action.value })}
                                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                            form.action === action.value
                                                ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan border"
                                                : "bg-void-bg border border-void-border text-white/60 hover:text-white"
                                        }`}
                                    >
                                        {isVi ? action.labelVi : action.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSendNotification}
                            disabled={!form.title.trim() || status === "sending"}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            {status === "sending" ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Send size={18} />
                            )}
                            {status === "sending"
                                ? (isVi ? "Đang gửi..." : "Sending...")
                                : (isVi ? "Gửi thông báo" : "Send Notification")}
                        </button>

                        {/* Status Message */}
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-sm text-green-400"
                            >
                                <CheckCircle size={16} />
                                {statusMessage}
                            </motion.div>
                        )}
                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-sm text-red-400"
                            >
                                <AlertTriangle size={16} />
                                {statusMessage}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
