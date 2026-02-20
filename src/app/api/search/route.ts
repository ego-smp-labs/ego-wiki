import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@core/lib/search";
import { isValidLocale } from "@core/lib/i18n";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const locale = searchParams.get("locale") || "vi";
    const limitParam = searchParams.get("limit");

    // Sentinel: Validate locale to prevent cache poisoning
    if (!isValidLocale(locale)) {
        return NextResponse.json(
            { error: "Invalid locale" },
            { status: 400 }
        );
    }

    // Sentinel: Validate query length to prevent excessive processing (DoS)
    if (query.length > 100) {
        return NextResponse.json(
            { error: "Query too long (max 100 chars)" },
            { status: 400 }
        );
    }

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    // Sentinel: Validate limit to prevent large payloads (DoS)
    let limit = 10;
    if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10);
        if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
            return NextResponse.json(
                { error: "Limit must be between 1 and 50" },
                { status: 400 }
            );
        }
        limit = parsedLimit;
    }

    try {
        const results = searchArticles(query, locale, limit);
        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ results: [], error: "Search failed" });
    }
}
