'use client';

import { Mail, Phone, MapPin, User } from 'lucide-react';

interface Trustee {
  name: string;
  role: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
}

interface TrusteeCardProps {
  trustee: Trustee;
  index: number;
}

export default function TrusteeCard({ trustee, index }: TrusteeCardProps) {
  const initials = trustee.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`bg-white p-8 shadow-lg border border-gray-100 card-hover animate-slide-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-brown flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-medium text-2xl">{initials}</span>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-1">{trustee.name}</h3>
        <p className="text-brown font-light">{trustee.role}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-brown mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-light">Email</p>
            <a 
              href={`mailto:${trustee.email}`}
              className="text-gray-900 hover:text-brown transition-colors duration-200 font-light"
            >
              {trustee.email}
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-brown mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-light">Phone</p>
            <a 
              href={`tel:${trustee.phone}`}
              className="text-gray-900 hover:text-brown transition-colors duration-200 font-light"
            >
              {trustee.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-brown mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-light">Address</p>
            <p className="text-gray-900 font-light">{trustee.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <User className="h-5 w-5 text-brown mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-light">Details</p>
            <p className="text-gray-900 font-light">
              {trustee.gender} • Born {new Date(trustee.dob).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}