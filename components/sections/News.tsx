import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const news = [
  {
    title: 'New Comprehensive Scholarship Program Launched',
    excerpt: 'We are excited to announce the launch of our significantly expanded scholarship program, providing comprehensive educational opportunities to 50 more deserving students across Nigeria with mentorship programs and career guidance.',
    date: '2024-01-15',
    category: 'Education',
    slug: 'scholarship-program-2024',
    image: 'https://images.pexels.com/photos/5088179/pexels-photo-5088179.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Community Health Outreach Reaches 500 Families',
    excerpt: 'Our recent comprehensive health outreach program provided essential medical care and extensive health education to over 500 families across 15 different communities with ongoing health monitoring systems.',
    date: '2024-01-10',
    category: 'Health',
    slug: 'health-outreach-success',
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Youth Empowerment Workshop Shows Results',
    excerpt: 'Our intensive three-month youth empowerment workshop concluded with 85% of participants successfully securing meaningful employment or starting sustainable businesses through practical skills training and mentorship.',
    date: '2024-01-05',
    category: 'Youth Development',
    slug: 'youth-workshop-results',
    image: 'https://images.pexels.com/photos/8093073/pexels-photo-8093073.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function News() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16">
          <p className="text-lg text-gray-700 max-w-4xl font-light leading-relaxed">
            Danga Memorial Foundation provides critical programs through cost-effective, evidence-based 
            programming that transform lives—but we need your help. Learn more about our 
            work below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block"
            >
              <div className="bg-white overflow-hidden transition-all duration-300 hover:transform hover:scale-105">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                    {article.title}
                    <ArrowRight className="inline-block ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-6 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors duration-300 font-medium inline-flex items-center"
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}