import { Metadata } from 'next';
import ScholarshipApplicationClient from '@/components/forms/ScholarshipApplicationForm';
import { GraduationCap, FileText, User, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Scholarship Application',
  description: 'Apply for scholarship opportunities with the Danga Memorial Foundation. Supporting education and empowering futures.',
};

;

export default function ScholarshipApplication() {
  return (
    <div className="pt-20">
    


      {/* Client Component for Interactive Form */}
      <ScholarshipApplicationClient />
    </div>
  );
}