import { Metadata } from "next";
import Link from "next/link";
import { Book, Skull, Zap, Hammer, Archive, MessageSquare, Clock } from "lucide-react";
import { getTranslations } from "@core/lib/i18n";
import ServerStatusCard from "@presentation/components/ui/ServerStatusCard";
import { BentoGrid, BentoGridItem } from "@presentation/components/ui/BentoGrid";
import HeroSection from "@presentation/components/ui/HeroSection";
import { getRecentUpdates } from "@core/lib/changelog";
import { SinsCard } from "@presentation/components/ui/SinsCard";

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
        // SINS Item (Custom)
        {
            isSins: true,
            title: locale === "vi" ? "Thất Đại Tội" : "Seven Deadly Sins",
            description: locale === "vi"
                ? "Khế ước cấm. Giữ để gia nhập."
                : "Forbidden covenant. Hold to join.",
            className: "md:col-span-2 md:row-span-1", // 2:1 ratio roughly
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
            className: "md:col-span-1",
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
            <section className="max-w-7xl mx-auto px-4 mb-16">
                <ServerStatusCard locale={locale} />
            </section>

            {/* Recent Updates Section */}
            <section className="max-w-7xl mx-auto px-4 mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-neon-cyan animate-pulse" size={24} />
                    <h2 className="text-2xl font-display font-bold text-white tracking-wide">
                        {locale === "vi" ? "CẬP NHẬT GẦN ĐÂY" : "RECENT UPDATES"}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentUpdates.map((update, i) => (
                        <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-display font-bold text-lg text-neon-cyan">{update.version}</h3>
                                <span className="text-xs text-white/40 font-mono">{update.date}</span>
                            </div>
                            <h4 className="text-white font-medium mb-3">{update.title}</h4>
                            <ul className="space-y-2">
                                {update.content.map((point, j) => (
                                    <li key={j} className="text-sm text-white/60 flex items-start gap-2">
                                        <span className="text-neon-purple mt-1">•</span>
                                        {point.replace(/^- /, "")}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
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
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (item as any).isSins ? (
                            <SinsCard
                                key={i}
                                locale={locale}
                                title={item.title}
                                description={item.description}
                                className={item.className}
                            />
                        ) : (
                            <Link key={i} href={(item as any).href} className={item.className}>
                                <BentoGridItem
                                    title={item.title}
                                    description={item.description}
                                    header={(item as any).header}
                                    icon={(item as any).icon}
                                    className="h-full"
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    variant={(item as any).variant}
                                />
                            </Link>
                        )
                    ))}
                </BentoGrid>
            </section>
        </div>
    );
}
