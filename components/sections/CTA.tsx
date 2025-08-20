import Link from 'next/link';
import { Heart, Users, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-green-600 to-yellow-500 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
            Be Part of the
            <span className="block text-transparent bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text">
              Change You Want to See
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 font-light">
            Every contribution, no matter the size, creates ripples of positive change. 
            Join us in empowering communities and transforming lives across Nigeria.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border border-white/20">
              <Heart className="h-12 w-12 mx-auto mb-4 text-amber-300" />
              <h3 className="text-2xl font-light mb-3">Make a Donation</h3>
              <p className="text-white/90 mb-6 font-light">
                Support our programs and help us reach more communities in need.
              </p>
              <Link
                href="/donate"
                className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-medium 
                           hover:bg-gray-100 transition-colors duration-200"
              >
                Donate Now
                <Heart className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border border-white/20">
              <Users className="h-12 w-12 mx-auto mb-4 text-amber-300" />
              <h3 className="text-2xl font-light mb-3">Join Our Team</h3>
              <p className="text-white/90 mb-6 font-light">
                Volunteer your time and skills to make a direct impact in communities.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-medium 
                           hover:bg-amber-800 hover:border-amber-800 transition-colors duration-200"
              >
                Get Involved
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <h3 className="text-2xl font-light mb-4">Stay Connected</h3>
            <p className="text-lg text-white/90 mb-6 font-light">
              Subscribe to our newsletter for updates on our impact and upcoming programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 font-light
                           border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
              />
              <button className="bg-amber-800 text-white px-6 py-3 rounded-lg font-medium 
                                 hover:bg-amber-700 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}