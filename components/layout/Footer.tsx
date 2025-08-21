import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  'Quick Links': [
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Scholarship', href: '/scholarship' },
    { name: 'Gallery', href: '/gallery' },
  ],
  'Programs': [
    { name: 'Youth Empowerment', href: '/what-we-do/youth-empowerment' },
    { name: 'Education', href: '/what-we-do/education' },
    { name: 'Health & Wellness', href: '/what-we-do/health-and-wellness' },
    { name: 'Environment', href: '/what-we-do/environment-sustainability' },
  ],
  'Support': [
    { name: 'Donate', href: '/donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Foundation Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/Logo.png"
                  alt="Danga Memorial Foundation Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-medium text-gray-900">Danga Memorial Foundation</span>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              Empowering communities through education, health, and sustainable development programs. 
              Together, we build a brighter future for all.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600">info@dangamemorialfoundation.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600">+234 706 307 4132</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600">Mabushi, FCT, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-6 text-gray-900 uppercase tracking-wide">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-amber-700 transition-colors duration-200 font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-medium mb-4 text-gray-900 uppercase tracking-wide">Stay Connected</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Subscribe to our newsletter for the latest updates on our programs and impact.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-6 py-4 bg-white text-gray-900 placeholder-gray-400 font-light
                           border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                           transition-all duration-200"
              />
              <button className="bg-blue-600 text-white px-8 py-4 font-bold uppercase tracking-wide
                               hover:bg-amber-700 transition-all duration-200 whitespace-nowrap transform hover:scale-105">
                Sign Up →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-gray-600 text-sm font-light">
              © {new Date().getFullYear()} Danga Memorial Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Tax ID # 91-1148123</span>
            </div>
          </div>
          <div className="flex space-x-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded
                             hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105"
                  aria-label={social.name}
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