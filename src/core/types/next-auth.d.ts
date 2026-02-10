import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's Discord ID. */
            id: string;
            /** The user's roles from the specific Guild. */
            roles?: string[];
            /** Whether the user is a member of the Discord guild. */
            isGuildMember?: boolean;
            /** Whether the user is an admin. */
            isAdmin?: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID Connect Access Token */
        accessToken?: string;
        /** The user's Discord ID. */
        sub?: string;
        /** The user's roles from the specific Guild. */
        roles?: string[];
        /** Whether the user is a member of the Discord guild. */
        isGuildMember?: boolean;
        /** Whether the user is an admin. */
        isAdmin?: boolean;
    }
}
