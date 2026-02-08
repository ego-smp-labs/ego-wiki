import Fuse, { FuseResultMatch, IFuseOptions } from "fuse.js";
import { WikiService, type ArticleMeta } from "@core/services/WikiService";

export interface SearchResult extends ArticleMeta {
    score: number;
    matches?: readonly FuseResultMatch[];
}

const FUSE_OPTIONS: IFuseOptions<ArticleMeta> = {
    keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.2 },
        { name: "headings.text", weight: 0.3 },
        { name: "category", weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
};

const searchIndexCache = new Map<string, Fuse<ArticleMeta>>();

export function buildSearchIndex(locale: string): Fuse<ArticleMeta> {
    if (searchIndexCache.has(locale)) {
        return searchIndexCache.get(locale)!;
    }

    const wikiService = WikiService.getInstance();
    const articles = wikiService.getAllArticles(locale);
    const fuse = new Fuse(articles, FUSE_OPTIONS);
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

    return results.map((result) => ({
        ...result.item,
        score: result.score || 0,
        matches: result.matches,
    }));
}

export function clearSearchCache(): void {
    searchIndexCache.clear();
}
