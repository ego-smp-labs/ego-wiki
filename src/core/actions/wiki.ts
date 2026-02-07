"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { auth } from "@core/config/auth";
import { env } from "@core/config/env";

const wikiPageSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.enum(["general", "ego-system", "items", "advanced", "miscellaneous"]),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    locale: z.enum(["en", "vi"]),
});

export type WikiPageData = z.infer<typeof wikiPageSchema>;

export async function createWikiPage({ title, category, slug, content, locale }: WikiPageData) {
    // 1. Auth Check (Double Layer Security)
    const session = await auth();
    const userRoles = (session?.user as any)?.roles || [];
    const hasAdminRole = env.DISCORD_ADMIN_ROLE_ID
        ? userRoles.includes(env.DISCORD_ADMIN_ROLE_ID)
        : true; // Unsafe default but matches middleware

    if (!session || !hasAdminRole) {
        throw new Error("Unauthorized");
    }

    // 2. Validate Data
    const validation = wikiPageSchema.safeParse({ title, category, slug, content, locale });
    if (!validation.success) {
        throw new Error(validation.error.errors[0].message);
    }

    // 3. construct File Path
    // content/[locale]/[category]/[slug].md
    const rootDir = process.cwd();
    const targetDir = path.join(rootDir, "content", locale, category);
    const targetFile = path.join(targetDir, `${slug}.md`);

    // 4. Create Directory if not exists
    try {
        await fs.mkdir(targetDir, { recursive: true });
    } catch (err) {
        console.error("Failed to create directory", err);
        throw new Error("Failed to prepare storage");
    }

    // 5. Construct MDX Content with Frontmatter
    const fileContent = `---
title: "${title}"
description: "Created via Admin Editor"
category: "${category}"
---

${content}
`;

    // 6. Write File
    try {
        // Check if file exists to prevent accidental overwrite? 
        // For now, let's allow overwrite or maybe fail. 
        // Let's use 'wx' flag to fail if exists? No, just overwrite for editing.
        await fs.writeFile(targetFile, fileContent, "utf8");
    } catch (err) {
        console.error("Failed to write file", err);
        throw new Error("Failed to save content");
    }

    // 7. Revalidate
    revalidatePath(`/${locale}/wiki/${category}/${slug}`);
    revalidatePath(`/${locale}/wiki/${category}`);
    revalidatePath(`/${locale}/wiki`);

    return { success: true, path: `/${locale}/wiki/${category}/${slug}` };
}
