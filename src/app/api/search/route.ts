import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@core/lib/search";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let query = searchParams.get("q") || "";
    const locale = searchParams.get("locale") || "vi";
    let limit = parseInt(searchParams.get("limit") || "10", 10);

    // Input Validation: Cap query length to prevent DoS via large strings
    if (query.length > 100) {
        query = query.substring(0, 100);
    }

    // Input Validation: Validate and cap limit to prevent large result sets
    if (isNaN(limit) || limit < 1) {
        limit = 10;
    } else if (limit > 50) {
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
