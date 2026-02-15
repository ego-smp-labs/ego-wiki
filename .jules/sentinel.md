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

## 2025-02-25 - Uncapped Search Inputs
**Vulnerability:** The search API accepted unlimited query lengths and result limits, exposing the server to Denial of Service (DoS) attacks via CPU exhaustion (long queries) or memory exhaustion (large limits).
**Learning:** Publicly accessible APIs must enforce strict bounds on input parameters to prevent resource exhaustion, even if the underlying search logic is efficient. Authentication is not a substitute for input validation.
**Prevention:** Implement input validation for all API parameters. Cap string lengths (e.g., 100 chars) and numeric limits (e.g., 50 items) at the entry point of the API handler.
