'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';
import { useMutation } from '@apollo/client';
import { CREATE_ACTIVITY } from '@/api/activity';

const AddActivityPage = () => {
  const [activityType, setActivityType] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createActivity, { loading, error, data }] = useMutation(CREATE_ACTIVITY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate activityType
    if (!activityType) newErrors.activityType = 'Activity type is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage
      if (!userId) {
        alert('User is not logged in.');
        return;
      }

      try {
        // Call the mutation to create the activity
        const response = await createActivity({
          variables: {
            createActivityInput: {
              activityType,
              userId: Number(userId), // Ensure userId is a number
              partnershipIds: [Number(sessionStorage.getItem('partnershipId'))], // Retrieve partnershipId from sessionStorage
            },
          },
        });

        if (response.data) {
          alert('Activity added successfully!');
          // Optionally, redirect or update state here
        }
      } catch (e) {
        console.error(e);
        alert('An error occurred while adding the activity.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">
                Activity Type
              </label>
              <input
                type="text"
                id="activityType"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter activity type"
              />
              {errors.activityType && <p className="text-[#FF77B7] text-sm mt-1">{errors.activityType}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#FEEC37] text-[#654321] py-2 rounded hover:bg-[#FFA24C] transition-colors"
            >
              Add Activity
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Want to go back?{' '}
            <Link href="/activities" className="text-[#FF77B7] hover:underline">
              View Activities
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddActivityPage;
