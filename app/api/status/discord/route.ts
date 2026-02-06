import { NextResponse } from "next/server";

const PLACEHOLDER_GUILD_ID = "YOUR_GUILD_ID";
const INVITE_LINK = "https://discord.gg/egosmp";

interface DiscordStatus {
    online: number;
    guildId: string;
    inviteLink: string;
}

export async function GET() {
    const status: DiscordStatus = {
        online: 42,
        guildId: PLACEHOLDER_GUILD_ID,
        inviteLink: INVITE_LINK,
    };

    return NextResponse.json(status);
}
