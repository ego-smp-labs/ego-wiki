"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-void-surface border border-void-border justify-between flex flex-col space-y-4 cursor-pointer relative overflow-hidden",
                className
            )}
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity" />

            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
                <div className="text-neon-cyan mb-2">
                    {icon}
                </div>
                <div className="font-display font-bold text-neutral-200 mb-2 mt-2 text-xl">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-400 text-sm">
                    {description}
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-purple/20 to-transparent rounded-bl-3xl opacity-50 group-hover/bento:opacity-100 transition-opacity" />
        </motion.div>
    );
};
