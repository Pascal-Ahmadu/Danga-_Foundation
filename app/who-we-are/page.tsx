import { Metadata } from 'next';
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
      <section className="section-padding bg-gradient-to-br from-primary to-accent text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Who We Are
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-light">
              We are a community-driven organization dedicated to empowering lives 
              and building sustainable futures through education, health, and development programs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-3xl font-light text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  To empower communities through sustainable education, health, and development programs 
                  that create lasting positive change and break cycles of poverty, ensuring every individual 
                  has the opportunity to reach their full potential.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-3xl font-light text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  A world where every individual has access to quality education, healthcare, and opportunities 
                  to thrive, regardless of their socioeconomic background or geographical location.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Our Core Values</h3>
              <div className="space-y-6">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="flex items-start">
                      <div className="w-10 h-10 bg-brown/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="h-5 w-5 text-brown" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">{value.title}</h4>
                        <p className="text-gray-600 font-light">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              From humble beginnings to impacting thousands of lives, here's how we've grown 
              and evolved to better serve our communities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-brown/20"></div>
              
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative flex items-center mb-12 last:mb-0">
                  <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-brown border-4 border-white shadow-lg z-10"></div>
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <div className="bg-white p-6 shadow-lg border border-gray-100">
                      <div className="text-brown font-medium text-xl mb-2">{milestone.year}</div>
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

      {/* Trustees Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our <span className="text-gradient">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Meet the dedicated individuals who guide our vision and ensure we stay true 
              to our mission of empowering communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustees.map((trustee, index) => (
              <TrusteeCard 
                key={trustee.email} 
                trustee={trustee} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90 font-light">
              We believe that sustainable change happens when communities come together. 
              Join us in creating lasting impact across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-200">
                Get Involved
              </button>
              <button className="border-2 border-white text-white px-8 py-3 font-medium hover:bg-brown hover:border-brown transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}