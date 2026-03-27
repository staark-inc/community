import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  
  images: {
    remotePatterns: [new URL("https://avatars.githubusercontent.com"), new URL("https://lh3.googleusercontent.com")],
  },
  reactCompiler: true,
};

export default nextConfig;
