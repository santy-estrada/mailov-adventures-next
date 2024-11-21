'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';

const AddRestaurantPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!name) newErrors.name = 'Restaurant name is required.';
    // Validate location
    if (!location) newErrors.location = 'Location is required.';
    // Validate cuisineType
    if (!cuisineType) newErrors.cuisineType = 'Cuisine type is required.';
    // Validate extraInfo
    if (!extraInfo) newErrors.extraInfo = 'Extra information is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Restaurant added successfully!');
      // You can add logic here to save the restaurant to the backend or state.
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8"> {/* Added margin-top (mt-8) and margin-bottom (mb-8) */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Restaurant</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter restaurant name"
              />
              {errors.name && <p className="text-[#FF77B7] text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter location"
              />
              {errors.location && <p className="text-[#FF77B7] text-sm mt-1">{errors.location}</p>}
            </div>
            <div>
              <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">
                Cuisine Type
              </label>
              <input
                type="text"
                id="cuisineType"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter cuisine type"
              />
              {errors.cuisineType && <p className="text-[#FF77B7] text-sm mt-1">{errors.cuisineType}</p>}
            </div>
            <div>
              <label htmlFor="extraInfo" className="block text-sm font-medium text-gray-700">
                Extra Information
              </label>
              <textarea
                id="extraInfo"
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter any additional information"
              />
              {errors.extraInfo && <p className="text-[#FF77B7] text-sm mt-1">{errors.extraInfo}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Add Restaurant
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/Restaurants" className="text-[#FF77B7] hover:underline">
              View Restaurants
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRestaurantPage;
