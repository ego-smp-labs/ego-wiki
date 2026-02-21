import { describe, it, expect, mock } from "bun:test";

// Mock next/server
mock.module("next/server", () => {
    return {
        NextRequest: class NextRequest extends Request {
            nextUrl: URL;
            constructor(url: string, init?: RequestInit) {
                super(url, init);
                this.nextUrl = new URL(url);
            }
        },
        NextResponse: class NextResponse extends Response {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            static json(body: any, init?: ResponseInit) {
                return new Response(JSON.stringify(body), {
                    ...init,
                    headers: {
                        "Content-Type": "application/json",
                        ...(init?.headers || {}),
                    },
                });
            }
        },
    };
});

// Mock auth module
mock.module("@core/config/auth", () => {
    return {
        auth: mock(() => Promise.resolve(null)), // Default to unauthenticated
    };
});

import { NextRequest } from "next/server";
import { GET } from "./route";
import { auth } from "@core/config/auth";

describe("GET /api/debug-search", () => {
    it("should deny unauthenticated access", async () => {
        // Reset mock to null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (auth as any).mockImplementation(() => Promise.resolve(null));

        const req = new NextRequest("http://localhost/api/debug-search?locale=vi");
        const res = await GET(req);

        expect(res.status).toBe(401);
    });

    it("should deny non-admin access", async () => {
        // Mock authenticated user but not admin
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (auth as any).mockImplementation(() => Promise.resolve({
            user: { isAdmin: false, id: "user123" }
        }));

        const req = new NextRequest("http://localhost/api/debug-search?locale=vi");
        const res = await GET(req);

        expect(res.status).toBe(401);
    });

    it("should allow admin access", async () => {
        // Mock admin session
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (auth as any).mockImplementation(() => Promise.resolve({
            user: { isAdmin: true, id: "admin123" }
        }));

        const req = new NextRequest("http://localhost/api/debug-search?locale=vi");
        const res = await GET(req);

        expect(res.status).toBe(200);

        const body = await res.json();
        expect(body).toHaveProperty("totalArticles");
    });
});
