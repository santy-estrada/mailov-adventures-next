'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const NewPartnershipPage: React.FC = () => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate partnerEmail
    if (!partnerEmail) newErrors.partnerEmail = 'Partner email is required.';
    else if (!/\S+@\S+\.\S+/.test(partnerEmail)) newErrors.partnerEmail = 'Please enter a valid email address.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Partnership request sent successfully!');
      // Add logic to handle sending the partnership request to the backend.
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Partnership</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="partnerEmail" className="block text-sm font-medium text-gray-700">
                Partner's Email
              </label>
              <input
                type="email"
                id="partnerEmail"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter partner's email"
              />
              {errors.partnerEmail && <p className="text-[#FF77B7] text-sm mt-1">{errors.partnerEmail}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Send Partnership Request
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/Partnerships" className="text-[#FF77B7] hover:underline">
              View Partnerships
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewPartnershipPage;
