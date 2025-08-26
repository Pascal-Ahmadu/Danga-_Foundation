import { Metadata } from "next";
import trustees from "@/data/trustees.json";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";

export const metadata: Metadata = {
  title: "Our Leadership",
  description:
    "Meet the leadership team guiding the Danga Memorial Foundation - dedicated trustees with expertise and commitment to our mission.",
  openGraph: {
    title: "Our Leadership - Danga Memorial Foundation",
    description: "Meet our dedicated team of trustees who bring passion, expertise, and commitment to driving our mission forward.",
    url: "https://www.danga.org/leadership",
  },
  keywords: [
    "Danga leadership",
    "NGO trustees",
    "foundation board",
    "nonprofit leadership",
    "community leaders Nigeria"
  ],
};

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Breadcrumb items for this page
const breadcrumbItems = [
  { name: 'Home', url: 'https://www.danga.org' },
  { name: 'Who We Are', url: 'https://www.danga.org/who-we-are' },
  { name: 'Our Leadership', url: 'https://www.danga.org/leadership' },
];

// Organization data with leadership context
const organizationData = {
  name: 'Danga Memorial Foundation',
  alternateName: 'Danga NGO',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'The Danga Memorial Foundation is led by a dedicated team of trustees who bring passion, expertise, and commitment to driving our mission forward in community development, healthcare, and education across Nigeria.',
  address: {
    streetAddress: '123 Community Drive',
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
    'https://www.facebook.com/dangamemorialfoundation',
    'https://www.twitter.com/dangamemorial',
    'https://www.linkedin.com/company/danga-memorial-foundation',
    'https://www.instagram.com/dangamemorial',
  ],
  foundingDate: '2024',
  nonprofitStatus: 'Nonprofit501c3',
  keywords: ['NGO leadership', 'nonprofit trustees', 'community development leaders', 'healthcare Nigeria', 'education Nigeria'],
  areaServed: 'Nigeria',
  // Add leadership-specific data
  founders: trustees.filter(t => t.role.toLowerCase().includes('founder')).map(t => t.name),
};

export default function LeadershipPage() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema data={organizationData} />
      
      <div className="pt-20">
        {/* Breadcrumbs */}
        <section className="py-12 bg-white">
          <div className="container max-w-6xl mx-auto">
            <nav className="flex items-center space-x-4 text-lg" aria-label="Breadcrumb">
              <Link
                href="/who-we-are"
                className="text-gray-600 hover:text-brand transition-colors font-light tracking-wide uppercase"
              >
                WHO WE ARE
              </Link>
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <span className="text-gray-900 font-medium tracking-wide uppercase">OUR LEADERSHIP</span>
            </nav>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Leadership
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
              Our foundation is led by a dedicated team of trustees who bring
              passion, expertise, and commitment to driving our mission forward.
            </p>

            {/* Trustees Grid */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {trustees.map((trustee, index) => (
                <div
                  key={trustee.name}
                  className="p-6 bg-gray-50 shadow-sm text-center group hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-32 h-32 mx-auto relative mb-4">
                    {/* Option A: Use placeholder image if image property exists */}
                    {(trustee as any).image ? (
                      <Image
                        src={(trustee as any).image}
                        alt={`${trustee.name} - ${trustee.role}`}
                        fill
                        className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                        sizes="128px"
                        priority={index < 6} // Prioritize first 6 images
                      />
                    ) : (
                      /* Option B: Use initials as placeholder */
                      <div className="w-32 h-32 bg-gradient-to-r from-brand to-brand-light rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white text-2xl font-light">
                          {getInitials(trustee.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {trustee.name}
                  </h3>
                  <p className="text-gray-600 font-light mb-2">{trustee.role}</p>
                  
                  {/* Optional: Add bio if available in trustees data */}
                  {(trustee as any).bio && (
                    <p className="text-sm text-gray-500 font-light mt-3 line-clamp-3">
                      {(trustee as any).bio}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-light text-gray-900 mb-4">
                  Want to Learn More?
                </h2>
                <p className="text-gray-600 font-light mb-6">
                  Discover more about our foundation's mission, vision, and the impact we're making in communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/who-we-are"
                    className="px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-colors duration-300 font-medium"
                  >
                    About Our Foundation
                  </Link>
                  <Link
                    href="/what-we-do"
                    className="px-6 py-3 border border-brand text-brand hover:bg-brand hover:text-white transition-colors duration-300 font-medium"
                  >
                    Our Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}