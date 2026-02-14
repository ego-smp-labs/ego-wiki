"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export const GlobalBackground = () => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bgRef.current) return;

        // Entrance Fade In
        animate(bgRef.current, {
            opacity: [0, 1], 
            duration: 1500,
            easing: "easeOutSine",
        });

        // Parallax Effect (Clamped)
        const handleScroll = () => {
            if (!bgRef.current) return;
            const scrollY = window.scrollY;
            
            // Move background slightly DOWN as we scroll down (chasing the scroll)
            // Clamped to 100px max to prevent showing the top edge (since top is -10% ~= -100px)
            // Speed factor 0.1: moves 50px for every 500px scrolled.
            const offset = Math.min(scrollY * 0.1, 100);
            
            bgRef.current.style.transform = `translateY(${offset}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black">
            {/* Background Image Container */}
            <div 
                ref={bgRef}
                className="absolute inset-0 w-full h-[120%] opacity-0 will-change-transform top-[-10%]"
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
