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

// Helper function to get image path based on name/role
function getImagePath(trustee: any): string | null {
  // Check if trustee has image property
  if (trustee.image) {
    return trustee.image;
  }
  
  // Special case for chairman
  if (trustee.role.toLowerCase().includes('chairman') || 
      trustee.name.toLowerCase().includes('joshua emmanuel')) {
    return '/chairman2.jpg';
  }
  
  // You can add more specific image mappings here
  // For example:
  // if (trustee.name.toLowerCase().includes('specific name')) {
  //   return '/specific-trustee-image.jpg';
  // }
  
  return null;
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
        <section className="py-12 bg-white overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <nav 
              className="flex items-center space-x-4 text-lg animate-in slide-in-from-left-6 fade-in-0 duration-700" 
              aria-label="Breadcrumb"
            >
              <Link
                href="/who-we-are"
                className="text-gray-600 hover:text-brand transition-all duration-300 font-light tracking-wide uppercase
                           hover:translate-x-1 hover:scale-105 relative group"
              >
                WHO WE ARE
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <ChevronRight className="w-6 h-6 text-gray-400 animate-pulse" />
              <span className="text-gray-900 font-medium tracking-wide uppercase animate-in slide-in-from-right-4 fade-in-0 duration-700 delay-300">
                OUR LEADERSHIP
              </span>
            </nav>
          </div>
        </section>

        <section className="section-padding bg-white overflow-hidden">
          <div className="container max-w-6xl mx-auto text-center">
            {/* Hero Section with Staggered Animations */}
            <div className="animate-in slide-in-from-bottom-8 fade-in-0 duration-1000">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 animate-in slide-in-from-top-4 fade-in-0 duration-800 delay-200">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent
                               animate-in slide-in-from-right-4 fade-in-0 duration-800 delay-500
                               inline-block transform hover:scale-105 transition-transform duration-300">
                  Leadership
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto
                           animate-in slide-in-from-bottom-6 fade-in-0 duration-800 delay-700">
                Our foundation is led by a dedicated team of trustees who bring
                passion, expertise, and commitment to driving our mission forward.
              </p>
            </div>

            {/* Trustees Grid with Staggered Entrance */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {trustees.map((trustee, index) => {
                const imagePath = getImagePath(trustee);
                
                return (
                  <div
                    key={trustee.name}
                    className="p-6 bg-gray-50 shadow-sm text-center group hover:shadow-xl 
                               transition-all duration-500 ease-out transform hover:-translate-y-2
                               hover:bg-white border border-transparent hover:border-brand/20
                               animate-in slide-in-from-bottom-8 fade-in-0 duration-700
                               hover:scale-105 cursor-pointer relative overflow-hidden"
                    style={{
                      animationDelay: `${800 + (index * 150)}ms`,
                    }}
                  >
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-light/5 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    <div className="w-32 h-32 mx-auto relative mb-4 transform transition-all duration-500 group-hover:scale-110">
                      {imagePath ? (
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-1
                                       shadow-lg group-hover:shadow-xl transition-all duration-500 relative">
                          {/* Ring animation on hover */}
                          <div className="absolute inset-0 rounded-full border-2 border-brand/30 
                                         scale-0 group-hover:scale-110 transition-transform duration-700 animate-pulse"></div>
                          <Image
                            src={imagePath}
                            alt={`${trustee.name} - ${trustee.role}`}
                            fill
                            className="object-cover rounded-full transition-all duration-500 
                                     group-hover:brightness-110 group-hover:contrast-110"
                            sizes="128px"
                            priority={index < 6} // Prioritize first 6 images
                          />
                        </div>
                      ) : (
                        /* Fallback to initials if no image */
                        <div className="w-32 h-32 bg-gradient-to-r from-brand to-brand-light rounded-full 
                                       flex items-center justify-center transition-all duration-500 
                                       group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl
                                       relative overflow-hidden">
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                         -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <span className="text-white text-2xl font-light relative z-10 transition-all duration-300
                                         group-hover:scale-110 group-hover:text-shadow">
                            {getInitials(trustee.name)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-light text-gray-900 mb-2 transition-all duration-300
                                 group-hover:text-brand group-hover:scale-105 transform">
                      {trustee.name}
                    </h3>
                    <p className="text-gray-600 font-light mb-2 transition-all duration-300 
                                group-hover:text-gray-800 transform group-hover:translate-y-1">
                      {trustee.role}
                    </p>
                    
                    {/* Optional: Add bio if available in trustees data */}
                    {(trustee as any).bio && (
                      <p className="text-sm text-gray-500 font-light mt-3 line-clamp-3 
                                   transition-all duration-500 opacity-80 group-hover:opacity-100
                                   transform translate-y-2 group-hover:translate-y-0">
                        {(trustee as any).bio}
                      </p>
                    )}
                    
                    {/* Decorative element */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                                   w-0 h-1 bg-gradient-to-r from-brand to-brand-light 
                                   group-hover:w-16 transition-all duration-500"></div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action with Enhanced Animation */}
            <div className="mt-16 text-center animate-in slide-in-from-bottom-8 fade-in-0 duration-1000"
                 style={{ animationDelay: `${1200 + (trustees.length * 150)}ms` }}>
              <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto relative overflow-hidden
                             transform transition-all duration-500 hover:scale-105 hover:shadow-lg
                             border border-transparent hover:border-brand/20 group">
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-light/5 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <h2 className="text-2xl font-light text-gray-900 mb-4 relative z-10
                             transform transition-all duration-300 group-hover:scale-105">
                  Want to Learn More?
                </h2>
                <p className="text-gray-600 font-light mb-6 relative z-10
                             transform transition-all duration-300 group-hover:translate-y-1">
                  Discover more about our foundation's mission, vision, and the impact we're making in communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link
                    href="/who-we-are"
                    className="px-6 py-3 bg-brand text-white hover:bg-brand-dark 
                             transition-all duration-300 font-medium relative overflow-hidden
                             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                             before:absolute before:inset-0 before:bg-gradient-to-r 
                             before:from-transparent before:via-white/20 before:to-transparent
                             before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full
                             before:transition-transform before:duration-700 group"
                  >
                    <span className="relative z-10">About Our Foundation</span>
                  </Link>
                  <Link
                    href="/what-we-do"
                    className="px-6 py-3 border border-brand text-brand hover:bg-brand hover:text-white 
                             transition-all duration-300 font-medium relative overflow-hidden
                             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                             before:absolute before:inset-0 before:bg-brand before:scale-x-0
                             before:origin-left hover:before:scale-x-100 before:transition-transform
                             before:duration-300 before:z-0 group"
                  >
                    <span className="relative z-10 transition-colors duration-300">Our Programs</span>
                  </Link>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-brand/10 to-brand-light/10 
                               rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700
                               transform scale-0 group-hover:scale-100"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tl from-brand-light/10 to-brand/10 
                               rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200
                               transform scale-0 group-hover:scale-100"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}