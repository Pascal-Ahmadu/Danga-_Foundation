// app/blog/page.tsx - Main blog listing page (Server Component)
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import BlogFilters from '@/app/(main)/blog/blogFilters'; // Client component for filters

export const metadata: Metadata = {
  title: "Blog - Latest News & Stories | Danga Memorial Foundation",
  description:
    "Stay updated with the latest news, stories, and insights from Danga Memorial Foundation. Read about our impact, community work, and development programs across Nigeria.",
  openGraph: {
    title: "Blog - Danga Memorial Foundation",
    description:
      "Latest news, stories and impact updates from our community development work.",
    url: "https://www.danga.org/blog",
  },
};

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
  slug: string;
}

// Sample blog data - in real app, this would come from a CMS or API
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "When aid disappears: The human cost of foreign aid cuts",
    excerpt:
      "What happens when the emergency aid to communities facing hunger, war, extreme weather, and disaster abruptly stops?",
    image: "/images/blog/aid-disappears.jpg",
    date: "2024-04-15",
    category: "Emergency Response",
    readTime: "5 min read",
    featured: true,
    slug: "when-aid-disappears-human-cost",
  },
  {
    id: 2,
    title:
      "Operation leaders. Let aid in: Mercy Corps CEO on the crisis in Gaza",
    excerpt:
      "Tjada D'Oyen McKenna underscores how the humanitarian crisis is urgently needed to prevent mass starvation.",
    image: "/images/blog/operation-leaders.jpg",
    date: "2024-04-12",
    category: "Leadership",
    readTime: "4 min read",
    featured: false,
    slug: "operation-leaders-gaza-crisis",
  },
  {
    id: 3,
    title: "Mentors connect small businesses to key resources for growth",
    excerpt:
      "In Indonesia, Mentormart and Mercy Corps serve the Nexus program, helping entrepreneurs access financing, digital tools and mentorship.",
    image: "/images/blog/mentors-connect.jpg",
    date: "2024-04-10",
    category: "Economic Development",
    readTime: "6 min read",
    featured: false,
    slug: "mentors-connect-small-businesses",
  },
  {
    id: 4,
    title: "Helping Caribbean communities brace for hurricane season",
    excerpt:
      "As climate change makes hurricanes more frequent or intense, Mercy Corps is supporting Caribbean communities to prepare in advance of extreme weather.",
    image: "/images/blog/caribbean-hurricane.jpg",
    date: "2024-04-08",
    category: "Climate Resilience",
    readTime: "3 min read",
    featured: false,
    slug: "helping-caribbean-hurricane-season",
  },
  {
    id: 5,
    title: "Building resilient communities through WASH programs",
    excerpt:
      "How access to clean water and sanitation transforms lives in rural communities across Nigeria.",
    image: "/images/blog/wash-programs.jpg",
    date: "2024-04-05",
    category: "WASH",
    readTime: "5 min read",
    featured: false,
    slug: "building-resilient-communities-wash",
  },
  {
    id: 6,
    title: "Youth empowerment: Creating tomorrow's leaders",
    excerpt:
      "Meet the young changemakers who are transforming their communities through our skills training programs.",
    image: "/images/blog/youth-empowerment.jpg",
    date: "2024-04-03",
    category: "Youth Development",
    readTime: "4 min read",
    featured: false,
    slug: "youth-empowerment-tomorrows-leaders",
  },
];

const categories: string[] = [
  "All Categories",
  "Emergency Response",
  "Leadership",
  "Economic Development",
  "Climate Resilience",
  "WASH",
  "Youth Development",
  "Education",
  "Health & Wellness",
];

interface BlogPageProps {
  searchParams: {
    category?: string;
    year?: string;
    search?: string;
  };
}

const BlogPage = ({ searchParams }: BlogPageProps) => {
  const selectedCategory = searchParams.category || "All Categories";
  const selectedYear = searchParams.year || "All Years";
  const searchTerm = searchParams.search || "";

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Categories" || post.category === selectedCategory;
    const matchesYear =
      selectedYear === "All Years" ||
      new Date(post.date).getFullYear().toString() === selectedYear;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

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
              Latest Stories
            </h1>
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                Stay updated with our latest news, impact stories, and insights from
                the communities we serve across Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-brand-light text-brand text-sm font-medium rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 font-light">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(featuredPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-brand font-light hover:text-brand-dark transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters - Client Component */}
      <BlogFilters 
        categories={categories}
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        searchTerm={searchTerm}
      />

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article key={post.id} className="group">
                    <div className="relative aspect-[4/3] mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-light text-gray-900 mb-3 group-hover:text-brand transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 font-light">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-brand text-sm font-light hover:text-brand-dark transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Load More / Pagination */}
      <section className="pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto text-center">
            <button className="px-8 py-3 border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 font-medium">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
