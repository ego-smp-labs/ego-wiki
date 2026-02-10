import { env } from "@/core/config/env";

interface WebhookEmbed {
    title: string;
    description: string;
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: { text: string };
    timestamp?: string;
}

/**
 * Service for sending Discord webhook notifications.
 * Used to notify the Discord server when wiki content is updated.
 */
export class WebhookService {
    private readonly webhookUrl: string;

    constructor() {
        this.webhookUrl = env.DISCORD_WEBHOOK_URL;
    }

    /**
     * Sends a rich embed notification to the Discord webhook.
     */
    public async sendEmbed(embed: WebhookEmbed): Promise<boolean> {
        try {
            const response = await fetch(this.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "EGO WIKI",
                    avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
                    embeds: [
                        {
                            ...embed,
                            color: embed.color ?? 0x00d4ff, // neon-cyan
                            timestamp: embed.timestamp ?? new Date().toISOString(),
                        },
                    ],
                }),
            });

            return response.ok;
        } catch (error) {
            console.error("[WebhookService] Failed to send embed:", error);
            return false;
        }
    }

    /**
     * Sends a notification when wiki content is updated.
     */
    public async notifyContentUpdate(
        title: string,
        category: string,
        author: string,
        action: "created" | "updated" | "deleted"
    ): Promise<boolean> {
        const actionEmoji = {
            created: "✨",
            updated: "📝",
            deleted: "🗑️",
        };

        return this.sendEmbed({
            title: `${actionEmoji[action]} Wiki ${action.charAt(0).toUpperCase() + action.slice(1)}`,
            description: `**${title}** was ${action} in \`${category}\``,
            color: action === "deleted" ? 0xff4444 : action === "created" ? 0x44ff44 : 0x00d4ff,
            fields: [
                { name: "Category", value: category, inline: true },
                { name: "Author", value: author, inline: true },
                { name: "Action", value: action.toUpperCase(), inline: true },
            ],
            footer: { text: "EGO WIKI Admin" },
        });
    }

    /**
     * Sends a notification when someone logs in as admin.
     */
    public async notifyAdminLogin(username: string): Promise<boolean> {
        return this.sendEmbed({
            title: "🔐 Admin Login",
            description: `**${username}** logged in as admin`,
            color: 0xffd700,
            footer: { text: "EGO WIKI Security" },
        });
    }
}
