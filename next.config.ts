/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pinimg.com", "res.cloudinary.com"], // Add res.cloudinary.com here
  },
};

export default nextConfig;*/

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in dev mode
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['i.pinimg.com', 'res.cloudinary.com'],
  },
});
