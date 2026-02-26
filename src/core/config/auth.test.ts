
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

// 1. Mock env
vi.mock("@core/config/env", () => ({
    env: {
        DISCORD_CLIENT_ID: "client_id",
        DISCORD_CLIENT_SECRET: "client_secret",
        DISCORD_ADMIN_USER_IDS: ["admin_user_id"],
        DISCORD_GUILD_ID: "guild_id",
        DISCORD_ADMIN_ROLE_ID: "admin_role_id",
        DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/test",
        AUTH_SECRET: "secret",
    },
}));

// 2. Mock WebhookService
const notifyAdminLoginMock = vi.fn(() => Promise.resolve(true));

// We need to mock the CLASS, so when `new WebhookService()` is called, it returns an object with our mock method
vi.mock("@core/services/WebhookService", () => {
    return {
        WebhookService: class {
            notifyAdminLogin = notifyAdminLoginMock;
        },
    };
});

// Mock NextAuth and next-auth/providers/discord to avoid importing them directly which causes issues with next/server
vi.mock("next-auth", () => ({
    default: (config: any) => ({
        handlers: { GET: vi.fn(), POST: vi.fn() },
        auth: vi.fn(),
        signIn: vi.fn(),
        signOut: vi.fn(),
    }),
}));

vi.mock("next-auth/providers/discord", () => ({
    default: (config: any) => ({
        id: "discord",
        name: "Discord",
        type: "oauth",
        authorization: "https://discord.com/api/oauth2/authorize",
        token: "https://discord.com/api/oauth2/token",
        userinfo: "https://discord.com/api/users/@me",
        clientId: config.clientId,
        clientSecret: config.clientSecret,
    }),
}));

// 3. Import the module under test
import { authConfig } from "./auth";

describe("Auth Configuration - Audit Logging", () => {
    beforeEach(() => {
        notifyAdminLoginMock.mockClear();
        // Mock fetch globally
        global.fetch = vi.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 404 })));
        vi.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should call notifyAdminLogin when an admin logs in via ID", async () => {
        // @ts-ignore - we know jwt exists
        const jwtCallback = authConfig.callbacks.jwt;

        // Input data
        const token = { sub: "admin_user_id" }; // Matches mocked admin ID
        const account = { access_token: "token", provider: "discord", type: "oauth", providerAccountId: "123" };
        const user = { id: "admin_user_id", name: "AdminUser" };

        // Execute
        // @ts-ignore
        await jwtCallback({ token, account, user, trigger: "signIn" });

        // Verify
        expect(notifyAdminLoginMock).toHaveBeenCalledTimes(1);
        expect(notifyAdminLoginMock).toHaveBeenCalledWith("AdminUser");
    });

    it("should NOT call notifyAdminLogin when a non-admin logs in", async () => {
         // @ts-ignore
        const jwtCallback = authConfig.callbacks.jwt;

        const token = { sub: "regular_user_id" }; // Not an admin
        const account = { access_token: "token", provider: "discord", type: "oauth", providerAccountId: "456" };
        const user = { id: "regular_user_id", name: "RegularUser" };

        // @ts-ignore
        await jwtCallback({ token, account, user, trigger: "signIn" });

        expect(notifyAdminLoginMock).not.toHaveBeenCalled();
    });

    it("should NOT call notifyAdminLogin on subsequent JWT calls (no account)", async () => {
         // @ts-ignore
        const jwtCallback = authConfig.callbacks.jwt;

        const token = { sub: "admin_user_id", isAdmin: true };

        // subsequent calls have account: null/undefined
        // @ts-ignore
        await jwtCallback({ token, account: null, user: null, trigger: "update" });

        expect(notifyAdminLoginMock).not.toHaveBeenCalled();
    });

    it("should not fail login if webhook notification fails", async () => {
         // @ts-ignore
        const jwtCallback = authConfig.callbacks.jwt;

        // Mock webhook failure
        notifyAdminLoginMock.mockRejectedValueOnce(new Error("Webhook failed"));

        const token = { sub: "admin_user_id" };
        const account = { access_token: "token", provider: "discord", type: "oauth", providerAccountId: "123" };
        const user = { id: "admin_user_id", name: "AdminUser" };

        // Should not throw
        // @ts-ignore
        const result = await jwtCallback({ token, account, user, trigger: "signIn" });

        expect(result).toBeDefined();
        expect(notifyAdminLoginMock).toHaveBeenCalledTimes(1);
    });
});
