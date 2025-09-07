"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';

interface CTAButton {
  id: string;
  href: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  'aria-label': string;
}

const CTA_BUTTONS: readonly CTAButton[] = [
  {
    id: 'donate-cta',
    href: '/donate',
    variant: 'primary',
    children: 'Make a Donation',
    icon: Heart,
    'aria-label': 'Navigate to donation page to support our cause',
  },
  {
    id: 'programs-cta',
    href: '/what-we-do',
    variant: 'secondary',
    children: 'Our Programs',
    icon: ArrowRight,
    'aria-label': 'Learn more about our community programs and initiatives',
  },
] as const;

const CTAButton: React.FC<{ button: CTAButton }> = ({ button }) => {
  const IconComponent = button.icon;

  const baseClasses =
    "group px-4 py-3 sm:px-6 sm:py-3 text-sm font-light transition-all duration-300 inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[140px] hover:shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent uppercase tracking-wide";

  const variantClasses = {
    primary: "bg-brand text-white hover:bg-brand-dark focus:ring-brand",
    secondary: "border-2 border-brand text-brand hover:bg-brand hover:text-white focus:ring-brand"
  };

  return (
    <Link
      href={button.href}
      className={cn(baseClasses, variantClasses[button.variant])}
      aria-label={button['aria-label']}
      itemScope
      itemType="https://schema.org/Action"
    >
      <span itemProp="name">{button.children}</span>
      <meta itemProp="url" content={button.href} />
      <IconComponent
        className={cn(
          "ml-2 h-4 w-4 transition-transform duration-300",
          button.variant === 'primary' ? "group-hover:scale-110" : "group-hover:translate-x-1"
        )}
        aria-hidden="true"
      />
    </Link>
  );
};

interface HeroProps {
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const Hero: React.FC<HeroProps> = ({ metadata }) => {
  const handleKeyNavigation = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Tab') return;
  }, []);

  const seoData = {
    title: metadata?.title || "Empowering Communities Through Education and Support",
    description: metadata?.description || "The Danga Memorial Foundation provides essential support to underserved communities in Nigeria through youth development, educational scholarships, healthcare initiatives, and sustainable development programs.",
    keywords: metadata?.keywords || [
      "Nigeria NGO", "community development", "educational scholarships",
      "youth empowerment", "healthcare initiatives", "sustainable development",
      "Danga Memorial Foundation", "charity Nigeria", "community support"
    ]
  };

  const breadcrumbItems = [{ name: 'Home', url: 'https://www.dangamemorial.org' }];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      <div style={{ display: 'none' }}>
        <h1>{seoData.title}</h1>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
      </div>

      <section
        className="relative min-h-screen bg-white overflow-hidden"
        role="banner"
        aria-labelledby="hero-title"
        onKeyDown={handleKeyNavigation}
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <meta itemProp="name" content="Hero Section" />
        <meta itemProp="description" content={seoData.description} />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 w-full items-center">

            {/* Left column - Content */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1" itemScope itemType="https://schema.org/Article">
              <div className="inline-block">
                <div
                  className="bg-brand text-white px-3 py-1.5 text-xs font-light uppercase tracking-wider"
                  itemProp="publisher"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <span itemProp="name">DANGA MEMORIAL FOUNDATION</span>
                </div>
              </div>

              <div className="space-y-4">
                <h1
                  id="hero-title"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-gray-900 leading-tight"
                  itemProp="headline"
                >
                  {seoData.title}
                </h1>
              </div>

              <p
                className="text-base sm:text-lg lg:text-xl font-light text-gray-700 leading-relaxed max-w-xl"
                itemProp="description"
              >
                {seoData.description}
              </p>

              <div
                className="bg-gray-50 p-4 sm:p-6 border-l-4 border-brand"
                itemScope
                itemType="https://schema.org/Statement"
              >
                <p className="text-sm sm:text-base font-light text-gray-700 leading-relaxed" itemProp="text">
                  Through our comprehensive programs in youth empowerment, psycho-social support,
                  educational development, health and wellness, WASH initiatives, and environmental sustainability,
                  we're building stronger communities and brighter futures across Nigeria.
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                <meta itemProp="name" content="Call to Action Buttons" />
                {CTA_BUTTONS.map((button, index) => (
                  <div key={button.id} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content={(index + 1).toString()} />
                    <CTAButton button={button} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Image */}
            <div className="relative order-1 lg:order-2" itemScope itemType="https://schema.org/ImageObject">
              <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-gray-100 relative overflow-hidden shadow-lg rounded-lg">
                <Image
                  src="/children.jpg"
                  alt="Children in communities benefiting from Danga Memorial Foundation programs"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm font-light text-gray-600 text-center lg:text-left">
                <p itemProp="caption">
                  Children in communities across Nigeria benefit from our comprehensive support programs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <link rel="prefetch" href="/donate" />
        <link rel="prefetch" href="/what-we-do" />
        <link rel="prefetch" href="/about" />
        <link rel="preload" href="/children.jpg" as="image" />

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes text-reveal {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes expand-width {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes float-delayed {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-3deg);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.1;
              transform: scale(1.1);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }

          .animate-text-reveal {
            animation: text-reveal 1.2s ease-out 0.6s both;
          }

          .animate-expand-width {
            animation: expand-width 1s ease-out;
            transform-origin: left;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
            animation-delay: 2s;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }
        `}</style>
      </section>
    </>
  );
};

export default React.memo(Hero);