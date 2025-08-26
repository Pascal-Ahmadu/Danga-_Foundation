import { useState, useEffect, useMemo } from "react";

export interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  content?: string;
  date?: string;
  image?: string;
  slug?: string;
  readTime?: string;
}

export const useBlog = (initialPosts: BlogPost[] = []) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Categories" || post.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const hasMore = currentPage < totalPages;

  const loadMore = (): void => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const resetFilters = (): void => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setCurrentPage(1);
  };

  return {
    posts: paginatedPosts,
    allPosts: filteredPosts,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    resetFilters,
    resultsCount: filteredPosts.length,
  };
};
