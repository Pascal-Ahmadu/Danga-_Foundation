import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Mail, MapPin, Users } from "lucide-react";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";

export const metadata: Metadata = {
  title: "Careers at Danga Memorial Foundation",
  description: "Join our mission to make a lasting impact in communities across Nigeria. Explore career opportunities and volunteer positions at Danga Memorial Foundation.",
  openGraph: {
    title: "Careers - Join Our Mission | Danga Memorial Foundation",
    description: "Passionate about making a difference? Explore opportunities to join our team and help empower communities through education, healthcare, and sustainable development.",
    url: "https://www.danga.org/careers",
  },
  keywords: [
    "NGO careers Nigeria",
    "nonprofit jobs",
    "community development careers",
    "volunteer opportunities Nigeria",
    "Danga foundation jobs",
    "social impact careers",
    "humanitarian jobs Nigeria"
  ],
};

// Job listings data - replace with dynamic data later
const jobListings = [
  {
    id: 1,
    title: "Program Coordinator",
    description: "Help manage and oversee our education and health programs across communities.",
    type: "Full-time",
    location: "Lagos, Nigeria",
    department: "Programs",
    requirements: ["Bachelor's degree in relevant field", "2+ years experience in program management", "Strong communication skills"],
    posted: "2024-08-15"
  },
  {
    id: 2,
    title: "Volunteer Coordinator",
    description: "Work with our volunteers to ensure smooth operations and impactful outreach.",
    type: "Full-time",
    location: "Lagos, Nigeria",
    department: "Operations",
    requirements: ["Experience in volunteer management", "Strong organizational skills", "Passion for community service"],
    posted: "2024-08-10"
  },
  {
    id: 3,
    title: "Communications Officer",
    description: "Share our story with the world and engage supporters through digital media.",
    type: "Full-time",
    location: "Remote/Lagos",
    department: "Communications",
    requirements: ["Bachelor's in Communications/Marketing", "Social media expertise", "Content creation skills"],
    posted: "2024-08-05"
  }
];

// Breadcrumb items for this page
const breadcrumbItems = [
  { name: 'Home', url: 'https://www.danga.org' },
  { name: 'Who We Are', url: 'https://www.danga.org/who-we-are' },
  { name: 'Careers', url: 'https://www.danga.org/careers' },
];

// Organization data with careers context
const organizationData = {
  name: 'Danga Memorial Foundation',
  alternateName: 'Danga NGO',
  url: 'https://www.danga.org',
  logo: 'https://www.danga.org/logo.png',
  description: 'Join our mission at Danga Memorial Foundation - we are always looking for passionate and talented individuals who want to make a difference in communities across Nigeria through education, healthcare, and sustainable development programs.',
  address: {
    streetAddress: '123 Community Drive',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    postalCode: '100001',
    addressCountry: 'Nigeria',
  },
  contactPoint: {
    telephone: '+234-XXX-XXX-XXXX',
    email: 'careers@danga.org',
    contactType: 'HR department',
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
  keywords: ['NGO careers', 'nonprofit employment', 'community development jobs', 'volunteer opportunities', 'social impact careers'],
  areaServed: 'Nigeria',
};

export default function CareersPage() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema data={organizationData} />
      
      <div className="pt-20">
        {/* Breadcrumbs */}
        <section className="py-12 bg-white">
          <div className="container max-w-5xl mx-auto">
            <nav className="flex items-center space-x-4 text-lg" aria-label="Breadcrumb">
              <Link
                href="/who-we-are"
                className="text-gray-600 hover:text-brand transition-colors font-light tracking-wide uppercase"
              >
                WHO WE ARE
              </Link>
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <span className="text-gray-900 font-medium tracking-wide uppercase">CAREERS</span>
            </nav>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Join Our{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Mission
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto mb-12">
              We are always looking for passionate and talented individuals who want to make
              a difference. Explore open positions and volunteering opportunities with us.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-light text-brand mb-2">10+</div>
                <div className="text-gray-600 font-light">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-brand mb-2">50+</div>
                <div className="text-gray-600 font-light">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-brand mb-2">5+</div>
                <div className="text-gray-600 font-light">Communities Served</div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8 text-center">
                Current Opportunities
              </h2>
              
              <div className="space-y-6">
                {jobListings.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 group-hover:text-brand transition-colors duration-300">
                          {job.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-full">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 md:mt-0 px-4 py-2 bg-brand text-white hover:bg-brand-dark transition-colors duration-300 text-sm font-medium">
                        Apply Now
                      </button>
                    </div>
                    
                    <p className="text-gray-600 font-light mb-4">
                      {job.description}
                    </p>
                    
                    <div className="text-sm text-gray-500">
                      <strong className="font-medium">Key Requirements:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* No current openings fallback */}
              {jobListings.length === 0 && (
                <div className="text-center p-12 bg-gray-50 rounded-xl">
                  <h3 className="text-xl font-light text-gray-900 mb-4">
                    No Current Openings
                  </h3>
                  <p className="text-gray-600 font-light mb-6">
                    We don't have any open positions at the moment, but we're always looking for passionate volunteers!
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-colors duration-300 font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Get Notified of New Openings
                  </Link>
                </div>
              )}
            </div>

            {/* Volunteer Section */}
            <div className="mt-16 bg-gradient-to-r from-brand/5 to-brand-light/5 p-8 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                Volunteer With Us
              </h2>
              <p className="text-gray-600 font-light mb-6 max-w-2xl mx-auto">
                Not ready for a full-time commitment? Join our volunteer network and help us make an impact in your spare time. We welcome volunteers from all backgrounds and skill levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/volunteer"
                  className="px-6 py-3 bg-brand text-white hover:bg-brand-dark transition-colors duration-300 font-medium"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-brand text-brand hover:bg-brand hover:text-white transition-colors duration-300 font-medium"
                >
                  Contact HR
                </Link>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8">
                Why Work With Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Meaningful Work</h3>
                  <p className="text-gray-600 font-light text-sm">
                    Make a direct impact on communities and see the results of your efforts.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Growth Opportunities</h3>
                  <p className="text-gray-600 font-light text-sm">
                    Develop your skills while working on challenging and rewarding projects.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Supportive Team</h3>
                  <p className="text-gray-600 font-light text-sm">
                    Join a passionate team committed to making a positive difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}