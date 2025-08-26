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
    "group px-6 py-3 text-sm font-light transition-all duration-300 inline-flex items-center justify-center min-w-[140px] hover:shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent uppercase tracking-wide";

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

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">

            {/* Left column */}
            <div className="space-y-8" itemScope itemType="https://schema.org/Article">
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

              <div className="space-y-3">
                <h1
                  id="hero-title"
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 leading-tight"
                  itemProp="headline"
                >
                  {seoData.title}
                </h1>
              </div>

              <p
                className="text-base lg:text-lg font-light text-gray-700 leading-relaxed max-w-xl"
                itemProp="description"
              >
                {seoData.description}
              </p>

              <div
                className="bg-gray-50 p-4 border-l-4 border-brand"
                itemScope
                itemType="https://schema.org/Statement"
              >
                <p className="text-sm font-light text-gray-700" itemProp="text">
                  Through our comprehensive programs in youth empowerment, psycho-social support,
                  educational development, health and wellness, WASH initiatives, and environmental sustainability,
                  we're building stronger communities and brighter futures across Nigeria.
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4 pt-4"
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

            {/* Right column */}
            <div className="relative" itemScope itemType="https://schema.org/ImageObject">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden shadow-lg">
                <Image
                  src="/children.jpg"
                  alt="Children in communities benefiting from Danga Memorial Foundation programs"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 text-sm font-light text-gray-600">
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
      </section>
    </>
  );
};

export default React.memo(Hero);
