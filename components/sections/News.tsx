import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

const news = [
  {
    title: 'New Scholarship Program Launched for 2024',
    excerpt: 'We are excited to announce the launch of our expanded scholarship program, providing educational opportunities to 50 more deserving students.',
    date: '2024-01-15',
    category: 'Education',
    slug: 'scholarship-program-2024',
    image: 'https://images.pexels.com/photos/5088179/pexels-photo-5088179.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Community Health Outreach Reaches 500 Families',
    excerpt: 'Our recent health outreach program in rural communities provided medical care and health education to over 500 families.',
    date: '2024-01-10',
    category: 'Health',
    slug: 'health-outreach-success',
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Youth Empowerment Workshop Shows Remarkable Results',
    excerpt: 'Our three-month youth empowerment workshop concluded with 85% of participants securing employment or starting their own businesses.',
    date: '2024-01-05',
    category: 'Youth Development',
    slug: 'youth-workshop-results',
    image: 'https://images.pexels.com/photos/8093073/pexels-photo-8093073.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function News() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Latest <span className="text-gradient">News & Updates</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Stay informed about our recent activities, success stories, and upcoming programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <article
              key={article.slug}
              className={`bg-white shadow-lg overflow-hidden card-hover animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 
                             group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brown text-white px-3 py-1 text-sm font-light">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                
                <h3 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 font-light">
                  {article.excerpt}
                </p>
                
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center text-brown font-light hover:text-primary 
                             transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center"
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}