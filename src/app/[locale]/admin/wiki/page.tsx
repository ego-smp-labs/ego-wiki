"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createWikiPage } from "@core/actions/wiki"; // We will alias this
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MovingBorder } from "@presentation/components/ui/MovingBorder";
import { CATEGORIES, CATEGORY_SLUGS } from "@core/lib/categories";

const formSchema = z.object({
    title: z.string().min(3),
    category: z.enum(CATEGORY_SLUGS),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
    content: z.string().min(10),
});

type FormData = z.infer<typeof formSchema>;

export default function WikiEditorPage({ params }: { params: Promise<{ locale: string }> }) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "general",
        },
    });

    const title = watch("title");

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue("title", val);
        const slug = val
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
        setValue("slug", slug);
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setMessage("");
        try {
            const { locale } = await params;
            // The action needs 'locale' but form doesn't have it.
            // We pass it manually. 
            // Note: server action expects 'en' | 'vi'.
            const localeTyped = locale as "en" | "vi";

            await createWikiPage({
                ...data,
                locale: localeTyped,
            });

            setMessage("Page created successfully!");
            router.refresh();
            setTimeout(() => {
                router.push(`/${locale}/wiki/${data.category}/${data.slug}`);
            }, 1000);
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-4xl font-display font-bold text-white mb-8 text-glow-purple">
                ADMIN WIKI EDITOR
            </h1>

            <MovingBorder className="w-full rounded-xl" containerClassName="p-8 bg-void-surface/50 backdrop-blur-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">Title</label>
                        <input
                            {...register("title")}
                            onChange={(e) => {
                                register("title").onChange(e);
                                handleTitleChange(e);
                            }}
                            className="w-full bg-void-bg border border-void-border rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-colors"
                            placeholder="Page Title"
                        />
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">Category</label>
                            <select
                                {...register("category")}
                                className="w-full bg-void-bg border border-void-border rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-colors"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>
                                        {cat.title.en}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">Slug</label>
                            <input
                                {...register("slug")}
                                className="w-full bg-void-bg border border-void-border rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-colors font-mono"
                                placeholder="page-slug"
                            />
                            {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">MDX Content</label>
                        <textarea
                            {...register("content")}
                            rows={15}
                            className="w-full bg-void-bg border border-void-border rounded-lg p-3 text-white focus:border-neon-purple outline-none transition-colors font-mono text-sm leading-relaxed"
                            placeholder="# Header..."
                        />
                        {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-4">
                        <span className={`text-sm ${message.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
                            {message}
                        </span>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-purple text-white font-bold hover:bg-neon-purple-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading && <Loader2 className="animate-spin" size={18} />}
                            {isLoading ? "Saving..." : "Create Page"}
                        </button>
                    </div>
                </form>
            </MovingBorder>
        </div>
    );
}
