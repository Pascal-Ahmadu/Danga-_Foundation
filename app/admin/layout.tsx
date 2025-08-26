"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/layout/sidebar";
import { AuthProvider, useAuth } from "@/components/admin/auth/authProvider";
import Login from "@/components/admin/login/loginPage";
import DashboardPage from "@/app/admin/dashboard/page";
import ApplicationsPage from "@/app/admin/application/page";
import DonationsPage from "@/app/admin/donations/page";
import JobsPage from "@/app/admin/jobs/page";
import PostsPage from "@/app/admin/posts/page";
import SettingsPage from "@/app/admin/settings/page";
import SupportPage from "@/app/admin/support/page";

// Separate component that uses the auth context
function AdminContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitialized, isLoggingOut } = useAuth();
  
  // Sidebar state
  const [isOpen, setIsOpen] = useState(false);
  
  // Track current page for highlighting in Sidebar
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleClose = () => setIsOpen(false);

  // Show loading spinner while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading...</p>
        </div>
      </div>
    );
  }

  // Show logout animation
  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Signing out...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "applications":
        return <ApplicationsPage />;
      case "donations":
        return <DonationsPage />;
      case "jobs":
        return <JobsPage />;
      case "posts":
        return <PostsPage />;
      case "settings":
        return <SettingsPage />;
      case "support":
        return <SupportPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Show admin dashboard
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={handleClose}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content - Header/Navbar removed */}
      <div className="flex-1 flex flex-col">
        {/* Page Content - Now takes full height */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

// Main layout component that provides the auth context
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}