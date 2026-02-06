import { auth, signIn, signOut } from "@/core/config/auth";
import { Session } from "next-auth";

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
