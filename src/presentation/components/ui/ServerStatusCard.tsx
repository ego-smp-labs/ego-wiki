"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { animate, remove } from "animejs";
import { Server, Users, Wifi, WifiOff } from "lucide-react";
import { cn } from "@core/lib/utils";

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

// Internal Neon Card Component
const StatusItem = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<SVGRectElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (cardRef.current) {
                setDimensions({
                    width: cardRef.current.offsetWidth,
                    height: cardRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        const timer = setTimeout(updateDimensions, 200);
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
            clearTimeout(timer);
        };
    }, []);

    const handleMouseEnter = () => {
        if (!rectRef.current || !cardRef.current) return;

        // Animate Stroke
        const perimeter = rectRef.current.getTotalLength();
        remove(rectRef.current);
        rectRef.current.style.strokeDasharray = `${perimeter}`;
        rectRef.current.style.strokeDashoffset = `${perimeter}`;
        rectRef.current.style.opacity = "1";

        animate(rectRef.current, {
            strokeDashoffset: [perimeter, 0],
            easing: "easeInOutSine",
            duration: 500,
            filter: ["drop-shadow(0 0 0px #7b00ff)", "drop-shadow(0 0 10px #7b00ff)"]
        });

        // NO Box Shadow / Background on Container
        remove(cardRef.current);
        cardRef.current.style.boxShadow = "none";
    };

    const handleMouseLeave = () => {
        if (!rectRef.current || !cardRef.current) return;

        const perimeter = rectRef.current.getTotalLength();
        remove(rectRef.current);
        animate(rectRef.current, {
            strokeDashoffset: perimeter,
            filter: "drop-shadow(0 0 0px #7b00ff)",
            easing: "easeInOutSine",
            duration: 300,
            complete: () => {
                if (rectRef.current) rectRef.current.style.opacity = "0";
            }
        });

        remove(cardRef.current);
        cardRef.current.style.boxShadow = "none";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="h-full"
        >
            <div
                ref={cardRef}
                className="relative h-full p-6 rounded-xl bg-void-surface/50 border border-white/10 backdrop-blur-sm overflow-hidden group transition-colors duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* SVG Overlay */}
                <svg
                    className="absolute inset-0 pointer-events-none z-10"
                    width="100%"
                    height="100%"
                    style={{ overflow: "visible" }}
                >
                    <rect
                        ref={rectRef}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="12"
                        fill="none"
                        stroke="#7b00ff"
                        strokeWidth="2"
                        strokeOpacity="0"
                    />
                </svg>

                <div className="relative z-20">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

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
