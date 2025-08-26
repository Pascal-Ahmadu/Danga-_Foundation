import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

// Reuse BlogPost type (or import it from your types file)
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

interface BlogCardProps {
  post: BlogPost;
  size?: 'default' | 'large';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, size = 'default' }) => {
  const isLarge = size === 'large';

  return (
    <article className={`group ${isLarge ? 'col-span-2' : ''}`}>
      <div className={`relative ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'} mb-6 rounded-lg overflow-hidden`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={isLarge ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </div>

      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
          {post.category}
        </span>
      </div>

      <h3
        className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'} font-light text-gray-900 mb-3 group-hover:text-brand transition-colors duration-200`}
      >
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      <p
        className={`text-gray-600 ${isLarge ? 'text-base' : 'text-sm'} leading-relaxed mb-4 font-light`}
      >
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
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
  );
};

export default BlogCard;
