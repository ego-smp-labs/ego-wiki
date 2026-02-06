import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@core/config/auth";
import { LOCALES, DEFAULT_LOCALE } from "@core/lib/i18n";

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

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // 1. Skip static files and API (handled by matcher, but double check)
    if (shouldSkipMiddleware(pathname)) {
        return NextResponse.next();
    }

    // 2. Admin Route Protection (Example)
    const isLoggedIn = !!req.auth;
    const isAdminRoute = pathname.includes("/admin");

    if (isAdminRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // 3. i18n Redirects
    const pathnameLocale = getPathnameLocale(pathname);
    if (pathnameLocale) {
        return NextResponse.next();
    }

    const acceptLanguage = req.headers.get("accept-language") || "";
    const detectedLocale = detectLocaleFromHeaders(acceptLanguage);

    const url = req.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname}`;

    return NextResponse.redirect(url);
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
