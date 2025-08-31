'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  GraduationCap, 
  FileText, 
  User, 
  Upload, 
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  educationLevel: string;
  currentSchool: string;
  course: string;
  yearOfStudy: string;
  scholarshipType: string;
  amountRequested: string;
  reasonForApplication: string;
  parentGuardianName: string;
  familyIncome: string;
  indigeneLetter: File | null;
  educationDocument: File | null;
}

const ScholarshipApplicationClient = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    educationLevel: '',
    currentSchool: '',
    course: '',
    yearOfStudy: '',
    scholarshipType: '',
    amountRequested: '',
    reasonForApplication: '',
    parentGuardianName: '',
    familyIncome: '',
    indigeneLetter: null,
    educationDocument: null
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Check file size - 100KB limit (102,400 bytes)
      if (files[0].size > 100 * 1024) {
        setErrors(prev => ({ ...prev, [name]: 'File size must be less than 100KB' }));
        return;
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(files[0].type)) {
        setErrors(prev => ({ ...prev, [name]: 'Only PDF, JPG, and PNG files are allowed' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^(\+234|0)[789]\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Please enter a valid Nigerian phone number';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
      if (!formData.currentSchool.trim()) newErrors.currentSchool = 'Current school is required';
      if (!formData.course.trim()) newErrors.course = 'Course/Field of study is required';
      if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required';
    }

    if (step === 3) {
      if (!formData.scholarshipType) newErrors.scholarshipType = 'Scholarship type is required';
      if (!formData.reasonForApplication.trim()) newErrors.reasonForApplication = 'Reason for application is required';
      else if (formData.reasonForApplication.trim().length < 50) {
        newErrors.reasonForApplication = 'Please provide a detailed explanation (minimum 50 characters)';
      }
      if (!formData.parentGuardianName.trim()) newErrors.parentGuardianName = 'Parent/Guardian name is required';
      if (!formData.familyIncome) newErrors.familyIncome = 'Family income range is required';
    }

    if (step === 4) {
      if (!formData.indigeneLetter) newErrors.indigeneLetter = 'Indigene letter is required';
      if (!formData.educationDocument) newErrors.educationDocument = 'Education document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const uploadFile = async (file: File, bucket: string, fileName: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const refId = `DMF-${Date.now().toString().slice(-8)}`;
      
      // Upload files to Supabase Storage
      let indigeneLetterPath = '';
      let educationDocumentPath = '';
      
      if (formData.indigeneLetter) {
        const fileName = `${refId}-indigene-${formData.indigeneLetter.name}`;
        indigeneLetterPath = await uploadFile(formData.indigeneLetter, 'scholarship-documents', fileName);
      }
      
      if (formData.educationDocument) {
        const fileName = `${refId}-education-${formData.educationDocument.name}`;
        educationDocumentPath = await uploadFile(formData.educationDocument, 'scholarship-documents', fileName);
      }

      // Insert form data into Supabase database
      const { data, error } = await supabase
        .from('scholarship_applications')
        .insert({
          reference_id: refId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          education_level: formData.educationLevel,
          current_school: formData.currentSchool,
          course: formData.course,
          year_of_study: formData.yearOfStudy,
          scholarship_type: formData.scholarshipType,
          amount_requested: formData.amountRequested,
          reason_for_application: formData.reasonForApplication,
          parent_guardian_name: formData.parentGuardianName,
          family_income: formData.familyIncome,
          indigene_letter_path: indigeneLetterPath,
          education_document_path: educationDocumentPath,
          status: 'pending',
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Send email notification via API route
      const emailResponse = await fetch('/api/send-scholarship-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          applicantEmail: formData.email,
          applicantName: `${formData.firstName} ${formData.lastName}`,
          referenceId: refId,
          formData: formData
        })
      });

      if (!emailResponse.ok) {
        console.warn('Email sending failed, but form was submitted successfully');
      }

      setReferenceId(refId);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-light text-gray-900 mb-4">Application Submitted Successfully!</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Thank you for applying for the Danga Memorial Foundation scholarship. 
                We have received your application and will review it within 2-3 weeks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6">
                <h3 className="font-medium text-blue-900 mb-3">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-2 text-left">
                  <li>• Application review by our scholarship committee</li>
                  <li>• Verification of submitted documents</li>
                  <li>• Shortlisted candidates will be contacted for interview</li>
                  <li>• Final selection and notification within 4-6 weeks</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6">
                <h3 className="font-medium text-green-900 mb-3">Contact Us</h3>
                <div className="text-sm text-green-800 space-y-2 text-left">
                  <p><strong>Email:</strong> scholarships@danga.org</p>
                  <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
                  <p><strong>Reference ID:</strong> {referenceId}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand text-white font-medium hover:bg-brand-dark transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Address & Education', icon: GraduationCap },
    { number: 3, title: 'Scholarship Info', icon: DollarSign },
    { number: 4, title: 'Documents', icon: FileText }
  ];

  const InputField = ({ id, name, label, type = "text", placeholder, value, onChange, error, options = [] }: any) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  const FileUploadField = ({ id, name, label, file, onChange, error }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="mt-1">
        <div className={`border-2 border-dashed p-6 text-center transition-colors ${
          error ? 'border-red-300 bg-red-50' : 
          file ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-brand hover:bg-blue-50'
        }`}>
          <input
            type="file"
            id={id}
            name={name}
            onChange={onChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
          <label htmlFor={id} className="cursor-pointer">
            <Upload className={`w-8 h-8 mx-auto mb-2 ${
              file ? 'text-green-500' : 'text-gray-400'
            }`} />
            <p className={`text-sm font-medium ${
              file ? 'text-green-700' : 'text-gray-600'
            }`}>
              {file ? `Selected: ${file.name}` : `Click to upload ${label}`}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max: 100KB)</p>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with added padding to push content down */}
      <section className="pt-32 pb-16 bg-white border-b"> {/* Increased pt-32 to push content down further */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Scholarship Application
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Empowering the next generation through education. Apply for our scholarship program 
              designed to support secondary and university students from less privileged communities.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 flex items-center justify-center mb-2 transition-colors ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-brand text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-brand' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-colors ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="bg-white shadow-sm p-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    id="firstName"
                    name="firstName"
                    label="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    placeholder="Enter your first name"
                  />

                  <InputField
                    id="lastName"
                    name="lastName"
                    label="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    placeholder="Enter your last name"
                  />

                  <InputField
                    id="email"
                    name="email"
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="your.email@example.com"
                  />

                  <InputField
                    id="phone"
                    name="phone"
                    label="Phone Number *"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="+234 xxx xxx xxxx"
                  />

                  <InputField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth *"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    error={errors.dateOfBirth}
                  />

                  <InputField
                    id="gender"
                    name="gender"
                    label="Gender *"
                    type="select"
                    value={formData.gender}
                    onChange={handleInputChange}
                    error={errors.gender}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' }
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Address & Education Information */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-6">Address & Education Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Address Details</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                          Home Address *
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={2}
                          className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your full home address"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                      </div>

                      <InputField
                        id="city"
                        name="city"
                        label="City/Town *"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Education Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        id="educationLevel"
                        name="educationLevel"
                        label="Education Level *"
                        type="select"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        error={errors.educationLevel}
                        options={[
                          { value: 'secondary', label: 'Secondary School' },
                          { value: 'university', label: 'University/Higher Institution' }
                        ]}
                      />

                      <InputField
                        id="yearOfStudy"
                        name="yearOfStudy"
                        label="Current Year/Level *"
                        type="select"
                        value={formData.yearOfStudy}
                        onChange={handleInputChange}
                        error={errors.yearOfStudy}
                        options={
                          formData.educationLevel === 'secondary' ? [
                            { value: 'JSS1', label: 'JSS 1' },
                            { value: 'JSS2', label: 'JSS 2' },
                            { value: 'JSS3', label: 'JSS 3' },
                            { value: 'SS1', label: 'SS 1' },
                            { value: 'SS2', label: 'SS 2' },
                            { value: 'SS3', label: 'SS 3' }
                          ] : [
                            { value: '100Level', label: '100 Level' },
                            { value: '200Level', label: '200 Level' },
                            { value: '300Level', label: '300 Level' },
                            { value: '400Level', label: '400 Level' },
                            { value: '500Level', label: '500 Level' }
                          ]
                        }
                      />

                      <div className="md:col-span-2">
                        <InputField
                          id="currentSchool"
                          name="currentSchool"
                          label="Current School/Institution *"
                          value={formData.currentSchool}
                          onChange={handleInputChange}
                          error={errors.currentSchool}
                          placeholder="Enter school or institution name"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <InputField
                          id="course"
                          name="course"
                          label="Course/Field of Study *"
                          value={formData.course}
                          onChange={handleInputChange}
                          error={errors.course}
                          placeholder="e.g., Computer Science, Sciences, Arts"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Scholarship Information */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-6">Scholarship & Family Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      id="scholarshipType"
                      name="scholarshipType"
                      label="Scholarship Type *"
                      type="select"
                      value={formData.scholarshipType}
                      onChange={handleInputChange}
                      error={errors.scholarshipType}
                      options={[
                        { value: 'school_fees', label: 'School Fees Payment' },
                        { value: 'jamb_form', label: 'JAMB Form' },
                        { value: 'books_materials', label: 'Books & Materials' },
                        { value: 'living_allowance', label: 'Living Allowance' },
                        { value: 'full_scholarship', label: 'Full Scholarship' },
                        { value: 'other', label: 'Other' }
                      ]}
                    />

                    <InputField
                      id="amountRequested"
                      name="amountRequested"
                      label="Amount Needed (NGN)"
                      value={formData.amountRequested}
                      onChange={handleInputChange}
                      placeholder="e.g., ₦50,000"
                    />
                  </div>

                  <div>
                    <label htmlFor="reasonForApplication" className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you need this scholarship? *
                    </label>
                    <textarea
                      id="reasonForApplication"
                      name="reasonForApplication"
                      value={formData.reasonForApplication}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
                        errors.reasonForApplication ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Please explain your financial situation, academic goals, and how this scholarship will help you..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.reasonForApplication && <p className="text-red-500 text-sm">{errors.reasonForApplication}</p>}
                      <p className="text-xs text-gray-500 ml-auto">
                        {formData.reasonForApplication.length}/50 characters minimum
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      id="parentGuardianName"
                      name="parentGuardianName"
                      label="Parent/Guardian Name *"
                      value={formData.parentGuardianName}
                      onChange={handleInputChange}
                      error={errors.parentGuardianName}
                      placeholder="Parent/Guardian name"
                    />

                    <InputField
                      id="familyIncome"
                      name="familyIncome"
                      label="Family Income Range *"
                      type="select"
                      value={formData.familyIncome}
                      onChange={handleInputChange}
                      error={errors.familyIncome}
                      options={[
                        { value: 'below_30k', label: 'Below ₦30,000' },
                        { value: '30k_60k', label: '₦30,000 - ₦60,000' },
                        { value: '60k_100k', label: '₦60,000 - ₦100,000' },
                        { value: '100k_200k', label: '₦100,000 - ₦200,000' },
                        { value: 'above_200k', label: 'Above ₦200,000' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-6">Required Documents</h2>
                <div className="space-y-8">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800 mb-1">Important Notes:</h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• All documents should be in PDF, JPG, or PNG format</li>
                          <li>• Maximum file size: 100KB per document</li>
                          <li>• Documents should be clear and readable</li>
                          <li>• Compress images if needed to meet size requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <FileUploadField
                    id="indigeneLetter"
                    name="indigeneLetter"
                    label="Indigene Letter *"
                    file={formData.indigeneLetter}
                    onChange={handleFileChange}
                    error={errors.indigeneLetter}
                  />

                  <FileUploadField
                    id="educationDocument"
                    name="educationDocument"
                    label="Admission Letter / School ID Card *"
                    file={formData.educationDocument}
                    onChange={handleFileChange}
                    error={errors.educationDocument}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 font-medium transition-colors ${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand text-white font-medium hover:bg-brand-dark transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-brand hover:bg-brand-dark'
                  } text-white`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Scholarship Benefits</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Tuition and school fees coverage</li>
                <li>• Educational materials and books</li>
                <li>• JAMB and entrance exam fees</li>
                <li>• Monthly stipend for living expenses</li>
                <li>• Mentorship and career guidance</li>
                <li>• Access to DMF network and alumni</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6">
              <h3 className="text-lg font-medium text-green-900 mb-3">Selection Criteria</h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• Financial need assessment</li>
                <li>• Academic performance and potential</li>
                <li>• Community involvement and leadership</li>
                <li>• Commitment to giving back to community</li>
                <li>• Priority for Michika and surrounding areas</li>
                <li>• Interview performance for shortlisted candidates</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
            <p className="text-gray-600 mb-4">
              For questions about the scholarship application process, please contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Email:</strong> scholarships@danga.org</p>
              <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
              <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipApplicationClient;