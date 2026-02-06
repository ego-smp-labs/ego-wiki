import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "@core/lib/i18n";
import { FAQ_CATEGORY } from "@core/lib/categories";
import Accordion from "@presentation/components/ui/Accordion";

interface QAPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: QAPageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === "vi" ? "Hỏi đáp" : "FAQ",
        description:
            locale === "vi"
                ? "Câu hỏi thường gặp về Ego SMP"
                : "Frequently asked questions about Ego SMP",
    };
}

// FAQ data - extracted from the original 07-faq.md
const faqData = {
    vi: [
        {
            id: "death",
            question: "Chết có mất Tier không?",
            answer: "Không. Tier và Dark Ego được bảo toàn khi chết.",
        },
        {
            id: "anti-farm",
            question: "Anti-farm hoạt động như thế nào?",
            answer: "Hệ thống ghi nhớ 5 người chơi cuối cùng bạn đã giết. Nếu giết lại trong danh sách đó, bạn sẽ không nhận được Dark Ego. Danh sách này reset sau 30 phút không có tương tác.",
        },
        {
            id: "mace-synergy",
            question: "Mace cộng hưởng với hệ thống không?",
            answer: "Có! Sát thương Mace được nhân với hệ số sát thương từ Tier, tạo combo cực mạnh khi rơi từ cao.",
        },
        {
            id: "tier-loss",
            question: "Có thể mất Tier không?",
            answer: "Không bao giờ. Tier chỉ có thể tăng, không giảm. Đây là thiết kế để khuyến khích người chơi tham gia PvP.",
        },
        {
            id: "dark-ego-cap",
            question: "Dark Ego có giới hạn không?",
            answer: "Không có giới hạn tối đa. Bạn có thể farm Dark Ego vô hạn, nhưng chi phí nâng Tier sẽ tăng lên mỗi level.",
        },
    ],
    en: [
        {
            id: "death",
            question: "Do I lose Tier on death?",
            answer: "No. Tier and Dark Ego are preserved on death.",
        },
        {
            id: "anti-farm",
            question: "How does anti-farm work?",
            answer: "The system remembers the last 5 players you killed. If you kill them again while on that list, you won't receive Dark Ego. This list resets after 30 minutes of no interaction.",
        },
        {
            id: "mace-synergy",
            question: "Does Mace synergize with the system?",
            answer: "Yes! Mace damage is multiplied by the Tier damage modifier, creating extremely powerful combos when falling from height.",
        },
        {
            id: "tier-loss",
            question: "Can I lose Tier?",
            answer: "Never. Tier can only increase, never decrease. This is designed to encourage players to engage in PvP.",
        },
        {
            id: "dark-ego-cap",
            question: "Is there a Dark Ego cap?",
            answer: "No maximum limit. You can farm Dark Ego infinitely, but the cost to upgrade Tier increases with each level.",
        },
    ],
};

export default async function QAPage({ params }: QAPageProps) {
    const { locale } = await params;
    const t = getTranslations(locale);
    const Icon = FAQ_CATEGORY.icon;
    const faqs = locale === "vi" ? faqData.vi : faqData.en;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                    <Link
                        href={`/${locale}`}
                        className="hover:text-neon-cyan transition-colors"
                    >
                        {t.nav.home}
                    </Link>
                    <span>/</span>
                    <span className="text-white/60">{t.faq.title}</span>
                </div>

                {/* Header */}
                <div className="flex items-start gap-4 mb-10">
                    <div className="p-4 rounded-xl bg-void-surface border border-void-border text-neon-pink">
                        <Icon size={32} />
                    </div>
                    <div>
                        <h1 className="font-display text-3xl font-bold text-white mb-2">
                            {t.faq.title}
                        </h1>
                        <p className="text-white/50">{t.faq.subtitle}</p>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <Accordion items={faqs} />

                {/* Contact Section */}
                <div className="mt-16 p-6 rounded-xl bg-void-surface border border-void-border text-center">
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                        {locale === "vi"
                            ? "Không tìm thấy câu trả lời?"
                            : "Can't find your answer?"}
                    </h3>
                    <p className="text-white/50 mb-4">
                        {locale === "vi"
                            ? "Tham gia Discord để được hỗ trợ trực tiếp"
                            : "Join our Discord for direct support"}
                    </p>
                    <a
                        href="https://discord.gg/egosmp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <span className="font-display">DISCORD</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
