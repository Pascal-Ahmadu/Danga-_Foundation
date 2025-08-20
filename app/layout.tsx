import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Danga Memorial Foundation',
    template: '%s | Danga Memorial Foundation'
  },
  description: 'Empowering communities through education, health, and sustainable development programs. Join us in making a lasting impact.',
  keywords: ['NGO', 'foundation', 'education', 'health', 'community development', 'scholarship', 'empowerment'],
  authors: [{ name: 'Danga Memorial Foundation' }],
  creator: 'Danga Memorial Foundation',
  metadataBase: new URL('https://dangamemorialfoundation.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dangamemorialfoundation.org',
    siteName: 'Danga Memorial Foundation',
    title: 'Danga Memorial Foundation - Empowering Communities',
    description: 'Empowering communities through education, health, and sustainable development programs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Danga Memorial Foundation'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danga Memorial Foundation',
    description: 'Empowering communities through education, health, and sustainable development programs.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}