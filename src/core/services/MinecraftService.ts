export interface MinecraftStatus {
    online: boolean;
    version: string;
    players: {
        online: number;
        max: number;
    };
    motd?: string;
}

export class MinecraftService {
    private static readonly API_URL = "https://api.mcsrvstat.us/3";
    private readonly serverAddress: string;

    constructor(serverAddress: string = "play.egosmp.net") {
        this.serverAddress = serverAddress;
    }

    /**
     * Fetches the current status of the Minecraft server.
     * @returns Promise<MinecraftStatus>
     */
    public async getStatus(): Promise<MinecraftStatus> {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${MinecraftService.API_URL}/${this.serverAddress}`, {
                next: { revalidate: 60 },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Failed to fetch status: ${response.statusText}`);
            }

            const data = await response.json();
            return this.mapResponseToStatus(data);
        } catch (error) {
            console.error("MinecraftService Error:", error);
            return this.getOfflineStatus();
        }
    }

    private mapResponseToStatus(data: any): MinecraftStatus {
        return {
            online: data.online || false,
            version: data.version || "Unknown",
            players: {
                online: data.players?.online || 0,
                max: data.players?.max || 0,
            },
            motd: data.motd?.clean?.[0],
        };
    }

    private getOfflineStatus(): MinecraftStatus {
        return {
            online: false,
            version: "Offline",
            players: { online: 0, max: 0 },
        };
    }
}
