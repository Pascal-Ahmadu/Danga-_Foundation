// utils/schemaHelpers.ts
import { OrganizationData, EventData, ProjectData, ArticleData } from '@/types/schema';

// Default organization data - customize this for your NGO
export const defaultOrganizationData: OrganizationData = {
  name: 'Danga NGO',
  alternateName: 'Danga Non-Governmental Organization',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'A non-governmental organization focused on community development, healthcare, and education in Nigeria.',
  address: {
    streetAddress: '123 Main Street',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    postalCode: '100001',
    addressCountry: 'Nigeria',
  },
  contactPoint: {
    telephone: '+234-XXX-XXX-XXXX',
    email: 'info@danga.org',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.facebook.com/dangango',
    'https://www.twitter.com/dangango',
    'https://www.linkedin.com/company/dangango',
    'https://www.instagram.com/dangango',
  ],
  foundingDate: '2020',
  nonprofitStatus: 'Nonprofit501c3',
};

// Helper function to create base organization reference
export function createOrganizationReference(orgData: OrganizationData = defaultOrganizationData) {
  return {
    '@type': 'Organization',
    '@id': `${orgData.url}/#organization`,
    name: orgData.name,
    url: orgData.url,
  };
}

// Helper to format dates for schema.org
export function formatSchemaDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
}

// Helper to create event schema data
export function createEventData(
  eventDetails: Partial<EventData>,
  orgData: OrganizationData = defaultOrganizationData
): EventData {
  return {
    id: eventDetails.id || '',
    name: eventDetails.name || '',
    description: eventDetails.description || '',
    startDate: eventDetails.startDate || '',
    endDate: eventDetails.endDate,
    location: eventDetails.location || {
      name: '',
      address: {
        streetAddress: '',
        addressLocality: '',
        addressCountry: 'Nigeria',
      },
    },
    organizer: {
      name: orgData.name,
      url: orgData.url,
    },
    images: eventDetails.images,
    eventStatus: eventDetails.eventStatus || 'https://schema.org/EventScheduled',
    eventAttendanceMode: eventDetails.eventAttendanceMode || 'https://schema.org/OfflineEventAttendanceMode',
    offers: eventDetails.offers,
    audience: eventDetails.audience,
    url: eventDetails.url || `${orgData.url}/events/${eventDetails.id}`,
  };
}

// Helper to create project schema data
export function createProjectData(
  projectDetails: Partial<ProjectData>,
  orgData: OrganizationData = defaultOrganizationData
): ProjectData {
  return {
    id: projectDetails.id || '',
    name: projectDetails.name || '',
    description: projectDetails.description || '',
    url: projectDetails.url || `${orgData.url}/projects/${projectDetails.id}`,
    dateCreated: projectDetails.dateCreated || formatSchemaDate(new Date()),
    dateModified: projectDetails.dateModified,
    datePublished: projectDetails.datePublished,
    status: projectDetails.status || 'active',
    creator: {
      name: orgData.name,
      url: orgData.url,
    },
    keywords: projectDetails.keywords,
    image: projectDetails.image,
    beneficiaries: projectDetails.beneficiaries,
    locations: projectDetails.locations,
    funding: projectDetails.funding,
    duration: projectDetails.duration,
    category: projectDetails.category,
  };
}

// Helper to create article schema data
export function createArticleData(
  articleDetails: Partial<ArticleData>,
  orgData: OrganizationData = defaultOrganizationData
): ArticleData {
  return {
    id: articleDetails.id || '',
    headline: articleDetails.headline || '',
    description: articleDetails.description || '',
    articleBody: articleDetails.articleBody,
    url: articleDetails.url || '',
    datePublished: articleDetails.datePublished || formatSchemaDate(new Date()),
    dateModified: articleDetails.dateModified,
    author: articleDetails.author || {
      name: orgData.name,
      url: orgData.url,
    },
    publisher: {
      name: orgData.name,
      url: orgData.url,
      logo: orgData.logo ? {
        url: orgData.logo,
        width: 600,
        height: 60,
      } : undefined,
    },
    image: articleDetails.image,
    keywords: articleDetails.keywords,
    articleSection: articleDetails.articleSection,
    wordCount: articleDetails.wordCount,
    inLanguage: articleDetails.inLanguage || 'en',
  };
}

// Helper to validate required schema fields
export function validateEventData(event: Partial<EventData>): string[] {
  const errors: string[] = [];
  
  if (!event.name) errors.push('Event name is required');
  if (!event.startDate) errors.push('Event start date is required');
  if (!event.description) errors.push('Event description is required');
  if (!event.location?.name) errors.push('Event location name is required');
  
  return errors;
}

export function validateProjectData(project: Partial<ProjectData>): string[] {
  const errors: string[] = [];
  
  if (!project.name) errors.push('Project name is required');
  if (!project.description) errors.push('Project description is required');
  if (!project.dateCreated) errors.push('Project creation date is required');
  
  return errors;
}

// Helper to generate breadcrumb data from URL path
export function generateBreadcrumbs(pathname: string, baseUrl: string = 'https://www.danga.org') {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: baseUrl }
  ];
  
  let currentPath = baseUrl;
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({
      name,
      url: currentPath
    });
  });
  
  return breadcrumbs;
}