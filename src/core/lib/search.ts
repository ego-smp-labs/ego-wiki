import Fuse, { FuseResultMatch, IFuseOptions } from "fuse.js";
import { WikiService, type ArticleMeta } from "@core/services/WikiService";

export interface SearchableArticle extends ArticleMeta {
    content: string;
}

export interface SearchResult extends ArticleMeta {
    score: number;
    matches?: readonly FuseResultMatch[];
    excerpt?: string;
    hash?: string;
}

const FUSE_OPTIONS: IFuseOptions<SearchableArticle> = {
    keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.2 },
        { name: "headings.text", weight: 0.3 },
        { name: "category", weight: 0.1 },
        { name: "content", weight: 0.5 },
    ],
    threshold: 0.6,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
};

/**
 * Strip markdown/MDX syntax, frontmatter, and JSX tags from content
 * so Fuse.js can match plain text more accurately.
 */
function stripMarkdownSyntax(raw: string): string {
    return raw
        // Remove YAML frontmatter
        .replace(/^---[\s\S]*?---/m, "")
        // Remove JSX/HTML tags but keep their text attributes
        .replace(/<\w+[^>]*name="([^"]+)"[^>]*>/g, "$1")
        .replace(/<\/?[^>]+>/g, "")
        // Remove markdown link syntax, keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        // Remove markdown emphasis
        .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
        // Remove heading markers
        .replace(/^#{1,6}\s+/gm, "")
        // Remove blockquote markers
        .replace(/^>\s?/gm, "")
        // Collapse whitespace
        .replace(/\s+/g, " ")
        .trim();
}

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
            content: fullArticle ? stripMarkdownSyntax(fullArticle.rawContent) : "",
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
    // Sentinel: Get all matches first, then filter locked ones
    const allResults = fuse.search(query);

    const results = allResults
        .filter((result) => {
            // Sentinel: Filter out locked articles to prevent information disclosure
            if (result.item.lockedUntil) {
                const unlockDate = new Date(result.item.lockedUntil).getTime();
                if (Date.now() < unlockDate) {
                    return false;
                }
            }
            return true;
        })
        .slice(0, limit);

    return results.map((result) => {
        let excerpt = result.item.description || "";
        let hash = "";

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

                // Find the nearest heading before the match index
                const contentUpToMatch = contentMatch.value.substring(0, matchIndex[0]);
                let highestIndex = -1;

                if (result.item.headings && Array.isArray(result.item.headings)) {
                    result.item.headings.forEach(h => {
                        // Look for the heading text directly or its usage inside ItemCard
                        const idx = contentUpToMatch.lastIndexOf(h.text);
                        const nameAttrIdx = contentUpToMatch.lastIndexOf(`name="${h.text}"`);

                        // For ItemCard, if we have markdown inside it, its position is what matters
                        const bestIdx = Math.max(idx, nameAttrIdx);
                        if (bestIdx > highestIndex) {
                            highestIndex = bestIdx;
                            hash = h.slug;
                        }
                    });
                }
            } else {
                const headingMatch = result.matches.find(m => m.key === "headings.text");
                if (headingMatch && headingMatch.value) {
                    excerpt = `Heading: ${headingMatch.value}`;
                    const matchedHeading = result.item.headings?.find(h => h.text === headingMatch.value);
                    if (matchedHeading) hash = matchedHeading.slug;
                }
            }
        }

        // Omit the 'content' field to prevent huge network payloads
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content, ...metaOnly } = result.item;

        return {
            ...metaOnly,
            score: result.score || 0,
            matches: result.matches,
            excerpt,
            hash,
        };
    });
}

export function clearSearchCache(): void {
    searchIndexCache.clear();
}
