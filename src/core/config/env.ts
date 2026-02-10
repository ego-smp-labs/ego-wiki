import { z } from "zod";

const clientSchema = z.object({
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_DISCORD_INVITE_URL: z.string().url().default("https://discord.gg/jRqnNbupj4"),
});

const serverSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DISCORD_CLIENT_ID: z.string().optional().default(""),
    DISCORD_CLIENT_SECRET: z.string().optional().default(""),
    DISCORD_GUILD_ID: z.string().optional(),
    DISCORD_ADMIN_ROLE_ID: z.string().optional(),
    AUTH_SECRET: z.string().optional().default("dev_secret_replace_in_production_32chars"),
});

const allSchema = serverSchema.merge(clientSchema);
const isServer = typeof window === "undefined";

let parsed;

if (isServer) {
    parsed = allSchema.safeParse(process.env);
} else {
    parsed = clientSchema.safeParse({
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
    });
}

if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
}

export const env = parsed.data as z.infer<typeof allSchema>;
