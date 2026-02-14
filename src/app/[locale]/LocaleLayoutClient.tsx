"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "@presentation/components/layout/Navbar";
import Footer from "@presentation/components/layout/Footer";
import CommandPalette from "@presentation/components/layout/CommandPalette";
import { GlobalBackground } from "@presentation/components/ui/GlobalBackground";
import FloatingParticles from "@presentation/components/effects/FloatingParticles";

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
        <SessionProvider>
            {/* Global Animated Background */}
            <GlobalBackground />

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
        </SessionProvider>
    );
}
