import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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