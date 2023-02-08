/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: "./",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
};

export default nextConfig;
