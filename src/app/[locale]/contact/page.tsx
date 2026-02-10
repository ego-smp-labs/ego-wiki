import ContactPageClient from "./ContactPageClient";

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { locale } = await params;
    return <ContactPageClient locale={locale} />;
}
