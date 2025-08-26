// components/schemas/ProjectSchema.tsx
'use client';

interface ProjectFunding {
  amount: number;
  currency: string;
  funder?: string;
}

interface ProjectLocation {
  name: string;
  address?: {
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  };
}

interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  dateCreated: string;
  dateModified?: string;
  datePublished?: string;
  status: 'active' | 'completed' | 'planned' | 'on-hold';
  creator: {
    name: string;
    url: string;
  };
  keywords?: string[];
  image?: string;
  beneficiaries?: number;
  locations?: ProjectLocation[];
  funding?: ProjectFunding;
  duration?: {
    startDate: string;
    endDate?: string;
  };
  category?: string;
}

interface ProjectSchemaProps {
  project: ProjectData;
}

export default function ProjectSchema({ project }: ProjectSchemaProps) {
  if (!project) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    '@id': `${project.url}/#project`,
    name: project.name,
    description: project.description,
    url: project.url,
    dateCreated: project.dateCreated,
    dateModified: project.dateModified || project.dateCreated,
    datePublished: project.datePublished,
    mainEntityOfPage: project.url,
    creator: {
      '@type': 'Organization',
      '@id': `${project.creator.url}/#organization`,
      name: project.creator.name,
      url: project.creator.url,
    },
    ...(project.keywords && project.keywords.length > 0 && {
      keywords: project.keywords.join(', '),
    }),
    ...(project.image && {
      image: {
        '@type': 'ImageObject',
        url: project.image,
      },
    }),
    // Custom properties for additional project data
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'status',
        value: project.status,
      },
      ...(project.beneficiaries ? [{
        '@type': 'PropertyValue',
        name: 'beneficiaries',
        value: project.beneficiaries.toString(),
      }] : []),
      ...(project.category ? [{
        '@type': 'PropertyValue',
        name: 'category',
        value: project.category,
      }] : []),
      ...(project.locations && project.locations.length > 0 ? [{
        '@type': 'PropertyValue',
        name: 'projectLocations',
        value: project.locations.map(loc => loc.name).join(', '),
      }] : []),
    ].filter(Boolean),
    ...(project.duration && {
      temporalCoverage: project.duration.endDate 
        ? `${project.duration.startDate}/${project.duration.endDate}`
        : `${project.duration.startDate}/..`,
    }),
    ...(project.funding && {
      funding: {
        '@type': 'MonetaryAmount',
        currency: project.funding.currency,
        value: project.funding.amount,
        ...(project.funding.funder && {
          funder: {
            '@type': 'Organization',
            name: project.funding.funder,
          },
        }),
      },
    }),
    ...(project.locations && project.locations.length > 0 && {
      spatialCoverage: project.locations.map(location => ({
        '@type': 'Place',
        name: location.name,
        ...(location.address && {
          address: {
            '@type': 'PostalAddress',
            addressLocality: location.address.addressLocality,
            addressRegion: location.address.addressRegion,
            addressCountry: location.address.addressCountry,
          },
        }),
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}