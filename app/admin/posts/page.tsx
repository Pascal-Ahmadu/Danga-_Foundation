"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  X,
  Calendar,
  User,
  FileText,
  Tag,
  Clock,
  ChevronDown,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Plus,
  Image,
  Globe,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorEmail: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  featuredImage: string;
  dateCreated: string;
  datePublished?: string;
  lastModified: string;
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Sustainable Technology in Africa",
    slug: "future-sustainable-technology-africa",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: "Exploring how sustainable technology is reshaping the African continent and creating new opportunities for growth.",
    author: "Dr. Amina Kone",
    authorEmail: "amina.kone@email.com",
    category: "Technology",
    tags: ["sustainability", "africa", "technology", "innovation"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    dateCreated: "2025-08-20",
    datePublished: "2025-08-22",
    lastModified: "2025-08-23",
    views: 1250,
    likes: 87,
    comments: 23,
    seoTitle: "Sustainable Technology in Africa: Future Trends & Opportunities",
    seoDescription: "Discover the latest trends in sustainable technology across Africa and how they're driving economic growth."
  },
  {
    id: "2",
    title: "Building Resilient Communities Through Digital Innovation",
    slug: "building-resilient-communities-digital-innovation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: "How digital tools and platforms are empowering communities to become more resilient and self-sufficient.",
    author: "John Okafor",
    authorEmail: "john.okafor@email.com",
    category: "Community",
    tags: ["community", "digital", "innovation", "resilience"],
    status: "draft",
    featuredImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    dateCreated: "2025-08-18",
    lastModified: "2025-08-24",
    views: 0,
    likes: 0,
    comments: 0,
    seoTitle: "Digital Innovation for Community Resilience",
    seoDescription: "Learn how digital innovation is helping communities build resilience and adapt to modern challenges."
  },
  {
    id: "3",
    title: "Youth Entrepreneurship: Success Stories from Nigeria",
    slug: "youth-entrepreneurship-success-stories-nigeria",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: "Inspiring stories of young entrepreneurs who are making a difference in Nigeria's business landscape.",
    author: "Fatima Ibrahim",
    authorEmail: "fatima.ibrahim@email.com",
    category: "Business",
    tags: ["youth", "entrepreneurship", "nigeria", "success"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    dateCreated: "2025-08-15",
    datePublished: "2025-08-16",
    lastModified: "2025-08-16",
    views: 892,
    likes: 156,
    comments: 34,
    seoTitle: "Nigerian Youth Entrepreneurs: Inspiring Success Stories",
    seoDescription: "Read about successful young entrepreneurs in Nigeria and their journey to business success."
  },
  {
    id: "4",
    title: "Climate Change Adaptation Strategies for West Africa",
    slug: "climate-change-adaptation-strategies-west-africa",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: "A comprehensive look at climate adaptation strategies being implemented across West African nations.",
    author: "Dr. Kwame Asante",
    authorEmail: "kwame.asante@email.com",
    category: "Environment",
    tags: ["climate", "adaptation", "west africa", "environment"],
    status: "archived",
    featuredImage: "https://images.unsplash.com/photo-1569163139394-de44cb2c4e0a",
    dateCreated: "2025-08-10",
    datePublished: "2025-08-12",
    lastModified: "2025-08-20",
    views: 2150,
    likes: 203,
    comments: 67,
    seoTitle: "Climate Adaptation in West Africa: Strategies & Solutions",
    seoDescription: "Explore effective climate change adaptation strategies being implemented across West Africa."
  },
  {
    id: "5",
    title: "The Rise of Fintech in African Markets",
    slug: "rise-fintech-african-markets",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: "How financial technology is revolutionizing banking and payments across African markets.",
    author: "Sarah Mwangi",
    authorEmail: "sarah.mwangi@email.com",
    category: "Finance",
    tags: ["fintech", "africa", "banking", "payments"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    dateCreated: "2025-08-12",
    datePublished: "2025-08-14",
    lastModified: "2025-08-15",
    views: 1780,
    likes: 234,
    comments: 45,
    seoTitle: "African Fintech Revolution: Market Trends & Growth",
    seoDescription: "Discover how fintech is transforming financial services across African markets."
  }
];

const categories = ["All", "Technology", "Community", "Business", "Environment", "Finance", "Health", "Education"];

export default function BlogAdminPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<BlogPost | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update edited post when selected post changes
  useEffect(() => {
    if (selectedPost) {
      setEditedPost({ ...selectedPost });
    }
  }, [selectedPost]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "draft":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Edit,
          label: "Draft"
        };
      case "published":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: Globe,
          label: "Published"
        };
      case "archived":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: AlertCircle,
          label: "Archived"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: FileText,
          label: "Unknown"
        };
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getPostsStats = () => {
    const published = blogPosts.filter(p => p.status === 'published').length;
    const draft = blogPosts.filter(p => p.status === 'draft').length;
    const totalViews = blogPosts.reduce((total, post) => total + post.views, 0);
    
    return { published, draft, totalViews };
  };

  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setModalMode("view");
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setModalMode("edit");
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: `new-${Date.now()}`,
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "",
      authorEmail: "",
      category: "Technology",
      tags: [],
      status: "draft",
      featuredImage: "",
      dateCreated: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: "",
      seoDescription: ""
    };
    setSelectedPost(newPost);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setEditedPost(null);
    setModalMode("view");
    setIsStatusDropdownOpen(false);
  };

  const handleDeletePost = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (window.confirm(`Are you sure you want to delete "${post?.title}"?`)) {
      setBlogPosts(posts => posts.filter(p => p.id !== postId));
      
      // Close modal if the deleted post was selected
      if (selectedPost?.id === postId) {
        closeModal();
      }
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (postId: string) => {
    setActiveDropdown(activeDropdown === postId ? null : postId);
  };

  const savePost = () => {
    if (!editedPost) return;

    if (modalMode === "create") {
      const finalPost = {
        ...editedPost,
        id: `post-${Date.now()}`,
        slug: editedPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        lastModified: new Date().toISOString().split('T')[0]
      };
      setBlogPosts(posts => [finalPost, ...posts]);
      alert("Blog post created successfully!");
    } else {
      setBlogPosts(posts => 
        posts.map(post => 
          post.id === editedPost.id 
            ? { ...editedPost, lastModified: new Date().toISOString().split('T')[0] }
            : post
        )
      );
      alert("Blog post updated successfully!");
    }
    
    closeModal();
  };

  const stats = getPostsStats();

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-light text-gray-900 mb-1">Blog Management</h1>
          <p className="text-gray-500 text-sm font-light">
            Create, edit, and manage blog posts for your website
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 font-light">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
          </div>
          <div className="text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 font-light">
            {stats.published} Published • {stats.draft} Drafts
          </div>
          <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 font-light">
            {formatViews(stats.totalViews)} Total Views
          </div>
          <button
            onClick={handleCreatePost}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-light text-gray-700 mb-2">
              Search Posts
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-light text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-light text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider w-16">
                  #
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Post
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Author
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Stats
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post, index) => {
                const statusConfig = getStatusConfig(post.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {post.featuredImage && (
                          <div className="flex-shrink-0">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-light text-gray-900 truncate max-w-xs">
                            {post.title}
                          </div>
                          <div className="text-xs text-gray-500 font-light truncate max-w-xs">
                            {post.excerpt}
                          </div>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-light">
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-xs text-gray-400 font-light">+{post.tags.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-light text-gray-900">{post.author}</div>
                      <div className="text-xs text-gray-500 font-light">{post.authorEmail}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-light">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatViews(post.views)}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">
                      <div>{new Date(post.dateCreated).toLocaleDateString()}</div>
                      {post.lastModified !== post.dateCreated && (
                        <div className="text-xs text-gray-400">Modified: {new Date(post.lastModified).toLocaleDateString()}</div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${statusConfig.color}`}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        <span className="text-xs font-medium">{statusConfig.label}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(post.id)}
                          className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        </button>
                        
                        {activeDropdown === post.id && (
                          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-100 z-20 min-w-[180px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="py-2">
                              <button
                                onClick={() => handleViewPost(post)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mr-3 group-hover:bg-blue-200 transition-colors">
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">View Post</div>
                                  <div className="text-xs text-gray-500 font-light">See full details</div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => handleEditPost(post)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 mr-3 group-hover:bg-emerald-200 transition-colors">
                                  <Edit className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">Edit Post</div>
                                  <div className="text-xs text-gray-500 font-light">Modify content</div>
                                </div>
                              </button>
                              
                              <div className="my-1 border-t border-gray-100"></div>
                              
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 mr-3 group-hover:bg-red-200 transition-colors">
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">Delete</div>
                                  <div className="text-xs text-gray-500 font-light">Remove permanently</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 font-light text-base mb-2">No blog posts found</p>
              <p className="text-xs text-gray-400 font-light">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your search or filter criteria" 
                  : "Create your first blog post to get started"
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-base font-light text-gray-900">
                {modalMode === "create" ? "Create New Post" : modalMode === "edit" ? "Edit Post" : "Post Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalMode === "view" ? (
                // View Mode
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Post Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-light text-gray-900">Post Information</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start space-x-3">
                          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <p className="text-xs text-blue-700 font-light mb-1">Title</p>
                            <p className="text-sm font-light text-blue-900">{selectedPost.title}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-light">Author</p>
                          <p className="text-sm font-light">{selectedPost.author}</p>
                          <p className="text-xs text-gray-400 font-light">{selectedPost.authorEmail}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Tag className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-light">Category</p>
                          <p className="text-sm font-light">{selectedPost.category}</p>
                        </div>
                      </div>
                      
                      {selectedPost.tags.length > 0 && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 font-light mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedPost.tags.map(tag => (
                              <span key={tag} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-light">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-light">Created</p>
                          <p className="text-sm font-light">{new Date(selectedPost.dateCreated).toLocaleDateString()}</p>
                          {selectedPost.datePublished && (
                            <p className="text-xs text-gray-400 font-light">Published: {new Date(selectedPost.datePublished).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Stats & Content Preview */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-light text-gray-900">Performance & Content</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-emerald-50 rounded-lg text-center border border-emerald-100">
                          <Eye className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-emerald-800">{formatViews(selectedPost.views)}</p>
                          <p className="text-xs text-emerald-600 font-light">Views</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg text-center border border-red-100">
                          <Heart className="w-5 h-5 text-red-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-red-800">{selectedPost.likes}</p>
                          <p className="text-xs text-red-600 font-light">Likes</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-100">
                          <MessageCircle className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-blue-800">{selectedPost.comments}</p>
                          <p className="text-xs text-blue-600 font-light">Comments</p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-2 font-light">Content Preview</p>
                        <div className="text-sm text-gray-700 font-light leading-relaxed">
                          {selectedPost.content.substring(0, 200)}...
                        </div>
                      </div>
                      
                      {selectedPost.featuredImage && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-2 font-light">Featured Image</p>
                          <img 
                            src={selectedPost.featuredImage} 
                            alt={selectedPost.title}
                            className="w-full h-32 rounded-lg object-cover border border-gray-200"
                          />
                        </div>
                      )}
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-3 font-light">Post Status</p>
                        
                        <div className="relative" ref={dropdownRef}>
                          <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-light cursor-pointer hover:border-gray-400 transition-colors flex items-center justify-between"
                          >
                            <span className="text-sm">{getStatusConfig(selectedPost.status).label}</span>
                            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {isStatusDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                              <div className="py-2">
                                {[
                                  { value: 'draft', label: 'Draft', icon: Edit, color: 'text-amber-600', bgColor: 'bg-amber-50' },
                                  { value: 'published', label: 'Published', icon: Globe, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                                  { value: 'archived', label: 'Archived', icon: AlertCircle, color: 'text-gray-600', bgColor: 'bg-gray-50' }
                                ].map((status) => {
                                  const StatusIcon = status.icon;
                                  const isSelected = selectedPost.status === status.value;
                                  return (
                                    <button
                                      key={status.value}
                                      onClick={() => {
                                        setBlogPosts(posts => 
                                          posts.map(post => 
                                            post.id === selectedPost.id 
                                              ? { ...post, status: status.value as BlogPost['status'], lastModified: new Date().toISOString().split('T')[0] }
                                              : post
                                          )
                                        );
                                        setSelectedPost(prev => prev ? { ...prev, status: status.value as BlogPost['status'] } : null);
                                        setIsStatusDropdownOpen(false);
                                        alert(`Post status updated to ${status.label} successfully!`);
                                      }}
                                      className={`flex items-center w-full px-4 py-3 text-sm transition-all duration-200 hover:${status.bgColor} group ${
                                        isSelected ? `${status.bgColor} ${status.color}` : 'text-gray-700'
                                      }`}
                                    >
                                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-colors ${
                                        isSelected ? status.color.replace('text-', 'bg-').replace('-600', '-100') : 'bg-gray-100'
                                      }`}>
                                        <StatusIcon className={`w-4 h-4 ${isSelected ? status.color : 'text-gray-500'}`} />
                                      </div>
                                      <div className="text-left flex-1">
                                        <div className="text-sm font-light">{status.label}</div>
                                        {isSelected && (
                                          <div className="text-xs opacity-75 font-light">Currently selected</div>
                                        )}
                                      </div>
                                      {isSelected && (
                                        <CheckCircle className="w-4 h-4 text-current ml-2" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit/Create Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-light text-gray-900">Basic Information</h3>
                      
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">Post Title</label>
                        <input
                          type="text"
                          value={editedPost?.title || ""}
                          onChange={(e) => setEditedPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="Enter post title..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">Author Name</label>
                        <input
                          type="text"
                          value={editedPost?.author || ""}
                          onChange={(e) => setEditedPost(prev => prev ? { ...prev, author: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="Author name..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">Author Email</label>
                        <input
                          type="email"
                          value={editedPost?.authorEmail || ""}
                          onChange={(e) => setEditedPost(prev => prev ? { ...prev, authorEmail: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="author@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">Category</label>
                        <select
                          value={editedPost?.category || ""}
                          onChange={(e) => setEditedPost(prev => prev ? { ...prev, category: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                        >
                          {categories.filter(cat => cat !== "All").map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={editedPost?.tags.join(", ") || ""}
                          onChange={(e) => setEditedPost(prev => prev ? { ...prev, tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag) } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="technology, innovation, africa"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">Featured Image URL</label>
                        <input
                          type="url"
                          value={editedPost?.featuredImage || ""}
                          onChange={(e) => setEditedPost(prev => prev ? { ...prev, featuredImage: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content & SEO */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-light text-gray-900">Content & SEO</h3>
                    
                    <div>
                      <label className="block text-xs font-light text-gray-700 mb-2">Excerpt</label>
                      <textarea
                        value={editedPost?.excerpt || ""}
                        onChange={(e) => setEditedPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
                        placeholder="Brief description of the post..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-light text-gray-700 mb-2">SEO Title</label>
                      <input
                        type="text"
                        value={editedPost?.seoTitle || ""}
                        onChange={(e) => setEditedPost(prev => prev ? { ...prev, seoTitle: e.target.value } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="SEO optimized title..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-light text-gray-700 mb-2">SEO Description</label>
                      <textarea
                        value={editedPost?.seoDescription || ""}
                        onChange={(e) => setEditedPost(prev => prev ? { ...prev, seoDescription: e.target.value } : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
                        placeholder="Meta description for search engines..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-light text-gray-700 mb-2">Status</label>
                      <select
                        value={editedPost?.status || ""}
                        onChange={(e) => setEditedPost(prev => prev ? { ...prev, status: e.target.value as BlogPost['status'] } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    
                    {editedPost?.featuredImage && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-light">Featured Image Preview</p>
                        <img 
                          src={editedPost.featuredImage} 
                          alt="Featured"
                          className="w-full h-32 rounded-lg object-cover border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Full Content Editor */}
                  <div className="mt-6">
                    <label className="block text-xs font-light text-gray-700 mb-2">Post Content</label>
                    <textarea
                      value={editedPost?.content || ""}
                      onChange={(e) => setEditedPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
                      placeholder="Write your blog post content here..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-500 font-light">
                {modalMode === "view" ? (
                  <span>Last modified: {new Date(selectedPost.lastModified).toLocaleDateString()}</span>
                ) : (
                  <span>
                    {modalMode === "create" ? "Creating new post" : "Editing post"}
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-light"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>
                {modalMode === "view" && (
                  <button
                    onClick={() => setModalMode("edit")}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-light"
                  >
                    Edit Post
                  </button>
                )}
                {(modalMode === "edit" || modalMode === "create") && (
                  <button
                    onClick={savePost}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-light"
                  >
                    {modalMode === "create" ? "Create Post" : "Save Changes"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}