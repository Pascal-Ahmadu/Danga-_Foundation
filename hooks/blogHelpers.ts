export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  slug?: string;
  readTime?: string;
}

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const getUniqueCategories = (posts: BlogPost[]): string[] => {
  const categories = [...new Set(posts.map((post) => post.category))];
  return ["All Categories", ...categories.sort()];
};

export const sortPostsByDate = (posts: BlogPost[], ascending: boolean = false): BlogPost[] => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const getPostsByYear = (posts: BlogPost[]): Record<number, BlogPost[]> => {
  return posts.reduce((acc: Record<number, BlogPost[]>, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});
};
