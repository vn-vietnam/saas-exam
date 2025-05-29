import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	// Optionally, add any other Next.js config below
	transpilePackages: ["next-mdx-remote"],
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};

export default nextConfig;
