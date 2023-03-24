/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  revolve: {
    fallback: {
      util: false,
      process: false,
      path: false,
    },
  },
};

module.exports = nextConfig;
