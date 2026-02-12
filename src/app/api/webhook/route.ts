import { NextRequest, NextResponse } from "next/server";
import { WebhookService } from "@/core/services/WebhookService";
import { auth } from "@/core/config/auth";

const webhookService = new WebhookService();

/**
 * POST /api/webhook
 * Receives content update notifications and forwards them to Discord.
 */
export async function POST(request: NextRequest) {
    try {
        // Sentinel: Ensure user is admin before proceeding
        const session = await auth();
        if (!session?.user?.isAdmin) {
            return NextResponse.json(
                { error: "Unauthorized: Admin access required" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, category, author, action } = body;

        if (!title || !category || !author || !action) {
            return NextResponse.json(
                { error: "Missing required fields: title, category, author, action" },
                { status: 400 }
            );
        }

        const validActions = ["created", "updated", "deleted"];
        if (!validActions.includes(action)) {
            return NextResponse.json(
                { error: `Invalid action. Must be one of: ${validActions.join(", ")}` },
                { status: 400 }
            );
        }

        const success = await webhookService.notifyContentUpdate(
            title,
            category,
            author,
            action as "created" | "updated" | "deleted"
        );

        if (success) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: "Failed to send webhook notification" },
            { status: 500 }
        );
    } catch (error) {
        console.error("[Webhook API] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
