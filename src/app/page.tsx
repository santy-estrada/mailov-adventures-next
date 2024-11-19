'use client';

import '@/styles/global.css';
import React from 'react';
import Navbar from '@/components/NonLoggedNavbar';
import Footer from '@/components/Footer';
import Pet from '@/components/Pet';

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-[#FF77B7] font-nunito">
        Mailov Adventures
      </h1>


        <div className="w-full max-w-3xl h-[500px]">
          <Pet src="https://sketchfab.com/models/faef9fe5ace445e7b2989d1c1ece361c/embed" />
        </div>

      </main>
      <Footer />
    </div>
  );
}
