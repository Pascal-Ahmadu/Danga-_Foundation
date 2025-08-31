import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Users, Building2, Target, Award } from "lucide-react";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";

export const metadata: Metadata = {
  title: "Our Team Structure",
  description:
    "Discover the organizational structure of the Danga Memorial Foundation - our leadership hierarchy and department roles that drive our mission forward.",
  openGraph: {
    title: "Our Team Structure - Danga Memorial Foundation",
    description: "Explore our organizational structure and the key positions that guide our mission of community empowerment across Nigeria.",
    url: "https://www.danga.org/team",
  },
  keywords: [
    "Danga organizational structure",
    "NGO organization chart",
    "foundation hierarchy",
    "nonprofit structure",
    "team organization Nigeria"
  ],
};

// Organizational structure data
const organizationalStructure = {
  board: [
    { position: "Board Chairman", department: "Governance", level: "board" },
    { position: "Vice Chairman", department: "Governance", level: "board" },
    { position: "Secretary", department: "Governance", level: "board" },
    { position: "Treasurer", department: "Governance", level: "board" },
    { position: "Board Member", department: "Governance", level: "board" },
    { position: "Board Member", department: "Governance", level: "board" },
  ],
  executive: [
    { position: "Executive Director", department: "Leadership", level: "executive" },
    { position: "Deputy Director", department: "Leadership", level: "executive" },
  ],
  management: [
    { position: "Program Manager", department: "Programs", level: "management" },
    { position: "Finance Manager", department: "Finance", level: "management" },
    { position: "Operations Manager", department: "Operations", level: "management" },
    { position: "Communications Manager", department: "Communications", level: "management" },
  ],
  staff: [
    { position: "Education Coordinator", department: "Programs", level: "staff" },
    { position: "Health Coordinator", department: "Programs", level: "staff" },
    { position: "Community Outreach Officer", department: "Programs", level: "staff" },
    { position: "Finance Officer", department: "Finance", level: "staff" },
    { position: "Administrative Assistant", department: "Operations", level: "staff" },
    { position: "Communications Officer", department: "Communications", level: "staff" },
    { position: "Project Assistant", department: "Programs", level: "staff" },
    { position: "Field Officer", department: "Programs", level: "staff" },
  ]
};

const departments = [
  {
    name: "Governance",
    description: "Board oversight and strategic direction",
    icon: Building2,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Leadership", 
    description: "Executive management and organizational leadership",
    icon: Users,
    color: "from-brand to-brand-light"
  },
  {
    name: "Programs",
    description: "Education, health, and community development programs",
    icon: Target,
    color: "from-green-500 to-green-600"
  },
  {
    name: "Finance",
    description: "Financial management and resource allocation",
    icon: Award,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Operations",
    description: "Daily operations and administrative support",
    icon: Building2,
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Communications",
    description: "Public relations and stakeholder engagement",
    icon: Users,
    color: "from-teal-500 to-teal-600"
  }
];

// Breadcrumb items
const breadcrumbItems = [
  { name: 'Home', url: 'https://www.danga.org' },
  { name: 'Who We Are', url: 'https://www.danga.org/who-we-are' },
  { name: 'Our Team', url: 'https://www.danga.org/team' },
];

// Organization data
const organizationData = {
  name: 'Danga Memorial Foundation',
  alternateName: 'Danga NGO',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'Our organizational structure ensures effective governance, strategic leadership, and efficient program delivery to empower communities across Nigeria.',
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
  foundingDate: '2024',
  nonprofitStatus: 'Nonprofit501c3',
};

function PositionCard({ position, department, level }: { position: string, department: string, level: string }) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'board': return 'from-blue-500/20 to-blue-600/20 border-blue-200';
      case 'executive': return 'from-brand/20 to-brand-light/20 border-brand/30';
      case 'management': return 'from-green-500/20 to-green-600/20 border-green-200';
      case 'staff': return 'from-gray-400/20 to-gray-500/20 border-gray-200';
      default: return 'from-gray-400/20 to-gray-500/20 border-gray-200';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getLevelColor(level)} border p-4 rounded-lg text-center hover:shadow-md transition-shadow duration-200`}>
      <h4 className="font-light text-gray-900 mb-1 text-sm">{position}</h4>
      <p className="text-xs text-gray-600 uppercase tracking-wide">{department}</p>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema data={organizationData} />
      
      <div className="pt-20">
        {/* Breadcrumbs */}
        <section className="py-12 bg-white">
          <div className="container max-w-6xl mx-auto">
            <nav className="flex items-center space-x-4 text-lg" aria-label="Breadcrumb">
              <Link
                href="/who-we-are"
                className="text-gray-600 hover:text-brand transition-colors font-light tracking-wide uppercase"
              >
                WHO WE ARE
              </Link>
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <span className="text-gray-900 font-medium tracking-wide uppercase">OUR TEAM</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8">
              Our Team{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Structure
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
              Our organizational structure ensures effective governance, strategic leadership, 
              and efficient program delivery to empower communities across Nigeria.
            </p>
          </div>
        </section>

        {/* Departments Overview */}
        <section className="section-padding bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  Departments
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Each department plays a crucial role in achieving our mission of community empowerment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div key={dept.name} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-lg flex items-center justify-center mb-4`}>
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 font-light text-sm">{dept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Organizational Chart */}
        <section className="section-padding bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Organizational{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  Chart
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Our hierarchical structure ensures clear accountability and effective decision-making.
              </p>
            </div>

            {/* Board Level */}
            <div className="mb-12">
              <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
                <span className="bg-blue-100 px-4 py-2 rounded-full text-blue-800">Board of Trustees</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {organizationalStructure.board.map((item, index) => (
                  <PositionCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Executive Level */}
            <div className="mb-12">
              <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
                <span className="bg-brand/10 px-4 py-2 rounded-full text-brand">Executive Leadership</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {organizationalStructure.executive.map((item, index) => (
                  <PositionCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Management Level */}
            <div className="mb-12">
              <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
                <span className="bg-green-100 px-4 py-2 rounded-full text-green-800">Management Team</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {organizationalStructure.management.map((item, index) => (
                  <PositionCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Staff Level */}
            <div className="mb-12">
              <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
                <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-800">Program & Support Staff</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {organizationalStructure.staff.map((item, index) => (
                  <PositionCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team CTA - Hidden for now */}
        {/* 
        <section className="section-padding bg-gray-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="bg-white p-12 rounded-lg shadow-sm">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Ready to Join Our{" "}
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  Structure?
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto">
                We're always looking for qualified professionals to fill key positions 
                in our organizational structure and advance our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/careers"
                  className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-brand text-white hover:bg-brand-dark transition-all duration-300 font-medium"
                >
                  <span className="uppercase tracking-wide">View Open Positions</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
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
                <Link
                  href="/volunteer"
                  className="px-8 py-4 border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 font-medium uppercase tracking-wide"
                >
                  Volunteer With Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        */}
      </div>
    </>
  );
}