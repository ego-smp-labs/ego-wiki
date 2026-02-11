import { LucideIcon, BookOpen, Zap, Sword, Settings, HelpCircle, Hammer } from "lucide-react";

export interface Category {
    slug: string;
    icon: LucideIcon;
    color: "cyan" | "purple" | "pink";
    title: {
        en: string;
        vi: string;
    };
    description: {
        en: string;
        vi: string;
    };
}

export const CATEGORIES: Category[] = [
    {
        slug: "general",
        icon: BookOpen,
        color: "cyan",
        title: {
            en: "General Info",
            vi: "Thông tin chung",
        },
        description: {
            en: "Essential commands, land claiming protocols.",
            vi: "Giới thiệu và cách chơi cơ bản.",
        },
    },
    {
        slug: "ego-system",
        icon: Zap,
        color: "purple",
        title: {
            en: "Ego System",
            vi: "Hệ thống Ego",
        },
        description: {
            en: "Unlock your potential. Level up.",
            vi: "Tier, Dark Ego và cách tiến hóa.",
        },
    },
    {
        slug: "advanced",
        icon: Sword,
        color: "cyan",
        title: {
            en: "Advanced",
            vi: "Nâng cao",
        },
        description: {
            en: "Master the void. Advanced techniques.",
            vi: "Kỹ năng và chiến thuật nâng cao.",
        },
    },
    {
        slug: "items",
        icon: Hammer,
        color: "pink",
        title: {
            en: "Items & Crafting",
            vi: "Vật phẩm & Chế tạo",
        },
        description: {
            en: "Recipes and stats for custom items.",
            vi: "Công thức và chỉ số vật phẩm.",
        },
    },
    {
        slug: "miscellaneous",
        icon: Settings,
        color: "purple",
        title: {
            en: "Miscellaneous",
            vi: "Khác",
        },
        description: {
            en: "Commands, tools, and utilities.",
            vi: "Lệnh và các thông tin khác.",
        },
    },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

export const FAQ_CATEGORY: Category = {
    slug: "faq",
    icon: HelpCircle,
    color: "pink",
    title: {
        en: "FAQ",
        vi: "Câu hỏi thường gặp",
    },
    description: {
        en: "Frequently asked questions.",
        vi: "Những câu hỏi thường gặp.",
    },
};

export function getCategory(slug: string): Category | undefined {
    return CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategoryTitle(slug: string, locale: string): string {
    const category = getCategory(slug);
    if (!category) return slug;
    return locale === "vi" ? category.title.vi : category.title.en;
}

export function getCategoryDescription(slug: string, locale: string): string {
    const category = getCategory(slug);
    if (!category) return "";
    return locale === "vi" ? category.description.vi : category.description.en;
}
