import { NextResponse } from "next/server";

const SERVER_ADDRESS = "pc.sabicoder.xyz:25880";
const CACHE_DURATION = 60;

interface McStatus {
    online: boolean;
    players: {
        online: number;
        max: number;
    };
    version: string;
    motd?: string;
}

function createOfflineStatus(): McStatus {
    return {
        online: false,
        players: { online: 0, max: 0 },
        version: "Offline",
    };
}

export async function GET() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
            `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`,
            {
                next: { revalidate: CACHE_DURATION },
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
            return NextResponse.json(createOfflineStatus());
        }

        const data = await response.json();

        const status: McStatus = {
            online: data.online || false,
            players: {
                online: data.players?.online || 0,
                max: data.players?.max || 0,
            },
            version: data.version || "Unknown",
            motd: data.motd?.clean?.[0] || undefined,
        };

        return NextResponse.json(status);
    } catch {
        return NextResponse.json(createOfflineStatus());
    }
}
