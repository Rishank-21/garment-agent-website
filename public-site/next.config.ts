import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/capabilities",
        destination: "/white-labeling",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
