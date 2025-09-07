'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Target, Eye, Heart, ArrowRight, Users, LucideProps } from 'lucide-react';

// Enhanced value interface with correct Lucide icon type
interface ValueItem {
  id: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
  shortDescription: string; // For meta descriptions
  keywords: string[]; // SEO keywords for each value
  schemaType: string; // Schema.org type
}

// SEO-optimized values data
const values: ValueItem[] = [
  {
    id: 'mission',
    icon: Target,
    title: 'Our Mission',
    shortDescription: 'Empowering communities through sustainable education, health, and development programs in Nigeria.',
    description:
      'To empower communities through sustainable education, health, and development programs that create lasting positive change and break cycles of poverty. We are committed to building stronger, more resilient communities by providing comprehensive support that addresses root causes of inequality. Our mission extends beyond immediate relief to fostering long-term transformation through capacity building, skills development, and community-driven solutions. We believe in working alongside communities rather than for them, ensuring that every intervention is culturally appropriate and locally sustainable.',
    keywords: [
      'community empowerment Nigeria',
      'sustainable education programs',
      'poverty reduction initiatives',
      'capacity building programs',
      'community development Nigeria'
    ],
    schemaType: 'Mission'
  },
  {
    id: 'vision',
    icon: Eye,
    title: 'Our Vision',
    shortDescription: 'A world where every individual has access to quality education, healthcare, and opportunities.',
    description:
      'A world where every individual has access to quality education, healthcare, and opportunities to reach their full potential regardless of their background or circumstances. We envision thriving communities where children grow up with hope, families have economic security, and everyone can participate meaningfully in society. Our vision encompasses a future where systemic barriers to progress are dismantled, where innovation and tradition work hand in hand, and where the dignity of every person is recognized and protected. We see a world where communities are self-reliant, environmentally sustainable, and connected to global opportunities while maintaining their unique cultural identities.',
    keywords: [
      'quality education access',
      'healthcare for all',
      'community empowerment',
      'economic security',
      'social justice Nigeria'
    ],
    schemaType: 'Vision'
  },
  {
    id: 'values',
    icon: Heart,
    title: 'Our Values',
    shortDescription: 'Integrity, compassion, excellence, and inclusivity drive everything we do.',
    description:
      'We are driven by integrity, compassion, excellence, and inclusivity in everything we do, ensuring transparency and accountability in all our programs and operations. Our core values include respect for human dignity, commitment to social justice, and belief in the power of collaboration. We practice cultural humility, recognizing that communities are the experts of their own experiences and needs. Innovation guides our approach as we continuously seek creative solutions to complex challenges. We value sustainability in all its forms - environmental, social, and economic - ensuring that our work creates lasting positive impact for future generations. Equity and fairness are at the heart of our decision-making processes.',
    keywords: [
      'NGO transparency',
      'social justice values',
      'community collaboration',
      'cultural humility',
      'sustainable development'
    ],
    schemaType: 'Values'
  },
];

// Updated custom hook for intersection observer with proper typing
const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting] as const;
};

// SEO-optimized Mission component
interface MissionProps {
  organizationId?: string;
  showCallToAction?: boolean;
}

const Mission: React.FC<MissionProps> = ({ 
  organizationId = 'https://www.dangamemorial.org/#organization',
  showCallToAction = true 
}) => {
  const [headerRef, headerInView] = useIntersectionObserver<HTMLDivElement>();
  const [ctaRef, ctaInView] = useIntersectionObserver<HTMLDivElement>();
  
  // Organization schema reference
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${organizationId.replace('#organization', '')}/#about`,
    name: 'About Danga Memorial Foundation - Mission, Vision & Values',
    description: 'Learn about Danga Memorial Foundation\'s mission to empower communities through sustainable education, healthcare, and development programs across Nigeria.',
    mainEntity: {
      '@type': 'Organization',
      '@id': organizationId,
      mission: values[0].description,
      knowsAbout: values.flatMap(v => v.keywords),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Community Development Programs',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Educational Support Programs',
            description: 'Scholarships and educational initiatives for underserved communities'
          },
          {
            '@type': 'Offer',
            name: 'Healthcare Initiatives',
            description: 'Community health programs and medical support services'
          },
          {
            '@type': 'Offer',
            name: 'Youth Development Programs',
            description: 'Skills training and empowerment programs for young people'
          }
        ]
      }
    }
  };

  // FAQ schema for common questions about the organization
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Danga Memorial Foundation\'s mission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: values[0].shortDescription
        }
      },
      {
        '@type': 'Question',
        name: 'What is the vision of Danga Memorial Foundation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: values[1].shortDescription
        }
      },
      {
        '@type': 'Question',
        name: 'What values guide Danga Memorial Foundation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: values[2].shortDescription
        }
      }
    ]
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      <section 
        className="py-16 md:py-24 bg-white overflow-hidden"
        itemScope
        itemType="https://schema.org/AboutPage"
        aria-labelledby="mission-heading"
      >
        <meta itemProp="name" content="About Danga Memorial Foundation" />
        <meta itemProp="description" content="Learn about our mission, vision, and values driving community empowerment across Nigeria" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section heading with enhanced SEO and animations */}
          <header 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              headerInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 
              id="mission-heading"
              className={`text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 transition-all duration-1200 ease-out delay-200 ${
                headerInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              itemProp="headline"
            >
              Our Mission, Vision and{' '}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent inline-block transform transition-transform duration-500 hover:scale-105">
                Values
              </span>
            </h2>
            <p 
              className={`text-xl text-gray-600 max-w-3xl mx-auto font-light transition-all duration-1200 ease-out delay-400 ${
                headerInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              itemProp="description"
            >
              Our foundation is built on the belief that sustainable change begins with empowering
              communities through education, health initiatives, and meaningful opportunities.
            </p>
            
            {/* Hidden SEO content */}
            <div className="sr-only">
              <h3>Danga Memorial Foundation Core Principles</h3>
              <p>
                Danga Memorial Foundation is a leading Nigerian NGO focused on community development,
                educational empowerment, healthcare access, and sustainable development programs
                across underserved communities in Nigeria.
              </p>
            </div>
          </header>

          {/* Values grid with enhanced schema markup and staggered animations */}
          <div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <meta itemProp="name" content="Danga Memorial Foundation Core Values" />
            <meta itemProp="description" content="Mission, vision, and values that guide our community development work" />
            
            {values.map((value, index) => {
              const Icon = value.icon;
              const [cardRef, cardInView] = useIntersectionObserver<HTMLDivElement>();
              
              return (
                <article
                  key={value.id}
                  ref={cardRef}
                  className={`text-center group transition-all duration-700 ease-out ${
                    cardInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  } ${index === 1 ? 'lg:scale-105' : ''}`}
                  style={{
                    transitionDelay: `${200 + index * 200}ms`
                  }}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <meta itemProp="position" content={(index + 1).toString()} />
                  <meta itemProp="name" content={value.title} />
                  <meta itemProp="description" content={value.shortDescription} />
                  
                  <div 
                    className="bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 h-full transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                    itemScope
                    itemType={`https://schema.org/${value.schemaType}`}
                  >
                    {/* Subtle background animation on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div 
                      className="flex items-center justify-center mx-auto mb-6 relative z-10"
                      role="img"
                      aria-label={`${value.title} icon`}
                    >
                      <div className="relative">
                        <Icon 
                          className="h-12 w-12 text-brand font-light transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
                          strokeWidth={1} 
                          aria-hidden="true"
                        />
                        {/* Animated ring on hover */}
                        <div className="absolute inset-0 border-2 border-brand/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    <h3 
                      className="text-2xl font-light text-gray-900 mb-4 relative z-10 transition-colors duration-300 group-hover:text-brand"
                      itemProp="name"
                    >
                      {value.title}
                    </h3>
                    
                    <div itemProp="description" className="relative z-10">
                      <p className="text-gray-600 leading-relaxed font-light text-justify transition-colors duration-300 group-hover:text-gray-700">
                        {value.description}
                      </p>
                    </div>

                    {/* Hidden keywords for SEO */}
                    <div className="sr-only">
                      <meta itemProp="keywords" content={value.keywords.join(', ')} />
                      <span itemProp="about">
                        {value.keywords.map(keyword => (
                          <span key={keyword}>{keyword} </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Enhanced Call to action with schema markup and animations */}
          {showCallToAction && (
            <div 
              ref={ctaRef}
              className={`text-center mt-16 transition-all duration-1000 ease-out ${
                ctaInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              itemScope
              itemType="https://schema.org/CallToAction"
            >
              <div className="bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 max-w-4xl mx-auto transform hover:scale-[1.02] relative overflow-hidden group">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-brand-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <h3 
                  className={`text-2xl md:text-3xl font-light text-gray-900 mb-4 relative z-10 transition-all duration-800 delay-200 ${
                    ctaInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}
                  itemProp="name"
                >
                  Join Our Mission
                </h3>
                <p 
                  className={`text-lg text-gray-600 mb-6 font-light relative z-10 transition-all duration-800 delay-400 ${
                    ctaInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  itemProp="description"
                >
                  Together, we can create lasting change and build stronger, more resilient communities.
                  Your support makes a real difference in empowering communities across Nigeria.
                </p>
                
                <div 
                  className={`flex flex-col sm:flex-row gap-4 justify-center relative z-10 transition-all duration-800 delay-600 ${
                    ctaInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  itemScope
                  itemType="https://schema.org/ActionAccessSpecification"
                >
                  <Link
                    href="/get-involved"
                    className="group/btn px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-medium inline-flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
                    itemProp="target"
                    aria-label="Get involved with Danga Memorial Foundation programs"
                  >
                    <Users className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" aria-hidden="true" />
                    Get Involved
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Link>
                  
                  <Link
                    href="/about"
                    className="group/btn px-6 py-3 border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 font-medium inline-flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
                    itemProp="result"
                    aria-label="Learn more about Danga Memorial Foundation"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>

                {/* Action schema metadata */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'PotentialAction',
                      name: 'Join Danga Memorial Foundation',
                      description: 'Get involved with community development programs',
                      target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://www.dangamemorial.org/get-involved'
                      }
                    })
                  }}
                />
              </div>
            </div>
          )}

          {/* Additional SEO content - hidden but crawlable */}
          <div className="sr-only">
            <h3>Why Choose Danga Memorial Foundation?</h3>
            <ul>
              <li>Proven track record in community development across Nigeria</li>
              <li>Transparent and accountable operations</li>
              <li>Culturally sensitive and locally sustainable programs</li>
              <li>Focus on long-term transformation and capacity building</li>
              <li>Collaborative approach working with communities</li>
            </ul>
            
            <h3>Our Impact Areas</h3>
            <p>
              Danga Memorial Foundation works across multiple sectors including education,
              healthcare, youth development, environmental sustainability, and economic empowerment.
              Our programs reach underserved communities throughout Nigeria, with a special focus
              on breaking cycles of poverty through sustainable, community-driven solutions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Mission);