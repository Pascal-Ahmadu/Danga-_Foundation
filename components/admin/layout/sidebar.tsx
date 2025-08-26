"use client";

import { 
  Home, 
  Users, 
  DollarSign, 
  Briefcase, 
  FileText, 
  X, 
  User, 
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Shield,
  Settings,
  HelpCircle,
  Search,
  Heart
} from "lucide-react";
import { useAuth } from "@/components/admin/auth/authProvider";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "applications", label: "Applications", icon: Users, badge: "3" },
    { id: "donations", label: "Donations", icon: DollarSign },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "posts", label: "Blog Posts", icon: FileText, badge: "2" },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (!mobile && window.innerWidth < 1024) {
          setIsCollapsed(true);
        }
      }
    };
    checkMobile();
  }, []);

  // Handle responsiveness
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const shouldCollapse = window.innerWidth < 1280 && window.innerWidth >= 768;
      
      setIsMobile(mobile);
      
      if (!mobile) {
        setIsCollapsed(shouldCollapse);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      onClose();
    } else {
      setIsCollapsed(prev => !prev);
    }
  }, [isMobile, onClose]);

  const handleMenuClick = useCallback((itemId: string) => {
    console.log("Navigating to:", itemId); // Debug log
    setCurrentPage(itemId);
    if (isMobile) {
      onClose();
    }
  }, [setCurrentPage, isMobile, onClose]);

  const handleLogout = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  }, [logout]);

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={onClose}
          className="bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 p-2.5"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col",
          "lg:relative lg:translate-x-0",
          "w-72",
          isMobile ? (
            isOpen 
              ? "translate-x-0" 
              : "-translate-x-full"
          ) : (
            isCollapsed ? "lg:w-20" : "lg:w-72"
          )
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Danga Foundation branding */}
          <div className={cn(
            "flex h-16 items-center border-b border-gray-200 px-4 relative",
            isCollapsed && !isMobile ? "justify-center" : "justify-between"
          )}>
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center bg-blue-600 rounded-md">
                <Heart className="h-5 w-5 text-white" />
              </div>
              {(!isCollapsed || isMobile) && (
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Danga Foundation</h1>
                  <p className="text-xs text-gray-500">Admin Portal</p>
                </div>
              )}
            </div>
            
            {/* Collapse button - positioned absolutely for better placement */}
            {!isMobile && (
              <button 
                onClick={toggleSidebar}
                className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                )}
              </button>
            )}
          </div>

          {/* Search Bar - Only show when not collapsed */}
          {(!isCollapsed || isMobile) && (
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* User Profile - Only show when not collapsed */}
          {(!isCollapsed || isMobile) && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center bg-blue-100 text-blue-700 rounded-lg">
                  <User className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role} • <span className="text-green-600">Online</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-2 overflow-y-auto">
            <div className="space-y-1">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={cn(
                      'group flex items-center w-full px-3 py-2.5 text-sm transition-all duration-200 rounded-md cursor-pointer',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                    title={(isCollapsed && !isMobile) ? item.label : undefined}
                  >
                    <div className={cn(
                      'flex items-center justify-between w-full',
                      (isCollapsed && !isMobile) && 'justify-center'
                    )}>
                      <div className="flex items-center min-w-0">
                        <div className={cn(
                          'flex items-center justify-center transition-all duration-200 h-5 w-5 flex-shrink-0',
                          (isCollapsed && !isMobile) ? 'mx-auto' : 'mr-3'
                        )}>
                          <Icon className={cn(
                            'h-5 w-5 transition-colors duration-200',
                            isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                          )} />
                        </div>
                        {(!isCollapsed || isMobile) && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>
                      
                      {item.badge && (!isCollapsed || isMobile) && (
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 font-medium flex-shrink-0 ml-3 rounded-full",
                          isActive 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-gray-200 text-gray-700"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer with Logout Button */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className={cn(
                "group w-full text-gray-700 hover:bg-red-50 hover:text-red-700 font-medium py-2.5 transition-all duration-200 flex items-center text-sm rounded-md cursor-pointer",
                (isCollapsed && !isMobile) ? "justify-center px-2" : "justify-start px-3"
              )}
              title={(isCollapsed && !isMobile) ? "Logout" : undefined}
            >
              <div className={cn(
                "flex h-5 w-5 items-center justify-center transition-all duration-200 flex-shrink-0",
                (isCollapsed && !isMobile) ? "mx-auto" : "mr-3"
              )}>
                <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
              </div>
              {(!isCollapsed || isMobile) && (
                <span>Sign Out</span>
              )}
            </button>
            
            {/* Version Info - Only show when not collapsed */}
            {(!isCollapsed || isMobile) && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">v2.1.0 • © 2023 Danga Foundation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;