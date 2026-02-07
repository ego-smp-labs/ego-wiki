"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Server, Users, Wifi, WifiOff } from "lucide-react";
import { MovingBorder } from "@presentation/components/ui/MovingBorder";

interface ServerStatusData {
    online: boolean;
    players: {
        online: number;
        max: number;
    };
    version: string;
}

interface ServerStatusCardProps {
    locale: string;
}

const REFRESH_INTERVAL = 60000;

export default function ServerStatusCard({ locale }: ServerStatusCardProps) {
    const [status, setStatus] = useState<ServerStatusData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchStatus = useCallback(async () => {
        try {
            const res = await fetch("/api/status/mc");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setStatus(data);
            setError(false);
        } catch (err) {
            console.error("Failed to fetch server status:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    const labels = {
        activeAgents: locale === "vi" ? "Đặc vụ hoạt động" : "Active Agents",
        voidStability: locale === "vi" ? "Độ ổn định Void" : "Void Stability",
        archivesOnline: locale === "vi" ? "Kho lưu trữ" : "Archives Online",
    };

    const cardClass = "p-6 rounded-xl bg-void-surface/50 border border-void-border backdrop-blur-sm";

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="h-full rounded-xl"
            >
                <MovingBorder className="h-full rounded-xl" containerClassName="p-6 bg-void-surface/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-white/50">
                        <Users size={16} />
                        <span className="text-xs uppercase tracking-wider">
                            {labels.activeAgents}
                        </span>
                    </div>
                    <div className="font-display text-4xl font-bold text-white">
                        {loading ? (
                            <span className="text-white/30">---</span>
                        ) : error || !status ? (
                            <span className="text-white/30">0</span>
                        ) : (
                            <span className="text-glow-cyan text-neon-cyan">
                                {status.players.online.toLocaleString()}
                            </span>
                        )}
                    </div>
                    {status && !error && (
                        <div className="text-xs text-white/40 mt-1">
                            / {status.players.max.toLocaleString()} max
                        </div>
                    )}
                </MovingBorder>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h-full rounded-xl"
            >
                <MovingBorder className="h-full rounded-xl" containerClassName="p-6 bg-void-surface/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-white/50">
                        <Server size={16} />
                        <span className="text-xs uppercase tracking-wider">
                            {labels.voidStability}
                        </span>
                    </div>
                    <div className="font-display text-4xl font-bold">
                        <span className="text-glow-purple text-neon-purple">20.0</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">TPS</div>
                </MovingBorder>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="h-full rounded-xl"
            >
                <MovingBorder className="h-full rounded-xl" containerClassName="p-6 bg-void-surface/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-white/50">
                        {status?.online ? (
                            <Wifi size={16} className="text-green-400" />
                        ) : (
                            <WifiOff size={16} className="text-red-400" />
                        )}
                        <span className="text-xs uppercase tracking-wider">
                            {labels.archivesOnline}
                        </span>
                    </div>
                    <div className="font-display text-4xl font-bold">
                        {loading ? (
                            <span className="text-white/30">---</span>
                        ) : status?.online ? (
                            <span className="text-green-400">99.9%</span>
                        ) : (
                            <span className="text-red-400">Offline</span>
                        )}
                    </div>
                    {status?.version && (
                        <div className="text-xs text-white/40 mt-1">{status.version}</div>
                    )}
                </MovingBorder>
            </motion.div>
        </div>
    );
}
