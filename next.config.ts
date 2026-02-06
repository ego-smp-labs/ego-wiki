import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX page extensions
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Image optimization for remote images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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

  // Headers for better caching
  async headers() {
    return [
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
