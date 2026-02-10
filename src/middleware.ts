import { auth } from "@/core/config/auth";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
    "/api/auth",
    "/_next",
    "/favicon.ico",
    "/icon.png",
    "/bg/",
];

function isPublicPath(pathname: string): boolean {
    // Root landing pages (e.g., /en, /vi) are public
    if (/^\/[a-z]{2}\/?$/.test(pathname)) return true;

    // Login pages are public
    if (/^\/[a-z]{2}\/login/.test(pathname)) return true;

    // Contact and donate pages are public
    if (/^\/[a-z]{2}\/(contact|donate)/.test(pathname)) return true;

    return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // Allow public paths
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    // auth middleware adds auth property
    const session = (req as any).auth;

    // If not authenticated, redirect to login
    if (!session?.user) {
        const locale = pathname.split("/")[1] || "en";
        const loginUrl = new URL(`/${locale}/login`, req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|icon.png|bg/).*)",
    ],
};
