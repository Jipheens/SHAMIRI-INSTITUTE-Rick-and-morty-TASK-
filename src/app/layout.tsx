import './globals.css'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Morty',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} font-sans`}>
        <div className="min-h-screen dark:bg-zinc-900 lg:grid lg:grid-cols-app">
          <Sidebar />
          <main className="px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
