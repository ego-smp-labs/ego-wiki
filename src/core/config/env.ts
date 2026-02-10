import { z } from "zod";

const clientSchema = z.object({
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_DISCORD_INVITE_URL: z.string().url().default("https://discord.gg/jRqnNbupj4"),
});

const serverSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DISCORD_CLIENT_ID: z.string().min(1, "DISCORD_CLIENT_ID is required"),
    DISCORD_CLIENT_SECRET: z.string().min(1, "DISCORD_CLIENT_SECRET is required"),
    DISCORD_GUILD_ID: z.string().optional(),
    DISCORD_ADMIN_ROLE_ID: z.string().optional(),
    DISCORD_WEBHOOK_URL: z.string().url().optional().default("https://discord.com/api/webhooks/placeholder"),
    AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
});

const allSchema = serverSchema.merge(clientSchema).refine(
    (data) => {
        if (data.NODE_ENV === "production") {
            return data.AUTH_SECRET !== "dev_secret_replace_in_production_32chars";
        }
        return true;
    },
    {
        message: "AUTH_SECRET must be changed from the default value in production",
        path: ["AUTH_SECRET"],
    }
);

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
