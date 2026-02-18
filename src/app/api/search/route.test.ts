import { expect, test, mock, describe, beforeEach } from "bun:test";

// Mock @core/lib/search BEFORE importing route.ts
const searchArticlesMock = mock((query, locale, limit) => []);
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
const { GET } = await import("./route");

describe("Search API", () => {
    beforeEach(() => {
        searchArticlesMock.mockClear();
    });

    test("should cap long queries and limit", async () => {
        const longQuery = "a".repeat(200);
        // Create mock request
        const { NextRequest } = await import("next/server");
        // @ts-ignore
        const req = new NextRequest(`http://localhost/api/search?q=${longQuery}&limit=1000`);

        await GET(req);

        // Expectation: query truncated to 100 chars, limit capped at 50
        expect(searchArticlesMock).toHaveBeenCalledWith(longQuery.slice(0, 100), "vi", 50);
    });

    test("should handle valid query and limit", async () => {
        const query = "test";
        const limit = 20;
        const { NextRequest } = await import("next/server");
        // @ts-ignore
        const req = new NextRequest(`http://localhost/api/search?q=${query}&limit=${limit}`);

        await GET(req);

        expect(searchArticlesMock).toHaveBeenCalledWith(query, "vi", limit);
    });

    test("should ensure minimum limit is 1", async () => {
        const query = "test";
        const limit = -5;
        const { NextRequest } = await import("next/server");
        // @ts-ignore
        const req = new NextRequest(`http://localhost/api/search?q=${query}&limit=${limit}`);

        await GET(req);

        expect(searchArticlesMock).toHaveBeenCalledWith(query, "vi", 1);
    });
});
