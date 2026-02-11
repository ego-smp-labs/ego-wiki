import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "@core/lib/i18n";
import { FAQ_CATEGORY } from "@core/lib/categories";
import Accordion from "@presentation/components/ui/Accordion";

interface FAQPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: FAQPageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "FAQ",
        description:
            locale === "vi"
                ? "Câu hỏi thường gặp về EGO WIKI"
                : "Frequently asked questions about EGO WIKI",
    };
}

const faqData = {
    vi: [
        {
            id: "death",
            question: "Chết thì sao?",
            answer: "Chết không \"rửa sạch\" thứ bạn đã hấp thụ. Nếu bạn đang Tier 0: vẫn là Tier 0. Nếu Tier 1 trở lên: khi chết bạn sẽ bị kéo về Tier 1 (không rơi về Tier 0).",
        },
        {
            id: "ego-drop",
            question: "Ego rơi từ đâu?",
            answer: "Ego là thứ rơi ra từ PvP — từ khoảnh khắc một người chơi đoạt mạng một người chơi khác.",
        },
        {
            id: "no-ego-drop",
            question: "Tại sao tôi giết mà không thấy Ego rơi?",
            answer: "Các lý do: (1) Anti-farm tier thấp: người chơi tier cao giết tier 0 không rơi Ego. (2) Bảo vệ server khỏi farm lặp: cooldown theo nạn nhân / giới hạn chuỗi kill.",
        },
        {
            id: "ego-effect",
            question: "Dùng Ego xong bị gì?",
            answer: "Ego không phải thuốc bổ. Khi dùng sẽ dính: Chóng mặt (Nausea), Darkness, xáo kho đồ, Độc I trong 10-15 giây. Đây là cái giá của việc \"nuốt\" thêm tội lỗi.",
        },
        {
            id: "dark-ego",
            question: "Dark Ego là gì, và vì sao ai cũng sợ?",
            answer: "Dark Ego là phiên bản độc hơn, bẩn hơn của Ego thường. Nó khóa tiến hóa: bạn không thể leo lên tier tiếp theo nếu chưa vượt qua cổng Dark Ego tương ứng.",
        },
        {
            id: "mace-what",
            question: "Mace là gì?",
            answer: "Mace là vũ khí huyền thoại với sức mạnh hủy diệt. Chỉ có một cây trên server.",
        },
        {
            id: "mace-glow",
            question: "Mace phát sáng bao lâu?",
            answer: "Mace có hiệu ứng glowing 5 phút sau khi bạn sở hữu. Sức mạnh càng lớn đi kèm rủi ro — săn đuổi là điều chờ bạn.",
        },
        {
            id: "mace-drop",
            question: "Tôi có thể vứt Mace không?",
            answer: "Mace được thiết kế hạn chế drop: không cho vứt (phím Q), chỉ \"lọt ra\" theo luật chết.",
        },
        {
            id: "mace-chest",
            question: "Tôi có thể cất Mace vào rương không?",
            answer: "Có chế độ strict-mode để siết việc di chuyển Mace vào container; khi bật, server sẽ chặn việc đưa Mace vào các chỗ cất giữ không được phép.",
        },
        {
            id: "join",
            question: "Làm sao để tham gia server?",
            answer: "Kết nối bằng IP server và tham gia Discord: discord.gg/jRqnNbupj4",
        },
        {
            id: "bug",
            question: "Tôi tìm thấy bug!",
            answer: "Báo trong Discord ở kênh #bug-reports để team xử lý nhanh.",
        },
        {
            id: "version",
            question: "Cần phiên bản Minecraft nào?",
            answer: "Khuyến nghị 1.21.11+ và 1.21.130 cho PE (bản càng mới càng đỡ lỗi).",
        },
    ],
    en: [
        {
            id: "death",
            question: "What happens when I die?",
            answer: "Death doesn't erase what you've absorbed. Tier 0 stays Tier 0. Tier 1+ gets pulled back to Tier 1 (not 0).",
        },
        {
            id: "ego-drop",
            question: "Where does Ego come from?",
            answer: "Ego drops from PvP — the moment one player kills another.",
        },
        {
            id: "no-ego-drop",
            question: "Why didn't I get Ego after killing?",
            answer: "Reasons: (1) Anti-farm: high tier killing tier 0 won't drop Ego. (2) Server protection: cooldown per victim / kill chain limits.",
        },
        {
            id: "ego-effect",
            question: "What happens after using Ego?",
            answer: "Ego isn't medicine. Effects include: Nausea, Darkness, inventory shuffle, Poison I for 10-15 seconds. That's the cost of absorbing more sin.",
        },
        {
            id: "dark-ego",
            question: "What is Dark Ego?",
            answer: "Dark Ego is the deadlier variant of regular Ego. It gates evolution: you can't climb to next tier without passing the Dark Ego checkpoint.",
        },
        {
            id: "mace-what",
            question: "What is the Mace?",
            answer: "The Mace is a legendary weapon with devastating power. Only ONE exists on the server.",
        },
        {
            id: "mace-glow",
            question: "How long does Mace glow?",
            answer: "The Mace glows for 5 minutes after you obtain it. Greater power comes with greater risk — you become a target.",
        },
        {
            id: "mace-drop",
            question: "Can I drop the Mace?",
            answer: "The Mace is designed to restrict dropping: no Q-drop, it only \"escapes\" via death mechanics.",
        },
        {
            id: "mace-chest",
            question: "Can I store the Mace in a chest?",
            answer: "With strict-mode enabled, the server blocks placing the Mace in unauthorized containers.",
        },
        {
            id: "join",
            question: "How do I join?",
            answer: "Connect via server IP and join Discord: discord.gg/jRqnNbupj4",
        },
        {
            id: "bug",
            question: "I found a bug!",
            answer: "Report it on Discord in the #bug-reports channel.",
        },
        {
            id: "version",
            question: "What Minecraft version do I need?",
            answer: "Recommended 1.21.11+ (latest version recommended for best experience).",
        },
    ],
};

export default async function FAQPage({ params }: FAQPageProps) {
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
                        href="https://discord.gg/jRqnNbupj4"
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
