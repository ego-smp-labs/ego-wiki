import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import LocaleLayoutClient from "./LocaleLayoutClient";

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: LocaleLayoutProps): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: {
            default: "EGO WIKI | Knowledge from the Abyss",
            template: "%s | EGO WIKI",
        },
        description:
            locale === "vi"
                ? "Tri thức từ Vực Thẳm. Hướng dẫn đầy đủ cho Ego SMP Minecraft Server."
                : "Knowledge from the Abyss. Complete guide for Ego SMP Minecraft Server.",
        keywords: ["Minecraft", "SMP", "Ego", "Wiki", "PvP", "Tier System"],
        openGraph: {
            title: "EGO WIKI",
            description: "Knowledge from the Abyss",
            type: "website",
            locale: locale === "vi" ? "vi_VN" : "en_US",
        },
    };
}

export async function generateStaticParams() {
    return [{ locale: "vi" }, { locale: "en" }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return <LocaleLayoutClient locale={locale}>{children}</LocaleLayoutClient>;
}
