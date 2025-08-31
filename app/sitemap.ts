import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dangafoundation.org'
  
  // Define your main pages here
  const routes = [
    '',
    '/about',
    '/programs',
    '/projects',
    '/get-involved',
    '/donate',
    '/contact',
    '/news',
    '/events',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/about' ? 0.9 : 0.8,
  }))
}
