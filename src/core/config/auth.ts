import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { env } from "@core/config/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Discord({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
            authorization: { params: { scope: "identify guilds.join" } },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
                session.user.roles = token.roles as string[];
                session.user.isGuildMember = token.isGuildMember as boolean;
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.isGuildMember = false;
                token.isAdmin = false;

                // Check admin by Discord User ID
                if (token.sub && env.DISCORD_ADMIN_USER_IDS.includes(token.sub)) {
                    token.isAdmin = true;
                }

                // Fetch User Roles from Discord Guild if GUILD_ID is set
                if (env.DISCORD_GUILD_ID) {
                    try {
                        const res = await fetch(`https://discord.com/api/users/@me/guilds/${env.DISCORD_GUILD_ID}/member`, {
                            headers: {
                                Authorization: `Bearer ${account.access_token}`,
                            },
                        });

                        if (res.ok) {
                            const member = await res.json();
                            token.roles = member.roles;
                            token.isGuildMember = true;

                            // Check admin by role
                            if (env.DISCORD_ADMIN_ROLE_ID && member.roles?.includes(env.DISCORD_ADMIN_ROLE_ID)) {
                                token.isAdmin = true;
                            }
                        }
                    } catch (error) {
                        console.error("Failed to fetch Discord roles", error);
                    }
                }
            }
            return token;
        },
    },
});
