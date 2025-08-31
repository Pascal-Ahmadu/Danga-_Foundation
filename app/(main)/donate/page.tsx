'use client';

import React from 'react';
import { Heart, CreditCard, Copy, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

const DonationFormComponent = () => {
  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8">
              Make a{' '}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">donation</span>
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
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
                  <div className="p-8">
                    <h2 className="text-3xl font-light text-gray-900 mb-6">
                      Transform lives with your{' '}
                      <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">generosity</span>
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
                        <strong className="font-medium">Our teams are ready to make a difference</strong> 
                        in communities nationwide, working alongside local leaders to build 
                        stronger, more resilient futures for all Nigerians.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Bank Transfer Details */}
              <div className="bg-white shadow-lg">
                <div className="p-8">
                  
                  {/* Bank Transfer Details */}
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <CreditCard className="h-6 w-6 text-brand mr-3" />
                      <h3 className="text-2xl font-light text-gray-900">Bank Transfer Details</h3>
                    </div>
                    
                    <div className="bg-brand/5 border border-brand/20 p-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 font-light">Account Name</p>
                            <p className="font-medium text-gray-900">Danga Memorial Foundation</p>
                          </div>
                          <button
                            onClick={() => handleCopyAccount('Danga Memorial Foundation')}
                            className="p-2 text-brand hover:bg-brand/10 transition-colors"
                            title="Copy account name"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 font-light">Bank</p>
                            <p className="font-medium text-gray-900">First Bank of Nigeria</p>
                          </div>
                          <button
                            onClick={() => handleCopyAccount('First Bank of Nigeria')}
                            className="p-2 text-brand hover:bg-brand/10 transition-colors"
                            title="Copy bank name"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 font-light">Account Number</p>
                            <p className="font-medium text-gray-900 text-lg">••••••7890</p>
                          </div>
                          <button
                            onClick={() => handleCopyAccount('••••••7890')}
                            className="p-2 text-brand hover:bg-brand/10 transition-colors"
                            title="Copy account number"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 font-light">Sort Code</p>
                            <p className="font-medium text-gray-900">011151003</p>
                          </div>
                          <button
                            onClick={() => handleCopyAccount('011151003')}
                            className="p-2 text-brand hover:bg-brand/10 transition-colors"
                            title="Copy sort code"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 mb-6">
                      <h4 className="font-medium text-blue-800 mb-2">After Your Transfer</h4>
                      <p className="text-sm text-blue-700 font-light">
                        Please send proof of payment to <a href="mailto:donations@dangamemorial.org" className="underline">donations@dangamemorial.org</a> 
                        {' '}with your full name and email address to receive your donation receipt.
                      </p>
                    </div>

                  </div>

                  {/* Contact Information */}
                  <div className="border-t border-gray-200 pt-8">
                    <h4 className="font-medium text-gray-900 mb-4">Need Help?</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-brand" />
                        <a href="tel:+2349111226666" className="text-brand hover:underline font-light">+234 911 122 6666</a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-brand" />
                        <a href="mailto:donations@dangamemorial.org" className="text-brand hover:underline font-light">donations@dangamemorial.org</a>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-brand mt-1" />
                        <div className="font-light text-gray-700">
                          4B King AJ Turner Crescent<br />
                          Wuye, Abuja, Nigeria
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 text-brand" />
                      <span className="text-sm font-medium text-gray-900">100% of your donation goes to our programs</span>
                    </div>
                    <p className="text-xs text-gray-600 font-light">
                      We're committed to transparency. Administrative costs are covered by separate funding.
                    </p>
                  </div>
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