import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'fukulab',
  description: 'fukulabのページ'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main
          className="sm:max-w-7xl mx-auto pb-12 sm:px-16 px-6"
          style={{ paddingTop: 90 }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
