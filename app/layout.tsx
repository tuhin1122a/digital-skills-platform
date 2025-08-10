import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: "Digital Skills Platform",
  description: "A modern platform to assess, certify, and improve your digital skills.",
  generator: "Next.js,tailwindCss and express.js",
  keywords: [
    "Digital Skills",
    "Online Assessment",
    "Certification",
    "Skill Test",
    "Next.js"
  ],
  authors: [{ name: "Tuhinur Rahman" }],
  openGraph: {
    title: "Digital Skills Platform",
    description: "Test and certify your digital competencies online.",
    url: "https://digital-skills-platform-efhn.vercel.app",
    siteName: "Digital Skills Platform",
    type: "website"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider></body>
    </html>
  )
}
