import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Danga Memorial Foundation. We would love to hear from you and discuss how we can work together.',
};



export default function Contact() {
  return (
    <div className="pt-20">
     

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            
            
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}