import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@core/lib/search";
import { isValidLocale } from "@core/lib/i18n";

const MAX_QUERY_LENGTH = 100;
const MAX_LIMIT = 50;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const locale = searchParams.get("locale") || "vi";
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Validate locale
    if (!isValidLocale(locale)) {
        return NextResponse.json(
            { error: "Invalid locale" },
            { status: 400 }
        );
    }

    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > MAX_LIMIT) {
        return NextResponse.json(
            { error: `Limit must be between 1 and ${MAX_LIMIT}` },
            { status: 400 }
        );
    }

    // Validate query length
    if (query.length > MAX_QUERY_LENGTH) {
        return NextResponse.json(
            { error: `Query must be less than ${MAX_QUERY_LENGTH} characters` },
            { status: 400 }
        );
    }

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    try {
        const results = searchArticles(query, locale, limit);
        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { results: [], error: "Search failed" },
            { status: 500 }
        );
    }
}
