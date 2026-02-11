import { auth, signIn, signOut } from "@/core/config/auth";
import { Session } from "next-auth";

/**
 * Server-side authentication service.
 * Provides methods for session management, admin checks, and guild membership validation.
 */
export class AuthService {
    /**
     * Retrieves the current user's session.
     */
    public async getSession(): Promise<Session | null> {
        return await auth();
    }

    /**
     * Checks if the current user is authenticated.
     */
    public async isAuthenticated(): Promise<boolean> {
        const session = await this.getSession();
        return !!session?.user;
    }

    /**
     * Gets the current user profile.
     */
    public async getUser() {
        const session = await this.getSession();
        return session?.user || null;
    }

    /**
     * Checks if the current user is an admin.
     * Admin status is determined by Discord user ID or admin role.
     */
    public async isAdmin(): Promise<boolean> {
        const session = await this.getSession();
        return !!session?.user?.isAdmin;
    }

    /**
     * Checks if the current user is a member of the Discord guild.
     */
    public async isGuildMember(): Promise<boolean> {
        const session = await this.getSession();
        return !!session?.user?.isGuildMember;
    }

    /**
     * Server-side login helper (redirects to provider).
     */
    public async login() {
        return await signIn("discord");
    }

    /**
     * Server-side logout helper.
     */
    public async logout() {
        return await signOut();
    }
}
