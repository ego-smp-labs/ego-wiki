"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, Shield, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function AuthButton() {
    const { data: session, status } = useSession();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (status === "loading") {
        return (
            <div className="w-8 h-8 rounded-full bg-void-surface border border-void-border animate-pulse" />
        );
    }

    if (!session) {
        return (
            <button
                onClick={() => signIn("discord")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-colors text-white text-sm font-medium"
            >
                <LogIn size={16} />
                <span className="hidden sm:inline">Login</span>
            </button>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-void-border hover:border-neon-cyan/50 transition-colors"
            >
                {session.user.image ? (
                    <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-6 h-6 rounded-full"
                    />
                ) : (
                    <User size={16} className="text-white/80" />
                )}
                <span className="text-sm text-white/80 hidden sm:inline max-w-[100px] truncate">
                    {session.user.name}
                </span>
                {session.user.isAdmin && (
                    <Shield size={14} className="text-neon-cyan" />
                )}
            </button>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 py-2 min-w-[180px] bg-void-surface border border-void-border rounded-lg shadow-lg z-50"
                    >
                        <div className="px-4 py-2 border-b border-void-border">
                            <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                            <p className="text-xs text-white/50 truncate">{session.user.email}</p>
                            {session.user.isAdmin && (
                                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs">
                                    <Shield size={10} />
                                    Admin
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-void-bg/50 transition-colors"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
