import { NextRequest, NextResponse } from "next/server";
import { WikiService } from "@core/services/WikiService";
import { buildSearchIndex, clearSearchCache } from "@core/lib/search";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "vi";
    const q = searchParams.get("q") || "";

    // Clear caches to force rebuild
    WikiService.getInstance().clearCache();
    clearSearchCache();

    const wikiService = WikiService.getInstance();
    const allArticles = wikiService.getAllArticles(locale);

    // Get details for each article
    const details = allArticles.map(meta => {
        const full = wikiService.getArticle(locale, meta.category, meta.slug);
        return {
            title: meta.title,
            category: meta.category,
            slug: meta.slug,
            headingsCount: meta.headings?.length || 0,
            headings: meta.headings?.map(h => ({ text: h.text, slug: h.slug })),
            contentLength: full?.rawContent?.length || 0,
            contentSnippet: full?.rawContent?.substring(0, 200) || "NO CONTENT",
            hasItemCard: full?.rawContent?.includes("<ItemCard") || false,
        };
    });

    // If query is provided, also test the search
    let searchResults: unknown[] = [];
    if (q.length >= 2) {
        const fuse = buildSearchIndex(locale);
        const results = fuse.search(q, { limit: 10 });
        searchResults = results.map(r => ({
            title: r.item.title,
            score: r.score,
            matchKeys: r.matches?.map(m => m.key),
        }));
    }

    return NextResponse.json({
        totalArticles: allArticles.length,
        articles: details,
        searchResults,
    });
}
