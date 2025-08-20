import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Danga Memorial Foundation. We would love to hear from you and discuss how we can work together.',
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'info@dangamemorialfoundation.org',
    href: 'mailto:info@dangamemorialfoundation.org'
  },
  {
    icon: Phone,
    title: 'Phone',
    details: '+234 706 307 4132',
    href: 'tel:+2347063074132'
  },
  {
    icon: MapPin,
    title: 'Address',
    details: 'Plot 1153 Mazarga Close, Mabushi, FCT, Nigeria',
    href: '#'
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: 'Monday - Friday: 9:00 AM - 5:00 PM',
    href: '#'
  }
];

export default function Contact() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-brown text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-light">
              We would love to hear from you. Reach out to learn more about our work, 
              volunteer opportunities, or partnership possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className={`bg-white p-6 shadow-lg text-center animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-brown flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{info.title}</h3>
                  {info.href !== '#' ? (
                    <a
                      href={info.href}
                      className="text-gray-600 hover:text-brown transition-colors duration-200 font-light"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-gray-600 font-light">{info.details}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Send Us a <span className="text-gradient">Message</span>
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                Whether you have questions about our programs, want to volunteer, or are interested 
                in partnering with us, we're here to help. Fill out the form and we'll get back 
                to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brown/10 flex items-center justify-center mt-1">
                    <Mail className="h-4 w-4 text-brown" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">General Inquiries</h4>
                    <p className="text-gray-600 font-light">
                      For general questions about our foundation and programs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center mt-1">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Partnership Opportunities</h4>
                    <p className="text-gray-600 font-light">
                      Interested in collaborating or supporting our mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Located in the heart of Abuja, our office is open for visits and meetings.
            </p>
          </div>
          
          <div className="bg-white p-8 shadow-lg">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-brown mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Office Location</h3>
                <p className="text-gray-600 font-light">Plot 1153 Mazarga Close, Mabushi, FCT, Nigeria</p>
                <p className="text-sm text-gray-500 mt-2 font-light">Interactive map integration available</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}