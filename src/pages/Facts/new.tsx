'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const AddFactPage = () => {
  const [fact, setFact] = useState('');
  const [importance, setImportance] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate fact
    if (!fact) newErrors.fact = 'Fact is required.';

    // Validate importance
    if (importance === '') newErrors.importance = 'Importance is required.';
    else if (importance < 1 || importance > 5)
      newErrors.importance = 'Importance must be between 1 and 5.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Fact added successfully!');
      // You can add logic here to save the fact to the backend or state.
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Fact</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fact" className="block text-sm font-medium text-gray-700">
                Fact
              </label>
              <input
                type="text"
                id="fact"
                value={fact}
                onChange={(e) => setFact(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter fact"
              />
              {errors.fact && <p className="text-[#FF77B7] text-sm mt-1">{errors.fact}</p>}
            </div>
            <div>
              <label htmlFor="importance" className="block text-sm font-medium text-gray-700">
                Importance (1 to 5)
              </label>
              <input
                type="number"
                id="importance"
                value={importance}
                onChange={(e) => setImportance(Number(e.target.value))}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter importance (1 to 5)"
                min="1"
                max="5"
              />
              {errors.importance && <p className="text-[#FF77B7] text-sm mt-1">{errors.importance}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Add Fact
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/Facts" className="text-[#FF77B7] hover:underline">
              View Facts
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddFactPage;
