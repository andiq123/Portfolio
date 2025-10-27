/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 optimizations
  reactStrictMode: true,
  
  // Optimize images for Next.js 16
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Performance optimizations
  compress: true,
}

module.exports = nextConfig
