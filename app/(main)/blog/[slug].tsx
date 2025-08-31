import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ShareButtons from '@/app/(main)/blog/shareButtons'; // Client component for sharing


// Define types
interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: Author;
  tags: string[];
  slug: string;
}

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

// Sample blog post data - in real app, this would come from a CMS or API
const getBlogPost = (slug: string): BlogPost | null => {
  const posts: Record<string, BlogPost> = {
    "when-aid-disappears-human-cost": {
      id: 1,
      title: "When aid disappears: The human cost of foreign aid cuts",
      excerpt: "What happens when the emergency aid to communities facing hunger, war, extreme weather, and disaster abruptly stops?",
      content: `
        <p>In remote communities across Nigeria, the sudden cessation of emergency aid can mean the difference between survival and catastrophe. When international funding dries up or programs are abruptly terminated, vulnerable populations are left to face mounting challenges without the support systems they have come to depend on.</p>

        <p>Our recent assessment across five states reveals the stark reality of what happens when aid disappears. In Borno State, where communities have been rebuilding after years of conflict, the withdrawal of food assistance programs has forced families to make impossible choices between education and nutrition for their children.</p>

        <h2>The Ripple Effects</h2>
        <p>The impact extends far beyond immediate needs. When educational support ends, children drop out of school to help their families survive. When healthcare programs shut down, preventable diseases spread unchecked. When economic empowerment initiatives cease, the cycle of poverty deepens.</p>

        <p>Maria, a mother of four from a rural community in Adamawa State, shares her story: "When the program ended, we had no warning. One day the support was there, the next day we were on our own again. My children had to stop going to school because we couldn't afford the materials anymore."</p>

        <h2>Building Sustainable Solutions</h2>
        <p>At Danga Memorial Foundation, we believe in building programs that create lasting change rather than temporary relief. Our approach focuses on:</p>

        <ul>
          <li>Developing local capacity so communities can continue programs independently</li>
          <li>Creating sustainable funding models that don't rely solely on external donors</li>
          <li>Building partnerships with local organizations and government agencies</li>
          <li>Implementing gradual transition periods rather than abrupt program endings</li>
        </ul>

        <p>The human cost of aid dependency is real, but it's not inevitable. By working alongside communities to build their own capacity and create sustainable systems, we can ensure that progress continues long after external support ends.</p>

        <h2>Moving Forward</h2>
        <p>The solution isn't to abandon aid altogether, but to reimagine how we deliver it. Emergency response will always be necessary, but it must be coupled with long-term development strategies that put communities in the driver's seat of their own progress.</p>

        <p>As we continue our work across Nigeria, we remain committed to this principle: true development happens when communities have the tools, knowledge, and resources to thrive on their own terms.</p>
      `,
      image: "/images/blog/aid-disappears.jpg",
      date: "2024-04-15",
      category: "Emergency Response",
      readTime: "5 min read",
      author: {
        name: "Sarah Johnson",
        role: "Program Director",
        avatar: "/images/team/sarah-johnson.jpg"
      },
      tags: ["Emergency Response", "Sustainability", "Community Development", "Nigeria"],
      slug: "when-aid-disappears-human-cost"
    }
  };
  
  return posts[slug] || null;
};

// Related posts function
const getRelatedPosts = (currentPostId: number, category: string): RelatedPost[] => {
  const allRelatedPosts: RelatedPost[] = [
    {
      id: 2,
      title: "Building resilient communities through WASH programs",
      excerpt: "How access to clean water and sanitation transforms lives in rural communities across Nigeria.",
      image: "/images/blog/wash-programs.jpg",
      date: "2024-04-05",
      category: "WASH",
      readTime: "5 min read",
      slug: "building-resilient-communities-wash"
    },
    {
      id: 3,
      title: "Youth empowerment: Creating tomorrow's leaders",
      excerpt: "Meet the young changemakers who are transforming their communities through our skills training programs.",
      image: "/images/blog/youth-empowerment.jpg",
      date: "2024-04-03",
      category: "Youth Development",
      readTime: "4 min read",
      slug: "youth-empowerment-tomorrows-leaders"
    }
  ];
  
  return allRelatedPosts.filter(post => post.id !== currentPostId);
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Danga Memorial Foundation Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const BlogPostPage: React.FC<BlogPageProps> = ({ params }) => {
  const post = getBlogPost(params.slug);
  const relatedPosts = post ? getRelatedPosts(post.id, post.category) : [];

  if (!post) {
    return (
      <div className="pt-20 section-padding">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-brand hover:text-brand-dark">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20">
      {/* Breadcrumbs */}
      <section className="py-8 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center space-x-4 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-600 hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/blog" className="text-gray-600 hover:text-brand transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">Current Article</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center text-brand hover:text-brand-dark transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-brand-light text-brand text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.readTime}
                  </div>
                </div>
              </div>
              
              {/* Share Buttons - Client Component */}
              <ShareButtons title={post.title} />
            </div>
            
            <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand hover:prose-a:text-brand-dark prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-600 font-medium">Tags:</span>
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
                Related Stories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost: RelatedPost) => (
                  <article key={relatedPost.id} className="group">
                    <div className="relative aspect-[4/3] mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3 group-hover:text-brand transition-colors duration-200">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 font-light">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedPost.readTime}
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-brand text-sm font-light hover:text-brand-dark transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-lg text-gray-600 mb-6 font-light">
                Get the latest stories and updates from Danga Memorial Foundation 
                delivered straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-colors duration-300 font-medium rounded-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;