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
    color: 'from-primary to-accent',
    features: ['Skills Training', 'Mentorship Programs', 'Leadership Development', 'Career Guidance'],
    impact: '500+ Youth Trained'
  },
  {
    icon: Brain,
    title: 'Psycho-Social Support',
    description: 'Mental health support services, trauma counseling, and resilience-building programs to help individuals overcome psychological challenges and build emotional strength.',
    href: '/what-we-do/psycho-social-support',
    color: 'from-brown to-brown-light',
    features: ['Mental Health Support', 'Trauma Counseling', 'Resilience Building', 'Community Therapy'],
    impact: '200+ People Supported'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Scholarship programs, educational materials, school infrastructure support, and learning enhancement initiatives to ensure quality education access for all children.',
    href: '/what-we-do/education',
    color: 'from-accent to-primary',
    features: ['Scholarship Programs', 'School Supplies', 'Infrastructure Support', 'Teacher Training'],
    impact: '150+ Scholarships Given'
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'Healthcare services, medical outreaches, health education programs, and wellness initiatives to improve overall community health and well-being.',
    href: '/what-we-do/health-and-wellness',
    color: 'from-brown-dark to-brown',
    features: ['Medical Outreach', 'Health Education', 'Wellness Programs', 'Preventive Care'],
    impact: '1,000+ People Reached'
  },
  {
    icon: Droplets,
    title: 'WASH Programs',
    description: 'Water, Sanitation, and Hygiene programs focused on providing clean water access, proper sanitation facilities, and hygiene education to communities.',
    href: '/what-we-do/wash',
    color: 'from-primary-light to-accent',
    features: ['Clean Water Access', 'Sanitation Facilities', 'Hygiene Education', 'Community Training'],
    impact: '15+ Communities Served'
  },
  {
    icon: Leaf,
    title: 'Environment Sustainability',
    description: 'Environmental conservation projects, sustainable development initiatives, and climate change awareness programs to protect our planet for future generations.',
    href: '/what-we-do/environment-sustainability',
    color: 'from-brown to-primary',
    features: ['Conservation Projects', 'Sustainable Development', 'Climate Awareness', 'Green Initiatives'],
    impact: '10+ Projects Completed'
  }
];

export default function WhatWeDo() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-brown text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              What We Do
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-light">
              Our comprehensive programs address the most critical needs in communities across Nigeria, 
              creating sustainable change through education, health, and empowerment initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Six Pillars of <span className="text-gradient">Community Development</span>
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Our approach is holistic and sustainable, addressing interconnected challenges 
              that communities face while building local capacity for long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 shadow-lg">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-light text-gray-900 mb-4">Our Approach</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We believe in community-driven solutions that address root causes rather than symptoms. 
                Our programs are designed to build local capacity and create sustainable change that 
                continues long after our direct involvement ends.
              </p>
            </div>
            
            <div className="bg-white p-8 shadow-lg">
              <Heart className="h-12 w-12 text-brown mb-4" />
              <h3 className="text-2xl font-light text-gray-900 mb-4">Our Impact</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Every program we implement is measured not just by immediate outcomes, but by 
                long-term community transformation. We track progress, gather feedback, and 
                continuously improve our methods to maximize positive impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.title}
                  className={`bg-gray-50 p-8 shadow-lg card-hover animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${program.color} 
                                     flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-light text-gray-900 mb-3">{program.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed mb-4">
                        {program.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {program.features.map((feature) => (
                            <div key={feature} className="flex items-center">
                              <div className="w-2 h-2 bg-brown mr-2"></div>
                              <span className="text-sm text-gray-600 font-light">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-brown font-medium">{program.impact}</div>
                        <Link
                          href={program.href}
                          className="inline-flex items-center text-primary font-light hover:text-brown 
                                     transition-colors duration-200"
                        >
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90 font-light">
              Join us in our mission to empower communities and transform lives. 
              Every contribution helps us expand our reach and deepen our impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="bg-brown text-white px-8 py-3 font-medium hover:bg-primary transition-colors duration-200"
              >
                Support Our Work
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-gray-900 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}