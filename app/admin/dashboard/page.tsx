"use client";

import { useAuth } from "@/components/admin/auth/authProvider";
import { User, FileText, DollarSign, Folder, Calendar, ArrowUpRight, MoreHorizontal, Plus, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome back, {user?.name || 'Admin'}
          </p>
        </div>
      </div>

      {/* Minimalist Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Applications Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-500 text-sm">Applications</div>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-light text-gray-800">24</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3
            </div>
          </div>
        </div>

        {/* Donations Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-500 text-sm">Donations</div>
            <DollarSign className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-light text-gray-800">₦2.4M</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-500 text-sm">Projects</div>
            <Folder className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-light text-gray-800">8</div>
            <div className="text-xs text-gray-500">
              2 completed
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light text-gray-800">Recent Activity</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-light text-gray-800">New donation received from John Doe</p>
                  <p className="text-xs text-gray-500 mt-1 font-light">₦150,000 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-light text-gray-800">Job application submitted for Community Health Worker</p>
                  <p className="text-xs text-gray-500 mt-1 font-light">Amina Yusuf • 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-light text-gray-800">Project "Clean Water Initiative" updated</p>
                  <p className="text-xs text-gray-500 mt-1 font-light">Phase 2 completed • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-light text-gray-800">New volunteer registration</p>
                  <p className="text-xs text-gray-500 mt-1 font-light">Chinedu Okoro • 2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light text-gray-800">Quick Actions</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center group">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-light text-gray-800">New Application</span>
              </button>
              
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center group">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                  <Plus className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-light text-gray-800">Record Donation</span>
              </button>
              
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center group">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 transition-colors">
                  <Plus className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-light text-gray-800">Create Project</span>
              </button>
              
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center group">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-orange-200 transition-colors">
                  <Plus className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-light text-gray-800">Add User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light text-gray-800">Upcoming Events</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-light">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-light text-gray-800">Community Outreach</p>
                <p className="text-xs text-gray-500 font-light">Tomorrow • 10:00 AM</p>
              </div>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-light py-1 px-3 border border-blue-200 rounded-full">
              Details
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-light text-gray-800">Donor Meeting</p>
                <p className="text-xs text-gray-500 font-light">Dec 15 • 2:00 PM</p>
              </div>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-light py-1 px-3 border border-blue-200 rounded-full">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}