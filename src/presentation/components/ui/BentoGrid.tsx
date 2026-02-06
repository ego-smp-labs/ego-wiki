"use client";

import { cn } from "@core/lib/utils";
import { motion } from "framer-motion";
import { GradientBorder } from "@presentation/components/ui/GradientBorder";

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
        <div className={cn("row-span-1", className)} onClick={onClick}>
            <GradientBorder className="h-full flex flex-col justify-between p-4 cursor-pointer" containerClassName="w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />

                {header}

                <div className="group-hover:translate-x-2 transition duration-200 relative z-10 pt-4">
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
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-purple/20 to-transparent rounded-bl-3xl opacity-50 group-hover:opacity-100 transition-opacity z-0" />
            </GradientBorder>
        </div>
    );
};
