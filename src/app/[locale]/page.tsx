import { Metadata } from "next";
import Link from "next/link";
import { Book, Skull, Zap, Hammer, Archive, MessageSquare } from "lucide-react";
import { getTranslations } from "@core/lib/i18n";
import ServerStatusCard from "@presentation/components/ui/ServerStatusCard";
import { BentoGrid, BentoGridItem } from "@presentation/components/ui/BentoGrid";
import HeroSection from "@presentation/components/ui/HeroSection";

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

    const items = [
        {
            title: locale === "vi" ? "Thông tin chung" : "General Info",
            description: locale === "vi"
                ? "Các lệnh cơ bản, quy tắc, land claim và hướng dẫn người mới."
                : "Essential commands, rules, land claiming, and beginner guides.",
            header: (
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group/img">
                    <img src="/bg/general_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-bg/90 via-void-bg/40 to-transparent backdrop-blur-[1px]" />
                </div>
            ),
            icon: <Book className="h-4 w-4 text-neon-cyan" />,
            href: `/${locale}/wiki/general`,
            className: "md:col-span-2",
            variant: "general",
        },
        {
            title: "EGO System",
            description: locale === "vi"
                ? "Mở khóa tiềm năng. Nâng cấp cấp bậc. Thu thập linh hồn."
                : "Unlock your potential. Level up. Harvest souls.",
            header: (
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group/img">
                    <img src="/bg/egosystem_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-bg/90 via-neon-purple/10 to-transparent backdrop-blur-[1px]" />
                </div>
            ),
            icon: <Zap className="h-4 w-4 text-neon-purple" />,
            href: `/${locale}/wiki/ego-system`,
            className: "md:col-span-1",
            variant: "ego",
        },
        {
            title: locale === "vi" ? "Vật phẩm & Chế tạo" : "Items & Crafting",
            description: locale === "vi"
                ? "Công thức chế tạo vũ khí huyền thoại và vật phẩm cấm."
                : "Recipes for legendary weapons and forbidden artifacts.",
            header: (
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group/img">
                    <img src="/bg/items_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-bg/90 via-amber-500/5 to-transparent backdrop-blur-[1px]" />
                </div>
            ),
            icon: <Hammer className="h-4 w-4 text-amber-500" />,
            href: `/${locale}/wiki/items`,
            className: "md:col-span-1",
            variant: "items",
        },
        {
            title: locale === "vi" ? "Nâng cao" : "Advanced",
            description: locale === "vi"
                ? "Cơ chế máy móc, tự động hóa và kỹ thuật nâng cao."
                : "Mechanics, automation, and advanced technical data.",
            header: (
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group/img">
                    <img src="/bg/abyss-main.jpg" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-bg/90 via-emerald-500/5 to-transparent backdrop-blur-[1px]" />
                </div>
            ),
            icon: <Archive className="h-4 w-4 text-emerald-500" />,
            href: `/${locale}/wiki/advanced`,
            className: "md:col-span-2",
            variant: "advanced",
        },
        {
            title: locale === "vi" ? "Cộng đồng" : "Community",
            description: locale === "vi"
                ? "Sự kiện, thông báo và kênh Discord."
                : "Events, announcements, and Discord channels.",
            header: (
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group/img">
                    <img src="/bg/misc_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void-bg/90 via-blue-500/5 to-transparent backdrop-blur-[1px]" />
                </div>
            ),
            icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
            href: `/${locale}/wiki/miscellaneous`,
            className: "md:col-span-3",
            variant: "community",
        },
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
            <section className="max-w-7xl mx-auto px-4 mb-20">
                <ServerStatusCard locale={locale} />
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
                        <Link key={i} href={item.href} className={item.className}>
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                icon={item.icon}
                                className="h-full"
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                variant={item.variant as any}
                            />
                        </Link>
                    ))}
                </BentoGrid>
            </section>
        </div>
    );
}
