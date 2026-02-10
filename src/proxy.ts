import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@core/config/auth";
import { LOCALES, DEFAULT_LOCALE } from "@core/lib/i18n";

const SKIP_PATTERNS = ["/api", "/_next", "/favicon", "/icon.png", "/bg/"];

/** Paths that do NOT require authentication (relative to locale prefix) */
const PUBLIC_PATHS = ["/login", "/contact", "/donate", "/qa"];

function shouldSkipProxy(pathname: string): boolean {
    return SKIP_PATTERNS.some((p) => pathname.startsWith(p)) || pathname.includes(".");
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

/**
 * Returns true if the given path (after locale prefix) is public.
 * Root landing pages (e.g. /en, /vi) are always public.
 */
function isPublicPath(pathname: string, locale: string): boolean {
    const pathAfterLocale = pathname.replace(`/${locale}`, "") || "/";
    if (pathAfterLocale === "/" || pathAfterLocale === "") return true;
    return PUBLIC_PATHS.some((p) => pathAfterLocale.startsWith(p));
}

export default function proxy(req: NextRequest) {
    return auth((req) => {
        const { pathname } = req.nextUrl;

        // 1. Skip static assets and API routes
        if (shouldSkipProxy(pathname)) {
            return NextResponse.next();
        }

        // 2. i18n — redirect bare paths to locale-prefixed paths
        const pathnameLocale = getPathnameLocale(pathname);
        if (!pathnameLocale) {
            const acceptLanguage = req.headers.get("accept-language") || "";
            const detectedLocale = detectLocaleFromHeaders(acceptLanguage);
            const url = req.nextUrl.clone();
            url.pathname = `/${detectedLocale}${pathname}`;
            return NextResponse.redirect(url);
        }

        // 3. Public paths — no auth required
        if (isPublicPath(pathname, pathnameLocale)) {
            return NextResponse.next();
        }

        // 4. Auth gate — require Discord login for wiki and other protected pages
        const isLoggedIn = !!req.auth;
        if (!isLoggedIn) {
            const loginUrl = new URL(`/${pathnameLocale}/login`, req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // 5. Admin route protection — require admin role
        const isAdminRoute = pathname.includes("/admin");
        if (isAdminRoute) {
            const isAdmin = !!(req.auth?.user as any)?.isAdmin; // eslint-disable-line @typescript-eslint/no-explicit-any
            if (!isAdmin) {
                return NextResponse.redirect(new URL(`/${pathnameLocale}`, req.url));
            }
        }

        return NextResponse.next();
    })(req, { params: Promise.resolve({}) } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|bg/).*)" ],
};
