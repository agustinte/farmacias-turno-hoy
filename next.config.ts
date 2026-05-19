import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./prisma/dev.db'], // Reemplaza 'dev.db' por el nombre exacto de tu archivo
  },
};

export default nextConfig;
