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
    description: 'Providing comprehensive skills training, mentorship, and leadership development programs to help young people become productive members of society. Our youth empowerment initiatives focus on building practical skills, fostering entrepreneurship, and creating pathways to sustainable employment. We work closely with young individuals to identify their strengths, develop their talents, and connect them with opportunities that align with their aspirations. Through workshops, internships, and ongoing support, we help youth overcome barriers and build confidence to contribute meaningfully to their communities.',
    href: '/what-we-do/youth-empowerment',
    stats: { number: '500+', label: 'Youth Trained' }
  },
  {
    icon: Brain,
    title: 'Psycho-Social Support',
    description: 'Mental health support and counseling services to help individuals overcome trauma and build resilience. Our psycho-social programs address the emotional and psychological needs of community members who have experienced various forms of trauma, stress, or mental health challenges. We provide both individual and group counseling sessions, trauma-informed care, and community-based support systems. Our trained counselors work with families, children, and adults to develop coping strategies, build emotional resilience, and create supportive networks that promote healing and recovery.',
    href: '/what-we-do/psycho-social-support',
    stats: { number: '200+', label: 'People Supported' }
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Scholarships, school supplies, and educational support to ensure every child has access to quality learning opportunities. Our education programs go beyond providing financial assistance to include academic mentoring, educational infrastructure support, and teacher training initiatives. We believe education is the foundation for breaking cycles of poverty and creating sustainable change. Our comprehensive approach includes early childhood development, primary and secondary education support, vocational training, and higher education scholarships for deserving students who demonstrate academic excellence and financial need.',
    href: '/what-we-do/education',
    stats: { number: '150+', label: 'Scholarships Given' }
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'Healthcare services, medical outreaches, and health education programs to improve community well-being. Our health and wellness initiatives provide essential medical care, preventive health services, and health education to underserved communities. We organize regular medical outreaches, vaccination campaigns, and health screening programs. Our team of healthcare professionals works to address both immediate health needs and long-term wellness goals through community health education, nutrition programs, and partnerships with local healthcare facilities to ensure sustainable access to quality medical care.',
    href: '/what-we-do/health-and-wellness',
    stats: { number: '1,000+', label: 'People Reached' }
  },
  {
    icon: Droplets,
    title: 'WASH Programs',
    description: 'Water, Sanitation, and Hygiene programs to ensure communities have access to clean water and proper sanitation facilities. Our WASH initiatives focus on providing sustainable solutions to water scarcity, poor sanitation, and inadequate hygiene practices that affect community health. We work with communities to build and maintain water systems, construct sanitation facilities, and implement hygiene education programs. Our approach emphasizes community ownership and sustainability, ensuring that water and sanitation infrastructure remains functional and well-maintained for years to come.',
    href: '/what-we-do/wash',
    stats: { number: '15+', label: 'Communities' }
  },
  {
    icon: Leaf,
    title: 'Environment Sustainability',
    description: 'Environmental conservation projects and sustainable development initiatives to protect our planet for future generations. Our environmental sustainability programs address climate change, environmental degradation, and unsustainable resource use through community-based conservation projects. We implement tree planting initiatives, promote renewable energy solutions, support sustainable agriculture practices, and conduct environmental education programs. Our goal is to help communities adopt environmentally friendly practices while meeting their economic and social needs, creating a balance between development and conservation.',
    href: '/what-we-do/environment-sustainability',
    stats: { number: '10+', label: 'Projects' }
  }
];

export default function Programs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Impact Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            We focus on six key areas that create sustainable change and empower communities 
            to thrive independently through comprehensive, community-driven initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.title}
                href={program.href}
                className="group block transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="bg-white p-8 shadow-sm hover:shadow-md h-full border border-gray-100 
                                group-hover:border-amber-700/20 transition-all duration-300">
                  <div className="flex items-center justify-center mb-6">
                    <Icon className="h-12 w-12 text-amber-700 font-light" strokeWidth="1" />
                  </div>
                  
                  <h3 className="text-xl font-light text-gray-900 mb-3 group-hover:text-amber-700 
                                 transition-colors duration-300">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed font-light text-justify">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-light text-amber-700">{program.stats.number}</div>
                      <div className="text-sm text-gray-500 font-light">{program.stats.label}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-amber-700 
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
            className="px-6 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors duration-300 font-medium inline-flex items-center"
          >
            View All Programs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}