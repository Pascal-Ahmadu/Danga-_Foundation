'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils'; // Utility for conditional classnames

// Type definitions for better type safety
interface StatItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  'aria-label': string;
}

interface CTAButton {
  id: string;
  href: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  'aria-label': string;
}

// Constants moved outside component for better performance
const STATS_DATA: readonly StatItem[] = [
  {
    id: 'lives-impacted',
    icon: Users,
    value: '1,500+',
    label: 'Lives Impacted',
    'aria-label': 'Over 1,500 lives positively impacted through our programs'
  },
  {
    id: 'scholarships',
    icon: BookOpen,
    value: '150+',
    label: 'Scholarships Awarded',
    'aria-label': 'More than 150 educational scholarships awarded to deserving students'
  },
  {
    id: 'communities',
    icon: Heart,
    value: '25+',
    label: 'Communities Served',
    'aria-label': 'Over 25 communities actively served across Nigeria'
  }
] as const;

const CTA_BUTTONS: readonly CTAButton[] = [
  {
    id: 'donate-cta',
    href: '/donate',
    variant: 'primary',
    children: 'Make a Donation',
    icon: Heart,
    'aria-label': 'Navigate to donation page to support our cause'
  },
  {
    id: 'programs-cta',
    href: '/what-we-do',
    variant: 'secondary',
    children: 'Our Programs',
    icon: ArrowRight,
    'aria-label': 'Learn more about our community programs and initiatives'
  }
] as const;

// Reusable styled components
const StatCard: React.FC<{ stat: StatItem }> = ({ stat }) => {
  const IconComponent = stat.icon;
  
  return (
    <div 
      className="text-left group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-white transition-all duration-300 mb-6"
      role="figure"
      aria-label={stat['aria-label']}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-all duration-300">
          <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-gray-900">
            {stat.value}
          </div>
          <div className="text-sm text-gray-700">
            {stat.label}
          </div>
        </div>
      </div>
    </div>
  );
};

const CTAButton: React.FC<{ button: CTAButton }> = ({ button }) => {
  const IconComponent = button.icon;
  
  const baseClasses = "group px-6 py-3 text-sm font-medium transition-all duration-300 inline-flex items-center justify-center min-w-[140px] hover:shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent uppercase tracking-wide";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400"
  };

  return (
    <Link
      href={button.href}
      className={cn(baseClasses, variantClasses[button.variant])}
      aria-label={button['aria-label']}
    >
      {button.children}
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

// Main Hero Component
const Hero: React.FC = () => {
  const handleKeyNavigation = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      // Allow default tab behavior for accessibility
      return;
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen bg-white overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
      onKeyDown={handleKeyNavigation}
    >
      {/* Main Content Container */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Organization Badge */}
            <div className="inline-block">
              <div className="bg-blue-600 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
                DANGA MEMORIAL FOUNDATION
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 
                id="hero-title"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight"
              >
                Empowering Communities Through Education and Support
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl">
              The Danga Memorial Foundation provides essential support to underserved communities in Nigeria through youth development, educational scholarships, healthcare initiatives, and sustainable development programs. Your support helps us respond when communities need us most.
            </p>

            {/* Impact Statement */}
            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <p className="text-sm text-gray-700 font-medium">
                Through our comprehensive programs in youth empowerment, psycho-social support, educational development, health and wellness, WASH initiatives, and environmental sustainability, we're building stronger communities and brighter futures across Nigeria.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {CTA_BUTTONS.map((button) => (
                <CTAButton key={button.id} button={button} />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            {/* Image Container */}
            <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden rounded-lg shadow-lg">
              <Image 
                src="/children.jpg"
                alt="Children in communities benefiting from Danga Memorial Foundation programs"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>

            {/* Image Caption */}
            <div className="mt-4 text-sm text-gray-600">
              <p>Children in communities across Nigeria benefit from our comprehensive support programs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance optimization: Preload critical next page */}
      <link rel="prefetch" href="/donate" />
      <link rel="prefetch" href="/what-we-do" />
    </section>
  );
};

// Performance optimization with React.memo
export default React.memo(Hero);