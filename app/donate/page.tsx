import { Metadata } from 'next';
import DonationForm from '@/components/forms/DonationForm';
import { Heart, Users, GraduationCap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support the Danga Memorial Foundation and help us empower communities through education, health, and development programs.',
};

const impactAreas = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Fund scholarships and educational materials for deserving students',
    amount: '₦50,000',
    impact: 'Supports one student for a full academic year'
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Provide medical care and health education to communities',
    amount: '₦25,000',
    impact: 'Covers medical care for 10 community members'
  },
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'Support skills training and mentorship programs',
    amount: '₦75,000',
    impact: 'Trains 5 young people in valuable skills'
  },
  {
    icon: Shield,
    title: 'Emergency Relief',
    description: 'Provide immediate assistance during crises and disasters',
    amount: '₦100,000',
    impact: 'Supports emergency relief for 20 families'
  }
];

export default function Donate() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-brown text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Make a Difference Today
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-light">
              Your generous donation helps us continue our mission of empowering communities 
              and transforming lives across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Where Your <span className="text-gradient">Donation</span> Goes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Every naira you contribute directly supports our programs and creates 
              measurable impact in the communities we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className={`bg-white p-8 shadow-lg border border-gray-100 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-brown flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{area.title}</h3>
                      <p className="text-gray-600 font-light mb-4">{area.description}</p>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-light text-brown">{area.amount}</span>
                          <span className="text-sm text-gray-500 font-light">{area.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Choose Your <span className="text-gradient">Contribution</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Select an amount or enter a custom donation. Every contribution makes a difference.
              </p>
            </div>
            
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Your Trust is Our Priority
              </h2>
              <p className="text-lg text-gray-600 font-light">
                We are committed to transparency and accountability in all our operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="h-12 w-12 text-brown mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600 font-light">
                  All transactions are encrypted and processed through secure payment gateways.
                </p>
              </div>
              
              <div className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">100% Transparency</h3>
                <p className="text-gray-600 font-light">
                  Regular reports show exactly how your donations are being used to create impact.
                </p>
              </div>
              
              <div className="text-center">
                <Heart className="h-12 w-12 text-brown mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Direct Impact</h3>
                <p className="text-gray-600 font-light">
                  Your donations go directly to programs, with minimal administrative overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}