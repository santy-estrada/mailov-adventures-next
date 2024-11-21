'use client';

import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar'; // Updated to logged navbar
import Footer from '@/components/Footer';
import Embed3DModel from '@/components/Pet'; // Component for the 3D render
import Link from 'next/link'; // Import Link for navigation
import '@/styles/globals.css';

const PetPage = () => {
  // Sample data for the pet
  const pet = {
    name: 'World Destroyer',
    type: 'Shiba Inu',
    hungerLevel: 250,
    happinessLevel: 500,
    lastFedDate: '2024-11-19',
    petModelSrc: 'https://sketchfab.com/models/faef9fe5ace445e7b2989d1c1ece361c/embed', // 3D pet model URL
    user1: "Patootie",
    user2: "Patoot"
  };

  // If there's no pet, set this flag
  const isPetAvailable = pet?.name && pet?.type;

  const [hungerLevel, setHungerLevel] = useState(pet.hungerLevel);
  const [lastFedDate, setLastFedDate] = useState(pet.lastFedDate);

  const feedPet = () => {
    if (hungerLevel > 0) {
      setHungerLevel(hungerLevel - 1);
      setLastFedDate(new Date().toLocaleDateString());
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center space-y-6 relative">
        {/* New Pet Link */}
        <Link
          href="/Pets/new"
          className="absolute top-6 right-6 bg-[#FF77B7] text-white px-6 py-2 rounded hover:bg-[#FF4081] transition-colors"
        >
          New Pet
        </Link>

        {isPetAvailable ? (
          <>
            <h1 className="text-3xl font-bold text-[#654321]">
              {pet.user1}'s and {pet.user2}'s Cutie Patootie
            </h1>
            <div className="flex items-center space-x-12">
              {/* 3D Pet Model */}
              <div className="w-96 h-96">
                <Embed3DModel src={pet.petModelSrc} />
              </div>

              {/* Pet Details */}
              <div className="w-1/2 text-left">
                <p className="text-lg font-medium text-[#654321]">
                  <strong>Name:</strong> {pet.name}
                </p>
                <p className="text-lg font-medium text-[#654321]">
                  <strong>Type:</strong> {pet.type}
                </p>
                <p className="text-lg font-medium text-[#654321]">
                  <strong>Hunger Level:</strong> {hungerLevel} / 999
                </p>
                <p className="text-lg font-medium text-[#654321]">
                  <strong>Happiness Level:</strong> {pet.happinessLevel} / 999
                </p>
                <p className="text-lg font-medium text-[#654321]">
                  <strong>Last Fed:</strong> {lastFedDate}
                </p>
                <button
                  onClick={feedPet}
                  className="mt-4 bg-[#FEEC37] text-[#654321] py-2 px-6 rounded hover:bg-[#FFA24C] transition-colors"
                >
                  Feed the Pet
                </button>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-[#654321]">
            Oh oh, seems like someone is afraid of commitment...
          </h2>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PetPage;
