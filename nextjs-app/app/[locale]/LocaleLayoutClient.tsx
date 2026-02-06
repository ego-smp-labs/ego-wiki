"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";
import FloatingParticles from "@/components/effects/FloatingParticles";

interface LocaleLayoutClientProps {
    children: React.ReactNode;
    locale: string;
}

export default function LocaleLayoutClient({
    children,
    locale,
}: LocaleLayoutClientProps) {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            {/* Background effects */}
            <FloatingParticles count={25} />

            {/* Navigation */}
            <Navbar locale={locale} onSearchClick={() => setSearchOpen(true)} />

            {/* Main Content */}
            <main className="relative z-10 min-h-screen pt-16">{children}</main>

            {/* Footer */}
            <Footer locale={locale} />

            {/* Command Palette */}
            <CommandPalette
                locale={locale}
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    );
}
