import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CATEGORIES, getCategoryTitle } from "@core/lib/categories";
import {
    getArticle,
    getCategoryArticles,
    getArticleNavigation,
} from "@core/lib/mdx";
import { getTranslations } from "@core/lib/i18n";
import Sidebar from "@presentation/components/layout/Sidebar";
import { mdxComponents } from "@presentation/components/mdx/MdxComponents";

interface ArticlePageProps {
    params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateMetadata({
    params,
}: ArticlePageProps): Promise<Metadata> {
    const { locale, category, slug } = await params;
    const article = getArticle(locale, category, slug);

    if (!article) {
        return { title: "Not Found" };
    }

    return {
        title: article.title,
        description: article.description || `${article.title} - Ego SMP Wiki`,
    };
}

export async function generateStaticParams() {
    const params: { locale: string; category: string; slug: string }[] = [];

    for (const locale of ["vi", "en"]) {
        for (const category of CATEGORIES) {
            const articles = getCategoryArticles(locale, category.slug);
            for (const article of articles) {
                params.push({
                    locale,
                    category: category.slug,
                    slug: article.slug,
                });
            }
        }
    }

    return params;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { locale, category: categorySlug, slug } = await params;
    const t = getTranslations(locale);

    const article = getArticle(locale, categorySlug, slug);
    if (!article) {
        notFound();
    }

    const articles = getCategoryArticles(locale, categorySlug);
    const { prev, next } = getArticleNavigation(locale, categorySlug, slug);
    const categoryTitle = getCategoryTitle(categorySlug, locale);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex gap-8">
                {/* Sidebar */}
                <Sidebar
                    locale={locale}
                    currentCategory={categorySlug}
                    articles={articles}
                    headings={article.headings}
                />

                {/* Main Content */}
                <article className="flex-1 min-w-0 max-w-3xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-6 flex-wrap">
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
                        <Link
                            href={`/${locale}/wiki/${categorySlug}`}
                            className="hover:text-neon-cyan transition-colors"
                        >
                            {categoryTitle}
                        </Link>
                        <span>/</span>
                        <span className="text-white/60">{article.title}</span>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-invert max-w-none">
                        <MDXRemote
                            source={article.content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                },
                            }}
                        />
                    </div>

                    {/* Navigation */}
                    <div className="mt-16 pt-8 border-t border-void-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Previous */}
                            {prev ? (
                                <Link
                                    href={`/${locale}/wiki/${categorySlug}/${prev.slug}`}
                                    className="group flex flex-col p-4 rounded-xl bg-void-surface border border-void-border hover:border-neon-cyan/30 transition-all"
                                >
                                    <span className="text-xs text-white/40 flex items-center gap-1 mb-2">
                                        <ArrowLeft size={12} />
                                        {t.wiki.previousArticle}
                                    </span>
                                    <span className="font-medium text-white group-hover:text-neon-cyan transition-colors">
                                        {prev.title}
                                    </span>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {/* Next */}
                            {next && (
                                <Link
                                    href={`/${locale}/wiki/${categorySlug}/${next.slug}`}
                                    className="group flex flex-col p-4 rounded-xl bg-void-surface border border-void-border hover:border-neon-cyan/30 transition-all text-right md:col-start-2"
                                >
                                    <span className="text-xs text-white/40 flex items-center gap-1 justify-end mb-2">
                                        {t.wiki.nextArticle}
                                        <ArrowRight size={12} />
                                    </span>
                                    <span className="font-medium text-white group-hover:text-neon-cyan transition-colors">
                                        {next.title}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
