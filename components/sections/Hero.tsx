'use client';

import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
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
const STATS_DATA: StatItem[] = [
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

const CTA_BUTTONS: CTAButton[] = [
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

// Utility function for SVG pattern
const createPatternDataUri = (): string => {
  const svg = `
    <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
      <g fill='white' fill-opacity='0.1'>
        <path d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/>
      </g>
    </svg>
  `;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

// Reusable styled components
const StatCard: React.FC<{ stat: StatItem }> = ({ stat }) => {
  const IconComponent = stat.icon;
  
  return (
    <div 
      className="text-center group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-white rounded-lg transition-all duration-300"
      role="figure"
      aria-label={stat['aria-label']}
    >
      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300 shadow-lg">
        <IconComponent className="h-8 w-8 text-white drop-shadow-sm" aria-hidden="true" />
      </div>
      <div className="text-3xl xl:text-4xl font-light mb-2 text-white tracking-wide">
        {stat.value}
      </div>
      <div className="text-lg opacity-90 font-light text-white/90">
        {stat.label}
      </div>
    </div>
  );
};

const CTAButton: React.FC<{ button: CTAButton }> = ({ button }) => {
  const IconComponent = button.icon;
  
  const baseClasses = "group px-8 py-4 text-base transition-all duration-300 inline-flex items-center justify-center min-w-[200px] shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent";
  
  const buttonStyle = { fontWeight: '300' };
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 shadow-lg hover:shadow-xl",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400 shadow-lg hover:shadow-xl"
  };

  return (
    <Link
      href={button.href}
      className={cn(baseClasses, variantClasses[button.variant])}
      aria-label={button['aria-label']}
      style={buttonStyle}
    >
      {button.children}
      <IconComponent 
        className={cn(
          "ml-3 h-5 w-5 transition-transform duration-300",
          button.variant === 'primary' ? "group-hover:scale-110" : "group-hover:translate-x-1"
        )} 
        aria-hidden="true" 
      />
    </Link>
  );
};

const ScrollIndicator: React.FC = () => (
  <div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
    role="button"
    tabIndex={0}
    aria-label="Scroll down to view more content"
    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }}
  >
    <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center group-hover:border-blue-600 transition-colors duration-300">
      <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 group-hover:bg-blue-600 transition-colors duration-300"></div>
    </div>
  </div>
);

// Main Hero Component
const Hero: React.FC = () => {
  const patternDataUri = useMemo(() => createPatternDataUri(), []);

  const handleKeyNavigation = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      // Allow default tab behavior for accessibility
      return;
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
      onKeyDown={handleKeyNavigation}
    >
      {/* Clean White Background */}
      <div className="absolute inset-0 bg-white">
        {/* Subtle pattern overlay for texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: patternDataUri }}
          aria-hidden="true"
        />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 text-center text-gray-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Hero Text with improved typography */}
          <div className="mb-12 space-y-8 mt-32">
            <h1 
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.2] tracking-normal"
              style={{ fontWeight: '300' }}
            >
              <span className="block mb-2" style={{ fontWeight: '300' }}>
                Empowering Communities,
              </span>
              <span className="block text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text" style={{ fontWeight: '300' }}>
                Transforming Lives
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed max-w-4xl mx-auto text-gray-600" style={{ fontWeight: '300' }}>
              Through education, health initiatives, and sustainable development programs, 
              we're building stronger communities and brighter futures across Nigeria.
            </p>
          </div>

          {/* CTA Buttons with improved spacing */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 px-4">
            {CTA_BUTTONS.map((button) => (
              <CTAButton key={button.id} button={button} />
            ))}
          </div>

          {/* Enhanced Stats Section */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto"
            role="region"
            aria-labelledby="stats-heading"
          >
            <h2 id="stats-heading" className="sr-only">
              Our Impact Statistics
            </h2>
            {STATS_DATA.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <ScrollIndicator />

      {/* Performance optimization: Preload critical next page */}
      <link rel="prefetch" href="/donate" />
      <link rel="prefetch" href="/what-we-do" />
    </section>
  );
};

// Performance optimization with React.memo
export default React.memo(Hero);