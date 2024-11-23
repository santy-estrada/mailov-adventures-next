'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const AddQuestionPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate questionText
    if (!questionText) newErrors.questionText = 'Question is required.';
    else if (!questionText.endsWith('?')) newErrors.questionText = 'Question must end with a question mark.';
    
    // Validate category
    if (!category) newErrors.category = 'Category is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Question added successfully!');
      // Logic to save the question to the backend or state
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Question</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">
                Question Text
              </label>
              <input
                type="text"
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter your question"
              />
              {errors.questionText && <p className="text-[#FF77B7] text-sm mt-1">{errors.questionText}</p>}
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
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Add Question
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/Questions" className="text-[#FF77B7] hover:underline">
              View Questions
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddQuestionPage;
