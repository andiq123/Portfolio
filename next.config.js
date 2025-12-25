/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Performance optimizations
  compress: true,
}

module.exports = nextConfig
