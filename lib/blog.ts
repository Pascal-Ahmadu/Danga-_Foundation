// lib/blog.ts

export interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
}

export const blogCategories: string[] = [
  "All Categories",
  "Emergency Response",
  "Leadership", 
  "Economic Development",
  "Climate Resilience",
  "WASH",
  "Youth Development",
  "Education",
  "Health & Wellness",
  "Community Stories"
];

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
};

export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric",
    year: "numeric"
  });
};

export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const textContent = content.replace(/<[^>]*>/g, "");
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength) + "..."
    : textContent;
};

export const getPostsByCategory = (posts: BlogPost[], category: string): BlogPost[] => {
  if (category === "All Categories") return posts;
  return posts.filter((post: BlogPost) => post.category === category);
};

export const searchPosts = (posts: BlogPost[], searchTerm: string): BlogPost[] => {
  if (!searchTerm) return posts;
  const term = searchTerm.toLowerCase();
  return posts.filter((post: BlogPost) => 
    post.title.toLowerCase().includes(term) || 
    post.excerpt.toLowerCase().includes(term) ||
    post.content.toLowerCase().includes(term)
  );
};
