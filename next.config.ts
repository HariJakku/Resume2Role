const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  serverExternalPackages: ["pdf-parse", "mammoth"],
  turbopack: {},
}

module.exports = withPWA(nextConfig)