import { z } from "zod";

// Client-side schema (Safe to expose)
const clientSchema = z.object({
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_DISCORD_INVITE_URL: z.string().url().default("https://discord.gg/egosmp"),
});

// Server-side schema (Contains secrets)
const serverSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DISCORD_CLIENT_ID: z.string().min(1, "DISCORD_CLIENT_ID is required"),
    DISCORD_CLIENT_SECRET: z.string().min(1, "DISCORD_CLIENT_SECRET is required"),
    DISCORD_GUILD_ID: z.string().optional(),
    DISCORD_ADMIN_ROLE_ID: z.string().optional(),
    AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
});

// Merged schema for Server environment
const allSchema = serverSchema.merge(clientSchema);

const isServer = typeof window === "undefined";

let parsed;

if (isServer) {
    // Validate EVERYTHING on the server
    parsed = allSchema.safeParse(process.env);
} else {
    // Validate ONLY client variables on the client
    // Next.js replaces process.env.NEXT_PUBLIC_XYZ at build time, so we must access them explicitly
    parsed = clientSchema.safeParse({
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL,
    });
}

if (!parsed.success) {
    console.error(
        "❌ Invalid environment variables:",
        parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
}

// We need to cast the result because on client we only have a subset, 
// but the app expects the full type definition (though it should only access client keys).
// Using 'as any' safely here because we know what we're doing with the split.
export const env = parsed.data as z.infer<typeof allSchema>;
