import { describe, it, expect, mock, beforeAll } from "bun:test";
import { searchArticles, clearSearchCache } from "./search";

// Mock data
const publicArticle = {
    slug: "public-article",
    title: "Public Article",
    description: "This is public",
    category: "general",
    locale: "en",
    headings: [],
    content: "This is public content",
    rawContent: "This is public content",
    lockedUntil: undefined
};

const lockedArticle = {
    slug: "locked-article",
    title: "Locked Article",
    description: "This is locked",
    category: "classified",
    locale: "en",
    headings: [],
    content: "Top secret hidden content",
    rawContent: "Top secret hidden content",
    // Locked until far future
    lockedUntil: new Date(Date.now() + 100000000000).toISOString()
};

// Mock WikiService
mock.module("@core/services/WikiService", () => {
    return {
        WikiService: {
            getInstance: () => ({
                getAllArticles: () => [publicArticle, lockedArticle],
                getArticle: (locale: string, category: string, slug: string) => {
                    if (slug === "locked-article") return lockedArticle;
                    return publicArticle;
                }
            })
        }
    };
});

describe("searchArticles Security", () => {
    beforeAll(() => {
        clearSearchCache();
    });

    it("should find public articles", () => {
        const results = searchArticles("public", "en");
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].slug).toBe("public-article");
    });

    it("should NOT leak locked article content via search", () => {
        // Searching for content inside the locked article
        const results = searchArticles("secret", "en");

        // This should return NOTHING because the article is locked
        const locked = results.find(r => r.slug === "locked-article");

        // Before fix: This expects will fail (locked is defined)
        // After fix: This expect will pass (locked is undefined)
        expect(locked).toBeUndefined();
    });
});
