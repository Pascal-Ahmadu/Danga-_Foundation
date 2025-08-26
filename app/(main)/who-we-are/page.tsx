import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Heart, Users, Award } from "lucide-react";
import trustees from "@/data/trustees.json";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Learn about the Danga Memorial Foundation, our mission, vision, values, and the dedicated trustees who guide our work.",
  openGraph: {
    title: "Who We Are - Danga Memorial Foundation",
    description: "Discover our mission, vision, values, and leadership dedicated to empowering communities through education, health, and sustainable development.",
    url: "https://www.danga.org/who-we-are",
  },
};

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

// ✅ Only keep until 2025
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

// Organization data specific to this page context
const organizationData = {
  name: 'Danga Memorial Foundation',
  alternateName: 'Danga NGO',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'The Danga Memorial Foundation works across Nigeria to help communities affected by poverty and lack of opportunities to survive, recover, and rebuild their lives through education, health, and sustainable development programs.',
  address: {
    streetAddress: '123 Community Drive',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    postalCode: '100001',
    addressCountry: 'Nigeria',
  },
  contactPoint: {
    telephone: '+234-XXX-XXX-XXXX',
    email: 'info@danga.org',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.facebook.com/dangamemorialfoundation',
    'https://www.twitter.com/dangamemorial',
    'https://www.linkedin.com/company/danga-memorial-foundation',
    'https://www.instagram.com/dangamemorial',
  ],
  foundingDate: '2024',
  nonprofitStatus: 'Nonprofit501c3',
};

// Breadcrumb items for this page
const breadcrumbItems = [
  { name: 'Home', url: 'https://www.danga.org' },
  { name: 'Who We Are', url: 'https://www.danga.org/who-we-are' },
];

export default function WhoWeAre() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema data={organizationData} />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="mb-4">
              <p className="text-gray-600 text-sm tracking-wide uppercase font-light">
                Danga Memorial Foundation
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
              Who we are
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              The Danga Memorial Foundation works across Nigeria to help
              communities affected by poverty and lack of opportunities to
              survive, recover, and rebuild their lives through education, health,
              and sustainable development programs.
            </p>
          </div>
        </section>

        {/* Mission, Vision & Values */}
        <section className="section-padding bg-white">
          <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed font-light">
                Our foundation is built on the belief that sustainable change
                begins with empowering communities through education, health
                initiatives, and meaningful opportunities that create lasting
                positive change and break cycles of poverty.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed font-light">
                A world where every individual has access to quality education,
                healthcare, and opportunities to thrive, regardless of their
                socioeconomic background or geographical location.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Our Values
              </h2>
              <div className="space-y-6">
                {values.map((value) => (
                  <div key={value.title}>
                    <h3 className="text-lg font-light text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-white">
          <div className="container text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Our foundation is built on the belief that sustainable change begins
              with empowering communities through education, health initiatives,
              and meaningful opportunities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-0.5 bg-brand/20"></div>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative flex items-center mb-12 last:mb-0"
              >
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-brand border-4 border-white z-10"></div>
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:pl-12 md:ml-auto"
                  }`}
                >
                  <div className="bg-white p-6 border-l-4 border-brand">
                    <div className="text-brand font-light text-xl mb-2">
                      {m.year}
                    </div>
                    <h3 className="text-xl font-light text-gray-900 mb-2">
                      {m.title}
                    </h3>
                    <p className="text-gray-600 font-light">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-gray-50">
          <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-brand/10 to-brand/5 overflow-hidden">
                <Image
                  src="/images/chairman.jpg"
                  alt="Chairman of Danga Memorial Foundation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
                Our{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  leadership
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Our Chairman leads the Foundation with a Board of Directors and
                trustees who bring a wealth of experience and expertise to our
                mission.
              </p>
              <Link
                href="/leadership"
                className="group inline-flex items-center space-x-3 text-brand hover:text-brand-dark transition"
              >
                <span className="text-lg font-light uppercase">
                  MEET OUR LEADERSHIP
                </span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200"
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

        {/* Careers */}
        <section className="section-padding bg-white">
          <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] bg-gradient-to-br from-brand/10 to-brand/5 overflow-hidden">
                <Image
                  src="/volunteers.jpg"
                  alt="Volunteers and team members"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
                Join our{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  mission
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                We believe that sustainable change happens when communities come
                together with passionate individuals committed to making a
                difference.
              </p>
              <Link
                href="/careers"
                className="group inline-flex items-center space-x-3 text-brand hover:text-brand-dark transition"
              >
                <span className="text-lg font-light uppercase">
                  EXPLORE CAREERS
                </span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200"
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
    </>
  );
}