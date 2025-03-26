import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import RootLayoutClient from './RootLayoutClient'

const inter = Inter({ subsets: ['latin'] })

// Add environment logging
console.log('Environment:', process.env.NODE_ENV)
console.log('Database URL:', process.env.DATABASE_URL)

export const metadata: Metadata = {
  title: 'Adermis - AI Skin Disease Detection',
  description: 'AI-powered skin disease detection and analysis for early diagnosis and treatment recommendations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}