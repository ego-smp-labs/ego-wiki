import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getAllCategories } from "@/lib/mdx";
import { getTranslations } from "@/lib/i18n";
import CategoryCard from "@/components/ui/CategoryCard";
import Sidebar from "@/components/layout/Sidebar";

interface WikiPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: WikiPageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Wiki",
        description:
            locale === "vi"
                ? "Tất cả tài liệu và hướng dẫn cho Ego SMP"
                : "All documentation and guides for Ego SMP",
    };
}

function buildCategoryArticleCounts(
    categories: ReturnType<typeof getAllCategories>
): Map<string, number> {
    return new Map(
        categories.map((cat) => [cat.slug, cat.articles.length])
    );
}

export default async function WikiPage({ params }: WikiPageProps) {
    const { locale } = await params;
    const t = getTranslations(locale);
    const categories = getAllCategories(locale);
    const categoryArticleCounts = buildCategoryArticleCounts(categories);

    const pageSubtitle = locale === "vi"
        ? "Khám phá tất cả tài liệu về Ego SMP"
        : "Explore all Ego SMP documentation";

    const recentUpdatesTitle = locale === "vi" ? "Cập nhật gần đây" : "Recent Updates";
    const comingSoonText = locale === "vi"
        ? "Tính năng đang phát triển..."
        : "Feature coming soon...";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex gap-8">
                <Sidebar locale={locale} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                        <Link
                            href={`/${locale}`}
                            className="hover:text-neon-cyan transition-colors"
                        >
                            {t.nav.home}
                        </Link>
                        <span>/</span>
                        <span className="text-white/60">Wiki</span>
                    </div>

                    <h1 className="font-display text-4xl font-bold text-white mb-2">
                        <span className="text-neon-cyan">#</span> Wiki
                    </h1>
                    <p className="text-white/50 mb-10">
                        {pageSubtitle}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="mt-16">
                        <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-neon-purple">#</span>
                            {recentUpdatesTitle}
                        </h2>
                        <div className="p-6 rounded-xl bg-void-surface border border-void-border text-center">
                            <p className="text-white/40">
                                {comingSoonText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
