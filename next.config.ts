import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX page extensions
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Image optimization for remote images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "oddlama.github.io",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable MDX support
    mdxRs: true,
  },

  // Redirect root to default locale
  async redirects() {
    return [
      {
        source: "/",
        destination: "/vi",
        permanent: false,
      },
    ];
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "s-maxage=60, stale-while-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
