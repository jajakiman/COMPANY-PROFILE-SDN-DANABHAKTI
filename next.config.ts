import type { NextConfig } from "next";

const blobHostname = process.env.BLOB_STORE_HOSTNAME;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: blobHostname ? [{ protocol: "https", hostname: blobHostname }] : [],
  },
};

export default nextConfig;
