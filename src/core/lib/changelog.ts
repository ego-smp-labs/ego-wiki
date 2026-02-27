import fs from "fs";
import path from "path";
import { isValidLocale } from "./i18n";

// Define parsing types
export interface ChangelogEntry {
    version: string;
    title: string;
    date: string;
    content: string[]; // Bullet points or lines
}

export const getRecentUpdates = async (locale: string, limit: number = 3): Promise<ChangelogEntry[]> => {
    // Sentinel: Validate locale to prevent path traversal
    if (!isValidLocale(locale)) {
        return [];
    }

    try {
        const filePath = path.join(process.cwd(), `content/${locale}/changelog/index.md`);
        
        if (!fs.existsSync(filePath)) {
            console.warn(`Changelog file not found at ${filePath}`);
            return [];
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        
        // Simple markdown parser for specific structure:
        // ### v0.1.X — Title
        // *Phát hành: ...*
        // - item
        
        const updates: ChangelogEntry[] = [];
        const lines = fileContent.split("\n");
        let currentEntry: ChangelogEntry | null = null;
        
        for (const line of lines) {
            const versionMatch = line.match(/^###\s+(v\d+\.\d+\.\d+)\s+—\s+(.+)$/);
            
            if (versionMatch) {
                if (currentEntry) {
                    updates.push(currentEntry);
                }
                currentEntry = {
                    version: versionMatch[1],
                    title: versionMatch[2].trim(),
                    date: "",
                    content: [],
                };
             } else if (currentEntry) {
                // Extract date
                const dateMatch = line.match(/^\*(.+)\*$/);
                if (dateMatch) {
                    currentEntry.date = dateMatch[1].replace("Phát hành:", "").replace("Released:", "").trim();
                } else if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
                    // Extract list items limited to 2-3 per version for preview
                    if (currentEntry.content.length < 3) {
                         currentEntry.content.push(line.trim());
                    }
                }
            }
        }
        
        if (currentEntry) {
            updates.push(currentEntry);
        }

        return updates.slice(0, limit);
    } catch (error) {
        console.error("Error reading changelog:", error);
        return [];
    }
};
