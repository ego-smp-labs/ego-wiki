import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Heading {
    level: number;
    text: string;
    slug: string;
}

export interface ArticleMeta {
    slug: string;
    order: number;
    title: string;
    description?: string;
    category: string;
    locale: string;
    headings: Heading[];
}

export interface Article extends ArticleMeta {
    content: string;
    rawContent: string;
}

export interface CategoryInfo {
    slug: string;
    articles: ArticleMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Parses filename pattern "NN-slug-name.md"
 * @example parseFilename("01-gioi-thieu.md") returns { order: 1, slug: "gioi-thieu" }
 */
export function parseFilename(filename: string): { order: number; slug: string } {
    const name = filename.replace(/\.mdx?$/, "");
    const match = name.match(/^(\d+)-(.+)$/);

    if (match) {
        return {
            order: parseInt(match[1], 10),
            slug: match[2],
        };
    }

    return {
        order: 999,
        slug: name,
    };
}

/**
 * Extracts headings from markdown content for TOC generation
 */
export function extractHeadings(content: string): Heading[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        headings.push({ level, text, slug });
    }

    return headings;
}

/**
 * Extracts title from first h1 heading in content
 */
export function extractTitle(content: string): string {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : "Untitled";
}

/**
 * Gets all article files from a specific locale and category
 */
export function getArticleFiles(locale: string, category: string): string[] {
    const categoryPath = path.join(CONTENT_DIR, locale, category);

    if (!fs.existsSync(categoryPath)) {
        return [];
    }

    return fs.readdirSync(categoryPath).filter((file) => /\.mdx?$/.test(file));
}

/**
 * Gets article metadata without full content
 */
export function getArticleMeta(
    locale: string,
    category: string,
    filename: string
): ArticleMeta | null {
    const filePath = path.join(CONTENT_DIR, locale, category, filename);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);
    const { order, slug } = parseFilename(filename);
    const headings = extractHeadings(content);
    const title = frontmatter.title || extractTitle(content);

    return {
        slug,
        order,
        title,
        description: frontmatter.description,
        category,
        locale,
        headings,
    };
}

/**
 * Gets full article with content
 */
export function getArticle(
    locale: string,
    category: string,
    slug: string
): Article | null {
    const categoryPath = path.join(CONTENT_DIR, locale, category);

    if (!fs.existsSync(categoryPath)) {
        return null;
    }

    const files = fs.readdirSync(categoryPath);
    const matchingFile = files.find((file) => {
        const { slug: fileSlug } = parseFilename(file);
        return fileSlug === slug;
    });

    if (!matchingFile) {
        return null;
    }

    const filePath = path.join(categoryPath, matchingFile);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);
    const { order } = parseFilename(matchingFile);
    const headings = extractHeadings(content);
    const title = frontmatter.title || extractTitle(content);

    return {
        slug,
        order,
        title,
        description: frontmatter.description,
        category,
        locale,
        headings,
        content,
        rawContent: fileContent,
    };
}

/**
 * Gets all articles for a category, sorted by order
 */
export function getCategoryArticles(
    locale: string,
    category: string
): ArticleMeta[] {
    const files = getArticleFiles(locale, category);

    return files
        .map((file) => getArticleMeta(locale, category, file))
        .filter((article): article is ArticleMeta => article !== null)
        .sort((a, b) => a.order - b.order);
}

/**
 * Gets all categories with their articles for a locale
 */
export function getAllCategories(locale: string): CategoryInfo[] {
    const localePath = path.join(CONTENT_DIR, locale);

    if (!fs.existsSync(localePath)) {
        return [];
    }

    const categories = fs
        .readdirSync(localePath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    return categories.map((category) => ({
        slug: category,
        articles: getCategoryArticles(locale, category),
    }));
}

/**
 * Gets all articles across all categories for search indexing
 */
export function getAllArticles(locale: string): ArticleMeta[] {
    const categories = getAllCategories(locale);
    return categories.flatMap((cat) => cat.articles);
}

/**
 * Gets navigation data (prev/next articles)
 */
export function getArticleNavigation(
    locale: string,
    category: string,
    currentSlug: string
): { prev: ArticleMeta | null; next: ArticleMeta | null } {
    const articles = getCategoryArticles(locale, category);
    const currentIndex = articles.findIndex((a) => a.slug === currentSlug);

    return {
        prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
        next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
    };
}
