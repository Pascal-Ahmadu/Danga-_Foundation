'use client';

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactFormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
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
                <Send className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Message Sent!</h2>
              <p className="text-lg text-gray-600 font-light">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
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
              We're here to help.
            </h1>
            <div className="max-w-2xl">
              <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                For inquiries, questions, or to get involved, please call us at{' '}
                <a href="tel:+2347063074132" className="text-blue-600 underline">+234 706 307 4132</a>,
                Mon-Fri, 9:00am-5pm WAT.
              </p>
              
              <p className="text-gray-700 font-light mb-4">
                <strong>To visit our office:</strong><br />
                Danga Memorial Foundation<br />
                Plot 1153 Mazarga Close<br />
                Mabushi, FCT<br />
                Abuja, Nigeria
              </p>

              <p className="text-gray-700 font-light mb-4">
                To inquire about volunteer opportunities or partnership possibilities, please 
                email us at <a href="mailto:info@dangamemorialfoundation.org" className="text-blue-600 underline">info@dangamemorialfoundation.org</a> or call our 
                office team at <a href="tel:+2347063074132" className="text-blue-600 underline">+234 706 307 4132</a>.
              </p>

              <p className="text-gray-700 font-light mb-4">
                Questions about our programs, scholarships, or community initiatives? <a href="#" className="text-blue-600 underline">Click here</a>.
              </p>

              <p className="text-gray-700 font-light mb-4">
                For press inquiries, please reach out to our <a href="mailto:media@dangamemorialfoundation.org" className="text-blue-600 underline">media team</a>.
              </p>

              <p className="text-gray-700 font-light mb-4">
                To see our current projects and impact stories, please visit <a href="#" className="text-blue-600 underline">this page</a>.
              </p>

              <p className="text-gray-700 font-light mb-4">
                For a list of our Nigeria office locations, <a href="#" className="text-blue-600 underline">click here</a>.
              </p>

              <p className="text-gray-700 font-light mb-8">
                For other inquiries, please submit the form below and we'll be in touch shortly:
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light"
                >
                  <option value="">Please choose</option>
                  <option value="general">General Information</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="donation">Donation Questions</option>
                  <option value="programs">Program Information</option>
                  <option value="scholarship">Scholarship Inquiry</option>
                  <option value="media">Media Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light resize-vertical"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition-colors font-medium flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message →
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

export default ContactFormComponent;