import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Expose Vercel URL to client-side code
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  },
  reactCompiler: true,

  // Image configuration to avoid Vercel billing
  images: {
    // Disable Next.js Image Optimization to avoid any billing charges
    // This is safe because we only use SVGs for logos
    unoptimized: true,
  },
};

export default nextConfig;
