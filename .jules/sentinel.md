## 2024-05-22 - Unauthenticated Webhook Endpoint
**Vulnerability:** The `POST /api/webhook` endpoint allowed unauthenticated users to trigger Discord notifications.
**Learning:** API routes under `/api` are skipped by the global middleware proxy authentication check (`src/proxy.ts`). Route handlers must implement their own authentication checks.
**Prevention:** Always verify authentication (`auth()`) and authorization (e.g., `isAdmin`) inside API route handlers, especially for actions with side effects like sending notifications.

## 2025-02-23 - Missing Security Headers
**Vulnerability:** The application lacked standard security headers, exposing users to clickjacking and MIME sniffing attacks.
**Learning:** Next.js defaults are minimal. Explicit configuration in `next.config.ts` is required for defense-in-depth headers like HSTS and X-Frame-Options.
**Prevention:** Use `next.config.ts` `headers()` configuration to enforce security policies at the framework level.

## 2025-02-24 - Path Traversal in WikiService
**Vulnerability:** `WikiService` methods (`getAllCategories`, `getCategoryArticles`, `getArticle`) trusted user input (`locale`, `category`) without validation, allowing directory traversal via `..` segments to access sensitive files/directories like `.jules` or source code.
**Learning:** File system operations that use user input for paths must always validate against a whitelist (like `isValidLocale`) or strictly sanitize path segments to prevent traversal, even if `path.join` is used.
**Prevention:** Implement strict input validation for all parameters used in file system paths. Use helper methods like `isSafePathSegment` and validate against known enums/constants (`LOCALES`).

## 2025-02-24 - Search API DoS Vectors
**Vulnerability:** The `/api/search` endpoint lacked input validation for `limit`, `query` length, and `locale`, exposing the server to potential DoS via large payloads or cache poisoning.
**Learning:** Even read-only APIs need strict input validation to prevent resource exhaustion. `Fuse.js` in-memory search can be expensive with large datasets or queries.
**Prevention:** Cap all array limits (e.g., max 50 items) and string lengths (e.g., max 100 chars) in public APIs.

## 2025-02-24 - Auth Bypass via Path Confusion
**Vulnerability:** The global middleware (`src/proxy.ts`) skipped authentication for any path containing a dot (`.`) to bypass static files. This allowed attackers to access protected routes (e.g., `/wiki/v1.0`) by ensuring the URL contained a dot.
**Learning:** Broad pattern matching for skipping middleware (like `pathname.includes(".")`) is dangerous. It assumes only static files have dots, which is false for dynamic routes or user content.
**Prevention:** Use an explicit allowlist of static file extensions (e.g., `.png`, `.css`) or negative lookahead regex to strictly define what should skip authentication.

## 2025-02-24 - Path Traversal in Changelog
**Vulnerability:** `getRecentUpdates` in `src/core/lib/changelog.ts` used the `locale` parameter directly in `path.join` without validation, allowing potential path traversal if the locale was manipulated.
**Learning:** Even if `locale` is expected to be safe from Next.js routing, utility functions should validate their inputs independently to ensure "defense in depth" and prevent misuse in other contexts.
**Prevention:** Always validate inputs used in file system operations against an allowlist (like `isValidLocale`) or sanitization function, regardless of the source of the input.
## 2025-02-24 - Information Disclosure in Search
**Vulnerability:** The search functionality (`searchArticles`) exposed content of articles that were scheduled for future release (`lockedUntil`), leaking sensitive information before the intended time.
**Learning:** Index-time filtering (in `buildSearchIndex`) is insufficient for time-sensitive visibility controls because the index is cached. Search-time filtering is required to enforce dynamic access rules like release dates.
**Prevention:** Filter sensitive content at the point of query execution (`searchArticles`) based on current context (time, user permissions), not just at index time.
