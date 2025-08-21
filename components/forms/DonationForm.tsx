'use client';

import React, { useState } from 'react';
import { Heart, Shield, Users, CreditCard, DollarSign, Lock, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

const DonationFormComponent = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nigeria',
    phone: '',
    comments: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

  const predefinedAmounts = ['5000', '10000', '25000', '50000', '100000'];

  const handleAmountChange = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
    'Taraba', 'Yobe', 'Zamfara'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <p className="text-gray-600 text-sm font-medium tracking-wide uppercase">
                Danga Memorial Foundation
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
              Make a{' '}
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">donation</span>
            </h1>
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                Your generous contribution helps us empower communities across Nigeria 
                through education, healthcare, and sustainable development programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left Column - Impact Story */}
              <div className="space-y-8">
                <div className="bg-white shadow-lg overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/community-impact.jpg"
                      alt="Community Impact - Danga Memorial Foundation"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-sm font-light">
                        Students receiving educational support in Lagos State through our scholarship program
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h2 className="text-3xl font-light text-gray-900 mb-6">
                      Transform lives with your{' '}
                      <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">generosity</span>
                    </h2>
                    <div className="space-y-6 text-gray-700 font-light leading-relaxed">
                      <p>
                        Across Nigeria, millions of young people face barriers to education, healthcare, 
                        and economic opportunities. Your donation directly supports our mission to break 
                        these cycles of poverty and create lasting change.
                      </p>
                      <p>
                        <strong className="font-medium">Your gift today will go where it is needed most,</strong> 
                        helping us provide scholarships to brilliant students, deliver essential healthcare 
                        to underserved communities, and create sustainable livelihood programs that 
                        empower families across Nigeria.
                      </p>
                      <p>
                        <strong className="font-medium">Our teams are already making a difference</strong> 
                        in over 25 communities nationwide, working alongside local leaders to build 
                        stronger, more resilient futures for all Nigerians.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white shadow-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-light text-amber-700">89</span>
                      </div>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        89% of donations directly fund our programs and community services
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 font-light">
                        CAC Registered Non-Profit
                      </p>
                    </div>
                    <div className="text-center">
                      <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 font-light">
                        25+ Communities Served
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Donation Form */}
              <div className="bg-white shadow-lg">
                <div className="p-8">
                  
                  {/* Step 1: Donation Amount */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-light text-gray-900 mb-2">1. Your donation</h3>
                    <p className="text-gray-600 mb-8 font-light">Consider making a monthly contribution to maximize your impact.</p>
                    
                    {/* Donation Type */}
                    <div className="flex space-x-8 mb-8">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="donationType"
                          value="one-time"
                          checked={donationType === 'one-time'}
                          onChange={(e) => setDonationType(e.target.value)}
                          className="mr-3 w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                        />
                        <span className="font-light">One-time gift</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="donationType"
                          value="monthly"
                          checked={donationType === 'monthly'}
                          onChange={(e) => setDonationType(e.target.value)}
                          className="mr-3 w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                        />
                        <span className="font-light">Monthly donation</span>
                      </label>
                    </div>

                    {/* Amount Selection */}
                    <p className="text-gray-700 mb-4 font-light">Choose your amount:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountChange(amount)}
                          className={`p-4 border text-center transition-all duration-200 font-light ${
                            selectedAmount === amount
                              ? 'border-amber-600 bg-amber-50 text-amber-800'
                              : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                          }`}
                        >
                          ₦{parseInt(amount).toLocaleString()}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-8">
                      <label className="block text-gray-700 mb-3 font-light">Other amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-light">₦</span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4 text-sm mb-8">
                      <label className="flex items-start cursor-pointer">
                        <input type="checkbox" className="mr-3 mt-1 text-amber-600 border-gray-300 focus:ring-amber-500" />
                        <span className="font-light">Cover transaction costs to maximize impact (₦0.00)</span>
                      </label>
                      <label className="flex items-start cursor-pointer">
                        <input type="checkbox" className="mr-3 mt-1 text-amber-600 border-gray-300 focus:ring-amber-500" />
                        <span className="font-light">This gift is in honor or memory of someone special</span>
                      </label>
                    </div>
                  </div>

                  {/* Step 2: Your Information */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-light text-gray-900 mb-8">2. Your information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-light">Address *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">City *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">State *</label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 font-light"
                        >
                          <option value="">Select State</option>
                          {nigerianStates.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">Postal Code</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => handleInputChange('zip', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                          placeholder="+234 xxx xxx xxxx"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-light">Country</label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 font-light"
                        >
                          <option value="Nigeria">Nigeria</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Kenya">Kenya</option>
                          <option value="South Africa">South Africa</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 font-light">Message (Optional)</label>
                      <textarea
                        value={formData.comments}
                        onChange={(e) => handleInputChange('comments', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                        placeholder="Share what inspired you to donate or leave a message for our team..."
                      />
                    </div>
                  </div>

                  {/* Step 3: Payment Information */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-light text-gray-900 mb-8">3. Payment method</h3>
                    
                    <div className="space-y-4 mb-8">
                      <label className="flex items-center cursor-pointer p-4 border transition-colors duration-200 hover:bg-amber-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={paymentMethod === 'bank-transfer'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                        />
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                          <span className="font-light">Bank Transfer (Recommended)</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center cursor-pointer p-4 border transition-colors duration-200 hover:bg-amber-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paystack"
                          checked={paymentMethod === 'paystack'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                        />
                        <div className="flex items-center space-x-3">
                          <Lock className="h-6 w-6 text-gray-600" />
                          <span className="font-light">Card Payment (Paystack)</span>
                        </div>
                      </label>
                    </div>

                    {paymentMethod === 'bank-transfer' && (
                      <div className="bg-amber-50 border border-amber-200 p-6 mb-8">
                        <h4 className="font-medium text-amber-800 mb-4">Bank Transfer Details</h4>
                        <div className="space-y-2 text-sm text-amber-700 font-light">
                          <p><strong>Account Name:</strong> Danga Memorial Foundation</p>
                          <p><strong>Bank:</strong> First Bank of Nigeria</p>
                          <p><strong>Account Number:</strong> 2034567890</p>
                          <p><strong>Sort Code:</strong> 011151003</p>
                          <p className="text-xs mt-4 text-amber-600">
                            Please use your email address as the transfer reference and send proof of payment to donations@dangamemorial.org
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 font-medium hover:from-amber-700 hover:to-amber-800 transition-all duration-200 tracking-wide uppercase">
                    {paymentMethod === 'bank-transfer' ? 'Get Payment Details' : 'Donate Now'} →
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4 font-light">
                    Your donation is secure and helps transform lives across Nigeria. 
                    You will receive a receipt via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationFormComponent;