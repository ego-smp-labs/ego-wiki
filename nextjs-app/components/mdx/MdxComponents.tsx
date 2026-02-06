import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Copy } from "lucide-react";

// ===== Custom MDX Component Types =====
interface HeadingProps {
    children: ReactNode;
    id?: string;
}

interface CodeProps {
    children: ReactNode;
    className?: string;
}

// ===== Heading Components =====
const H1 = ({ children, id }: HeadingProps) => (
    <h1
        id={id}
        className="font-display text-4xl md:text-5xl font-bold mb-6 text-white text-glow-cyan"
    >
        {children}
    </h1>
);

const H2 = ({ children, id }: HeadingProps) => (
    <h2
        id={id}
        className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4 text-white border-b border-void-border pb-2 flex items-center gap-2"
    >
        <span className="text-neon-cyan">#</span>
        {children}
    </h2>
);

const H3 = ({ children, id }: HeadingProps) => (
    <h3
        id={id}
        className="font-display text-xl font-semibold mt-8 mb-3 text-white flex items-center gap-2"
    >
        <span className="text-neon-purple">##</span>
        {children}
    </h3>
);

const H4 = ({ children, id }: HeadingProps) => (
    <h4
        id={id}
        className="font-display text-lg font-medium mt-6 mb-2 text-white/90"
    >
        {children}
    </h4>
);

// ===== Paragraph =====
const P = ({ children }: { children: ReactNode }) => (
    <p className="text-white/70 leading-relaxed mb-4">{children}</p>
);

// ===== Links =====
const A = ({
    href,
    children,
}: {
    href?: string;
    children: ReactNode;
}) => {
    const isExternal = href?.startsWith("http");

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-white transition-colors inline-flex items-center gap-1 link-underline"
            >
                {children}
                <ExternalLink size={12} />
            </a>
        );
    }

    return (
        <Link
            href={href || "#"}
            className="text-neon-cyan hover:text-white transition-colors link-underline"
        >
            {children}
        </Link>
    );
};

// ===== Code =====
const InlineCode = ({ children }: { children: ReactNode }) => (
    <code className="void-code">{children}</code>
);

const CodeBlock = ({ children, className }: CodeProps) => {
    const language = className?.replace("language-", "") || "text";

    return (
        <div className="terminal my-6 overflow-hidden">
            {/* Terminal header is handled by CSS */}
            <div className="pt-10 pb-4 px-4 overflow-x-auto">
                <pre className="text-sm">
                    <code className={`text-white/80 ${className || ""}`}>{children}</code>
                </pre>
            </div>
        </div>
    );
};

// ===== Lists =====
const UL = ({ children }: { children: ReactNode }) => (
    <ul className="list-none space-y-2 my-4 pl-4">{children}</ul>
);

const OL = ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 my-4 text-white/70">
        {children}
    </ol>
);

const LI = ({ children }: { children: ReactNode }) => (
    <li className="text-white/70 flex items-start gap-2">
        <span className="text-neon-cyan mt-1.5">▸</span>
        <span>{children}</span>
    </li>
);

// ===== Blockquote =====
const Blockquote = ({ children }: { children: ReactNode }) => (
    <blockquote className="void-blockquote">{children}</blockquote>
);

// ===== Table =====
const Table = ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-void-border">
        <table className="void-table">{children}</table>
    </div>
);

const TH = ({ children }: { children: ReactNode }) => <th>{children}</th>;
const TD = ({ children }: { children: ReactNode }) => <td>{children}</td>;
const TR = ({ children }: { children: ReactNode }) => <tr>{children}</tr>;

// ===== Horizontal Rule =====
const HR = () => (
    <hr className="my-8 border-t border-void-border relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-void-bg border border-void-border rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
        </div>
    </hr>
);

// ===== Strong / Em =====
const Strong = ({ children }: { children: ReactNode }) => (
    <strong className="text-white font-semibold">{children}</strong>
);

const Em = ({ children }: { children: ReactNode }) => (
    <em className="text-neon-purple">{children}</em>
);

// ===== Image =====
const Img = ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-6">
        <img
            src={src}
            alt={alt || ""}
            className="rounded-xl border border-void-border max-w-full"
        />
        {alt && (
            <figcaption className="text-center text-xs text-white/40 mt-2">
                {alt}
            </figcaption>
        )}
    </figure>
);

// ===== Export MDX Components =====
export const mdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    a: A,
    code: InlineCode,
    pre: CodeBlock,
    ul: UL,
    ol: OL,
    li: LI,
    blockquote: Blockquote,
    table: Table,
    th: TH,
    td: TD,
    tr: TR,
    hr: HR,
    strong: Strong,
    em: Em,
    img: Img,
};

export default mdxComponents;
