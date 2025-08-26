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
  MapPin,
  ChevronDown,
  MoreVertical,
  Plus,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  FileText,
  Building,
  CheckCircle,
  AlertCircle,
  User
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  status: "active" | "closed" | "draft";
  salary: string;
  postedDate: string;
  closingDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationCount: number;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Community Health Worker",
    department: "Health Services",
    location: "Abuja, FCT",
    type: "full-time",
    status: "active",
    salary: "₦150,000 - ₦200,000",
    postedDate: "2025-08-15",
    closingDate: "2025-09-15",
    description: "We are seeking a dedicated Community Health Worker to join our team in providing essential healthcare services to underserved communities.",
    requirements: [
      "Bachelor's degree in Public Health or related field",
      "2+ years experience in community health",
      "Strong communication skills",
      "Ability to work in rural areas"
    ],
    benefits: [
      "Health insurance",
      "Transportation allowance",
      "Professional development opportunities",
      "Flexible working hours"
    ],
    applicationCount: 12
  },
  {
    id: "2",
    title: "Program Coordinator",
    department: "Programs",
    location: "Lagos, NG",
    type: "full-time",
    status: "active",
    salary: "₦250,000 - ₦350,000",
    postedDate: "2025-08-10",
    closingDate: "2025-09-10",
    description: "Looking for an experienced Program Coordinator to oversee and manage our community development programs across Lagos state.",
    requirements: [
      "Master's degree in Development Studies or related field",
      "5+ years program management experience",
      "Project management certification preferred",
      "Excellent organizational skills"
    ],
    benefits: [
      "Comprehensive health coverage",
      "Annual bonus",
      "Training and certification support",
      "Remote work options"
    ],
    applicationCount: 8
  },
  {
    id: "3",
    title: "Field Officer",
    department: "Field Operations",
    location: "Kano, NG",
    type: "contract",
    status: "closed",
    salary: "₦120,000 - ₦150,000",
    postedDate: "2025-07-20",
    closingDate: "2025-08-20",
    description: "Field Officer position for implementing community-based programs in northern Nigeria.",
    requirements: [
      "Diploma in Social Sciences or related field",
      "1+ years field experience",
      "Local language proficiency",
      "Valid driver's license"
    ],
    benefits: [
      "Field allowance",
      "Transportation provided",
      "Training opportunities"
    ],
    applicationCount: 15
  },
  {
    id: "4",
    title: "Social Worker",
    department: "Social Services",
    location: "Port Harcourt, NG",
    type: "part-time",
    status: "draft",
    salary: "₦80,000 - ₦120,000",
    postedDate: "2025-08-25",
    closingDate: "2025-09-25",
    description: "Part-time Social Worker position to support vulnerable families and individuals in Port Harcourt.",
    requirements: [
      "Bachelor's degree in Social Work",
      "Professional certification",
      "Experience with case management",
      "Empathy and strong interpersonal skills"
    ],
    benefits: [
      "Flexible schedule",
      "Professional supervision",
      "Continuing education support"
    ],
    applicationCount: 3
  }
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Form state for creating new jobs
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time" as Job['type'],
    salary: "",
    closingDate: "",
    description: "",
    requirements: [""],
    benefits: [""]
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: CheckCircle,
          label: "Active"
        };
      case "closed":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: AlertCircle,
          label: "Closed"
        };
      case "draft":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: "Draft"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: "Unknown"
        };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "full-time":
        return { label: "Full Time", color: "text-blue-700 bg-blue-50" };
      case "part-time":
        return { label: "Part Time", color: "text-purple-700 bg-purple-50" };
      case "contract":
        return { label: "Contract", color: "text-orange-700 bg-orange-50" };
      case "internship":
        return { label: "Internship", color: "text-green-700 bg-green-50" };
      default:
        return { label: "Unknown", color: "text-gray-700 bg-gray-50" };
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      salary: "",
      closingDate: "",
      description: "",
      requirements: [""],
      benefits: [""]
    });
  };

  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobs(jobs => 
      jobs.map(job => 
        job.id === jobId 
          ? { ...job, status: newStatus as Job['status'] }
          : job
      )
    );
    
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, status: newStatus as Job['status'] } : null);
    }
    
    setActiveDropdown(null);
  };

  const handleDeleteJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (window.confirm(`Are you sure you want to delete "${job?.title}"?`)) {
      setJobs(jobs => jobs.filter(j => j.id !== jobId));
      
      if (selectedJob?.id === jobId) {
        closeModal();
      }
    }
    setActiveDropdown(null);
  };

  const handleEditJob = (job: Job) => {
    alert(`Edit functionality for "${job.title}" would be implemented here.`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (jobId: string) => {
    setActiveDropdown(activeDropdown === jobId ? null : jobId);
  };

  const addRequirement = () => {
    setNewJob(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const addBenefit = () => {
    setNewJob(prev => ({
      ...prev,
      benefits: [...prev.benefits, ""]
    }));
  };

  const removeRequirement = (index: number) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const removeBenefit = (index: number) => {
    setNewJob(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setNewJob(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const handleCreateJob = () => {
    const job: Job = {
      id: Date.now().toString(),
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      type: newJob.type,
      status: "active",
      salary: newJob.salary,
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: newJob.closingDate,
      description: newJob.description,
      requirements: newJob.requirements.filter(req => req.trim() !== ""),
      benefits: newJob.benefits.filter(benefit => benefit.trim() !== ""),
      applicationCount: 0
    };

    setJobs(prev => [job, ...prev]);
    closeCreateModal();
    alert("Job posted successfully!");
  };

  const viewApplications = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    alert(`View ${job?.applicationCount} applications for "${job?.title}"`);
    setActiveDropdown(null);
  };

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-light text-gray-900 mb-1">Job Management</h1>
          <p className="text-gray-500 text-sm font-light">
            Post, manage and track job openings
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 font-light">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-light text-gray-700 mb-2">
              Search Jobs
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title, department, or location..."
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
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-light text-gray-700 mb-2">
              Filter by Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider w-16">
                  #
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Job Title
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Department
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Salary
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Applications
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
              {filteredJobs.map((job, index) => {
                const statusConfig = getStatusConfig(job.status);
                const typeConfig = getTypeConfig(job.type);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-light text-gray-900">{job.title}</div>
                        <div className="text-xs text-gray-500 font-light">
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-light">{job.department}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">{job.location}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">{job.salary}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => viewApplications(job.id)}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-light"
                      >
                        <Users className="w-4 h-4 mr-1" />
                        {job.applicationCount}
                      </button>
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
                          onClick={() => toggleDropdown(job.id)}
                          className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        </button>
                        
                        {activeDropdown === job.id && (
                          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-100 z-20 min-w-[180px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="py-2">
                              <button
                                onClick={() => handleViewJob(job)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mr-3 group-hover:bg-blue-200 transition-colors">
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">View Details</div>
                                  <div className="text-xs text-gray-500 font-light">See full job posting</div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => viewApplications(job.id)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 mr-3 group-hover:bg-green-200 transition-colors">
                                  <User className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">View Applications</div>
                                  <div className="text-xs text-gray-500 font-light">{job.applicationCount} candidates</div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => handleEditJob(job)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 mr-3 group-hover:bg-emerald-200 transition-colors">
                                  <Edit className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">Edit Job</div>
                                  <div className="text-xs text-gray-500 font-light">Modify details</div>
                                </div>
                              </button>
                              
                              <div className="my-1 border-t border-gray-100"></div>
                              
                              <button
                                onClick={() => handleDeleteJob(job.id)}
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
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 font-light text-base mb-2">No jobs found</p>
              <p className="text-xs text-gray-400 font-light">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filter criteria" 
                  : "No jobs have been posted yet"
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-base font-light text-gray-900">
                Job Details
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
                {/* Job Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Job Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Job Title</p>
                        <p className="text-sm font-light">{selectedJob.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Building className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Department</p>
                        <p className="text-sm font-light">{selectedJob.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Location</p>
                        <p className="text-sm font-light">{selectedJob.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Salary Range</p>
                        <p className="text-sm font-light">{selectedJob.salary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Job Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Posted Date</p>
                        <p className="text-sm font-light">
                          {new Date(selectedJob.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Closing Date</p>
                        <p className="text-sm font-light">
                          {new Date(selectedJob.closingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Applications Received</p>
                        <p className="text-sm font-light">{selectedJob.applicationCount} candidates</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2 font-light">Job Type & Status</p>
                      <div className="flex items-center space-x-2">
                        {(() => {
                          const typeConfig = getTypeConfig(selectedJob.type);
                          return (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                              {typeConfig.label}
                            </span>
                          );
                        })()}
                        {(() => {
                          const statusConfig = getStatusConfig(selectedJob.status);
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

              {/* Job Description */}
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-light text-gray-900">Job Description</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 font-light leading-relaxed">{selectedJob.description}</p>
                </div>
              </div>

              {/* Requirements and Benefits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Requirements */}
                <div className="space-y-3">
                  <h3 className="text-sm font-light text-gray-900">Requirements</h3>
                  <div className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 font-light">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h3 className="text-sm font-light text-gray-900">Benefits</h3>
                  <div className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 font-light">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => viewApplications(selectedJob.id)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-light"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Applications ({selectedJob.applicationCount})
                </button>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditJob(selectedJob)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-light"
                >
                  Edit Job
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-base font-light text-gray-900">
                Post New Job
              </h2>
              <button
                onClick={closeCreateModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Basic Information</h3>
                  
                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={newJob.title}
                      onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Community Health Worker"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Department *</label>
                    <input
                      type="text"
                      value={newJob.department}
                      onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Health Services"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Abuja, FCT"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Job Type *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value as Job['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Additional Details</h3>

                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Salary Range *</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., ₦150,000 - ₦200,000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Application Closing Date *</label>
                    <input
                      type="date"
                      value={newJob.closingDate}
                      onChange={(e) => setNewJob(prev => ({ ...prev, closingDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-light text-gray-700 mb-2">Job Description *</label>
                    <textarea
                      value={newJob.description}
                      onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                    />
                  </div>
                </div>
              </div>

              {/* Requirements Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-light text-gray-900">Requirements</h3>
                  <button
                    onClick={addRequirement}
                    className="inline-flex items-center px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-light"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Requirement
                  </button>
                </div>
                <div className="space-y-2">
                  {newJob.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter a requirement..."
                      />
                      {newJob.requirements.length > 1 && (
                        <button
                          onClick={() => removeRequirement(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-light text-gray-900">Benefits</h3>
                  <button
                    onClick={addBenefit}
                    className="inline-flex items-center px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-light"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Benefit
                  </button>
                </div>
                <div className="space-y-2">
                  {newJob.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter a benefit..."
                      />
                      {newJob.benefits.length > 1 && (
                        <button
                          onClick={() => removeBenefit(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={closeCreateModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-light"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateJob}
                  disabled={!newJob.title || !newJob.department || !newJob.location || !newJob.salary || !newJob.closingDate || !newJob.description}
                  className={`px-4 py-2 rounded-lg transition-colors font-light ${
                    !newJob.title || !newJob.department || !newJob.location || !newJob.salary || !newJob.closingDate || !newJob.description
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}