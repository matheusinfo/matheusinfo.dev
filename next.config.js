/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: "./",
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
};
