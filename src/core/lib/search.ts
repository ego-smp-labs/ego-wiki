import Fuse, { FuseResultMatch, IFuseOptions } from "fuse.js";
import { WikiService, type ArticleMeta } from "@core/services/WikiService";

export interface SearchableArticle extends ArticleMeta {
    content: string;
}

export interface SearchResult extends ArticleMeta {
    score: number;
    matches?: readonly FuseResultMatch[];
    excerpt?: string;
}

const FUSE_OPTIONS: IFuseOptions<SearchableArticle> = {
    keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.2 },
        { name: "headings.text", weight: 0.3 },
        { name: "category", weight: 0.1 },
        { name: "content", weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
};

const searchIndexCache = new Map<string, Fuse<SearchableArticle>>();

export function buildSearchIndex(locale: string): Fuse<SearchableArticle> {
    if (searchIndexCache.has(locale)) {
        return searchIndexCache.get(locale)!;
    }

    const wikiService = WikiService.getInstance();
    const articleMetas = wikiService.getAllArticles(locale);
    
    // Fetch content for indexing
    const searchableArticles: SearchableArticle[] = articleMetas.map(meta => {
        const fullArticle = wikiService.getArticle(locale, meta.category, meta.slug);
        return {
            ...meta,
            content: fullArticle ? fullArticle.rawContent : "",
        };
    });

    const fuse = new Fuse(searchableArticles, FUSE_OPTIONS);
    searchIndexCache.set(locale, fuse);

    return fuse;
}

export function searchArticles(
    query: string,
    locale: string,
    limit: number = 10
): SearchResult[] {
    if (!query || query.length < 2) {
        return [];
    }

    const fuse = buildSearchIndex(locale);
    const results = fuse.search(query, { limit });

    return results.map((result) => {
        let excerpt = result.item.description || "";

        if (result.matches) {
            const contentMatch = result.matches.find(m => m.key === "content");
            if (contentMatch && contentMatch.value) {
                const matchIndex = contentMatch.indices[0];
                const start = Math.max(0, matchIndex[0] - 40);
                const end = Math.min(contentMatch.value.length, matchIndex[1] + 40);
                
                excerpt = contentMatch.value.substring(start, end).replace(/\n/g, " ").trim();
                
                // Add ellipsis if truncated
                if (start > 0) excerpt = "..." + excerpt;
                if (end < contentMatch.value.length) excerpt = excerpt + "...";
            } else {
                const headingMatch = result.matches.find(m => m.key === "headings.text");
                if (headingMatch && headingMatch.value) {
                    excerpt = `Heading: ${headingMatch.value}`;
                }
            }
        }

        // Omit the 'content' field to prevent huge network payloads
        const { content, ...metaOnly } = result.item;

        return {
            ...metaOnly,
            score: result.score || 0,
            matches: result.matches,
            excerpt,
        };
    });
}

export function clearSearchCache(): void {
    searchIndexCache.clear();
}
