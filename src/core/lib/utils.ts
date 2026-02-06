import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Glassmorphism Utilities
export const glass = {
    // Base glass effect
    base: "bg-white/[0.05] backdrop-blur-[12px] border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",

    // Interactive glass (hover states)
    interactive: "hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300",

    // High intensity (for modals/popovers)
    high: "bg-void-surface/[0.8] backdrop-blur-[16px] border border-void-border shadow-2xl",

    // Text content on glass
    text: "text-white/90 drop-shadow-md",
};
