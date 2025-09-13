import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,  // ✅ 允许 ESLint 报错时继续构建
  },
};

export default nextConfig;