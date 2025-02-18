import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withContentlayer(withBundleAnalyzer(nextConfig));
