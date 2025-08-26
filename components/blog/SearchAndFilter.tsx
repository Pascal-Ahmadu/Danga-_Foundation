import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";

interface SearchAndFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultsCount?: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange,
  resultsCount 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearFilters = () => {
    onCategoryChange("All Categories");
    onSearchChange("");
  };

  const hasActiveFilters = selectedCategory !== "All Categories" || searchTerm;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
      <div className="container">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Results count and filters */}
            <div className="flex items-center gap-4">
              {resultsCount !== undefined && (
                <span className="text-sm text-gray-600">
                  {resultsCount} article{resultsCount !== 1 ? "s" : ""} found
                </span>
              )}
              
              {/* Mobile filter toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center px-4 py-2 border border-gray-200 rounded-lg"
              >
                Filters
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
              
              {/* Desktop filters */}
              <div className="hidden lg:flex gap-4">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent min-w-[160px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 text-gray-600 hover:text-brand transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile filters */}
          {isFilterOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 text-gray-600 hover:text-brand transition-colors border border-gray-200 rounded-lg"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
