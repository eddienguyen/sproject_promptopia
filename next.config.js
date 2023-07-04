/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config, options) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
