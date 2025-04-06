import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Programming Languages Manager',
  description: 'A comprehensive tool for managing programming languages.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
