import React from "react"
import type { Metadata, Viewport } from 'next'
import { Libre_Baskerville, Imbue, DM_Sans, Sansation, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: '--font-libre-baskerville'
});

const imbue = Imbue({
  subsets: ["latin"],
  variable: '--font-imbue'
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans'
});

const sansation = Sansation({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: '--font-sansation'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const SITE_URL = 'https://swarainvestments.in';
const TITLE = 'Swara Investments — Mumbai';
const DESCRIPTION = 'Swara Investments is a Mumbai-based investment firm offering portfolio management, wealth advisory, mutual fund & insurance distribution, and equity research.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Swara Investments',
  },
  description: DESCRIPTION,
  keywords: [
    'Swara Investments',
    'wealth advisory Mumbai',
    'portfolio management Mumbai',
    'mutual fund distributor Mumbai',
    'insurance distribution',
    'equity research',
    'investment firm Mumbai',
  ],
  authors: [{ name: 'Swara Investments' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Swara Investments',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1731,
        height: 909,
        alt: 'Swara Investments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#427A7A',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Swara Investments',
  url: SITE_URL,
  logo: `${SITE_URL}/logo2.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  email: 'mandar@swarainvestments.in',
  telephone: '+91-98920-5544',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: 'Mumbai',
  sameAs: [
    'https://www.linkedin.com/in/mandar-kadam-a6605a29/',
    'https://www.instagram.com/swara_investments',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${libreBaskerville.variable} ${imbue.variable} ${sansation.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
