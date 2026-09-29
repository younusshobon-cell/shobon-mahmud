import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // Friendly aliases that match the navigation label "Work"
    return [
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/case-studies", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
