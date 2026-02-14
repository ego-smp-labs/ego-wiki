"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export const GlobalBackground = () => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bgRef.current) return;

        // Subtle Ken Burns Effect (Slow Zoom & Pan)
        animate(bgRef.current, {
            scale: [1, 1.1],
            // translateX: ["0%", "-2%"], // Optional subtle pan
            duration: 20000,
            direction: "alternate",
            loop: true,
            easing: "linear",
        });
        
        // Entrance Fade In
        animate(bgRef.current, {
            opacity: [0, 0.4], // Max opacity 0.4 to keep text readable
            duration: 1500,
            easing: "easeOutSine",
        });

    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black">
            {/* Background Image Container */}
            <div 
                ref={bgRef}
                className="absolute inset-0 w-full h-full opacity-0"
            >
                <img
                    src="/bg/bg.png"
                    alt="EGO Global Background"
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-void-bg/80 via-void-bg/50 to-void-bg/90" />
            
            {/* Optional Void Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/effects/grid.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};
