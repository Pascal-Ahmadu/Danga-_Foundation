// app/layout.tsx
import './globals.css';
import { Inter, Lora, Playfair_Display } from 'next/font/google';
import { Metadata } from 'next';
import OrganizationSchema from '@/components/schemas/OrganizationSchema';
import { defaultOrganizationData } from '@/utils/schemaHelpers';

// Optimized font loading with display swap
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Comprehensive metadata
export const metadata: Metadata = {
  title: {
    default: 'Danga NGO - Empowering Communities Through Action',
    template: '%s | Danga NGO',
  },
  description: 'Danga NGO is dedicated to improving lives through healthcare, education, and community development projects across Nigeria. Join us in making a difference.',
  keywords: [
    'NGO', 
    'charity', 
    'community development', 
    'healthcare Nigeria', 
    'education Nigeria', 
    'non-profit organization',
    'social impact',
    'community empowerment'
  ],
  authors: [{ name: 'Danga NGO', url: 'https://www.danga.org' }],
  creator: 'Danga NGO',
  publisher: 'Danga NGO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.danga.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.danga.org',
    siteName: 'Danga NGO',
    title: 'Danga NGO - Empowering Communities Through Action',
    description: 'Improving lives through healthcare, education, and community development across Nigeria.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Danga NGO - Empowering Communities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dangango',
    creator: '@dangango',
    title: 'Danga NGO - Empowering Communities',
    description: 'Join us in making a difference through community development.',
    images: ['/twitter-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'non-profit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" />
        
        {/* Organization schema - Static data in head */}
        <OrganizationSchema data={defaultOrganizationData} />
      </head>
      
      <body className={`${inter.variable} ${lora.variable} ${playfair.variable} antialiased bg-white text-gray-900 selection:bg-green-100 selection:text-green-900`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-md z-50 font-medium transition-all duration-200 hover:bg-green-700"
        >
          Skip to main content
        </a>
        
        {children}
        
        {/* Analytics and tracking scripts can go here */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" /> */}
      </body>
    </html>
  );
}