"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe } from "lucide-react";
import { getTranslations, LOCALES } from "@core/lib/i18n";
import AuthButton from "@presentation/components/auth/AuthButton";

interface NavbarProps {
    locale: string;
    onSearchClick?: () => void;
}

interface NavLink {
    href: string;
    label: string;
    external?: boolean;
}

export default function Navbar({ locale, onSearchClick }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const pathname = usePathname();
    const t = getTranslations(locale);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                onSearchClick?.();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onSearchClick]);

    const getLocalePath = useCallback(
        (newLocale: string) => {
            const segments = pathname.split("/");
            segments[1] = newLocale;
            return segments.join("/");
        },
        [pathname]
    );

    const navLinks: NavLink[] = [
        { href: `/${locale}`, label: t.nav.home },
        { href: `/${locale}/wiki`, label: t.nav.wiki },
        { href: `/${locale}/faq`, label: t.nav.faq },
        { href: `/${locale}/changelog`, label: locale === "vi" ? "Changelog" : "Changelog" },
        { href: "https://discord.gg/jRqnNbupj4", label: t.nav.discord, external: true },
    ];

    const headerClass = isScrolled
        ? "bg-void-surface/90 backdrop-blur-md border-b border-void-border"
        : "bg-transparent";

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={`/${locale}`} className="flex items-center gap-2 group">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-neon-purple/20 blur-xl rounded-full scale-150 opacity-50" />
                        <img 
                            src="/logo_icon.png" 
                            alt="EGO WIKI" 
                            className="h-10 w-auto object-contain relative z-10 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                        />
                    </motion.div>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className={`text-sm font-medium transition-colors link-underline ${pathname === link.href
                                    ? "text-neon-cyan"
                                    : "text-white/70 hover:text-white"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onSearchClick}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-surface border border-void-border hover:border-void-border-light transition-colors text-white/60 hover:text-white"
                    >
                        <Search size={16} />
                        <span className="text-sm">{t.nav.search}</span>
                        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-void-bg rounded border border-void-border">
                            ⌘K
                        </kbd>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-void-border hover:border-neon-cyan/50 transition-colors text-white/80 hover:text-white"
                        >
                            <Globe size={16} />
                            <span className="text-sm uppercase">{locale}</span>
                        </button>

                        <AnimatePresence>
                            {showLangMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 top-full mt-2 py-2 min-w-[100px] bg-void-surface border border-void-border rounded-lg shadow-lg"
                                >
                                    {LOCALES.map((loc) => (
                                        <Link
                                            key={loc}
                                            href={getLocalePath(loc)}
                                            onClick={() => setShowLangMenu(false)}
                                            className={`block px-4 py-2 text-sm transition-colors ${locale === loc
                                                    ? "text-neon-cyan bg-void-bg"
                                                    : "text-white/70 hover:text-white hover:bg-void-bg/50"
                                                }`}
                                        >
                                            {loc === "vi" ? "🇻🇳 Tiếng Việt" : "🇬🇧 English"}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Auth Button */}
                    <AuthButton />

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white/80 hover:text-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-void-surface border-b border-void-border"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-medium py-2 ${pathname === link.href
                                            ? "text-neon-cyan"
                                            : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    onSearchClick?.();
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-bg border border-void-border text-white/60"
                            >
                                <Search size={16} />
                                <span className="text-sm">{t.nav.searchPlaceholder}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
