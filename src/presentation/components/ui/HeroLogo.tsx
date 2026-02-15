"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { animate } from "animejs";

/**
 * HeroLogo — Displays `logo_icon.png` as the main hero logo.
 *
 * Default state:  Grayscale, slightly desaturated.
 * On hover:       Particles sweep across and "fill" the color back in.
 *                 Uses a canvas overlay with small colored squares that
 *                 scatter outward from the logo, revealing the full-color image beneath.
 */
export const HeroLogo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const animFrameRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);

    interface Particle {
        x: number;
        y: number;
        originX: number;
        originY: number;
        color: string;
        size: number;
        life: number;
        maxLife: number;
        vx: number;
        vy: number;
        delay: number;
    }

    // Generate particles from the image
    const generateParticles = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw image to canvas to sample colors
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const particles: Particle[] = [];
        const gap = 6; // Sample every 6px

        for (let y = 0; y < h; y += gap) {
            for (let x = 0; x < w; x += gap) {
                const i = (y * w + x) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                // Skip transparent pixels
                if (a < 50) continue;
                // Skip very dark pixels (background)
                if (r < 15 && g < 15 && b < 15) continue;

                const distFromCenter = Math.sqrt(
                    Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2)
                );
                const maxDist = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));

                particles.push({
                    x: x + (Math.random() - 0.5) * 200,
                    y: y + (Math.random() - 0.5) * 200,
                    originX: x,
                    originY: y,
                    color: `rgba(${r},${g},${b},${a / 255})`,
                    size: gap * 0.8 + Math.random() * 1,
                    life: 0,
                    maxLife: 60 + Math.random() * 40,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    delay: (distFromCenter / maxDist) * 30,
                });
            }
        }

        particlesRef.current = particles;
    }, []);

    // Animate particles converging to their positions
    const animateParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        let allDone = false;
        let frame = 0;

        const tick = () => {
            ctx.clearRect(0, 0, w, h);
            allDone = true;
            frame++;

            for (const p of particlesRef.current) {
                if (frame < p.delay) {
                    // Still waiting — draw at scattered position
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                    allDone = false;
                    continue;
                }

                p.life++;
                const progress = Math.min(p.life / p.maxLife, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

                // Lerp from scattered to origin
                p.x += (p.originX - p.x) * ease * 0.15;
                p.y += (p.originY - p.y) * ease * 0.15;

                ctx.globalAlpha = Math.min(progress * 2, 1);
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);

                if (progress < 1) allDone = false;
            }

            if (allDone) {
                // Fade out canvas, show the real colored image
                setIsRevealed(true);
                return;
            }

            animFrameRef.current = requestAnimationFrame(tick);
        };

        tick();
    }, []);

    // Handle hover start
    const handleMouseEnter = useCallback(() => {
        if (isRevealed) return; // Already revealed
        setIsHovered(true);
        generateParticles();
        animateParticles();
    }, [isRevealed, generateParticles, animateParticles]);

    // Entrance animation
    useEffect(() => {
        if (!containerRef.current) return;

        animate(containerRef.current, {
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 1000,
            delay: 200,
            easing: "easeOutCubic",
        });

        return () => {
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    // Set canvas dimensions when image loads
    const handleImageLoad = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;

        // Use display size
        const rect = img.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative mb-6 select-none cursor-pointer flex items-center justify-center opacity-0"
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleMouseEnter}
        >
            {/* Glow behind the logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className={`w-[80%] h-[80%] rounded-full blur-[60px] transition-all duration-1000 ${
                        isRevealed
                            ? "bg-neon-purple/30 scale-110"
                            : "bg-neon-purple/10 scale-100"
                    }`}
                />
            </div>

            {/* The actual logo image */}
            <img
                ref={imgRef}
                src="/logo_icon.png"
                alt="EGO SMP"
                onLoad={handleImageLoad}
                className={`relative z-10 w-auto max-w-[500px] h-auto max-h-[280px] md:max-w-[600px] md:max-h-[340px] object-contain transition-all duration-1000 drop-shadow-[0_0_30px_rgba(123,0,255,0.4)] ${
                    isRevealed
                        ? "grayscale-0 brightness-110"
                        : "grayscale brightness-75"
                }`}
            />

            {/* Particle canvas overlay */}
            <canvas
                ref={canvasRef}
                className={`absolute z-20 top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 ${
                    isRevealed ? "opacity-0" : "opacity-100"
                }`}
                style={{
                    maxWidth: "600px",
                    maxHeight: "340px",
                }}
            />

            {/* Hover hint text */}
            {!isHovered && !isRevealed && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-white/30 text-xs font-mono tracking-widest animate-pulse">
                    HOVER TO AWAKEN
                </div>
            )}
        </div>
    );
};
