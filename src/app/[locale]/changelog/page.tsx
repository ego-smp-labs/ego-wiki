import { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getTranslations } from "@core/lib/i18n";
import { getRecentUpdates } from "@core/lib/changelog";

interface ChangelogPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: ChangelogPageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === "vi" ? "Nhật ký thay đổi" : "Changelog",
        description:
            locale === "vi"
                ? "Lịch sử cập nhật và thay đổi của EGO SMP"
                : "Update history and changelogs for EGO SMP",
    };
}

export default async function ChangelogPage({ params }: ChangelogPageProps) {
    const { locale } = await params;
    const t = getTranslations(locale);
    // Fetch up to 50 recent updates
    const updates = await getRecentUpdates(locale, 50);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen void-pattern">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                    <Link
                        href={`/${locale}`}
                        className="hover:text-neon-cyan transition-colors"
                    >
                        {t.nav.home}
                    </Link>
                    <span>/</span>
                    <span className="text-white/60">
                        {locale === "vi" ? "Nhật ký thay đổi" : "Changelog"}
                    </span>
                </div>

                {/* Header */}
                <div className="flex items-start gap-4 mb-16">
                    <div className="p-4 rounded-xl bg-void-surface border border-void-border text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Clock size={32} />
                    </div>
                    <div>
                        <h1 className="font-display text-4xl font-bold text-white mb-2 tracking-wide">
                            {locale === "vi" ? "NHẬT KÝ THAY ĐỔI" : "CHANGELOG"}
                        </h1>
                        <p className="text-white/50 text-lg">
                            {locale === "vi"
                                ? "Theo dõi quá trình phát triển và cập nhật hệ thống."
                                : "Track the development progress and system updates."}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-white/10 ml-6 md:ml-10 space-y-16">
                    {updates.map((update, i) => (
                        <div key={i} className="relative pl-8 md:pl-12">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-void-bg border-2 border-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10" />
                            
                            {/* Content Card */}
                            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all hover:bg-white/5 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-display font-bold text-neon-cyan group-hover:text-white transition-colors">
                                            {update.version}
                                        </h2>
                                        {i === 0 && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-cyan text-black tracking-wider">
                                                LATEST
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm font-mono text-white/40">
                                        {update.date}
                                    </div>
                                </div>

                                <h3 className="text-xl text-white font-medium mb-4 pb-4 border-b border-white/5">
                                    {update.title}
                                </h3>

                                <div className="space-y-3">
                                    {update.content.map((line, j) => {
                                        // Simple formatting for raw markdown lines
                                        const isMainFeature = line.startsWith("- **") || line.startsWith("• **");
                                        const cleanLine = line.replace(/^\- /, "").replace(/^• /, "");
                                        
                                        return (
                                            <div key={j} className={`flex items-start gap-3 text-white/70 ${isMainFeature ? "text-white font-semibold mt-4" : ""}`}>
                                                <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isMainFeature ? "bg-neon-purple" : "bg-white/20"}`} />
                                                <span 
                                                    className="leading-relaxed"
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: cleanLine
                                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                                            .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-xs font-mono text-neon-pink">$1</code>')
                                                    }} 
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {updates.length === 0 && (
                        <div className="pl-8 text-white/30 italic">
                            {locale === "vi" ? "Chưa có dữ liệu cập nhật." : "No updates found."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
