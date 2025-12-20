
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
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
        hostname: 'api.us.apks.cc',
      },
      {
        protocol: 'https',
        hostname: 'z.wiki',
      },
       {
        protocol: 'https',
        hostname: 'f.gbcass.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
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
