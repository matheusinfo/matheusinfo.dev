/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'export',

  compiler: {
    styledComponents: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
