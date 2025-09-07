'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Brain, 
  GraduationCap, 
  HeartHandshake, 
  Droplets, 
  Leaf,
  ArrowRight 
} from 'lucide-react';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';

// Custom hook for intersection observer with proper typing
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

const programs = [
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'We aim to create opportunities for young people through skills training, mentorship, and leadership development. Our future youth empowerment programs will focus on building practical abilities, encouraging entrepreneurship, and supporting pathways to sustainable employment. The goal is to help youth discover their potential, develop their talents, and connect with meaningful opportunities that prepare them to contribute positively to their communities.',
    href: '/what-we-do/youth-empowerment',
  },
  {
    icon: Brain,
    title: 'Psycho-Social Support',
    description: 'We plan to develop mental health support and counseling services that help individuals overcome challenges and build resilience. Our vision for psycho-social programs includes offering trauma-informed care, creating safe spaces for community healing, and building networks of support that strengthen emotional well-being and recovery.',
    href: '/what-we-do/psycho-social-support',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'We are committed to expanding access to education through scholarships, school supplies, and academic support. Our planned education initiatives will cover early childhood development, school retention, vocational training, and higher education opportunities for those with financial need. Education will remain a cornerstone in our efforts to break cycles of poverty and empower future generations.',
    href: '/what-we-do/education',
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'We seek to improve community well-being by creating health and wellness programs that provide essential services and promote preventive care. Our approach includes planning medical outreaches, supporting local healthcare initiatives, and raising awareness about nutrition and long-term wellness practices.',
    href: '/what-we-do/health-and-wellness',
  },
  {
    icon: Droplets,
    title: 'WASH Programs',
    description: 'We intend to ensure communities have reliable access to clean water and proper sanitation. Our WASH focus is on developing sustainable water systems, improving sanitation infrastructure, and promoting hygiene education to reduce preventable diseases and improve quality of life.',
    href: '/what-we-do/wash',
  },
  {
    icon: Leaf,
    title: 'Environment Sustainability',
    description: 'We plan to promote environmental conservation and sustainable development practices that safeguard the planet for future generations. Our efforts will include initiatives such as tree planting, awareness campaigns, sustainable agriculture promotion, and support for renewable energy solutions. We believe environmental stewardship is key to building resilient and thriving communities.',
    href: '/what-we-do/environment-sustainability',
  }
];

interface ProgramsProps {
  // Optional props to customize breadcrumb behavior
  showBreadcrumb?: boolean;
  currentPage?: string;
  baseUrl?: string;
}

export default function Programs({ 
  showBreadcrumb = true, 
  currentPage,
  baseUrl = 'https://www.danga.org'
}: ProgramsProps = {}) {
  const [headerRef, headerInView] = useIntersectionObserver<HTMLDivElement>();
  const [ctaRef, ctaInView] = useIntersectionObserver<HTMLDivElement>();
  
  // Generate breadcrumb items based on context
  const getBreadcrumbItems = () => {
    const items = [
      { name: 'Home', url: baseUrl },
    ];

    if (currentPage) {
      // If this is being used on a specific program page
      items.push(
        { name: 'What We Do', url: `${baseUrl}/what-we-do` },
        { name: currentPage, url: `${baseUrl}/what-we-do/${currentPage.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}` }
      );
    } else {
      // If this is being used on the main programs/what-we-do page
      items.push({ name: 'What We Do', url: `${baseUrl}/what-we-do` });
    }

    return items;
  };

  return (
    <>
      {/* Add breadcrumb schema if enabled */}
      {showBreadcrumb && (
        <BreadcrumbSchema items={getBreadcrumbItems()} />
      )}
      
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Animated header section */}
          <div 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              headerInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 
              className={`text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 transition-all duration-1200 ease-out delay-200 ${
                headerInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Our <span className="bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">Impact Programs</span>
            </h2>
            <p 
              className={`text-xl text-gray-600 max-w-3xl mx-auto font-light transition-all duration-1200 ease-out delay-400 ${
                headerInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
            >
              We focus on six key areas that we plan to develop in order to create sustainable change 
              and empower communities to thrive through future community-driven initiatives.
            </p>
          </div>

          {/* Animated programs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const [cardRef, cardInView] = useIntersectionObserver<HTMLDivElement>();
              
              return (
                <Link
                  key={program.title}
                  href={program.href}
                  className={`group block transition-all duration-700 ease-out ${
                    cardInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: `${200 + index * 100}ms`
                  }}
                >
                  <div 
                    ref={cardRef}
                    className="bg-white p-8 shadow-sm hover:shadow-md h-full border border-gray-100 
                                group-hover:border-brand/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <Icon className="h-12 w-12 text-brand font-light transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth="1" />
                    </div>
                    
                    <h3 className="text-xl font-light text-gray-900 mb-3 group-hover:text-brand 
                                   transition-colors duration-300">
                      {program.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed font-light text-justify">
                      {program.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Animated call to action */}
          <div 
            ref={ctaRef}
            className={`text-center mt-16 transition-all duration-1000 ease-out ${
              ctaInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <Link
              href="/what-we-do"
              className={`px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-medium inline-flex items-center transform hover:scale-105 hover:shadow-lg ${
                ctaInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '600ms'
              }}
            >
              View All Programs
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}