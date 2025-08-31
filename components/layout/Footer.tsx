"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { name: "Who We Are", href: "/who-we-are" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Scholarship", href: "/scholarship" },
    { name: "Gallery", href: "/gallery" },
  ],
  Programs: [
    { name: "Youth Empowerment", href: "/what-we-do/youth-empowerment" },
    { name: "Education", href: "/what-we-do/education" },
    { name: "Health & Wellness", href: "/what-we-do/health-and-wellness" },
    { name: "Environment", href: "/what-we-do/environment-sustainability" },
  ],
  Support: [
    { name: "Donate", href: "/donate" },
    { name: "Contact Us", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission if used in a form
    }

    console.log("Subscribe button clicked!"); // Debug log

    // Validate email
    if (!email) {
      setStatus("❌ Please enter your email");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("❌ Please enter a valid email address");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setIsLoading(true);
    setStatus("Subscribing...");

    try {
      console.log("Sending request to /api/newsletter with email:", email);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setStatus("✅ Successfully subscribed to our newsletter!");
        setEmail(""); // Clear the email field
      } else {
        // Handle different error cases
        if (response.status === 400 && data.error?.includes("already a list member")) {
          setStatus("ℹ️ You're already subscribed to our newsletter!");
        } else {
          setStatus(`❌ ${data.error || "Subscription failed. Please try again."}`);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("❌ Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
      // Auto clear status after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      subscribe();
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Foundation Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/Logo.png"
                  alt="Danga Memorial Foundation Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-medium text-gray-900">
                Danga Memorial Foundation
              </span>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              Empowering communities through education, health, and sustainable
              development programs. Together, we build a brighter future for
              all.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand flex-shrink-0" />
                <a
                  href="mailto:info@dangafoundation.org"
                  className="text-gray-600 break-all hover:text-brand transition-colors duration-200 hover:underline"
                  aria-label="Send email to Danga Memorial Foundation"
                >
                  info@dangafoundation.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand flex-shrink-0" />
                <a
                  href="tel:+2349111226666"
                  className="text-gray-600 hover:text-brand transition-colors duration-200 hover:underline"
                  aria-label="Call Danga Memorial Foundation"
                >
                  +234 911 122 6666
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-brand flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=4B+King+AJ+Turner+Crescent,+Wuye,+Abuja,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand transition-colors duration-200 hover:underline"
                  aria-label="View Danga Memorial Foundation location on Google Maps"
                >
                  4B King AJ Turner Crescent, Wuye, Abuja, Nigeria
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-6 text-gray-900 uppercase tracking-wide">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-brand transition-colors duration-200 font-light hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-medium mb-4 text-gray-900 uppercase tracking-wide">
                Stay Connected
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Subscribe to our newsletter for the latest updates on our
                programs, success stories, and impact in the community.
              </p>
            </div>
            
            <div className="w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 bg-white text-gray-900 placeholder-gray-400 font-light
                             border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand 
                             focus:border-transparent transition-all duration-200 disabled:opacity-50
                             disabled:cursor-not-allowed"
                  aria-label="Email address for newsletter subscription"
                />
                <button
                  type="button"
                  onClick={subscribe}
                  disabled={isLoading || !email.trim()}
                  className="bg-brand text-white px-8 py-4 font-bold uppercase tracking-wide
                             hover:bg-blue-700 transition-all duration-200 whitespace-nowrap 
                             transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                             disabled:transform-none focus:outline-none focus:ring-2 focus:ring-brand
                             focus:ring-offset-2"
                  aria-label="Subscribe to newsletter"
                >
                  {isLoading ? "Subscribing..." : "Sign Up →"}
                </button>
              </div>
              
              {/* Status Message */}
              {status && (
                <div className="mt-4">
                  <p
                    className={`text-sm font-medium ${
                      status.startsWith("✅") || status.startsWith("ℹ️")
                        ? "text-green-600"
                        : status.startsWith("❌")
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-gray-600 text-sm font-light">
              © {new Date().getFullYear()} Danga Memorial Foundation. All rights
              reserved.
            </p>
            <span className="text-gray-400 hidden md:inline">|</span>
            <p className="text-gray-600 text-sm font-light">
              Managed and maintained by{" "}
              <span className="text-brand font-medium">Cyberdata Automations</span>
            </p>
            <span className="text-gray-400 hidden md:inline">|</span>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-brand transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Tax ID # 91-1148123</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded
                             hover:bg-brand hover:text-white transition-all duration-200 
                             transform hover:scale-105 focus:outline-none focus:ring-2 
                             focus:ring-brand focus:ring-offset-2"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}