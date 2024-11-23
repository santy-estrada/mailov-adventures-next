'use client';

import '@/styles/globals.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/NonLoggedNavbar';
import { LOGIN_MUTATION } from '@/api/login';
import { GET_USER_PARTNERSHIP } from '@/api/user';
import { useMutation } from '@apollo/client';
import { LoginDto } from '@/types/login';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    setLoginError('');
    try {
      const input: LoginDto = { email, password };
      const { data } = await login({
        variables: { input },
      });
      if (data?.login?.accessToken && data?.login?.userId) {
        console.log('Login successful:', data.login.accessToken);
        
        // Store accessToken and userId in sessionStorage
        sessionStorage.setItem('accessToken', data.login.accessToken);
        sessionStorage.setItem('userId', data.login.userId.toString()); 
        console.log('User ID:', sessionStorage.getItem('userId'));
        console.log('Access Token:', sessionStorage.getItem('accessToken'));
        alert('Logged in successfully!');
        
        window.location.href = '/partnerships'; // Redirect to the partnerships page
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#B1D690]">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {loginError && <p className="text-[#FF77B7] text-sm mt-1">{loginError}</p>}
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
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4C200] text-white px-6 py-2 rounded hover:bg-[#C5B200] transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{' '}
            <Link href="/auth/register" className="text-[#FF77B7] hover:underline">
              Create a new user
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
