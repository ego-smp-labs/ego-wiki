import { Metadata } from "next";
import Link from "next/link";
import { Book, Skull, Zap, Hammer, Archive, MessageSquare, Clock } from "lucide-react";
import { getTranslations } from "@core/lib/i18n";
import ServerStatusCard from "@presentation/components/ui/ServerStatusCard";
import { BentoGrid, BentoGridItem } from "@presentation/components/ui/BentoGrid";
import HeroSection from "@presentation/components/ui/HeroSection";
import { getRecentUpdates } from "@core/lib/changelog";
import { SevenDeadlySinsBanner } from "@presentation/components/dashboard/SevenDeadlySinsBanner";
import { RecentUpdatesGrid } from "@presentation/components/ui/RecentUpdatesGrid";

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === "vi" ? "Trang chủ" : "Home",
    };
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const t = getTranslations(locale);
    const recentUpdates = await getRecentUpdates(locale);

    const items = [
        {
            title: locale === "vi" ? "Thông tin chung" : "General Info",
            description: locale === "vi"
                ? "Các lệnh cơ bản, quy tắc, land claim và hướng dẫn người mới."
                : "Essential commands, rules, land claiming, and beginner guides.",
            image: "/bg/general_bg.png",
            icon: <Book className="h-6 w-6" />,
            href: `/${locale}/wiki/general`,
            className: "md:col-span-2",
            variant: "general",
        },
        {
            title: "EGO System",
            description: locale === "vi"
                ? "Mở khóa tiềm năng. Nâng cấp cấp bậc. Thu thập linh hồn."
                : "Unlock your potential. Level up. Harvest souls.",
            image: "/bg/egosystem_bg.png",
            icon: <Zap className="h-6 w-6" />,
            href: `/${locale}/wiki/ego-system`,
            className: "md:col-span-1",
            variant: "ego",
        },
        {
            title: locale === "vi" ? "Vật phẩm & Chế tạo" : "Items & Crafting",
            description: locale === "vi"
                ? "Công thức chế tạo vũ khí huyền thoại và vật phẩm cấm."
                : "Recipes for legendary weapons and forbidden artifacts.",
            image: "/bg/items_bg.png",
            icon: <Hammer className="h-6 w-6" />,
            href: `/${locale}/wiki/items`,
            className: "md:col-span-1",
            variant: "items",
        },
        {
            title: locale === "vi" ? "Nâng cao" : "Advanced",
            description: locale === "vi"
                ? "Cơ chế máy móc, tự động hóa và kỹ thuật nâng cao."
                : "Mechanics, automation, and advanced technical data.",
            image: "/bg/abyss-main.jpg",
            icon: <Archive className="h-6 w-6" />,
            href: `/${locale}/wiki/advanced`,
            className: "md:col-span-2",
            variant: "advanced",
        },
        // SINS Item (Custom)

    ];

    return (
        <div className="void-pattern min-h-screen">
            {/* Hero Section */}
            <HeroSection
                subtitle={t.hero.subtitle}
                searchPlaceholder={t.hero.searchPlaceholder}
                ctaText={t.hero.accessData}
            />

            {/* Status Section */}
            <section className="max-w-7xl mx-auto px-4 mb-16">
                <ServerStatusCard locale={locale} />
            </section>

            {/* Recent Updates Section */}
            {/* Recent Updates Section */}
            <section className="max-w-7xl mx-auto px-4 mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-neon-cyan animate-pulse" size={24} />
                    <h2 className="text-2xl font-display font-bold text-white tracking-wide">
                        {locale === "vi" ? "CẬP NHẬT GẦN ĐÂY" : "RECENT UPDATES"}
                    </h2>
                </div>
                {/* Extracted to client component for animation */}
                <RecentUpdatesGrid updates={recentUpdates} />
            </section>

            {/* Bento Grid Section */}
            <section className="max-w-7xl mx-auto px-4 pb-24">
                <div className="flex items-center gap-3 mb-8">
                    <Skull className="text-neon-purple animate-pulse" size={24} />
                    <h2 className="text-2xl font-display font-bold text-white tracking-wide">
                        {locale === "vi" ? "DỮ LIỆU HỆ THỐNG" : "SYSTEM DATABASE"}
                    </h2>
                </div>

                <BentoGrid>
                    {items.map((item, i) => (
                         // Skip Sins item if it somehow remains in data, though we filtered it out conceptually
                         // Note: We removed Sins from the items array, so we just render normal items here
                        <Link key={i} href={(item as any).href} className={item.className}>
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                image={(item as any).image}
                                icon={(item as any).icon}
                                className="h-full"
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                variant={(item as any).variant}
                            />
                        </Link>
                    ))}
                </BentoGrid>
            </section>

            {/* Seven Deadly Sins Banner Section */}
            <section className="max-w-7xl mx-auto px-4 pb-24">
                 <SevenDeadlySinsBanner
                    locale={locale}
                    // Hardcoded strings or use translation if available
                    title={locale === "vi" ? "Thất Đại Tội" : "Seven Deadly Sins"}
                    description={locale === "vi" ? "Khế ước cấm. Giữ để gia nhập." : "Forbidden covenant. Hold to join."}
                 />
            </section>
        </div>
    );
}
