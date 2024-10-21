/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
        fs: false, // Esto es necesario si también tienes fs
      };
    }
    return config;
  },
};

export default nextConfig;
