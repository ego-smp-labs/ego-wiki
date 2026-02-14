"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Skull, ChevronRight } from "lucide-react";
import { animate } from "animejs";
import { cn } from "@core/lib/utils";

interface SevenDeadlySinsBannerProps {
    locale: string;
    title: string;
    description: string;
    className?: string;
}

export const SevenDeadlySinsBanner = ({
    locale,
    title,
    description,
    className,
}: SevenDeadlySinsBannerProps) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [isLocked, setIsLocked] = useState(false); // Can be dynamic based on date
    const [isHolding, setIsHolding] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Animation References
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const holdAnimation = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shakeAnimation = useRef<any>(null);

    const UNLOCK_DATE = new Date("2026-02-20T00:00:00").getTime();

    useEffect(() => {
        setIsLocked(Date.now() < UNLOCK_DATE);
    }, [UNLOCK_DATE]);

    const handleHoldStart = (e: React.MouseEvent | React.TouchEvent) => {
        // Prevent default to avoid context menu on long press
        // e.preventDefault(); 
        if (isSuccess) return;

        setIsHolding(true);

        // 1. Shake Effect on Text/Icon
        if (textRef.current) {
            shakeAnimation.current = animate(textRef.current, {
                translateX: [-2, 2, -2, 2, 0],
                duration: 100,
                loop: true,
                easing: "linear",
            });
        }

        // 2. Progress Bar Animation
        if (progressRef.current) {
            holdAnimation.current = animate(progressRef.current, {
                width: ["0%", "100%"],
                duration: 2000,
                easing: "linear",
                onComplete: () => {
                   handleSuccess();
                }
            });
        }

        // 3. Container Rumble (Optional subtle scale)
        if (containerRef.current) {
            animate(containerRef.current, {
                scale: 0.98,
                duration: 2000,
                easing: "easeOutQuad",
            });
        }
    };

    const handleHoldEnd = () => {
        if (isSuccess) return;

        setIsHolding(false);

        // Cancel Shake
        if (shakeAnimation.current) {
            shakeAnimation.current.pause();
            // Reset position
            if (textRef.current) {
                 animate(textRef.current, { translateX: 0, duration: 200 });
            }
        }

        // Reverse Progress
        if (holdAnimation.current) {
            holdAnimation.current.pause();
        }
        
        if (progressRef.current) {
            animate(progressRef.current, {
                width: "0%",
                duration: 300,
                easing: "easeOutQuad",
            });
        }

        // Reset Scale
        if (containerRef.current) {
            animate(containerRef.current, {
                scale: 1,
                duration: 300,
                easing: "easeOutElastic(1, .8)",
            });
        }
    };

    const handleSuccess = () => {
        setIsSuccess(true);
        setIsHolding(false);
        
        // Stop Shake
        if (shakeAnimation.current) shakeAnimation.current.pause();

        // Success Flash Animation
        if (overlayRef.current) {
             animate(overlayRef.current, {
                opacity: [0, 1, 0],
                duration: 500,
                easing: "easeOutQuad",
             });
        }

        // Scale Up and Navigate
        if (containerRef.current) {
            animate(containerRef.current, {
                scale: [0.98, 1.05],
                duration: 400,
                easing: "easeOutExpo",
                onComplete: () => {
                    router.push(`/${locale}/wiki/ego-system/sins`);
                }
            });
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            className={cn(
                "relative w-full h-64 md:h-72 rounded-xl overflow-hidden group/banner cursor-pointer select-none",
                "border border-neon-red/30 bg-black/40",
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg/sins_bg.png"
                    alt="Sins Background"
                    className="w-full h-full object-cover opacity-60 group-hover/banner:opacity-80 transition-opacity duration-700 grayscale group-hover/banner:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-[url('/effects/grid.svg')] opacity-10 mix-blend-overlay" />
            </div>

            {/* Hold Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 h-1 md:h-2 bg-neon-red z-20 w-0" ref={progressRef} />

            {/* Success Overlay */}
            <div ref={overlayRef} className="absolute inset-0 bg-white pointer-events-none opacity-0 z-50 mix-blend-overlay" />

            {/* Content */}
            <div ref={textRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                
                {/* Status Indicator */}
                <div className={cn(
                    "mb-6 px-4 py-1.5 rounded-full border flex items-center gap-2 backdrop-blur-sm transition-colors",
                    isLocked 
                        ? "border-neon-red/50 bg-neon-red/10 text-neon-red" 
                        : "border-neon-purple/50 bg-neon-purple/10 text-neon-purple"
                )}>
                    {isLocked ? <Lock size={14} /> : <Skull size={14} />}
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">
                        {isLocked ? "SEALED // CLASSIFIED" : "UNLOCKED // DANGER"}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className="font-display font-black text-5xl md:text-7xl text-white mb-4 tracking-tight group-hover/banner:text-neon-red transition-colors duration-500">
                    {title}
                </h2>

                {/* Instructions */}
                <p className="font-sans text-white/60 text-sm md:text-base max-w-xl mx-auto flex items-center justify-center gap-2">
                    <span className={cn("transition-all duration-300", isHolding ? "text-neon-red animate-pulse" : "")}>
                        {isHolding 
                            ? (locale === "vi" ? "ĐANG KẾT NỐI..." : "ESTABLISHING CONNECTION...") 
                            : description}
                    </span>
                    {!isHolding && <ChevronRight size={16} className="text-neon-red animate-bounce-x" />}
                </p>

                {/* Decorative Tech Elements */}
                <div className="absolute top-8 left-8 w-16 h-[1px] bg-white/20" />
                <div className="absolute top-8 left-8 w-[1px] h-16 bg-white/20" />
                
                <div className="absolute bottom-8 right-8 w-16 h-[1px] bg-white/20" />
                <div className="absolute bottom-8 right-8 w-[1px] h-16 bg-white/20" />

                {/* Date Code */}
                <div className="absolute bottom-6 right-8 font-mono text-[10px] text-white/20 tracking-widest hidden md:block">
                    PROJECT_SINS_V1.0 // {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
};
