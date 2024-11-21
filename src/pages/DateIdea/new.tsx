'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const AddDateIdeaPage = () => {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('');
  const [enthusiasm, setEnthusiasm] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate idea
    if (!idea) newErrors.idea = 'Idea is required.';

    // Validate category
    if (!category) newErrors.category = 'Category is required.';

    // Validate enthusiasm
    if (enthusiasm === '') newErrors.enthusiasm = 'Enthusiasm is required.';
    else if (enthusiasm < 0 || enthusiasm > 999)
      newErrors.enthusiasm = 'Enthusiasm must be between 0 and 999.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Date Idea added successfully!');
      // You can add logic here to save the date idea to the backend or state.
      // Reset fields
      setIdea('');
      setCategory('');
      setEnthusiasm('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Date Idea</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
                Date Idea
              </label>
              <input
                type="text"
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter date idea"
              />
              {errors.idea && <p className="text-[#FF77B7] text-sm mt-1">{errors.idea}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter category"
              />
              {errors.category && <p className="text-[#FF77B7] text-sm mt-1">{errors.category}</p>}
            </div>
            <div>
              <label htmlFor="enthusiasm" className="block text-sm font-medium text-gray-700">
                Enthusiasm (0 to 999)
              </label>
              <input
                type="number"
                id="enthusiasm"
                value={enthusiasm}
                onChange={(e) => setEnthusiasm(Number(e.target.value))}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter enthusiasm (0 to 999)"
                min="0"
                max="999"
              />
              {errors.enthusiasm && <p className="text-[#FF77B7] text-sm mt-1">{errors.enthusiasm}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Add Date Idea
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/DateIdea" className="text-[#FF77B7] hover:underline">
              View Date Ideas
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddDateIdeaPage;
