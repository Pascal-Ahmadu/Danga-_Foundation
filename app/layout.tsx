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

// Enhanced metadata for better search visibility
export const metadata: Metadata = {
  title: {
    default: 'Danga Foundation - Empowering Communities Through Action',
    template: '%s | Danga Foundation',
  },
  description: 'Danga Memorial Foundation is a leading Nigerian NGO focused on community development, educational empowerment, healthcare access, and sustainable development across Nigeria. Join us in making a difference.',
  keywords: [
    'Danga Foundation',
    'Danga Memorial Foundation', 
    'Nigerian NGO',
    'Nigeria charity',
    'community development Nigeria',
    'healthcare Nigeria', 
    'education Nigeria',
    'non-profit organization Nigeria',
    'social impact Nigeria',
    'community empowerment',
    'sustainable development Nigeria',
    'educational empowerment Nigeria',
    'leading Nigerian NGO'
  ],
  authors: [{ name: 'Danga Foundation', url: 'https://www.dangafoundation.org' }],
  creator: 'Danga Memorial Foundation',
  publisher: 'Danga Foundation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.dangafoundation.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.dangafoundation.org',
    siteName: 'Danga Foundation',
    title: 'Danga Foundation - Empowering Communities Through Action',
    description: 'Danga Memorial Foundation is a leading Nigerian NGO focused on community development, educational empowerment, healthcare access, and sustainable development.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Danga Foundation - Empowering Communities Through Action',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dangafoundation',
    creator: '@dangafoundation',
    title: 'Danga Foundation - Empowering Communities Through Action',
    description: 'Leading Nigerian NGO focused on community development, education, and healthcare.',
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
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // bing: 'your-bing-verification-code', // Add Bing verification if needed
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
        
        {/* Enhanced Organization schema */}
        <OrganizationSchema data={defaultOrganizationData} />
        
        {/* Additional structured data for better search visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "name": "Danga Memorial Foundation",
              "alternateName": "Danga Foundation",
              "url": "https://www.dangafoundation.org",
              "logo": "https://www.dangafoundation.org/logo.png",
              "description": "Danga Memorial Foundation is a leading Nigerian NGO focused on community development, educational empowerment, healthcare access, and sustainable development.",
              "foundingDate": "2024", // Update with actual founding date
              "areaServed": {
                "@type": "Country",
                "name": "Nigeria"
              },
              "knowsAbout": [
                "Community Development",
                "Healthcare Access",
                "Educational Empowerment",
                "Sustainable Development",
                "Social Impact"
              ],
              "sameAs": [
                "https://www.facebook.com/dangafoundation",
                "https://www.twitter.com/dangafoundation",
                "https://www.linkedin.com/company/dangafoundation",
                "https://www.instagram.com/dangafoundation"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-911-122-6666",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "hoursAvailable": "Mo-Fr 09:00-17:00"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG",
                "addressLocality": "Abuja", // Update with actual location
                "addressRegion": "FCT"
              }
            })
          }}
        />
        
        {/* Breadcrumb structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.dangafoundation.org"
                }
              ]
            })
          }}
        />
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
        
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        {/* 
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        */}
      </body>
    </html>
  );
}