'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const AddPetPage = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate pet name
    if (!petName) newErrors.petName = 'Pet name is required.';
    
    // Validate pet type
    if (!petType) newErrors.petType = 'Pet type is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Pet created successfully!');
      // You can add logic here to save the pet data to the backend or state.
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Pet</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter pet's name"
              />
              {errors.petName && <p className="text-[#FF77B7] text-sm mt-1">{errors.petName}</p>}
            </div>

            <div>
              <label htmlFor="petType" className="block text-sm font-medium text-gray-700">
                Pet Type
              </label>
              <input
                type="text"
                id="petType"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter pet's type (e.g., Shiba, Cat, etc.)"
              />
              {errors.petType && <p className="text-[#FF77B7] text-sm mt-1">{errors.petType}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Create Pet
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/Pets" className="text-[#FF77B7] hover:underline">
              View Pets
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddPetPage;
