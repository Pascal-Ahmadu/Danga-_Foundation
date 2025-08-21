'use client';

import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const ScholarshipApplicationClient = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    currentInstitution: '',
    studyLevel: '',
    fieldOfStudy: '',
    gpa: '',
    expectedGraduation: '',
    scholarshipAmount: '',
    personalStatement: '',
    careerGoals: '',
    transcript: null as File | null,
    recommendationLetter: null as File | null,
    idDocument: null as File | null,
    passport: null as File | null,
    truthDeclaration: false,
    termsAgreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20">
        <section className="section-padding bg-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Application Submitted!</h2>
              <p className="text-lg text-gray-600 font-light mb-4">
                Thank you for your scholarship application. We'll review your submission and contact you within 2-3 weeks.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8">
              Scholarship Application
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                Empowering the next generation through education. Apply for our scholarship program 
                and take the next step toward your academic goals.
              </p>
              
              <p className="text-gray-700 font-light mb-4">
                <strong>Eligibility Requirements:</strong><br />
                • Nigerian citizens and residents<br />
                • Minimum 3.0 GPA required<br />
                • Currently enrolled in an accredited institution<br />
                • Demonstrate financial need
              </p>

              <p className="text-gray-700 font-light mb-4">
                <strong>Required Documents:</strong><br />
                • Official transcripts<br />
                • Letter of recommendation<br />
                • Valid ID document<br />
                • Passport photograph
              </p>

              <p className="text-gray-700 font-light mb-4">
                <strong>Application Deadline:</strong> March 31st, 2025
              </p>

              <p className="text-gray-700 font-light mb-4">
                For questions about the scholarship program, please email us at{' '}
                <a href="mailto:scholarships@dangamemorialfoundation.org" className="text-blue-600 underline">scholarships@dangamemorialfoundation.org</a> or call{' '}
                <a href="tel:+2347063074132" className="text-blue-600 underline">+234 706 307 4132</a>.
              </p>

              <p className="text-gray-700 font-light mb-8">
                Please fill out all sections of the application form completely and accurately. 
                Incomplete applications will not be considered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">

              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-light text-gray-900 mb-6">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Nationality *</label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Full Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light resize-vertical"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-light text-gray-900 mb-6">Academic Information</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Current Institution *</label>
                  <input
                    type="text"
                    value={formData.currentInstitution}
                    onChange={(e) => handleInputChange('currentInstitution', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Level of Study *</label>
                    <select
                      value={formData.studyLevel}
                      onChange={(e) => handleInputChange('studyLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    >
                      <option value="">Please choose</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Postgraduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Field of Study *</label>
                    <input
                      type="text"
                      value={formData.fieldOfStudy}
                      onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Current GPA *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Expected Graduation *</label>
                    <input
                      type="date"
                      value={formData.expectedGraduation}
                      onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Scholarship Amount Requested (NGN) *</label>
                  <input
                    type="number"
                    value={formData.scholarshipAmount}
                    onChange={(e) => handleInputChange('scholarshipAmount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                    placeholder="e.g. 500000"
                  />
                </div>
              </div>

              {/* Essays */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-light text-gray-900 mb-6">Essays</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Personal Statement (500 words maximum) *</label>
                  <textarea
                    value={formData.personalStatement}
                    onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light resize-vertical"
                    placeholder="Tell us about yourself, your goals, and why you deserve this scholarship..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Career Goals (300 words maximum) *</label>
                  <textarea
                    value={formData.careerGoals}
                    onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light resize-vertical"
                    placeholder="Describe your career aspirations and how this scholarship will help you achieve them..."
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-light text-gray-900 mb-6">Required Documents</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Official Transcript *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange('transcript', e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="transcript"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-colors bg-gray-50 hover:bg-gray-100 text-center">
                        <div className="text-gray-600 font-light">
                          {formData.transcript?.name || 'Click to upload or drag and drop'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 10MB)</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Letter of Recommendation *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange('recommendationLetter', e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="recommendationLetter"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-colors bg-gray-50 hover:bg-gray-100 text-center">
                        <div className="text-gray-600 font-light">
                          {formData.recommendationLetter?.name || 'Click to upload or drag and drop'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 10MB)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Valid ID Document *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="idDocument"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-colors bg-gray-50 hover:bg-gray-100 text-center">
                        <div className="text-gray-600 font-light">
                          {formData.idDocument?.name || 'Click to upload or drag and drop'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Passport Photograph *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('passport', e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="passport"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-colors bg-gray-50 hover:bg-gray-100 text-center">
                        <div className="text-gray-600 font-light">
                          {formData.passport?.name || 'Click to upload or drag and drop'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">JPG, PNG (Max 2MB)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Declaration */}
              <div className="pb-6">
                <h3 className="text-xl font-light text-gray-900 mb-6">Declaration</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="truthDeclaration"
                      checked={formData.truthDeclaration}
                      onChange={(e) => handleInputChange('truthDeclaration', e.target.checked)}
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="truthDeclaration" className="text-sm text-gray-700 font-light">
                      I hereby declare that all information provided in this application is true and accurate to the best of my knowledge. *
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="termsAgreement"
                      checked={formData.termsAgreement}
                      onChange={(e) => handleInputChange('termsAgreement', e.target.checked)}
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="termsAgreement" className="text-sm text-gray-700 font-light">
                      I agree to the terms and conditions of the Danga Memorial Foundation scholarship program. *
                    </label>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition-colors font-medium flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application →
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipApplicationClient;