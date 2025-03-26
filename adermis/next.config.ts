import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // This will allow production builds even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Turbopack-friendly configuration
  modularizeImports: {
    '@/lib': {
      transform: '@/lib/{{member}}'
    },
    '@/types': {
      transform: '@/types/{{member}}'
    }
  }
}

export default nextConfig
