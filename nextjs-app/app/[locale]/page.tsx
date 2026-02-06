import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/categories";
import { getAllCategories } from "@/lib/mdx";
import ServerStatusCard from "@/components/ui/ServerStatusCard";
import CategoryCard from "@/components/ui/CategoryCard";
import HeroSearchBar from "@/components/ui/HeroSearchBar";

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

function buildCategoryArticleCounts(
    categories: ReturnType<typeof getAllCategories>
): Map<string, number> {
    return new Map(
        categories.map((cat) => [cat.slug, cat.articles.length])
    );
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const t = getTranslations(locale);
    const categories = getAllCategories(locale);
    const categoryArticleCounts = buildCategoryArticleCounts(categories);

    const ctaText = locale === "vi"
        ? "Kết nối với mạng lưới truyền thông được mã hóa để nhận cập nhật mới nhất."
        : "Connect to our encrypted communications network for live updates.";

    return (
        <div className="void-pattern">
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-void-surface/80 border border-void-border text-xs text-white/50">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span>VOID SYSTEM ONLINE</span>
                        </div>
                    </div>

                    <h1 className="text-center mb-4">
                        <span className="font-display text-6xl md:text-8xl font-black text-white tracking-tight">
                            <span className="text-glow-cyan text-neon-cyan">EGO</span>
                            <span className="text-white">WIKI</span>
                        </span>
                    </h1>

                    <p className="text-center text-white/50 text-lg md:text-xl mb-10 max-w-xl mx-auto">
                        {t.hero.subtitle}
                    </p>

                    <HeroSearchBar placeholder={t.hero.searchPlaceholder} />

                    <div className="flex justify-center mt-8">
                        <Link
                            href={`/${locale}/wiki`}
                            className="btn-primary inline-flex items-center gap-2 font-display"
                        >
                            <span>{t.hero.accessData}</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-4">
                    <ServerStatusCard locale={locale} />
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full" />
                            <h2 className="font-display text-xl font-bold text-white">
                                {t.wiki.title}
                            </h2>
                        </div>
                        <Link
                            href={`/${locale}/wiki`}
                            className="text-sm text-white/50 hover:text-neon-cyan transition-colors"
                        >
                            {t.wiki.viewFullIndex}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CATEGORIES.map((category, index) => (
                            <CategoryCard
                                key={category.slug}
                                categorySlug={category.slug}
                                categoryColor={category.color}
                                title={locale === "vi" ? category.title.vi : category.title.en}
                                description={locale === "vi" ? category.description.vi : category.description.en}
                                locale={locale}
                                articleCount={categoryArticleCounts.get(category.slug) || 0}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-void-surface to-neon-cyan/10" />
                        <div className="absolute inset-0 bg-void-pattern" />

                        <div className="relative px-8 py-12 md:py-16 text-center">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                ESTABLISH_LINK
                            </h2>
                            <p className="text-white/50 max-w-xl mx-auto mb-8">
                                {ctaText}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://discord.gg/egosmp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary inline-flex items-center gap-2"
                                >
                                    <span className="font-display">COMMS_CHANNEL</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
