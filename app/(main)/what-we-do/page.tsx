import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, 
  Brain, 
  GraduationCap, 
  HeartHandshake, 
  Droplets, 
  Leaf,
  ArrowRight,
  Target,
  Heart,
  ChevronRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import OrganizationSchema from '@/components/schemas/OrganizationSchema';

export const metadata: Metadata = {
  title: 'What We Do - Our Programs & Impact',
  description: 'Discover our comprehensive programs in youth empowerment, education, health, psycho-social support, WASH, and environmental sustainability across Nigeria. Creating lasting change through community-driven initiatives.',
  openGraph: {
    title: 'What We Do - Danga Memorial Foundation Programs',
    description: 'Six pillars of community development: Youth empowerment, education, health & wellness, WASH programs, psycho-social support, and environmental sustainability.',
    url: 'https://www.danga.org/what-we-do',
    images: [
      {
        url: '/images/community-work.jpg',
        width: 1200,
        height: 630,
        alt: 'Danga Memorial Foundation community programs in action',
      },
    ],
  },
  keywords: [
    'community development Nigeria',
    'youth empowerment programs',
    'education Nigeria NGO',
    'health wellness programs',
    'WASH programs Nigeria',
    'psycho-social support',
    'environmental sustainability',
    'nonprofit programs Nigeria',
    'social impact initiatives'
  ],
};

const programs = [
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'Comprehensive skills training, mentorship programs, and leadership development initiatives designed to equip young people with the tools they need to become productive, self-reliant members of society.',
    href: '/what-we-do/youth-empowerment',
    features: ['Skills Training', 'Mentorship Programs', 'Leadership Development', 'Career Guidance'],
    impact: 'Target: 500+ Youth'
  },
  {
    icon: Brain,
    title: 'Psycho-Social Support',
    description: 'Mental health support services, trauma counseling, and resilience-building programs to help individuals overcome psychological challenges and build emotional strength.',
    href: '/what-we-do/psycho-social-support',
    features: ['Mental Health Support', 'Trauma Counseling', 'Resilience Building', 'Community Therapy'],
    impact: 'Target: 200+ People'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Scholarship programs, educational materials, school infrastructure support, and learning enhancement initiatives to ensure quality education access for all children.',
    href: '/what-we-do/education',
    features: ['Scholarship Programs', 'School Supplies', 'Infrastructure Support', 'Teacher Training'],
    impact: 'Target: 150+ Scholarships'
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'Healthcare services, medical outreaches, health education programs, and wellness initiatives to improve overall community health and well-being.',
    href: '/what-we-do/health-and-wellness',
    features: ['Medical Outreach', 'Health Education', 'Wellness Programs', 'Preventive Care'],
    impact: 'Target: 1,000+ People'
  },
  {
    icon: Droplets,
    title: 'WASH Programs',
    description: 'Water, Sanitation, and Hygiene programs focused on providing clean water access, proper sanitation facilities, and hygiene education to communities.',
    href: '/what-we-do/wash',
    features: ['Clean Water Access', 'Sanitation Facilities', 'Hygiene Education', 'Community Training'],
    impact: 'Target: 15+ Communities'
  },
  {
    icon: Leaf,
    title: 'Environment Sustainability',
    description: 'Environmental conservation projects, sustainable development initiatives, and climate change awareness programs to protect our planet for future generations.',
    href: '/what-we-do/environment-sustainability',
    features: ['Conservation Projects', 'Sustainable Development', 'Climate Awareness', 'Green Initiatives'],
    impact: 'Target: 10+ Projects'
  }
];

// Breadcrumb items for this page
const breadcrumbItems = [
  { name: 'Home', url: 'https://www.danga.org' },
  { name: 'What We Do', url: 'https://www.danga.org/what-we-do' },
];

// Organization data with programs context
const organizationData = {
  name: 'Danga Memorial Foundation',
  alternateName: 'Danga NGO',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'Our comprehensive programs address the most critical needs in communities across Nigeria, creating sustainable change through youth empowerment, education, health & wellness, WASH programs, psycho-social support, and environmental sustainability initiatives.',
  address: {
    streetAddress: '123 Community Drive',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    postalCode: '100001',
    addressCountry: 'Nigeria',
  },
  contactPoint: {
    telephone: '+234-XXX-XXX-XXXX',
    email: 'programs@danga.org',
    contactType: 'programs department',
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
  keywords: ['youth empowerment', 'education programs', 'health wellness', 'WASH programs', 'psycho-social support', 'environmental sustainability', 'community development Nigeria'],
  areaServed: 'Nigeria',
};

export default function WhatWeDo() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema data={organizationData} />
      
      <div className="pt-20 overflow-hidden">
        {/* Breadcrumbs with enhanced animation */}
        <section className="py-12 bg-white relative">
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-brand rounded-full animate-bounce"
                style={{
                  top: `${10 + i * 10}%`,
                  left: `${5 + i * 12}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
          
          <div className="container max-w-6xl mx-auto relative z-10">
            <nav 
              className="flex items-center space-x-4 text-lg animate-in slide-in-from-left-6 fade-in-0 duration-700" 
              aria-label="Breadcrumb"
            >
              <Link 
                href="/who-we-are" 
                className="text-gray-600 hover:text-brand transition-all duration-300 font-light tracking-wide uppercase
                           hover:translate-x-1 hover:scale-105 relative group transform"
              >
                WHO WE ARE
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-500 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -z-10"></span>
              </Link>
              <ChevronRight className="w-6 h-6 text-gray-400 animate-pulse transform hover:scale-125 transition-transform duration-300" />
              <span className="text-gray-900 font-medium tracking-wide uppercase animate-in slide-in-from-right-4 fade-in-0 duration-700 delay-300 hover:animate-pulse">
                WHAT WE DO
              </span>
            </nav>
          </div>
        </section>

        {/* Hero Section with enhanced animations */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 animate-pulse"></div>
          
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="mb-4 animate-in slide-in-from-top-4 fade-in-0 duration-600 delay-200">
                <p className="text-gray-600 text-sm font-medium tracking-wide uppercase relative inline-block">
                  <span className="px-4 py-2 bg-gradient-to-r from-brand/10 to-brand-light/10 rounded-full relative overflow-hidden">
                    Danga Memorial Foundation
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></span>
                  </span>
                </p>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8
                           animate-in slide-in-from-left-8 fade-in-0 duration-800 delay-400
                           transform hover:scale-105 transition-all duration-500">
                <span className="inline-block hover:animate-pulse transition-all duration-500">What</span>{' '}
                <span className="inline-block hover:animate-pulse transition-all duration-500" style={{animationDelay: '0.1s'}}>we</span>{' '}
                <span className="inline-block hover:animate-pulse transition-all duration-500" style={{animationDelay: '0.2s'}}>do</span>
              </h1>
              
              <div className="max-w-2xl animate-in slide-in-from-bottom-6 fade-in-0 duration-800 delay-700">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  Our comprehensive programs are designed to address the most critical needs in communities across Nigeria, 
                  creating sustainable change through education, health, and empowerment initiatives.
                </p>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 right-10 w-20 h-20 bg-brand/10 rounded-full animate-bounce opacity-30" style={{animationDelay: '0s', animationDuration: '6s'}}></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-brand-light/10 rounded-full animate-bounce opacity-20" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-indigo-300/10 rounded-full animate-bounce opacity-25" style={{animationDelay: '4s', animationDuration: '6s'}}></div>
        </section>

        {/* Community Visual Section with enhanced effects */}
        <section className="section-padding bg-white relative">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden bg-brand 
                             animate-in slide-in-from-bottom-8 fade-in-0 duration-1000 delay-300
                             transform hover:scale-105 hover:-rotate-1 transition-all duration-700 group cursor-pointer">
                
                <div className="text-center text-white relative z-10 flex flex-col items-center justify-center h-full
                             transform group-hover:scale-110 transition-transform duration-500">
                  <div className="flex items-center justify-center space-x-8 mb-6">
                    <Users className="w-20 h-20 opacity-90 animate-bounce" style={{animationDelay: '0ms', animationDuration: '3s'}} />
                    <Heart className="w-16 h-16 opacity-80 animate-bounce" style={{animationDelay: '1000ms', animationDuration: '3s'}} />
                    <Globe className="w-20 h-20 opacity-90 animate-bounce" style={{animationDelay: '2000ms', animationDuration: '3s'}} />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-light mb-2 animate-in slide-in-from-top-4 fade-in-0 duration-800 delay-1000 hover:animate-pulse">
                    Community Unity & Impact
                  </h3>
                  <p className="text-xl opacity-90 animate-in slide-in-from-bottom-4 fade-in-0 duration-800 delay-1200 transform hover:-translate-y-1 transition-transform duration-300">
                    Building stronger connections across Nigeria
                  </p>
                </div>
                
                {/* Enhanced pattern overlay with animation */}
                <div className="absolute inset-0 opacity-5 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000">
                  <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* Enhanced floating particles */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white rounded-full animate-bounce"
                      style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${i * 200}ms`,
                        animationDuration: `${3 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Sparkle overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                  {[...Array(8)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute w-4 h-4 text-white animate-pulse"
                      style={{
                        top: `${15 + i * 10}%`,
                        left: `${10 + i * 11}%`,
                        animationDelay: `${i * 300}ms`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 font-light mb-16 animate-in slide-in-from-bottom-4 fade-in-0 duration-700 delay-1400 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                Our vision: Building collaborative partnerships with communities to create 
                sustainable development opportunities and foster unity across Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement with staggered animations */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand rounded-full animate-bounce" style={{animationDuration: '8s', animationDelay: '0s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-brand-light rounded-full animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-indigo-300 rounded-full animate-bounce" style={{animationDuration: '8s', animationDelay: '4s'}}></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="animate-in slide-in-from-left-8 fade-in-0 duration-1000">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 transform hover:scale-105 transition-transform duration-500">
                    We work alongside communities to build a more{' '}
                    <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent
                                   animate-pulse inline-block hover:scale-110 transition-all duration-500">
                      resilient
                    </span>, inclusive future for everyone to share.
                  </h2>
                </div>
                
                <div className="space-y-6 animate-in slide-in-from-right-8 fade-in-0 duration-1000 delay-300">
                  <p className="text-lg text-gray-700 leading-relaxed font-light transform hover:translate-x-2 hover:-translate-y-1 transition-transform duration-300">
                    Since our foundation was established in 2024, we have been guided by trust – 
                    the conviction that even in times of conflict and climate change, we must challenge 
                    barriers and center the lived experiences of people who know their communities best – scaling 
                    what works to achieve lasting, transformational change.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-light transform hover:translate-x-2 hover:-translate-y-1 transition-transform duration-300">
                    Our mission is to connect people across Nigeria to clean water, nutritious food, better 
                    economic opportunities, and more peaceful tomorrows – all critical to unlocking 
                    the power of human potential and strengthening communities to better cope 
                    during crises, adapt to evolving challenges, and thrive into the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Impact Section */}
        <section className="section-padding bg-gray-50 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <defs>
                <pattern id="impact-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" className="text-brand animate-pulse"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#impact-pattern)" />
            </svg>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-in slide-in-from-top-6 fade-in-0 duration-800">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
                  Lasting change starts with{' '}
                  <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent
                                 animate-pulse inline-block hover:scale-110 transition-all duration-500">
                    meaningful impact
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand 
                               animate-in slide-in-from-left-8 fade-in-0 duration-1000 delay-200
                               transform hover:scale-105 hover:rotate-1 transition-all duration-700 group cursor-pointer">
                  
                  <div className="text-center text-white relative z-10 flex flex-col items-center justify-center h-full
                               transform group-hover:scale-110 transition-transform duration-500">
                    <Droplets className="w-24 h-24 mx-auto mb-4 opacity-95 animate-bounce" style={{animationDuration: '3s'}} />
                    <h4 className="text-2xl font-light mb-2 hover:animate-pulse">Clean Water Access</h4>
                    <p className="text-lg opacity-90 transform hover:-translate-y-1 transition-transform duration-300">Our WASH Vision</p>
                  </div>
                  
                  {/* Enhanced pattern with animation */}
                  <div className="absolute inset-0 opacity-5 transform group-hover:scale-110 transition-transform duration-1000">
                    <svg className="w-full h-full animate-pulse" viewBox="0 0 60 60">
                      <defs>
                        <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
                          <circle cx="6" cy="6" r="1.5" fill="white"/>
                        </pattern>
                      </defs>
                      <rect width="60" height="60" fill="url(#dots)" />
                    </svg>
                  </div>
                  
                  {/* Enhanced floating water drops */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(8)].map((_, i) => (
                      <Droplets
                        key={i}
                        className="absolute text-white animate-bounce"
                        style={{
                          width: `${16 + Math.random() * 8}px`,
                          height: `${16 + Math.random() * 8}px`,
                          top: `${Math.random() * 70 + 15}%`,
                          right: `${Math.random() * 70 + 15}%`,
                          animationDelay: `${i * 300}ms`,
                          animationDuration: `${2 + Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Lightning effects on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    {[...Array(3)].map((_, i) => (
                      <Zap
                        key={i}
                        className="absolute w-6 h-6 text-yellow-300 animate-pulse"
                        style={{
                          top: `${20 + i * 25}%`,
                          left: `${15 + i * 30}%`,
                          animationDelay: `${i * 500}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="animate-in slide-in-from-right-8 fade-in-0 duration-1000 delay-400">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 transform hover:scale-105 transition-transform duration-300">
                    Our approach to clean water access
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light transform hover:translate-x-2 hover:-translate-y-1 transition-transform duration-300">
                    Access to clean and safe water is a human right. We plan to 
                    provide lifesaving support during emergencies and 
                    collaborate with local organizations to implement 
                    longer-term solutions. By facilitating clean water access, 
                    sanitation, and community training, we aim to invest in healthier 
                    communities where children can learn and people are 
                    better able to meet their everyday needs and prepare for 
                    what's next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Programs Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Dynamic background animation */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(15)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-brand animate-bounce"
                style={{
                  width: `${8 + Math.random() * 8}px`,
                  height: `${8 + Math.random() * 8}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 400}ms`,
                  animationDuration: `${4 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-in slide-in-from-top-6 fade-in-0 duration-800">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
                  Six Pillars of{' '}
                  <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent
                                 animate-pulse inline-block hover:scale-110 transition-all duration-500">
                    Community Development
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light transform hover:-translate-y-1 transition-transform duration-300">
                  Our approach is holistic and sustainable, designed to address interconnected challenges 
                  that communities face while building local capacity for long-term success.
                </p>
              </div>

              {/* Youth Empowerment with enhanced animations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand 
                               animate-in slide-in-from-left-8 fade-in-0 duration-1000 delay-200
                               transform hover:scale-105 hover:-rotate-1 transition-all duration-700 group cursor-pointer">
                  
                  <div className="text-center text-white relative z-10 flex flex-col items-center justify-center h-full
                               transform group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-20 h-20 mx-auto mb-4 opacity-95 animate-bounce" style={{animationDuration: '4s'}} />
                    <h4 className="text-2xl font-light mb-2 hover:animate-pulse">Youth Empowerment</h4>
                    <p className="text-lg opacity-90 transform hover:-translate-y-1 transition-transform duration-300">Empowering the Next Generation</p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-5 transform group-hover:scale-110 transition-transform duration-1000">
                    <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
                      <defs>
                        <pattern id="lines1" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 0 10 L 10 0" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#lines1)" />
                    </svg>
                  </div>
                  
                  {/* Enhanced animated user icons */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(6)].map((_, i) => (
                      <Users
                        key={i}
                        className="absolute text-white animate-bounce"
                        style={{
                          width: `${20 + Math.random() * 8}px`,
                          height: `${20 + Math.random() * 8}px`,
                          top: `${10 + i * 15}%`,
                          right: `${5 + i * 12}%`,
                          animationDelay: `${i * 300}ms`,
                          animationDuration: `${2 + Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="animate-in slide-in-from-right-8 fade-in-0 duration-1000 delay-400">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 transform hover:scale-105 transition-transform duration-300">
                    Youth Empowerment
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light transform hover:translate-x-2 hover:-translate-y-1 transition-transform duration-300">
                    Comprehensive skills training, mentorship programs, and leadership development initiatives 
                    designed to equip young people with the tools they need to become productive, self-reliant 
                    members of society. We believe in nurturing the potential of youth to become catalysts for 
                    positive change in their communities.
                  </p>
                </div>
              </div>

              {/* Education - Reversed layout with enhanced animations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="order-2 lg:order-1 animate-in slide-in-from-left-8 fade-in-0 duration-1000 delay-400">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 transform hover:scale-105 transition-transform duration-300">
                    Education Solutions
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light transform hover:translate-x-2 hover:-translate-y-1 transition-transform duration-300">
                    All people deserve to have reliable access to quality education 
                    and learning opportunities. In times of crisis, we plan to deliver swift 
                    aid to households to help them quickly meet their basic 
                    educational needs. Our teams will help people cultivate 
                    strength and stability — by supporting learning 
                    communities and adaptive methods to grow resilient 
                    programs and preserve opportunities in the face of climate change.
                  </p>
                </div>
                
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border-2 border-brand order-1 lg:order-2
                               animate-in slide-in-from-right-8 fade-in-0 duration-1000 delay-200
                               transform hover:scale-105 hover:rotate-1 transition-all duration-700 group cursor-pointer">
                  
                  <div className="text-center text-brand relative z-10 flex flex-col items-center justify-center h-full
                               transform group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="w-20 h-20 mx-auto mb-4 opacity-90 animate-bounce" style={{animationDuration: '3.5s'}} />
                    <h4 className="text-2xl font-light mb-2 hover:animate-pulse">Education</h4>
                    <p className="text-lg opacity-80 transform hover:-translate-y-1 transition-transform duration-300">Learning for All</p>
                  </div>
                  
                  <div className="absolute inset-0 opacity-5 transform group-hover:scale-110 transition-transform duration-1000">
                    <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
                      <defs>
                        <pattern id="circles1" width="15" height="15" patternUnits="userSpaceOnUse">
                          <circle cx="7.5" cy="7.5" r="2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#circles1)" />
                    </svg>
                  </div>
                  
                  {/* Enhanced floating education icons */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <GraduationCap
                        key={i}
                        className="absolute text-brand animate-bounce"
                        style={{
                          width: `${16 + Math.random() * 8}px`,
                          height: `${16 + Math.random() * 8}px`,
                          bottom: `${15 + i * 15}%`,
                          left: `${10 + i * 18}%`,
                          animationDelay: `${i * 400}ms`,
                          animationDuration: `${2.5 + Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Knowledge sparkles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700">
                    {[...Array(6)].map((_, i) => (
                      <Sparkles
                        key={i}
                        className="absolute w-3 h-3 text-brand animate-pulse"
                        style={{
                          top: `${20 + i * 12}%`,
                          right: `${15 + i * 12}%`,
                          animationDelay: `${i * 250}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue with other program sections... */}
              {/* I'll add the remaining sections in the next update */}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-brand to-brand-light rounded-full animate-bounce" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-tl from-brand-light to-brand rounded-full animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full animate-bounce" style={{animationDuration: '8s', animationDelay: '4s'}}></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white p-8 shadow-sm border border-gray-100 relative overflow-hidden
                             animate-in slide-in-from-bottom-8 fade-in-0 duration-1000
                             transform hover:scale-105 hover:shadow-xl transition-all duration-500 group">
                
                {/* Enhanced background animation effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-light/5 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 relative z-10
                             transform group-hover:scale-105 hover:animate-pulse transition-all duration-300">
                  Ready to Make a Difference?
                </h3>
                <p className="text-lg text-gray-600 mb-6 font-light relative z-10
                             transform group-hover:translate-y-1 transition-transform duration-300">
                  Join us in our mission to empower communities and transform lives. 
                  Every contribution helps us expand our reach and deepen our impact.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link
                    href="/donate"
                    className="px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-medium
                             relative overflow-hidden transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                             before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                             before:via-white/20 before:to-transparent before:-skew-x-12 before:-translate-x-full
                             hover:before:translate-x-full before:transition-transform before:duration-700"
                  >
                    <span className="relative z-10">Support Our Work</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-brand text-brand hover:bg-brand hover:text-white 
                             transition-all duration-300 font-medium relative overflow-hidden
                             transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                             before:absolute before:inset-0 before:bg-brand before:scale-x-0
                             before:origin-left hover:before:scale-x-100 before:transition-transform
                             before:duration-300 before:z-0"
                  >
                    <span className="relative z-10">Get in Touch</span>
                  </Link>
                </div>
                
                {/* Enhanced sparkle effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
                  {[...Array(8)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute text-brand animate-bounce"
                      style={{
                        width: `${12 + Math.random() * 6}px`,
                        height: `${12 + Math.random() * 6}px`,
                        top: `${20 + i * 8}%`,
                        left: `${15 + i * 10}%`,
                        animationDelay: `${i * 200}ms`,
                        animationDuration: `${2 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}