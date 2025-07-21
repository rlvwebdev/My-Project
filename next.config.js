const nextConfig = {
  /* config options here */
  experimental: {
    turbopack: true,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Enable source maps in development
  productionBrowserSourceMaps: false,
  // Optimize for Windows development
  webpack: (config, { dev, isServer }) => {
    // Windows-specific optimizations
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

module.exports = nextConfig
