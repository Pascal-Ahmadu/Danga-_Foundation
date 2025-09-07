"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const ContactFormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20">
        <section className="section-padding bg-white">
          <div className="container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                <Send className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Message Sent!
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Thank you for reaching out. We'll get back to you within 24
                hours.
              </p>
            </motion.div>
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
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8">
              We're here to help.
            </h1>
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                For inquiries, questions, or to get involved, please call us at{" "}
                <a
                  href="tel:+2349111226666"
                  className="text-blue-600 underline"
                >
                  +234 911 122 6666
                </a>
                , Mon-Fri, 9:00am-5pm WAT.
              </p>

              <p className="text-gray-700 font-light mb-4">
                <strong>To visit our office:</strong>
                <br />
                Danga Memorial Foundation
                <br />
                4B King AJ Turner Crescent
                <br />
                Wuye, Abuja
                <br />
                Nigeria
              </p>

              <p className="text-gray-700 font-light mb-4">
                To inquire about volunteer opportunities or partnership
                possibilities, please email us at{" "}
                <a
                  href="mailto:info@dangafoundation.org"
                  className="text-blue-600 underline"
                >
                  info@dangafoundation.org
                </a>{" "}
                or call our office team at{" "}
                <a
                  href="tel:+2349111226666"
                  className="text-blue-600 underline"
                >
                  +234 911 122 6666
                </a>
                .
              </p>

              <p className="text-gray-700 font-light mb-4">
                Questions about our programs, scholarships, or community
                initiatives?{" "}
                <a href="#" className="text-blue-600 underline">
                  Click here
                </a>
                .
              </p>

              <p className="text-gray-700 font-light mb-4">
                For press inquiries, please reach out to our{" "}
                <a
                  href="mailto:info@dangamemorialfoundation.org"
                  className="text-blue-600 underline"
                >
                  media team
                </a>
                .
              </p>

              <p className="text-gray-700 font-light mb-4">
                To see our current projects and impact stories, please visit{" "}
                <a href="#" className="text-blue-600 underline">
                  this page
                </a>
                .
              </p>

              <p className="text-gray-700 font-light mb-8">
                For other inquiries, please submit the form below and we'll be
                in touch shortly:
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactFormComponent;
