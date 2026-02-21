import { expect, test, mock, describe, beforeEach } from "bun:test";

// Mock @core/lib/search BEFORE importing route.ts
const searchArticlesMock = mock((query: string, locale: string, limit: number) => []);
mock.module("@core/lib/search", () => {
    return {
        searchArticles: searchArticlesMock
    };
});

// Mock next/server
mock.module("next/server", () => {
    return {
        NextRequest: class NextRequest {
            nextUrl: URL;
            constructor(url: string) {
                this.nextUrl = new URL(url);
            }
        },
        NextResponse: {
            json: (body: any, init?: any) => ({ body, init, status: init?.status || 200 })
        }
    };
});

// Import the route handler
// We use dynamic import to ensure mocks are applied
const { GET } = await import("./route");

describe("Search API", () => {
    beforeEach(() => {
        searchArticlesMock.mockClear();
    });

    test("should handle long queries by truncating and capping limit", async () => {
        const longQuery = "a".repeat(200);
        const { NextRequest } = await import("next/server");
        // @ts-ignore
        const req = new NextRequest(`http://localhost/api/search?q=${longQuery}&limit=1000`);

        await GET(req);

        // Expectation: query truncated to 100 chars, limit capped to 50
        expect(searchArticlesMock).toHaveBeenCalledWith(longQuery.substring(0, 100), "vi", 50);
    });

    test("should handle normal queries correctly", async () => {
        const { NextRequest } = await import("next/server");
        // @ts-ignore
        const req = new NextRequest(`http://localhost/api/search?q=test&limit=20`);

        await GET(req);

        expect(searchArticlesMock).toHaveBeenCalledWith("test", "vi", 20);
    });

    test("should handle invalid limit correctly", async () => {
        const { NextRequest } = await import("next/server");
        // @ts-ignore
        const req = new NextRequest(`http://localhost/api/search?q=test&limit=abc`);

        await GET(req);

        // limit should default to 10
        expect(searchArticlesMock).toHaveBeenCalledWith("test", "vi", 10);
    });
});
