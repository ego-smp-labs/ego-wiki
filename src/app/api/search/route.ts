import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@core/lib/search";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get("q") || "").substring(0, 100);
    const locale = searchParams.get("locale") || "vi";
    let limit = parseInt(searchParams.get("limit") || "10", 10);

    // Sentinel: Cap limit to prevent DoS
    if (isNaN(limit)) limit = 10;
    limit = Math.min(Math.max(limit, 1), 50);

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
