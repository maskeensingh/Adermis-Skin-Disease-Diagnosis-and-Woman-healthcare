'use client'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>

       
      </div>
    </SessionProvider>
  )
}