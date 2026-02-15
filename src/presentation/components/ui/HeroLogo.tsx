"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { animate } from "animejs";

/**
 * HeroLogo — `logo_icon.png` as hero logo.
 *
 * Default:   Grayscale image + colored particles floating around.
 * Hover:     Particles rush INTO the logo, filling it with color (grayscale → full color).
 * Release:   Particles scatter back outward, logo fades back to grayscale.
 */

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    scatterX: number;
    scatterY: number;
    color: string;
    size: number;
    angle: number;
    speed: number;
    orbitRadius: number;
}

export const HeroLogo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);
    const hoveredRef = useRef(false);
    const progressRef = useRef(0); // 0 = scattered, 1 = assembled
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const initializedRef = useRef(false);

    // Generate particles by sampling image colors
    const initParticles = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img || initializedRef.current) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Match canvas to image display size
        const rect = img.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Draw image to sample pixel colors
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        const imageData = ctx.getImageData(0, 0, rect.width, rect.height);
        const data = imageData.data;

        const particles: Particle[] = [];
        const gap = 5;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        for (let y = 0; y < rect.height; y += gap) {
            for (let x = 0; x < rect.width; x += gap) {
                const i = (y * rect.width + x) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                if (a < 50) continue;
                if (r < 20 && g < 20 && b < 20) continue;

                // Random scatter position (outside the logo bounds)
                const angle = Math.random() * Math.PI * 2;
                const scatterDist = 150 + Math.random() * 250;

                particles.push({
                    x: cx + Math.cos(angle) * scatterDist,
                    y: cy + Math.sin(angle) * scatterDist,
                    originX: x,
                    originY: y,
                    scatterX: cx + Math.cos(angle) * scatterDist,
                    scatterY: cy + Math.sin(angle) * scatterDist,
                    color: `rgb(${r},${g},${b})`,
                    size: gap * 0.7 + Math.random() * 0.6,
                    angle: angle,
                    speed: 0.003 + Math.random() * 0.005,
                    orbitRadius: scatterDist,
                });
            }
        }

        particlesRef.current = particles;
        initializedRef.current = true;
        ctx.clearRect(0, 0, rect.width, rect.height);
    }, []);

    // Main animation loop
    const startLoop = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        const tick = () => {
            ctx.clearRect(0, 0, w, h);
            const particles = particlesRef.current;
            const hovered = hoveredRef.current;

            // Smoothly interpolate progress
            const targetProgress = hovered ? 1 : 0;
            progressRef.current += (targetProgress - progressRef.current) * 0.06;
            const progress = progressRef.current;

            for (const p of particles) {
                // Update orbit angle for floating effect when scattered
                p.angle += p.speed;

                // Scattered position (orbiting)
                const floatX = cx + Math.cos(p.angle) * p.orbitRadius;
                const floatY = cy + Math.sin(p.angle) * p.orbitRadius;

                // Lerp between floating and assembled position
                p.x = floatX + (p.originX - floatX) * progress;
                p.y = floatY + (p.originY - floatY) * progress;

                // Fade particles: more visible when scattered, fade when assembled
                const alpha = progress < 0.9 ? 0.6 + progress * 0.4 : Math.max(0, 1 - (progress - 0.9) * 10);

                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;

                if (progress < 0.5) {
                    // Circular particles when floating
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Square pixels when assembling
                    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                }
            }

            ctx.globalAlpha = 1;
            animFrameRef.current = requestAnimationFrame(tick);
        };

        tick();
    }, []);

    const handleMouseEnter = useCallback(() => {
        hoveredRef.current = true;
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        hoveredRef.current = false;
        setIsHovered(false);
    }, []);

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

    // Start particle system when image loads
    useEffect(() => {
        if (!imageLoaded) return;

        // Small delay to ensure layout is stable
        const timer = setTimeout(() => {
            initParticles();
            startLoop();
        }, 100);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [imageLoaded, initParticles, startLoop]);

    return (
        <div
            ref={containerRef}
            className="relative mb-6 select-none cursor-pointer flex items-center justify-center opacity-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
        >
            {/* Glow behind the logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className={`w-[80%] h-[80%] rounded-full blur-[60px] transition-all duration-700 ${
                        isHovered
                            ? "bg-neon-purple/40 scale-125"
                            : "bg-neon-purple/15 scale-100"
                    }`}
                />
            </div>

            {/* The actual logo image */}
            <img
                ref={imgRef}
                src="/logo_icon.png"
                alt="EGO SMP"
                crossOrigin="anonymous"
                onLoad={() => setImageLoaded(true)}
                className={`relative z-10 w-auto max-w-[500px] h-auto max-h-[280px] md:max-w-[600px] md:max-h-[340px] object-contain transition-all duration-700 drop-shadow-[0_0_30px_rgba(123,0,255,0.4)] ${
                    isHovered
                        ? "grayscale-0 brightness-110"
                        : "grayscale brightness-75"
                }`}
            />

            {/* Particle canvas overlay */}
            <canvas
                ref={canvasRef}
                className="absolute z-20 inset-0 w-full h-full pointer-events-none"
            />

            {/* Hover hint text */}
            <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 text-white/30 text-xs font-mono tracking-widest transition-opacity duration-500 ${
                    isHovered ? "opacity-0" : "opacity-100 animate-pulse"
                }`}
            >
                HOVER TO AWAKEN
            </div>
        </div>
    );
};
