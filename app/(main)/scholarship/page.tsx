'use client';

import React, { useCallback, useState, memo } from 'react';
import {
  GraduationCap,
  FileText,
  User,
  Upload,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

// =====================
// Types
// =====================
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

interface SelectOption {
  value: string;
  label: string;
}

interface InputFieldProps {
  id: string;
  name: keyof FormData;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  options?: SelectOption[];
}

interface FileUploadFieldProps {
  id: string;
  name: keyof FormData;
  label: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

// =====================
// Child components (defined OUTSIDE to avoid remounting on each render)
// =====================
const InputField = memo(function InputField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  options = [],
}: InputFieldProps) {
  return (
    <div className="animate-fade-in-up">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          rows={4}
          className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full px-4 py-3 border focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1 animate-shake">{error}</p>}
    </div>
  );
});

const FileUploadField = memo(function FileUploadField({
  id,
  name,
  label,
  file,
  onChange,
  error,
}: FileUploadFieldProps) {
  return (
    <div className="animate-fade-in-up">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="mt-1">
        <div
          className={`border-2 border-dashed p-6 text-center transition-all duration-200 ${
            error
              ? 'border-red-300 bg-red-50'
              : file
              ? 'border-green-300 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:border-brand hover:bg-blue-50'
          }`}
        >
          <input
            type="file"
            id={id}
            name={name}
            onChange={onChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
          <label htmlFor={id} className="cursor-pointer">
            <Upload
              className={`w-8 h-8 mx-auto mb-2 transition-all duration-200 ${
                file ? 'text-green-500' : 'text-gray-400'
              }`}
            />
            <p className={`text-sm font-medium ${file ? 'text-green-700' : 'text-gray-600'}`}>
              {file ? `Selected: ${file.name}` : `Click to upload ${label}`}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max: 100KB)</p>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mt-1 animate-shake">{error}</p>}
      </div>
    </div>
  );
});

// =====================
// Main component
// =====================
export default function ScholarshipApplicationClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    educationDocument: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ---------------------
  // Handlers
  // ---------------------
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value } as FormData));

      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => {
          const cloned = { ...prev };
          delete cloned[name];
          return cloned;
        });
      }
    },
    [errors]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files[0]) {
        // 100KB max
        if (files[0].size > 100 * 1024) {
          setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 100KB' }));
          return;
        }
        const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowed.includes(files[0].type)) {
          setErrors((prev) => ({ ...prev, [name]: 'Only PDF, JPG, and PNG files are allowed' }));
          return;
        }
        setFormData((prev) => ({ ...prev, [name]: files[0] } as FormData));
        if (errors[name]) {
          setErrors((prev) => {
            const cloned = { ...prev };
            delete cloned[name];
            return cloned;
          });
        }
      }
    },
    [errors]
  );

  // ---------------------
  // Validation
  // ---------------------
  const validateField = useCallback((name: keyof FormData, value: string): string => {
    switch (name) {
      case 'firstName':
        return !value.trim() ? 'First name is required' : '';
      case 'lastName':
        return !value.trim() ? 'Last name is required' : '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/(^((\+234)|0)[789]\d{9}$)/.test(value.replace(/\s+/g, ''))) {
          return 'Please enter a valid Nigerian phone number';
        }
        return '';
      case 'dateOfBirth':
        return !value ? 'Date of birth is required' : '';
      case 'gender':
        return !value ? 'Gender is required' : '';
      case 'address':
        return !value.trim() ? 'Address is required' : '';
      case 'city':
        return !value.trim() ? 'City is required' : '';
      case 'educationLevel':
        return !value ? 'Education level is required' : '';
      case 'currentSchool':
        return !value.trim() ? 'Current school is required' : '';
      case 'course':
        return !value.trim() ? 'Course/Field of study is required' : '';
      case 'yearOfStudy':
        return !value ? 'Year of study is required' : '';
      case 'scholarshipType':
        return !value ? 'Scholarship type is required' : '';
      case 'reasonForApplication':
        if (!value.trim()) return 'Reason for application is required';
        if (value.trim().length < 50)
          return 'Please provide a detailed explanation (minimum 50 characters)';
        return '';
      case 'parentGuardianName':
        return !value.trim() ? 'Parent/Guardian name is required' : '';
      case 'familyIncome':
        return !value ? 'Family income range is required' : '';
      default:
        return '';
    }
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (step === 1) {
        const fields: (keyof FormData)[] = [
          'firstName',
          'lastName',
          'email',
          'phone',
          'dateOfBirth',
          'gender',
        ];
        fields.forEach((f) => {
          const v = (formData[f] as unknown as string) ?? '';
          const err = validateField(f, v);
          if (err) newErrors[f] = err;
        });
      }

      if (step === 2) {
        const fields: (keyof FormData)[] = [
          'address',
          'city',
          'educationLevel',
          'currentSchool',
          'course',
          'yearOfStudy',
        ];
        fields.forEach((f) => {
          const v = (formData[f] as unknown as string) ?? '';
          const err = validateField(f, v);
          if (err) newErrors[f] = err;
        });
      }

      if (step === 3) {
        const fields: (keyof FormData)[] = [
          'scholarshipType',
          'reasonForApplication',
          'parentGuardianName',
          'familyIncome',
        ];
        fields.forEach((f) => {
          const v = (formData[f] as unknown as string) ?? '';
          const err = validateField(f, v);
          if (err) newErrors[f] = err;
        });
      }

      if (step === 4) {
        if (!formData.indigeneLetter)
          newErrors.indigeneLetter = 'Indigene letter is required';
        if (!formData.educationDocument)
          newErrors.educationDocument = 'Education document is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData, validateField]
  );

  // ---------------------
  // Step navigation
  // ---------------------
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, 4));
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
      setIsTransitioning(false);
    }, 300);
  }, []);

  // ---------------------
  // Mock upload + submit
  // ---------------------
  const uploadFile = async (_file: File, _bucket: string, fileName: string) => {
    // Simulated upload
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(fileName), 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const refId = `DMF-${Date.now().toString().slice(-8)}`;
      let indigeneLetterPath = '';
      let educationDocumentPath = '';

      if (formData.indigeneLetter) {
        const fileName = `${refId}-indigene-${formData.indigeneLetter.name}`;
        indigeneLetterPath = await uploadFile(
          formData.indigeneLetter,
          'scholarship-documents',
          fileName
        );
      }
      if (formData.educationDocument) {
        const fileName = `${refId}-education-${formData.educationDocument.name}`;
        educationDocumentPath = await uploadFile(
          formData.educationDocument,
          'scholarship-documents',
          fileName
        );
      }

      // Simulate DB insert + email
      await new Promise((r) => setTimeout(r, 600));
      await new Promise((r) => setTimeout(r, 400));

      console.log({ refId, indigeneLetterPath, educationDocumentPath });
      setReferenceId(refId);
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Form submission error:', err);
      alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------
  // Success screen
  // ---------------------
  if (submitSuccess) {
    return (
      <div className="section-padding bg-white animate-fade-in">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-light text-gray-900 mb-4 animate-slide-up">
                Application Submitted Successfully!
              </h2>
              <p
                className="text-lg text-gray-600 leading-relaxed mb-8 animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Thank you for applying for the Danga Memorial Foundation scholarship. We have received your
                application and will review it within 2-3 weeks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-medium text-blue-900 mb-3">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-2 text-left">
                  <li>• Application review by our scholarship committee</li>
                  <li>• Verification of submitted documents</li>
                  <li>• Shortlisted candidates will be contacted for interview</li>
                  <li>• Final selection and notification within 4-6 weeks</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <h3 className="font-medium text-green-900 mb-3">Contact Us</h3>
                <div className="text-sm text-green-800 space-y-2 text-left">
                  <p>
                    <strong>Email:</strong> scholarships@danga.org
                  </p>
                  <p>
                    <strong>Phone:</strong> +234-XXX-XXX-XXXX
                  </p>
                  <p>
                    <strong>Reference ID:</strong> {referenceId}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand text-white font-medium hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: '0.8s' }}
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------
  // Steps meta
  // ---------------------
  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Address & Education', icon: GraduationCap },
    { number: 3, title: 'Scholarship Info', icon: DollarSign },
    { number: 4, title: 'Documents', icon: FileText },
  ] as const;

  // ---------------------
  // Render
  // ---------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-32 pb-16 bg-white border-b animate-fade-in">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 animate-slide-up">
              Scholarship Application
            </h1>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              Empowering the next generation through education. Apply for our scholarship program designed to
              support secondary and university students from less privileged communities.
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
                    <div
                      className={`w-12 h-12 flex items-center justify-center mb-2 transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-500 text-white animate-scale-in'
                          : isActive
                          ? 'bg-brand text-white animate-scale-in'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-brand' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
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
          <form
            onSubmit={handleSubmit}
            className={`bg-white shadow-sm p-8 transition-all duration-300 ${
              isTransitioning ? 'opacity-75 transform translate-y-2' : 'opacity-100 transform translate-y-0'
            }`}
          >
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="animate-step-fade">
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
                      { value: 'female', label: 'Female' },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="animate-step-fade">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Address & Education Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Address Details</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <InputField
                        id="address"
                        name="address"
                        label="Home Address *"
                        type="textarea"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={errors.address}
                        placeholder="Enter your full home address"
                      />

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
                          { value: 'university', label: 'University/Higher Institution' },
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
                          formData.educationLevel === 'secondary'
                            ? [
                                { value: 'JSS1', label: 'JSS 1' },
                                { value: 'JSS2', label: 'JSS 2' },
                                { value: 'JSS3', label: 'JSS 3' },
                                { value: 'SS1', label: 'SS 1' },
                                { value: 'SS2', label: 'SS 2' },
                                { value: 'SS3', label: 'SS 3' },
                              ]
                            : [
                                { value: '100Level', label: '100 Level' },
                                { value: '200Level', label: '200 Level' },
                                { value: '300Level', label: '300 Level' },
                                { value: '400Level', label: '400 Level' },
                                { value: '500Level', label: '500 Level' },
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

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="animate-step-fade">
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
                        { value: 'other', label: 'Other' },
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

                  <InputField
                    id="reasonForApplication"
                    name="reasonForApplication"
                    label="Why do you need this scholarship? *"
                    type="textarea"
                    value={formData.reasonForApplication}
                    onChange={handleInputChange}
                    error={errors.reasonForApplication}
                    placeholder="Please explain your financial situation, academic goals, and how this scholarship will help you..."
                  />

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      {formData.reasonForApplication.length}/50 characters minimum
                    </p>
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
                        { value: 'above_200k', label: 'Above ₦200,000' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="animate-step-fade">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Required Documents</h2>
                <div className="space-y-8">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 animate-fade-in-up">
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

            {/* Nav buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transform hover:scale-105'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand text-white font-medium hover:bg-brand-dark transition-all duration-200 transform hover:scale-105"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 font-medium transition-all duration-200 transform hover:scale-105 ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 animate-slide-up">
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

            <div className="bg-green-50 p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

          <div className="mt-8 p-6 bg-gray-50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
            <p className="text-gray-600 mb-4">For questions about the scholarship application process, please contact us:</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> scholarships@danga.org
              </p>
              <p>
                <strong>Phone:</strong> +234-XXX-XXX-XXXX
              </p>
              <p>
                <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes step-fade {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); }
          to { transform: scale(1); }
        }
        @keyframes shake {
          0%, 20%, 50%, 80%, 100% { transform: translateX(0); }
          10% { transform: translateX(-3px); }
          30% { transform: translateX(3px); }
          40% { transform: translateX(-3px); }
          60% { transform: translateX(3px); }
          70% { transform: translateX(-3px); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-step-fade { animation: step-fade 0.5s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }

        /* Brand helpers */
        .bg-brand { background-color: #3b82f6; }
        .hover\\:bg-brand-dark:hover { background-color: #2563eb; }
        .text-brand { color: #3b82f6; }
        .focus\\:ring-brand:focus { --tw-ring-color: #3b82f6; }
        .focus\\:border-brand:focus { border-color: #3b82f6; }
        .hover\\:border-brand:hover { border-color: #3b82f6; }
        .hover\\:bg-blue-50:hover { background-color: #eff6ff; }
      `}</style>
    </div>
  );
}
