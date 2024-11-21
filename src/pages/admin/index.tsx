'use client';
import '@/styles/globals.css';
import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import ActivityManager from '@/components/ActivityManager';
import MovieManager from '@/components/MovieManager';
import DateIdeaManager from '@/components/DateIdeaManager';
import RestaurantManager from '@/components/RestaurantManager';
import QuestionManager from '@/components/QuestionManager';
import FactManager from '@/components/FactManager';
import PetManager from '@/components/PetManager';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('activities');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex space-x-4 mb-6">
          <button onClick={() => setActiveTab('activities')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Activities</button>
          <button onClick={() => setActiveTab('movies')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Movies</button>
          <button onClick={() => setActiveTab('dateIdeas')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Date Ideas</button>
          <button onClick={() => setActiveTab('restaurants')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Restaurants</button>
          <button onClick={() => setActiveTab('questions')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Questions</button>
          <button onClick={() => setActiveTab('facts')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Facts</button>
          <button onClick={() => setActiveTab('pets')} className="bg-gray-300 px-4 py-2 rounded-md">Manage Pets</button>
        </div>
        {activeTab === 'activities' && <ActivityManager />}
        {activeTab === 'movies' && <MovieManager />}
        {activeTab === 'dateIdeas' && <DateIdeaManager />}
        {activeTab === 'restaurants' && <RestaurantManager />}
        {activeTab === 'questions' && <QuestionManager />}
        {activeTab === 'facts' && <FactManager />}
        {activeTab === 'pets' && <PetManager />}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
