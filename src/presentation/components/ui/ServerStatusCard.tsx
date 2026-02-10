"use client";

import { useEffect, useState, useCallback } from "react";
import { Server, Users, Wifi, WifiOff } from "lucide-react";
import StatusItem from "./StatusItem";

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusItem delay={0.1}>
                <div className="flex items-center gap-2 mb-2 text-white/50 group-hover:text-white/70 transition-colors">
                    <Users size={16} />
                    <span className="text-xs uppercase tracking-wider">
                        {labels.activeAgents}
                    </span>
                </div>
                <div className="font-display text-4xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {loading ? (
                        <span className="text-white/30">---</span>
                    ) : error || !status ? (
                        <span className="text-white/30">0</span>
                    ) : (
                        <span>
                            {status.players.online.toLocaleString()}
                        </span>
                    )}
                </div>
                {status && !error && (
                    <div className="text-xs text-white/40 mt-1">
                        / {status.players.max.toLocaleString()} max
                    </div>
                )}
            </StatusItem>

            <StatusItem delay={0.2}>
                <div className="flex items-center gap-2 mb-2 text-white/50 group-hover:text-white/70 transition-colors">
                    <Server size={16} />
                    <span className="text-xs uppercase tracking-wider">
                        {labels.voidStability}
                    </span>
                </div>
                <div className="font-display text-4xl font-bold text-white group-hover:text-neon-purple transition-colors">
                    <span>20.0</span>
                </div>
                <div className="text-xs text-white/40 mt-1">TPS</div>
            </StatusItem>

            <StatusItem delay={0.3}>
                <div className="flex items-center gap-2 mb-2 text-white/50 group-hover:text-white/70 transition-colors">
                    {status?.online ? (
                        <Wifi size={16} className="text-green-400" />
                    ) : (
                        <WifiOff size={16} className="text-red-400" />
                    )}
                    <span className="text-xs uppercase tracking-wider">
                        {labels.archivesOnline}
                    </span>
                </div>
                <div className="font-display text-4xl font-bold text-white">
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
            </StatusItem>
        </div>
    );
}
