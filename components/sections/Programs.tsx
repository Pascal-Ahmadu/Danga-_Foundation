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

const programs = [
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'Providing skills training, mentorship, and leadership development programs to help young people become productive members of society.',
    href: '/what-we-do/youth-empowerment',
    color: 'from-primary to-accent',
    stats: { number: '500+', label: 'Youth Trained' }
  },
  {
    icon: Brain,
    title: 'Psycho-Social Support',
    description: 'Mental health support and counseling services to help individuals overcome trauma and build resilience.',
    href: '/what-we-do/psycho-social-support',
    color: 'from-brown to-brown-light',
    stats: { number: '200+', label: 'People Supported' }
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Scholarships, school supplies, and educational support to ensure every child has access to quality learning opportunities.',
    href: '/what-we-do/education',
    color: 'from-accent to-primary',
    stats: { number: '150+', label: 'Scholarships Given' }
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'Healthcare services, medical outreaches, and health education programs to improve community well-being.',
    href: '/what-we-do/health-and-wellness',
    color: 'from-brown-dark to-brown',
    stats: { number: '1,000+', label: 'People Reached' }
  },
  {
    icon: Droplets,
    title: 'WASH Programs',
    description: 'Water, Sanitation, and Hygiene programs to ensure communities have access to clean water and proper sanitation.',
    href: '/what-we-do/wash',
    color: 'from-primary-light to-accent',
    stats: { number: '15+', label: 'Communities' }
  },
  {
    icon: Leaf,
    title: 'Environment Sustainability',
    description: 'Environmental conservation projects and sustainable development initiatives to protect our planet for future generations.',
    href: '/what-we-do/environment-sustainability',
    color: 'from-brown to-primary',
    stats: { number: '10+', label: 'Projects' }
  }
];

export default function Programs() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Our <span className="text-gradient">Impact Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            We focus on six key areas that create sustainable change and empower communities 
            to thrive independently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.title}
                href={program.href}
                className={`group block animate-slide-up card-hover`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white p-8 shadow-lg h-full border border-gray-100 
                                group-hover:border-brown/20 transition-colors duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl 
                                   flex items-center justify-center mb-6 group-hover:scale-110 
                                   transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-brown 
                                 transition-colors duration-300">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed font-light">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-light text-brown">{program.stats.number}</div>
                      <div className="text-sm text-gray-500 font-light">{program.stats.label}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brown 
                                           group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/what-we-do"
            className="btn-primary inline-flex items-center"
          >
            View All Programs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}