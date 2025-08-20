'use client';

import { useState } from 'react';
import { Heart, CreditCard, Smartphone } from 'lucide-react';

const presetAmounts = [
  { amount: 5000, label: '₦5,000' },
  { amount: 10000, label: '₦10,000' },
  { amount: 25000, label: '₦25,000' },
  { amount: 50000, label: '₦50,000' },
  { amount: 100000, label: '₦100,000' },
  { amount: 250000, label: '₦250,000' },
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'transfer', name: 'Bank Transfer', icon: Smartphone },
];

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    anonymous: false
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    console.log('Donation submitted:', {
      amount: getCurrentAmount(),
      isRecurring,
      paymentMethod,
      donorInfo
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg border border-gray-100">
      {/* Amount Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Select Amount</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {presetAmounts.map((preset) => (
            <button
              key={preset.amount}
              type="button"
              onClick={() => handleAmountSelect(preset.amount)}
              className={`p-4 border-2 transition-colors duration-200 font-light ${
                selectedAmount === preset.amount
                  ? 'border-brown bg-brown text-white'
                  : 'border-gray-200 hover:border-brown hover:bg-brown/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown font-light"
          />
        </div>
      </div>

      {/* Recurring Option */}
      <div className="mb-8">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-5 h-5 text-brown focus:ring-brown border-gray-300"
          />
          <span className="text-gray-700 font-light">Make this a monthly recurring donation</span>
        </label>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <label
                key={method.id}
                className={`flex items-center p-4 border-2 cursor-pointer transition-colors duration-200 ${
                  paymentMethod === method.id
                    ? 'border-brown bg-brown/5'
                    : 'border-gray-200 hover:border-brown/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                <Icon className="h-6 w-6 text-brown mr-3" />
                <span className="font-light">{method.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Donor Information */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Donor Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={donorInfo.firstName}
            onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
            className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown font-light"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={donorInfo.lastName}
            onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
            className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown font-light"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={donorInfo.email}
            onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
            className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown font-light"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={donorInfo.phone}
            onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
            className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown font-light"
          />
        </div>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={donorInfo.anonymous}
            onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
            className="w-5 h-5 text-brown focus:ring-brown border-gray-300"
          />
          <span className="text-gray-700 font-light">Make this donation anonymous</span>
        </label>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Donation Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-light">Amount:</span>
            <span className="font-medium">₦{getCurrentAmount().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-light">Type:</span>
            <span className="font-light">{isRecurring ? 'Monthly Recurring' : 'One-time'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-light">Payment Method:</span>
            <span className="font-light">
              {paymentMethods.find(m => m.id === paymentMethod)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={getCurrentAmount() === 0}
        className="w-full bg-brown text-white py-4 font-medium hover:bg-primary 
                   transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed
                   flex items-center justify-center"
      >
        <Heart className="mr-2 h-5 w-5" />
        Donate ₦{getCurrentAmount().toLocaleString()}
        {isRecurring && ' Monthly'}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4 font-light">
        Your donation is secure and will be processed safely. You will receive a confirmation email 
        with your donation receipt.
      </p>
    </form>
  );
}