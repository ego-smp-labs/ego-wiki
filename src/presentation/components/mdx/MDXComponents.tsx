import Link from "next/link";

const MDXComponents = {
  // Headings
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-4xl font-bold mt-12 mb-6 text-white border-b border-void-border pb-4" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-3xl font-semibold mt-10 mb-5 text-white flex items-center gap-2 group" {...props}>
      <span className="w-2 h-8 rounded-sm bg-neon-cyan/80 hidden group-hover:block transition-all mr-2" />
      {props.children}
    </h2>
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-2xl font-semibold mt-8 mb-4 text-neon-lavender" {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 className="text-xl font-medium mt-6 mb-3 text-white/90" {...props} />
  ),

  // Text
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 leading-7 text-white/70" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props: React.ComponentPropsWithoutRef<"em">) => (
    <em className="text-neon-pink not-italic" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-4 border-neon-cyan bg-void-surface/50 p-6 my-8 rounded-r-lg italic text-white/80" {...props} />
  ),

  // Lists
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc list-outside mb-6 ml-6 text-white/70 space-y-2 marker:text-neon-cyan" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal list-outside mb-6 ml-6 text-white/70 space-y-2 marker:text-neon-purple" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="pl-2" {...props} />
  ),

  // Links
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: ({ href, children, ...props }: any) => {
    const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
    if (isInternal) {
      return (
        <Link href={href} className="text-neon-cyan hover:text-neon-lavender transition-colors underline decoration-neon-cyan/30 underline-offset-4" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neon-cyan hover:text-neon-lavender transition-colors underline decoration-neon-cyan/30 underline-offset-4 inline-flex items-center gap-1"
        {...props}
      >
        {children}
        <span className="text-[10px] opacity-50">↗</span>
      </a>
    );
  },

  // Code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: ({ className, children, ...props }: any) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-void-dark px-1.5 py-0.5 rounded text-sm text-neon-green font-mono border border-white/10" {...props}>
          {children}
        </code>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  },
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre className="bg-void-dark p-4 rounded-lg overflow-x-auto my-6 border border-void-border custom-scrollbar" {...props} />
  ),

  // Media
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl border border-void-border my-8 w-full object-cover max-h-[500px]" alt={props.alt} {...props} />
  ),

  // Tables
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-8 border border-void-border rounded-lg">
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-void-surface border-b border-void-border" {...props} />
  ),
  tbody: (props: React.ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-y divide-void-border" {...props} />
  ),
  tr: (props: React.ComponentPropsWithoutRef<"tr">) => (
    <tr className="hover:bg-white/5 transition-colors" {...props} />
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th className="px-6 py-4 text-sm font-semibold text-white uppercase tracking-wider" {...props} />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td className="px-6 py-4 text-sm text-white/70 whitespace-pre-wrap" {...props} />
  ),

  // Divider
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-12 border-void-border bg-gradient-to-r from-transparent via-white/10 to-transparent h-[1px] border-none" {...props} />
  ),
};

export default MDXComponents;
