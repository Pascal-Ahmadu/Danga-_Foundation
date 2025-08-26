// types/schema.ts
export interface OrganizationData {
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

export interface EventData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion?: string;
      addressCountry: string;
    };
    geo?: {
      latitude: string;
      longitude: string;
    };
  };
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  organizer: {
    name: string;
    url: string;
  };
  eventStatus?: string;
  eventAttendanceMode?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
    url?: string;
  };
  audience?: string;
  url?: string;
}

export interface ProjectData {
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
  locations?: {
    name: string;
    address?: {
      addressLocality: string;
      addressRegion?: string;
      addressCountry: string;
    };
  }[];
  funding?: {
    amount: number;
    currency: string;
    funder?: string;
  };
  duration?: {
    startDate: string;
    endDate?: string;
  };
  category?: string;
}

export interface ArticleData {
  id: string;
  headline: string;
  description: string;
  articleBody?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
    image?: string;
  };
  publisher: {
    name: string;
    url: string;
    logo?: {
      url: string;
      width?: number;
      height?: number;
    };
  };
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}