import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

const SKIP_PATTERNS = ["/api", "/_next", "/favicon"];

function shouldSkipMiddleware(pathname: string): boolean {
    return SKIP_PATTERNS.some((pattern) => pathname.startsWith(pattern)) || pathname.includes(".");
}

function getPathnameLocale(pathname: string): string | undefined {
    return LOCALES.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
}

function detectLocaleFromHeaders(acceptLanguage: string): string {
    if (acceptLanguage.includes("vi")) return "vi";
    if (acceptLanguage.includes("en")) return "en";
    return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (shouldSkipMiddleware(pathname)) {
        return NextResponse.next();
    }

    const pathnameLocale = getPathnameLocale(pathname);
    if (pathnameLocale) {
        return NextResponse.next();
    }

    const acceptLanguage = request.headers.get("accept-language") || "";
    const detectedLocale = detectLocaleFromHeaders(acceptLanguage);

    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname}`;

    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
