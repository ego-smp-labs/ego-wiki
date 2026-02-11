import DonatePageClient from "./DonatePageClient";

interface DonatePageProps {
    params: Promise<{ locale: string }>;
}

export default async function DonatePage({ params }: DonatePageProps) {
    const { locale } = await params;
    return <DonatePageClient locale={locale} />;
}
