"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { BentoGridItem } from "./BentoGrid";
import { HoldToEnter } from "./HoldToEnter";

interface SinsCardProps {
    locale: string;
    title: string;
    description: string;
    className?: string;
}

export const SinsCard = ({ locale, title, description, className }: SinsCardProps) => {
    const router = useRouter();

    const handleEnter = () => {
        router.push(`/${locale}/wiki/ego-system/05-sins`);
    };

    const header = (
        <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group/img">
           {/* Placeholder for Sins BG or Dark Void */}
            <div className="absolute inset-0 bg-black w-full h-full flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black" />
            </div>
            
             {/* Center Lock Image/Icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                 <Lock className="w-16 h-16 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
            </div>
        </div>
    );

    return (
        <HoldToEnter onComplete={handleEnter} className={className} duration={1500}>
            <BentoGridItem
                title={title}
                description={description}
                header={header}
                icon={<Lock className="h-4 w-4 text-red-500" />}
                className="h-full border-red-900/30 bg-black/40 hover:bg-red-900/10 transition-colors"
                variant="sins"
            />
        </HoldToEnter>
    );
};
