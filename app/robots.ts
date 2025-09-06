// app/robots.ts - OPTIMIZED VERSION
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'], // Removed '/private/' since you might not need it
      },
      // Optional: You can add specific rules for different bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://dangafoundation.org/sitemap.xml',
    // Optional: Add host directive
    host: 'https://dangafoundation.org',
  }
}