import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Interfaces
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
    lastUpdated: string;
    lockedUntil?: string;
}

export interface Article extends ArticleMeta {
    content: string;
    rawContent: string;
}

export interface CategoryInfo {
    slug: string;
    articles: ArticleMeta[];
}

export class WikiService {
    private readonly contentDir: string;
    private static instance: WikiService;
    private metaCache: Map<string, ArticleMeta> = new Map();
    private categoryArticlesCache: Map<string, ArticleMeta[]> = new Map();
    private allCategoriesCache: Map<string, CategoryInfo[]> = new Map();

    private constructor() {
        this.contentDir = path.join(process.cwd(), "content");
    }

    public static getInstance(): WikiService {
        if (!WikiService.instance) {
            WikiService.instance = new WikiService();
        }
        return WikiService.instance;
    }

    /**
     * Clears all internal caches
     */
    public clearCache(): void {
        this.metaCache.clear();
        this.categoryArticlesCache.clear();
        this.allCategoriesCache.clear();
    }

    /**
     * Parses filename pattern "NN-slug-name.md"
     */
    private parseFilename(filename: string): { order: number; slug: string } {
        const name = filename.replace(/\.mdx?$/, "");
        const match = name.match(/^(\d+)-(.+)$/);

        if (match) {
            return {
                order: parseInt(match[1], 10),
                slug: match[2].toLowerCase(), // Force lowercase for consistency
            };
        }

        return {
            order: 999,
            slug: name.toLowerCase(),
        };
    }

    /**
     * Extracts headings from markdown content for TOC generation
     */
    private extractHeadings(content: string): Heading[] {
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
    private extractTitle(content: string): string {
        const match = content.match(/^#\s+(.+)$/m);
        return match ? match[1].trim() : "Untitled";
    }

    /**
     * Gets all article files from a specific locale and category
     */
    private getArticleFiles(locale: string, category: string): string[] {
        const categoryPath = path.join(this.contentDir, locale, category);

        if (!fs.existsSync(categoryPath)) {
            return [];
        }

        return fs.readdirSync(categoryPath).filter((file) => /\.mdx?$/.test(file));
    }

    /**
     * Gets article metadata without full content
     */
    public getArticleMeta(
        locale: string,
        category: string,
        filename: string
    ): ArticleMeta | null {
        const filePath = path.join(this.contentDir, locale, category, filename);
        const cacheKey = `${locale}:${category}:${filename}`;

        if (this.metaCache.has(cacheKey)) {
            return this.metaCache.get(cacheKey)!;
        }

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const stats = fs.statSync(filePath);
        const { data: frontmatter, content } = matter(fileContent);
        const { order, slug } = this.parseFilename(filename);
        const headings = this.extractHeadings(content);
        const title = frontmatter.title || this.extractTitle(content);

        const meta: ArticleMeta = {
            slug,
            order,
            title,
            description: frontmatter.description,
            category,
            locale,
            headings,
            lastUpdated: stats.mtime.toISOString(),
            lockedUntil: frontmatter.lockedUntil instanceof Date 
                ? frontmatter.lockedUntil.toISOString().split('T')[0] 
                : frontmatter.lockedUntil,
        };

        this.metaCache.set(cacheKey, meta);
        return meta;
    }

    /**
     * Gets full article with content
     */
    public getArticle(
        locale: string,
        category: string,
        slug: string
    ): Article | null {
        const categoryPath = path.join(this.contentDir, locale, category);

        if (!fs.existsSync(categoryPath)) {
            return null;
        }

        const files = fs.readdirSync(categoryPath);
        const matchingFile = files.find((file) => {
            const { slug: fileSlug } = this.parseFilename(file);
            return fileSlug === slug.toLowerCase();
        });

        if (!matchingFile) {
            return null;
        }

        const filePath = path.join(categoryPath, matchingFile);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const stats = fs.statSync(filePath);
        const { data: frontmatter, content } = matter(fileContent);
        const { order } = this.parseFilename(matchingFile);
        const headings = this.extractHeadings(content);
        const title = frontmatter.title || this.extractTitle(content);

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
            lastUpdated: stats.mtime.toISOString(),
            lockedUntil: frontmatter.lockedUntil instanceof Date 
                ? frontmatter.lockedUntil.toISOString().split('T')[0] 
                : frontmatter.lockedUntil,
        };
    }

    /**
     * Gets all articles for a category, sorted by order
     */
    public getCategoryArticles(
        locale: string,
        category: string
    ): ArticleMeta[] {
        const cacheKey = `${locale}:${category}`;

        if (this.categoryArticlesCache.has(cacheKey)) {
            return this.categoryArticlesCache.get(cacheKey)!;
        }

        const files = this.getArticleFiles(locale, category);

        const articles = files
            .map((file) => this.getArticleMeta(locale, category, file))
            .filter((article): article is ArticleMeta => article !== null)
            .sort((a, b) => a.order - b.order);

        this.categoryArticlesCache.set(cacheKey, articles);
        return articles;
    }

    /**
     * Gets all categories with their articles for a locale
     */
    public getAllCategories(locale: string): CategoryInfo[] {
        if (this.allCategoriesCache.has(locale)) {
            return this.allCategoriesCache.get(locale)!;
        }

        const localePath = path.join(this.contentDir, locale);

        if (!fs.existsSync(localePath)) {
            return [];
        }

        const categories = fs
            .readdirSync(localePath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const result = categories.map((category) => ({
            slug: category,
            articles: this.getCategoryArticles(locale, category),
        }));

        this.allCategoriesCache.set(locale, result);
        return result;
    }

    /**
     * Gets all articles across all categories for search indexing
     */
    public getAllArticles(locale: string): ArticleMeta[] {
        const categories = this.getAllCategories(locale);
        return categories.flatMap((cat) => cat.articles);
    }

    /**
     * Gets navigation data (prev/next articles)
     */
    public getArticleNavigation(
        locale: string,
        category: string,
        currentSlug: string
    ): { prev: ArticleMeta | null; next: ArticleMeta | null } {
        const articles = this.getCategoryArticles(locale, category);
        const currentIndex = articles.findIndex((a) => a.slug === currentSlug);

        return {
            prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
            next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
        };
    }
}
