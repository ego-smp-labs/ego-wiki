import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, getCategory, getCategoryTitle } from "@core/lib/categories";
import { WikiService } from "@core/services/WikiService";
import { getTranslations } from "@core/lib/i18n";
import Sidebar from "@presentation/components/layout/Sidebar";

interface CategoryPageProps {
    params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const { locale, category } = await params;
    const title = getCategoryTitle(category, locale);

    return {
        title: title,
        description: `${title} - Ego SMP Wiki`,
    };
}

export async function generateStaticParams() {
    const params: { locale: string; category: string }[] = [];

    for (const locale of ["vi", "en"]) {
        for (const category of CATEGORIES) {
            params.push({ locale, category: category.slug });
        }
    }

    return params;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { locale, category: categorySlug } = await params;
    const t = getTranslations(locale);
    const wikiService = WikiService.getInstance();

    const category = getCategory(categorySlug);
    if (!category) {
        notFound();
    }

    const articles = wikiService.getCategoryArticles(locale, categorySlug);
    const Icon = category.icon;
    const title = locale === "vi" ? category.title.vi : category.title.en;
    const description = locale === "vi" ? category.description.vi : category.description.en;

    const emptyStateText = locale === "vi"
        ? "Chưa có bài viết trong danh mục này"
        : "No articles in this category yet";

    const iconColorClass = category.color === "cyan" ? "text-neon-cyan" : "text-neon-purple";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex gap-8">
                <Sidebar
                    locale={locale}
                    currentCategory={categorySlug}
                    articles={articles}
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                        <Link
                            href={`/${locale}`}
                            className="hover:text-neon-cyan transition-colors"
                        >
                            {t.nav.home}
                        </Link>
                        <span>/</span>
                        <Link
                            href={`/${locale}/wiki`}
                            className="hover:text-neon-cyan transition-colors"
                        >
                            Wiki
                        </Link>
                        <span>/</span>
                        <span className="text-white/60">{title}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-10">
                        <div className={`p-4 rounded-xl bg-void-surface border border-void-border ${iconColorClass}`}>
                            <Icon size={32} />
                        </div>
                        <div>
                            <h1 className="font-display text-3xl font-bold text-white mb-2">
                                {title}
                            </h1>
                            <p className="text-white/50">{description}</p>
                        </div>
                    </div>

                    {articles.length > 0 ? (
                        <div className="space-y-3">
                            {articles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/${locale}/wiki/${categorySlug}/${article.slug}`}
                                    className="group flex items-center gap-4 p-5 rounded-xl bg-void-surface border border-void-border hover:border-neon-cyan/30 transition-all"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-void-bg border border-void-border font-mono text-sm text-white/40 group-hover:text-neon-cyan group-hover:border-neon-cyan/30 transition-colors">
                                        {String(article.order).padStart(2, "0")}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-white group-hover:text-neon-cyan transition-colors">
                                            {article.title}
                                        </h3>
                                        {article.description && (
                                            <p className="text-sm text-white/40 truncate mt-1">
                                                {article.description}
                                            </p>
                                        )}
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className="text-white/20 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all"
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 rounded-xl bg-void-surface border border-void-border text-center">
                            <p className="text-white/40">
                                {emptyStateText}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
