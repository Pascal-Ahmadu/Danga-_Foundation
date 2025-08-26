import { Metadata } from 'next';
import Image from 'next/image';
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
  ChevronRight
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
    impact: '500+ Youth Trained'
  },
  {
    icon: Brain,
    title: 'Psycho-Social Support',
    description: 'Mental health support services, trauma counseling, and resilience-building programs to help individuals overcome psychological challenges and build emotional strength.',
    href: '/what-we-do/psycho-social-support',
    features: ['Mental Health Support', 'Trauma Counseling', 'Resilience Building', 'Community Therapy'],
    impact: '200+ People Supported'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Scholarship programs, educational materials, school infrastructure support, and learning enhancement initiatives to ensure quality education access for all children.',
    href: '/what-we-do/education',
    features: ['Scholarship Programs', 'School Supplies', 'Infrastructure Support', 'Teacher Training'],
    impact: '150+ Scholarships Given'
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'Healthcare services, medical outreaches, health education programs, and wellness initiatives to improve overall community health and well-being.',
    href: '/what-we-do/health-and-wellness',
    features: ['Medical Outreach', 'Health Education', 'Wellness Programs', 'Preventive Care'],
    impact: '1,000+ People Reached'
  },
  {
    icon: Droplets,
    title: 'WASH Programs',
    description: 'Water, Sanitation, and Hygiene programs focused on providing clean water access, proper sanitation facilities, and hygiene education to communities.',
    href: '/what-we-do/wash',
    features: ['Clean Water Access', 'Sanitation Facilities', 'Hygiene Education', 'Community Training'],
    impact: '15+ Communities Served'
  },
  {
    icon: Leaf,
    title: 'Environment Sustainability',
    description: 'Environmental conservation projects, sustainable development initiatives, and climate change awareness programs to protect our planet for future generations.',
    href: '/what-we-do/environment-sustainability',
    features: ['Conservation Projects', 'Sustainable Development', 'Climate Awareness', 'Green Initiatives'],
    impact: '10+ Projects Completed'
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
              <span className="text-gray-900 font-medium tracking-wide uppercase">WHAT WE DO</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="mb-4">
                <p className="text-gray-600 text-sm font-medium tracking-wide uppercase">
                  Danga Memorial Foundation
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
                What we do
              </h1>
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                  Our comprehensive programs address the most critical needs in communities across Nigeria, 
                  creating sustainable change through education, health, and empowerment initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Image Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
                <Image
                  src="/images/community-work.jpg"
                  alt="Danga Memorial Foundation team working with community members to foster strong unity and organize safe educational activities"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  priority
                />
              </div>
              <p className="text-sm text-gray-600 font-light mb-16">
                Figure 1: DMF team working with families to foster strong unity. They 
                collaborate with community leaders to organize safe educational activities so that 
                new talent finds good reason.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8">
                    We work alongside communities to build a more{' '}
                    <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">resilient</span>, inclusive future for everyone to share.
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Since our foundation was founded in 2024, we have been guided by trust – 
                    the conviction that even in times of conflict and climate change, we must challenge 
                    bad ideas and the lived experiences of people who know their communities best – scaling 
                    what works to achieve lasting, transformational change.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    We connect people across the globe to clean water, nutritious food, better 
                    economic opportunities, and more peaceful tomorrows – all critical to unlocking 
                    the power of human potential and strengthening communities to better cope 
                    during crises, adapt to evolving challenges, and thrive into the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                  Lasting change starts with{' '}
                  <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">meaningful impact</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/water-access.jpg"
                    alt="Community members accessing clean water through Danga Memorial Foundation WASH programs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Improving clean water access
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Access to clean and safe water is a human right. We 
                    provide lifesaving support to the midst of emergencies 
                    and collaborate with local organizations to implement 
                    longer-term solutions. By facilitating clean water access, 
                    sanitation, and community training, we invest in healthier 
                    communities to grow food, build, where children can learn and people are 
                    better able to meet their everyday needs and take on 
                    what's next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Sections - Six Pillars */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                  Six Pillars of{' '}
                  <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">Community Development</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                  Our approach is holistic and sustainable, addressing interconnected challenges 
                  that communities face while building local capacity for long-term success.
                </p>
              </div>

              {/* Youth Empowerment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/youth-empowerment.jpg"
                    alt="Youth participating in empowerment and leadership development programs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Youth Empowerment
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Comprehensive skills training, mentorship programs, and leadership development initiatives 
                    designed to equip young people with the tools they need to become productive, self-reliant 
                    members of society. We believe in nurturing the potential of youth to become catalysts for 
                    positive change in their communities.
                  </p>
                </div>
              </div>

              {/* Education - Reversed layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Education Solutions
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    All people deserve to have reliable access to quality education 
                    and learning opportunities. In times of crisis, we deliver swift 
                    aid to households to help them quickly meet their basic 
                    educational needs. Our teams also help people cultivate 
                    strength and stability — by supporting learning 
                    communities and adaptive methods to grow resilient 
                    programs and preserve land in the face of climate change.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
                  <Image
                    src="/images/education.jpg"
                    alt="Students participating in education programs and scholarship initiatives"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
              </div>

              {/* Health & Wellness */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/health-wellness.jpg"
                    alt="Health workers providing medical care and wellness programs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Building health opportunities
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    A healthier future is possible when everyone has the 
                    ability to establish sustainable livelihoods and make 
                    shameless choices. We connect people and achieve to the 
                    market opportunities that power a flourishing local 
                    economy. From micro-loans to people-driven ideas, to helping 
                    develop business skills, unlock financial resources, and 
                    forge a path forward.
                  </p>
                </div>
              </div>

              {/* WASH Programs - Reversed layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    WASH Programs
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Water, Sanitation, and Hygiene programs focused on providing clean water access, 
                    proper sanitation facilities, and hygiene education to communities. We work with 
                    local partners to ensure sustainable solutions that improve health outcomes and 
                    quality of life for entire communities.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
                  <Image
                    src="/images/wash-programs.jpg"
                    alt="Community members working together on water, sanitation and hygiene programs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
              </div>

              {/* Psycho-Social Support */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/psycho-social.jpg"
                    alt="Mental health support and counseling sessions for community members"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Psycho-Social Support
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Mental health support services, trauma counseling, and resilience-building programs 
                    to help individuals overcome psychological challenges and build emotional strength. 
                    We provide comprehensive support systems that address both individual and community 
                    mental health needs in culturally appropriate ways.
                  </p>
                </div>
              </div>

              {/* Environment Sustainability - Reversed layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Environment Sustainability
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Environmental conservation projects, sustainable development initiatives, and climate 
                    change awareness programs to protect our planet for future generations. We work with 
                    communities to implement eco-friendly practices and build resilience against climate 
                    challenges while preserving natural resources.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
                  <Image
                    src="/images/environment.jpg"
                    alt="Environmental sustainability and conservation projects in local communities"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white p-8 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-lg text-gray-600 mb-6 font-light">
                  Join us in our mission to empower communities and transform lives. 
                  Every contribution helps us expand our reach and deepen our impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/donate"
                    className="px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-colors duration-300 font-medium"
                  >
                    Support Our Work
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 font-medium"
                  >
                    Get in Touch
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