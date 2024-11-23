'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate title
    if (!title) newErrors.title = 'Movie title is required.';
    // Validate genre
    if (!genre) newErrors.genre = 'Genre is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Movie added successfully!');
      // You can add logic here to save the movie to the backend or state.
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8"> {/* Added margin-top (mt-8) and margin-bottom (mb-8) */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Movie</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Movie Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter movie title"
              />
              {errors.title && <p className="text-[#FF77B7] text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter genre"
              />
              {errors.genre && <p className="text-[#FF77B7] text-sm mt-1">{errors.genre}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Add Movie
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/Movies" className="text-[#FF77B7] hover:underline">
              View Movies
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddMoviePage;
