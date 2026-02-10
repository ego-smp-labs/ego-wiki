export const LOCALES = ["en", "vi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

export const translations = {
    en: {
        nav: {
            home: "Home",
            wiki: "Wiki",
            faq: "FAQ",
            rules: "Rules",
            discord: "Discord",
            search: "Search...",
            searchPlaceholder: "Search documentation...",
            searchShortcut: "⌘K",
        },
        hero: {
            title: "EGO WIKI",
            subtitle: "Knowledge from the Abyss. Classified Data v2.",
            searchPlaceholder: "Search database...",
            accessData: "ACCESS DATA",
        },
        stats: {
            activeAgents: "Active Agents",
            voidStability: "Void Stability",
            archivesOnline: "Archives Online",
        },
        wiki: {
            title: "WIKI",
            viewFullIndex: "VIEW FULL INDEX →",
            onThisPage: "On this page",
            previousArticle: "Previous",
            nextArticle: "Next",
            backToCategory: "Back to",
        },
        footer: {
            serverIp: "Server IP",
            copyIp: "Copy",
            copied: "Copied!",
            copyright: "© 2026 EGO WIKI | Void Backbone v2",
        },
        faq: {
            title: "FAQ",
            subtitle: "Frequently Asked Questions",
        },
        common: {
            loading: "Loading...",
            error: "Error",
            notFound: "Not found",
        },
    },
    vi: {
        nav: {
            home: "Trang chủ",
            wiki: "Wiki",
            faq: "FAQ",
            rules: "Luật",
            discord: "Discord",
            search: "Tìm kiếm...",
            searchPlaceholder: "Tìm kiếm tài liệu...",
            searchShortcut: "⌘K",
        },
        hero: {
            title: "EGO WIKI",
            subtitle: "Tri thức từ Vực Thẳm. Dữ liệu mật v2.",
            searchPlaceholder: "Tìm kiếm dữ liệu...",
            accessData: "TRUY CẬP DỮ LIỆU",
        },
        stats: {
            activeAgents: "Đặc vụ hoạt động",
            voidStability: "Độ ổn định Void",
            archivesOnline: "Kho lưu trữ",
        },
        wiki: {
            title: "WIKI",
            viewFullIndex: "XEM TẤT CẢ →",
            onThisPage: "Trong trang này",
            previousArticle: "Trước",
            nextArticle: "Tiếp theo",
            backToCategory: "Quay lại",
        },
        footer: {
            serverIp: "IP Server",
            copyIp: "Sao chép",
            copied: "Đã sao chép!",
            copyright: "© 2026 EGO WIKI | Void Backbone v2",
        },
        faq: {
            title: "Hỏi đáp",
            subtitle: "Câu hỏi thường gặp",
        },
        common: {
            loading: "Đang tải...",
            error: "Lỗi",
            notFound: "Không tìm thấy",
        },
    },
} as const;

export function getTranslations(locale: string) {
    return translations[locale as Locale] || translations[DEFAULT_LOCALE];
}

export function isValidLocale(locale: string): locale is Locale {
    return LOCALES.includes(locale as Locale);
}
