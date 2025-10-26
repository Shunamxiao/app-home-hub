
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devTools: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  experimental: {
    // This allows all cross-origin requests in development.
    // Be sure to understand the security implications for your application.
    allowedDevOrigins: ['**'],
  },
};

export default nextConfig;
