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

        // Parallax Effect with Smooth Lerp
        let currentOffset = 0;
        let targetOffset = 0;
        let requestRef: number;

        const loop = () => {
            if (!bgRef.current) return;
            
            // Lerp: Move current towards target by 10% each frame
            // This creates the "smooth" (mượt) feel
            currentOffset += (targetOffset - currentOffset) * 0.1;
            
            // Apply transform
            // We use 3d transform for GPU acceleration
            bgRef.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
            
            requestRef = requestAnimationFrame(loop);
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Target moves down (0.1 speed) clamped to 150px
            targetOffset = Math.min(scrollY * 0.15, 150);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Start loop
        loop();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(requestRef);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black">
            {/* Background Image Container */}
            <div 
                ref={bgRef}
                className="absolute inset-0 w-full h-[120lvh] opacity-0 will-change-transform top-[-10%]"
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
