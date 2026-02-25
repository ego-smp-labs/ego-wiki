import { describe, expect, test, mock } from "bun:test";
import { searchArticles, clearSearchCache } from "./search";

// Mock WikiService
mock.module("@core/services/WikiService", () => {
    return {
        WikiService: {
            getInstance: () => ({
                getAllArticles: () => [
                    {
                        slug: "locked-article",
                        title: "Locked Secret",
                        category: "secrets",
                        locale: "en",
                        headings: [],
                        lastUpdated: new Date().toISOString(),
                        lockedUntil: "2099-01-01", // Future date
                    },
                    {
                        slug: "public-article",
                        title: "Public Info",
                        category: "general",
                        locale: "en",
                        headings: [],
                        lastUpdated: new Date().toISOString(),
                    }
                ],
                getArticle: (_locale: string, _category: string, slug: string) => {
                    if (slug === "locked-article") {
                        return {
                            slug: "locked-article",
                            title: "Locked Secret",
                            content: "This is top secret content.",
                            rawContent: "This is top secret content.",
                            category: "secrets",
                            locale: "en",
                            headings: [],
                            lastUpdated: new Date().toISOString(),
                            lockedUntil: "2099-01-01",
                        };
                    }
                    if (slug === "public-article") {
                        return {
                            slug: "public-article",
                            title: "Public Info",
                            content: "This is public content.",
                            rawContent: "This is public content.",
                            category: "general",
                            locale: "en",
                            headings: [],
                            lastUpdated: new Date().toISOString(),
                        };
                    }
                    return null;
                }
            })
        }
    };
});

describe("searchArticles", () => {
    test("should not return locked articles", () => {
        clearSearchCache();
        const results = searchArticles("secret", "en");

        // This assertion should FAIL if the vulnerability exists
        expect(results).toHaveLength(0);
    });

    test("should return public articles", () => {
        clearSearchCache();
        const results = searchArticles("public", "en");
        expect(results).toHaveLength(1);
        expect(results[0].slug).toBe("public-article");
    });
});
