import AdminPageClient from "./AdminPageClient";

interface AdminPageProps {
    params: Promise<{ locale: string }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
    const { locale } = await params;
    return <AdminPageClient locale={locale} />;
}
