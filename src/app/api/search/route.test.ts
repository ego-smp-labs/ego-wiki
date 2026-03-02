import { describe, expect, test, mock, beforeAll } from "bun:test";
// NextRequest/NextResponse are mocked, so we don't import them from next/server
// But we might need types?
// Actually, if we use explicit any or proper mocks, we don't need the types.
// But to be safe, I'll remove the unused imports.

// Mock dependencies
mock.module("@core/lib/search", () => ({
    searchArticles: () => [{ title: "Test Article", slug: "test" }],
}));

mock.module("@core/lib/i18n", () => ({
    isValidLocale: (locale: string) => ["en", "vi"].includes(locale),
}));

class MockNextRequest {
    nextUrl: URL;
    constructor(url: string) {
        this.nextUrl = new URL(url);
    }
}

const MockNextResponse = {
    json: (body: unknown, init?: { status?: number }) => {
        return {
            json: async () => body,
            status: init?.status || 200,
        };
    },
};

mock.module("next/server", () => ({
    NextRequest: MockNextRequest,
    NextResponse: MockNextResponse,
}));

describe("Search API", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let GET: (request: any) => Promise<any>;

    beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const route = await import("./route");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        GET = route.GET;
    });

    test("returns 200 and results for valid request", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const req = new MockNextRequest("http://localhost/api/search?q=test&locale=en&limit=10") as any;
        const res = await GET(req);
        expect(res.status).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(json.results).toBeDefined();
    });

    test("returns 400 for invalid locale", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const req = new MockNextRequest("http://localhost/api/search?q=test&locale=fr") as any;
        const res = await GET(req);
        expect(res.status).toBe(400);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(json.error).toBe("Invalid locale");
    });

    test("returns 400 for limit > 50", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const req = new MockNextRequest("http://localhost/api/search?q=test&locale=en&limit=51") as any;
        const res = await GET(req);
        expect(res.status).toBe(400);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(json.error).toContain("Limit must be between");
    });

    test("returns 400 for limit < 1", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const req = new MockNextRequest("http://localhost/api/search?q=test&locale=en&limit=0") as any;
        const res = await GET(req);
        expect(res.status).toBe(400);
    });

    test("returns 400 for query > 100 chars", async () => {
        const longQuery = "a".repeat(101);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const req = new MockNextRequest(`http://localhost/api/search?q=${longQuery}&locale=en`) as any;
        const res = await GET(req);
        expect(res.status).toBe(400);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(json.error).toContain("Query must be less than");
    });
});
