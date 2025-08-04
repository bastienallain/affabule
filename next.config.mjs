/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 2678400, // 31 days
  }, images: {
    remotePatterns: [new URL('https://tailwindcss.com/**')],
  },
  experimental: {
    optimizePackageImports: ['@headlessui/react', '@heroicons/react', '@splidejs/react-splide'],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;