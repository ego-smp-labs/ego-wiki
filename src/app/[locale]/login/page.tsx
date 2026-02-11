import LoginPageClient from "./LoginPageClient";

interface LoginPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
    const { locale } = await params;
    const { callbackUrl } = await searchParams;

    return <LoginPageClient locale={locale} callbackUrl={callbackUrl} />;
}
