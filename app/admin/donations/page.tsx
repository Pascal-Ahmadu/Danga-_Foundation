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
  DollarSign,
  MapPin,
  ChevronDown,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Building2
} from "lucide-react";

interface Donation {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  location: string;
  status: "pending" | "verified" | "confirmed" | "failed";
  dateSubmitted: string;
  transferReference: string;
  bankName: string;
  donorType: "individual" | "organization";
}

const mockDonations: Donation[] = [
  {
    id: "1",
    donorName: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 801 234 5678",
    amount: 50000,
    currency: "NGN",
    location: "Abuja, FCT",
    status: "pending",
    dateSubmitted: "2025-08-20",
    transferReference: "TXN001234567890",
    bankName: "First Bank",
    donorType: "individual"
  },
  {
    id: "2",
    donorName: "Green Tech Solutions Ltd",
    email: "donations@greentech.com",
    phone: "+234 802 345 6789",
    amount: 200000,
    currency: "NGN",
    location: "Lagos, NG",
    status: "verified",
    dateSubmitted: "2025-08-18",
    transferReference: "TXN001234567891",
    bankName: "GTBank",
    donorType: "organization"
  },
  {
    id: "3",
    donorName: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+234 803 456 7890",
    amount: 25000,
    currency: "NGN",
    location: "Kano, NG",
    status: "confirmed",
    dateSubmitted: "2025-08-15",
    transferReference: "TXN001234567892",
    bankName: "UBA",
    donorType: "individual"
  },
  {
    id: "4",
    donorName: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "+234 804 567 8901",
    amount: 75000,
    currency: "NGN",
    location: "Port Harcourt, NG",
    status: "failed",
    dateSubmitted: "2025-08-10",
    transferReference: "TXN001234567893",
    bankName: "Access Bank",
    donorType: "individual"
  },
  {
    id: "5",
    donorName: "Hope Foundation",
    email: "contact@hopefoundation.org",
    phone: "+234 805 678 9012",
    amount: 500000,
    currency: "NGN",
    location: "Abuja, FCT",
    status: "confirmed",
    dateSubmitted: "2025-08-12",
    transferReference: "TXN001234567894",
    bankName: "Zenith Bank",
    donorType: "organization"
  }
];

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [donorTypeFilter, setDonorTypeFilter] = useState<string>("all");
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

  // Update modal status when selected donation changes
  useEffect(() => {
    if (selectedDonation) {
      setModalStatus(selectedDonation.status);
    }
  }, [selectedDonation]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Clock,
          label: "Pending Verification"
        };
      case "verified":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: CheckCircle,
          label: "Verified"
        };
      case "confirmed":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: CheckCircle,
          label: "Confirmed"
        };
      case "failed":
        return {
          color: "bg-rose-100 text-rose-800 border-rose-200",
          icon: AlertCircle,
          label: "Failed"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: "Unknown"
        };
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.transferReference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    const matchesDonorType = donorTypeFilter === "all" || donation.donorType === donorTypeFilter;
    
    return matchesSearch && matchesStatus && matchesDonorType;
  });

  const getTotalDonations = () => {
    return filteredDonations
      .filter(d => d.status === 'confirmed')
      .reduce((total, donation) => total + donation.amount, 0);
  };

  const handleViewDonation = (donation: Donation) => {
    setSelectedDonation(donation);
    setModalStatus(donation.status);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
    setModalStatus("");
    setIsStatusDropdownOpen(false);
  };

  const handleStatusChange = (donationId: string, newStatus: string) => {
    setDonations(donations => 
      donations.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: newStatus as Donation['status'] }
          : donation
      )
    );
    
    // Update selected donation if it's the one being changed
    if (selectedDonation && selectedDonation.id === donationId) {
      setSelectedDonation(prev => prev ? { ...prev, status: newStatus as Donation['status'] } : null);
    }
    
    setActiveDropdown(null);
  };

  const handleDeleteDonation = (donationId: string) => {
    const donation = donations.find(d => d.id === donationId);
    if (window.confirm(`Are you sure you want to delete ${donation?.donorName}'s donation record?`)) {
      setDonations(donations => donations.filter(d => d.id !== donationId));
      
      // Close modal if the deleted donation was selected
      if (selectedDonation?.id === donationId) {
        closeModal();
      }
    }
    setActiveDropdown(null);
  };

  const handleEditDonation = (donation: Donation) => {
    // For now, just show an alert. You can implement actual edit functionality
    alert(`Edit functionality for ${donation.donorName}'s donation would be implemented here.`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (donationId: string) => {
    setActiveDropdown(activeDropdown === donationId ? null : donationId);
  };

  const saveStatusChange = () => {
    if (selectedDonation && modalStatus !== selectedDonation.status) {
      handleStatusChange(selectedDonation.id, modalStatus);
      alert(`Status updated to ${modalStatus} successfully!`);
    }
    closeModal();
  };

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-light text-gray-900 mb-1">Donation Submissions</h1>
          <p className="text-gray-500 text-sm font-light">
            Review and manage donations received through bank transfers
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 font-light">
            {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''} found
          </div>
          <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 font-light">
            Total Confirmed: {formatAmount(getTotalDonations(), 'NGN')}
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-light text-gray-700 mb-2">
              Search Donations
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or reference..."
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
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="confirmed">Confirmed</option>
                <option value="failed">Failed</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Donor Type Filter */}
          <div>
            <label className="block text-xs font-light text-gray-700 mb-2">
              Donor Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={donorTypeFilter}
                onChange={(e) => setDonorTypeFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="organization">Organization</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider w-16">
                  #
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Donor
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Transfer Reference
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Bank
                </th>
                <th className="text-left py-4 px-6 font-light text-gray-700 text-xs uppercase tracking-wider">
                  Date Submitted
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
              {filteredDonations.map((donation, index) => {
                const statusConfig = getStatusConfig(donation.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-light text-gray-900">{donation.donorName}</div>
                          {donation.donorType === 'organization' && (
                            <Building2 className="w-3 h-3 text-blue-500 ml-2" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 font-light">{donation.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {formatAmount(donation.amount, donation.currency)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-mono font-light">
                      {donation.transferReference}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">{donation.bankName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-light">
                      {new Date(donation.dateSubmitted).toLocaleDateString()}
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
                          onClick={() => toggleDropdown(donation.id)}
                          className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        </button>
                        
                        {activeDropdown === donation.id && (
                          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-100 z-20 min-w-[180px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="py-2">
                              <button
                                onClick={() => handleViewDonation(donation)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mr-3 group-hover:bg-blue-200 transition-colors">
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">View Details</div>
                                  <div className="text-xs text-gray-500 font-light">See full donation</div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => handleEditDonation(donation)}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 mr-3 group-hover:bg-emerald-200 transition-colors">
                                  <Edit className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-light">Edit Donation</div>
                                  <div className="text-xs text-gray-500 font-light">Modify details</div>
                                </div>
                              </button>
                              
                              <div className="my-1 border-t border-gray-100"></div>
                              
                              <button
                                onClick={() => handleDeleteDonation(donation.id)}
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
          
          {filteredDonations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <DollarSign className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 font-light text-base mb-2">No donations found</p>
              <p className="text-xs text-gray-400 font-light">
                {searchQuery || statusFilter !== "all" || donorTypeFilter !== "all"
                  ? "Try adjusting your search or filter criteria" 
                  : "No donations have been submitted yet"
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Donation Details Modal */}
      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-base font-light text-gray-900">
                Donation Details
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
                {/* Donor Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Donor Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
                        {selectedDonation.donorType === 'organization' ? (
                          <Building2 className="w-5 h-5 text-blue-600" />
                        ) : (
                          <User className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-light">
                          {selectedDonation.donorType === 'organization' ? 'Organization' : 'Individual'}
                        </p>
                        <p className="text-sm font-light">{selectedDonation.donorName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Email</p>
                        <p className="text-sm font-light">{selectedDonation.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Phone</p>
                        <p className="text-sm font-light">{selectedDonation.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Location</p>
                        <p className="text-sm font-light">{selectedDonation.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donation Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-900">Donation Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <DollarSign className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-emerald-700 font-light">Donation Amount</p>
                        <p className="text-lg font-medium text-emerald-800">
                          {formatAmount(selectedDonation.amount, selectedDonation.currency)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CreditCard className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Transfer Reference</p>
                        <p className="text-sm font-mono font-light">{selectedDonation.transferReference}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Bank</p>
                        <p className="text-sm font-light">{selectedDonation.bankName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-light">Date Submitted</p>
                        <p className="text-sm font-light">
                          {new Date(selectedDonation.dateSubmitted).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-3 font-light">Donation Status</p>
                      
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
                                { value: 'pending', label: 'Pending Verification', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
                                { value: 'verified', label: 'Verified', icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50' },
                                { value: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                                { value: 'failed', label: 'Failed', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
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
                {modalStatus !== selectedDonation.status && (
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
                    modalStatus !== selectedDonation.status
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={modalStatus === selectedDonation.status}
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