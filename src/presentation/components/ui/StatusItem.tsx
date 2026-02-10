"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { animate, remove } from "animejs";

interface StatusItemProps {
    children: React.ReactNode;
    delay: number;
}

const StatusItem = ({ children, delay }: StatusItemProps) => {
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

export default StatusItem;
