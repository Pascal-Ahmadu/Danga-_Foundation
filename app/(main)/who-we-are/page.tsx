"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Heart, Users, Award } from "lucide-react";
import { useState, useEffect } from "react";
import trustees from "@/data/trustees.json";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";

const values = [
  {
    icon: Target,
    title: "Integrity",
    description:
      "We maintain the highest standards of honesty and transparency in all our operations.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We approach every community and individual with empathy and understanding.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "We believe in equal opportunities for all, regardless of background or circumstances.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for the highest quality in all our programs and services.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Foundation Established",
    description:
      "Danga Memorial Foundation was officially registered as a non-profit organization.",
  },
  {
    year: "2025",
    title: "First Scholarship Program",
    description:
      "Launched our first scholarship program to support students in their educational journey.",
  },
];

// Animation hook for scroll-triggered animations
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all animated elements
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

// Organization data and breadcrumb items remain the same
const organizationData = {
  name: "Danga Memorial Foundation",
  alternateName: "Danga NGO",
  url: "https://www.danga.org",
  logo: "https://www.danga.org/logo.png",
  description:
    "The Danga Memorial Foundation works across Nigeria to help communities affected by poverty and lack of opportunities to survive, recover, and rebuild their lives through education, health, and sustainable development programs.",
  address: {
    streetAddress: "123 Community Drive",
    addressLocality: "Lagos",
    addressRegion: "Lagos State",
    postalCode: "100001",
    addressCountry: "Nigeria",
  },
  contactPoint: {
    telephone: "+234-XXX-XXX-XXXX",
    email: "info@danga.org",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.facebook.com/dangamemorialfoundation",
    "https://www.twitter.com/dangamemorial",
    "https://www.linkedin.com/company/danga-memorial-foundation",
    "https://www.instagram.com/dangamemorial",
  ],
  foundingDate: "2024",
  nonprofitStatus: "Nonprofit501c3",
};

const breadcrumbItems = [
  { name: "Home", url: "https://www.danga.org" },
  { name: "Who We Are", url: "https://www.danga.org/who-we-are" },
];

export default function WhoWeAre() {
  const visibleElements = useScrollAnimation();

  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema data={organizationData} />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-white overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <div className="mb-4 transform transition-all duration-1000 ease-out opacity-0 translate-y-8 animate-[slideInUp_0.8s_ease-out_0.2s_forwards]">
              <p className="text-gray-600 text-sm tracking-wide uppercase font-light">
                Danga Memorial Foundation
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 transform transition-all duration-1000 ease-out opacity-0 translate-y-12 animate-[slideInUp_0.8s_ease-out_0.4s_forwards]">
              Who we are
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl text-gray-700 leading-relaxed font-light transform transition-all duration-1000 ease-out opacity-0 translate-y-16 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
              The Danga Memorial Foundation works across Nigeria to help
              communities affected by poverty and lack of opportunities to
              survive, recover, and rebuild their lives through education,
              health, and sustainable development programs.
            </p>
          </div>
        </section>

        {/* Leadership - Updated with bigger spacing + image */}
        <section className="section-padding bg-gray-50">
          <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className="relative flex flex-col items-center mt-20"
              id="leadership-image"
              data-animate="true"
            >
              <div
                className={`relative w-80 h-80 mb-6 transform transition-all duration-1000 ease-out ${
                  visibleElements.has("leadership-image")
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-75 rotate-12"
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-1 animate-pulse">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                   <Image
  src="/chairman2.jpg"
  alt="Joshua Emmanuel - Trustee Chairman"
  fill
  className="object-cover object-top rounded-full hover:scale-105 transition-transform duration-500"
/>

                  </div>
                </div>
              </div>

              <div
                className={`text-center transform transition-all duration-800 ease-out ${
                  visibleElements.has("leadership-image")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <h3 className="text-2xl font-light text-gray-900 mb-2">
                  Joshua Emmanuel
                </h3>
                <p className="text-gray-600 font-light">Trustee Chairman</p>
              </div>
            </div>
            <div
              className="space-y-8"
              id="leadership-content"
              data-animate="true"
            >
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 transform transition-all duration-800 ease-out ${
                  visibleElements.has("leadership-content")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
              >
                Our{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  leadership
                </span>
              </h2>
              <p
                className={`text-lg text-gray-700 leading-relaxed font-light transform transition-all duration-800 ease-out ${
                  visibleElements.has("leadership-content")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Our Chairman leads the Foundation with a Board of Directors and
                trustees who bring a wealth of experience and expertise to our
                mission.
              </p>
              <Link
                href="/leadership"
                className={`group inline-flex items-center space-x-3 text-brand hover:text-brand-dark transition-all duration-300 transform ${
                  visibleElements.has("leadership-content")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <span className="text-lg font-light uppercase">
                  MEET OUR LEADERSHIP
                </span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(2rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
