
'use client';

interface EventLocation {
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
}

interface EventImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface EventOffer {
  price: string;
  priceCurrency: string;
  availability?: string;
  url?: string;
}

interface EventData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: EventLocation;
  images?: EventImage[];
  organizer: {
    name: string;
    url: string;
  };
  eventStatus?: string;
  eventAttendanceMode?: string;
  offers?: EventOffer;
  audience?: string;
  url?: string;
}

interface EventSchemaProps {
  event: EventData;
}

export default function EventSchema({ event }: EventSchemaProps) {
  if (!event) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${event.organizer.url}/events/${event.id}/#event`,
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: event.eventStatus || 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.eventAttendanceMode || 'https://schema.org/OfflineEventAttendanceMode',
    url: event.url || `${event.organizer.url}/events/${event.id}`,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address.streetAddress,
        addressLocality: event.location.address.addressLocality,
        addressRegion: event.location.address.addressRegion,
        addressCountry: event.location.address.addressCountry,
      },
      ...(event.location.geo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: event.location.geo.latitude,
          longitude: event.location.geo.longitude,
        },
      }),
    },
    ...(event.images && event.images.length > 0 && {
      image: event.images.map(img => ({
        '@type': 'ImageObject',
        url: img.url,
        width: img.width,
        height: img.height,
        caption: img.alt,
      })),
    }),
    organizer: {
      '@type': 'Organization',
      '@id': `${event.organizer.url}/#organization`,
      name: event.organizer.name,
      url: event.organizer.url,
    },
    ...(event.offers && {
      offers: {
        '@type': 'Offer',
        price: event.offers.price,
        priceCurrency: event.offers.priceCurrency,
        availability: event.offers.availability || 'https://schema.org/InStock',
        url: event.offers.url,
      },
    }),
    ...(event.audience && {
      audience: {
        '@type': 'Audience',
        name: event.audience,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}