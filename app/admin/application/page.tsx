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
  Mail,
  Phone,
  FileText,
  MapPin,
  ChevronDown,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  dateApplied: string;
  experience: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 801 234 5678",
    position: "Community Health Worker",
    location: "Abuja, FCT",
    status: "pending",
    dateApplied: "2025-08-20",
    experience: "3 years"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+234 802 345 6789",
    position: "Program Coordinator",
    location: "Lagos, NG",
    status: "reviewed",
    dateApplied: "2025-08-18",
    experience: "5 years"
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+234 803 456 7890",
    position: "Field Officer",
    location: "Kano, NG",
    status: "approved",
    dateApplied: "2025-08-15",
    experience: "2 years"
  },
  {
    id: "4",
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "+234 804 567 8901",
    position: "Social Worker",
    location: "Port Harcourt, NG",
    status: "rejected",
    dateApplied: "2025-08-10",
    experience: "4 years"
  }
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [modalStatus, setModalStatus] = useState<string>("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
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

  // Update modal status when selected application changes
  useEffect(() => {
    if (selectedApplication) {
      setModalStatus(selectedApplication.status);
    }
  }, [selectedApplication]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Clock,
          label: "Pending Review"
        };
      case "reviewed":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: FileCheck,
          label: "Under Review"
        };
      case "approved":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: CheckCircle,
          label: "Approved"
        };
      case "rejected":
        return {
          color: "bg-rose-100 text-rose-800 border-rose-200",
          icon: AlertCircle,
          label: "Rejected"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: "Unknown"
        };
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setModalStatus(application.status);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
    setModalStatus("");
    setIsStatusDropdownOpen(false);
  };

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus as Application['status'] }
          : app
      )
    );
    
    // Update selected application if it's the one being changed
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication(prev => prev ? { ...prev, status: newStatus as Application['status'] } : null);
    }
    
    setActiveDropdown(null);
  };

  const handleDeleteApplication = (applicationId: string) => {
    const application = applications.find(app => app.id === applicationId);
    if (window.confirm(`Are you sure you want to delete ${application?.name}'s application?`)) {
      setApplications(apps => apps.filter(app => app.id !== applicationId));
      
      // Close modal if the deleted application was selected
      if (selectedApplication?.id === applicationId) {
        closeModal();
      }
    }
    setActiveDropdown(null);
  };

  const handleEditApplication = (application: Application) => {
    // For now, just show an alert. You can implement actual edit functionality
    alert(`Edit functionality for ${application.name} would be implemented here.`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (applicationId: string) => {
    setActiveDropdown(activeDropdown === applicationId ? null : applicationId);
  };

  const saveStatusChange = () => {
    if (selectedApplication && modalStatus !== selectedApplication.status) {
      handleStatusChange(selectedApplication.id, modalStatus);
      alert(`Status updated to ${modalStatus} successfully!`);
    }
    closeModal();
  };

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-light text-gray-900 mb-1">Job Applications</h1>
          <p className="text-gray-500 text-sm font-light">
            Review and manage applications from candidates
          </p>
        </div>
        
        <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 font-light">
          {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-light text-gray-700 mb-2">
              Search Applications
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or position..."
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
                <option value="all">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="reviewed">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider w-16">
                  #
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Applicant
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Position
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Experience
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Date Applied
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
              {filteredApplications.map((application, index) => {
                const statusConfig = getStatusConfig(application.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-light text-gray-900">{application.name}</div>
                        <div className="text-xs text-gray-500 font-light">{application.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-light">{application.position}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">{application.location}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">{application.experience}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">
                      {new Date(application.dateApplied).toLocaleDateString()}
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
                          onClick={() => toggleDropdown(application.id)}
                          className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        </button>
                        
                        {activeDropdown === application.id && (
                          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-100 z-20 min-w-[180px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="py-2">
                              <button
                                onClick={() => handleViewApplication(application)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mr-3 group-hover:bg-blue-200 transition-colors">
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">View Details</div>
                                  <div className="text-xs text-gray-500 font-light">See full application</div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => handleEditApplication(application)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 mr-3 group-hover:bg-emerald-200 transition-colors">
                                  <Edit className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">Edit Application</div>
                                  <div className="text-xs text-gray-500 font-light">Modify details</div>
                                </div>
                              </button>
                              
                              <div className="my-1 border-t border-gray-100"></div>
                              
                              <button
                                onClick={() => handleDeleteApplication(application.id)}
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
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 font-light text-base mb-2">No applications found</p>
              <p className="text-xs text-gray-400 font-light">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No applications have been submitted yet"
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-base font-light text-gray-900">
                Application Details
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Full Name</p>
                        <p className="text-sm font-light">{selectedApplication.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Email</p>
                        <p className="text-sm font-light">{selectedApplication.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Phone</p>
                        <p className="text-sm font-light">{selectedApplication.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Location</p>
                        <p className="text-sm font-light">{selectedApplication.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Application Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Position</p>
                        <p className="text-sm font-light">{selectedApplication.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Date Applied</p>
                        <p className="text-sm font-light">
                          {new Date(selectedApplication.dateApplied).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 font-light">Experience</p>
                      <p className="text-sm font-light">{selectedApplication.experience}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-3 font-light">Application Status</p>
                      
                      {/* Custom Status Dropdown */}
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-light cursor-pointer hover:border-gray-400 transition-colors flex items-center justify-between"
                        >
                          <span className="text-sm">{getStatusConfig(modalStatus).label}</span>
                          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isStatusDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="py-2">
                              {[
                                { value: 'pending', label: 'Pending Review', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
                                { value: 'reviewed', label: 'Under Review', icon: FileCheck, color: 'text-blue-600', bgColor: 'bg-blue-50' },
                                { value: 'approved', label: 'Approved', icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                                { value: 'rejected', label: 'Rejected', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
                              ].map((status) => {
                                const StatusIcon = status.icon;
                                const isSelected = modalStatus === status.value;
                                return (
                                  <button
                                    key={status.value}
                                    onClick={() => {
                                      setModalStatus(status.value);
                                      setIsStatusDropdownOpen(false);
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
                      
                      {/* Status Indicator */}
                      <div className="mt-3">
                        {(() => {
                          const statusConfig = getStatusConfig(modalStatus);
                          const StatusIcon = statusConfig.icon;
                          return (
                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${statusConfig.color}`}>
                              <StatusIcon className="w-4 h-4 mr-2" />
                              <span className="text-xs font-medium">{statusConfig.label}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-500 font-light">
                {modalStatus !== selectedApplication.status && (
                  <span className="text-amber-600 font-light">
                    ⚠️ You have unsaved changes
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-light"
                >
                  Close
                </button>
                <button
                  onClick={saveStatusChange}
                  className={`px-4 py-2 rounded-lg transition-colors font-light ${
                    modalStatus !== selectedApplication.status
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={modalStatus === selectedApplication.status}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}