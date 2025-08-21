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
  Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'What We Do',
  description: 'Discover our comprehensive programs in youth empowerment, education, health, and sustainable development across Nigeria.',
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

export default function WhatWeDo() {
  return (
    <div className="pt-20">
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
                alt="Mercy Corps team working with community members in Chad"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
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
                  <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">resilient</span>, inclusive future for everyone to share.
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  Since our Corps was founded in 2020, we have been guided by trust – 
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
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">meaningful impact</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/water-access.jpg"
                  alt="Community members accessing clean water"
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
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Community Development</span>
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
                  alt="Youth participating in empowerment programs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Youth Empowerment
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                  Comprehensive skills training, mentorship programs, and leadership development initiatives 
                  designed to equip young people with the tools they need to become productive, self-reliant 
                  members of society. We believe in nurturing the potential of youth to become catalysts for 
                  positive change in their communities.
                </p>
                <div className="text-amber-700 font-medium mb-4">500+ Youth Trained</div>
                <Link
                  href="/what-we-do/youth-empowerment"
                  className="inline-flex items-center text-amber-700 font-light hover:text-amber-800 
                             transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Education - Reversed layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Education Solutions
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                  All people deserve to have reliable access to quality education 
                  and learning opportunities. In times of crisis, we deliver swift 
                  aid to households to help them quickly meet their basic 
                  educational needs. Our teams also help people cultivate 
                  strength and stability — by supporting learning 
                  communities and adaptive methods to grow resilient 
                  programs and preserve land in the face of climate change.
                </p>
                <div className="text-amber-700 font-medium mb-4">150+ Scholarships Given</div>
                <Link
                  href="/what-we-do/education"
                  className="inline-flex items-center text-amber-700 font-light hover:text-amber-800 
                             transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
                <Image
                  src="/images/education.jpg"
                  alt="Students in educational programs"
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
                  alt="Health workers providing medical care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Building health opportunities
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                  A healthier future is possible when everyone has the 
                  ability to establish sustainable livelihoods and make 
                  shameless choices. We connect people and achieve to the 
                  market opportunities that power a flourishing local 
                  economy. From micro-loans to people-driven ideas, to helping 
                  develop business skills, unlock financial resources, and 
                  forge a path forward.
                </p>
                <div className="text-amber-700 font-medium mb-4">1,000+ People Reached</div>
                <Link
                  href="/what-we-do/health-and-wellness"
                  className="inline-flex items-center text-amber-700 font-light hover:text-amber-800 
                             transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* WASH Programs - Reversed layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Uniting for peaceful tomorrows
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                  Conflict and violence threaten the positive change 
                  communities work toward, and our programming 
                  makes sure people can recover after bias. That's why we 
                  unite communities around shared goals — from managing 
                  disputes over resources to transforming social norms 
                  that drive instability — to help people build the skills, 
                  systems, and solidarity to keep peace moving forward.
                </p>
                <div className="text-amber-700 font-medium mb-4">15+ Communities Served</div>
                <Link
                  href="/what-we-do/wash"
                  className="inline-flex items-center text-amber-700 font-light hover:text-amber-800 
                             transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
                <Image
                  src="/images/wash-programs.jpg"
                  alt="Community members working together on WASH programs"
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
                  alt="Mental health support and counseling sessions"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Psycho-Social Support
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                  Mental health support services, trauma counseling, and resilience-building programs 
                  to help individuals overcome psychological challenges and build emotional strength. 
                  We provide comprehensive support systems that address both individual and community 
                  mental health needs in culturally appropriate ways.
                </p>
                <div className="text-amber-700 font-medium mb-4">200+ People Supported</div>
                <Link
                  href="/what-we-do/psycho-social-support"
                  className="inline-flex items-center text-amber-700 font-light hover:text-amber-800 
                             transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Environment Sustainability - Reversed layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Environment Sustainability
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                  Environmental conservation projects, sustainable development initiatives, and climate 
                  change awareness programs to protect our planet for future generations. We work with 
                  communities to implement eco-friendly practices and build resilience against climate 
                  challenges while preserving natural resources.
                </p>
                <div className="text-amber-700 font-medium mb-4">10+ Projects Completed</div>
                <Link
                  href="/what-we-do/environment-sustainability"
                  className="inline-flex items-center text-amber-700 font-light hover:text-amber-800 
                             transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
                <Image
                  src="/images/environment.jpg"
                  alt="Environmental sustainability and conservation projects"
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
                  className="px-6 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors duration-300 font-medium"
                >
                  Support Our Work
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-all duration-300 font-medium"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}