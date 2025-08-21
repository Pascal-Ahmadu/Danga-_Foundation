import { Metadata } from 'next';
import Image from 'next/image';
import TrusteeCard from '@/components/ui/TrusteeCard';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import trustees from '@/data/trustees.json';

export const metadata: Metadata = {
  title: 'Who We Are',
  description: 'Learn about the Danga Memorial Foundation, our mission, vision, values, and the dedicated trustees who guide our work.',
};

const values = [
  {
    icon: Target,
    title: 'Integrity',
    description: 'We maintain the highest standards of honesty and transparency in all our operations.'
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We approach every community and individual with empathy and understanding.'
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description: 'We believe in equal opportunities for all, regardless of background or circumstances.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for the highest quality in all our programs and services.'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'Foundation Established',
    description: 'Danga Memorial Foundation was officially registered as a non-profit organization.'
  },
  {
    year: '2021',
    title: 'First Scholarship Program',
    description: 'Launched our first scholarship program, supporting 20 students in their educational journey.'
  },
  {
    year: '2022',
    title: 'Community Expansion',
    description: 'Expanded our reach to 15 communities across Nigeria with various support programs.'
  },
  {
    year: '2023',
    title: 'Major Health Initiative',
    description: 'Launched our largest health outreach program, reaching over 1,000 individuals.'
  },
  {
    year: '2024',
    title: 'Sustainable Growth',
    description: 'Achieved sustainable operations with 25+ communities served and 150+ scholarships awarded.'
  }
];

export default function WhoWeAre() {
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
              Who we are
            </h1>
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                The Danga Memorial Foundation works across Nigeria to help communities 
                affected by poverty and lack of opportunities to survive, recover and 
                rebuild their lives through education, health, and sustainable development programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Mission */}
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed font-light">
                  Our foundation is built on the belief that sustainable change begins with empowering communities 
                  through education, health initiatives, and meaningful opportunities that create lasting positive change and break cycles of poverty, ensuring every individual 
                  has the opportunity to reach their full potential.
                </p>
              </div>
              
              {/* Vision */}
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed font-light">
                  A world where every individual has access to quality education, healthcare, and opportunities 
                  to thrive, regardless of their socioeconomic background or geographical location.
                </p>
              </div>
              
              {/* Values */}
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Our Values</h2>
                <div className="space-y-6">
                  {values.map((value) => (
                    <div key={value.title}>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed font-light">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Our foundation is built on the belief that sustainable change begins with empowering communities 
              through education, health initiatives, and meaningful opportunities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-blue-600/20"></div>
              
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative flex items-center mb-12 last:mb-0">
                  <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 border-4 border-white z-10"></div>
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <div className="bg-white p-6 border-l-4 border-blue-600">
                      <div className="text-blue-600 font-medium text-xl mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 font-light">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Chairman Image */}
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden">
                  <Image
                    src="/images/chairman.jpg"
                    alt="Chairman of Danga Memorial Foundation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Leadership Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                    Our{' '}
                    <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">leadership</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Our Chairman leads the Danga Memorial Foundation with an executive team, 
                    Board of Directors, and leadership councils who bring a wealth of experience 
                    and expertise to our organization.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Together, in close collaboration with our teams across Nigeria, they shape 
                    our vision and strategy, and share a steadfast belief that the communities 
                    we serve are the best agents of their own change.
                  </p>
                </div>

                <div className="pt-6">
                  <button className="group inline-flex items-center space-x-3 text-amber-700 hover:text-amber-800 transition-colors duration-200">
                    <span className="text-lg font-medium tracking-wide uppercase">MEET OUR LEADERSHIP</span>
                    <svg 
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Careers Image */}
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden">
                  <Image
                    src="/volunteers.jpg"
                    alt="Volunteers and team members at Danga Memorial Foundation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Careers Content */}
              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                    Join our{' '}
                    <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">mission</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    We believe that sustainable change happens when communities come together 
                    with passionate individuals who are committed to making a difference.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Join our team of dedicated professionals and volunteers who work tirelessly 
                    to empower communities across Nigeria through education, health initiatives, 
                    and sustainable development programs.
                  </p>
                </div>

                <div className="pt-6">
                  <button className="group inline-flex items-center space-x-3 text-amber-700 hover:text-amber-800 transition-colors duration-200">
                    <span className="text-lg font-medium tracking-wide uppercase">EXPLORE CAREERS</span>
                    <svg 
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}