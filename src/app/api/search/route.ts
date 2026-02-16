import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@core/lib/search";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get("q") || "").trim();
    const locale = searchParams.get("locale") || "vi";
    let limit = parseInt(searchParams.get("limit") || "10", 10);

    // Sentinel: Security validation
    if (query.length > 100) {
        return NextResponse.json(
            { error: "Query too long (max 100 chars)" },
            { status: 400 }
        );
    }

    // Limit the number of results to prevent large payloads
    if (isNaN(limit) || limit < 1) {
        limit = 10;
    }
    if (limit > 50) {
        limit = 50;
    }

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    try {
        const results = searchArticles(query, locale, limit);
        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ results: [], error: "Search failed" });
    }
}
