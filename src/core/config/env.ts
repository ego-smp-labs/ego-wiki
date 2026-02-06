import { z } from "zod";

const envSchema = z.object({
    // App
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

    // Discord Auth
    DISCORD_CLIENT_ID: z.string().min(1, "DISCORD_CLIENT_ID is required"),
    DISCORD_CLIENT_SECRET: z.string().min(1, "DISCORD_CLIENT_SECRET is required"),
    DISCORD_GUILD_ID: z.string().optional(),

    // NextAuth
    AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"), // NextAuth v5 uses AUTH_SECRET
});

// Validate process.env
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables");
}

export const env = _env.data;
