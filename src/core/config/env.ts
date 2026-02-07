import { z } from "zod";

const envSchema = z.object({
    // App
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_DISCORD_INVITE_URL: z.string().url().default("https://discord.gg/egosmp"),

    // Discord Auth
    DISCORD_CLIENT_ID: z.string().min(1, "DISCORD_CLIENT_ID is required"),
    DISCORD_CLIENT_SECRET: z.string().min(1, "DISCORD_CLIENT_SECRET is required"),
    DISCORD_GUILD_ID: z.string().optional(),

    // NextAuth
    AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"), // NextAuth v5 uses AUTH_SECRET
});

// Validate process.env
const _env = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
    AUTH_SECRET: process.env.AUTH_SECRET,
});

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables");
}

export const env = _env.data;
