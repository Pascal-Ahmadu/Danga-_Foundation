'use client';

interface OrganizationData {
  name: string;
  alternateName?: string;
  url: string;
  logo?: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    email?: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
  foundingDate?: string;
  nonprofitStatus?: string;
}

interface OrganizationSchemaProps {
  data?: OrganizationData;
}

const defaultOrgData: OrganizationData = {
  name: 'Danga NGO',
  alternateName: 'Danga Non-Governmental Organization',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'A non-governmental organization focused on community development, healthcare, and education in Nigeria.',
  address: {
    streetAddress: '123 Main Street',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
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

export default function OrganizationSchema({ data = defaultOrgData }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${data.url}/#organization`,
    name: data.name,
    alternateName: data.alternateName,
    url: data.url,
    logo: data.logo,
    description: data.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: data.contactPoint.telephone,
      email: data.contactPoint.email,
      contactType: data.contactPoint.contactType,
      availableLanguage: data.contactPoint.availableLanguage,
    },
    sameAs: data.sameAs,
    foundingDate: data.foundingDate,
    nonprofitStatus: data.nonprofitStatus,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}