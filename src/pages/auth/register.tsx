'use client';

import React, { useState } from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import Navbar from '@/components/NonLoggedNavbar';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!name) newErrors.name = 'Name is required.';
    // Validate email
    if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email address.';
    // Validate password
    if (!password) newErrors.password = 'Password is required.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Registration successful!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mt-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-[#FF77B7] text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-[#FF77B7] text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-[#FF77B7] text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 px-3 py-2 border rounded w-full focus:outline-none focus:border-[#FFA24C]"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-[#FF77B7] text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4C200] text-white px-6 py-2 rounded hover:bg-[#C5B200] transition-colors"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/auth" className="text-[#FF77B7] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
