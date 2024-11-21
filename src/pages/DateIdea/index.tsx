'use client';

import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import DateIdeaCard from '@/components/DateIdeaCard';
import Link from 'next/link';

interface DateIdea {
  id: string;
  idea: string;
  category: string;
  review: string | null;
  enthusiasm: number;
  done: boolean;
  user: string;
  dateAdded: string;
}

const DateIdeasPage: React.FC = () => {
  // Sample date idea data
  const initialDateIdeas: DateIdea[] = [
    {
      id: '1',
      idea: 'Go for a hike in the mountains.',
      category: 'Adventure',
      review: null,
      enthusiasm: 8,
      done: false,
      user: 'User1',
      dateAdded: '2024-01-01',
    },
    {
      id: '2',
      idea: 'Dinner at a fancy restaurant.',
      category: 'Romantic',
      review: 'Amazing food and ambiance.',
      enthusiasm: 7,
      done: true,
      user: 'User2',
      dateAdded: '2024-02-01',
    },
    {
      id: '3',
      idea: 'Watch a movie at the cinema.',
      category: 'Casual',
      review: null,
      enthusiasm: 5,
      done: false,
      user: 'User1',
      dateAdded: '2024-03-01',
    },
  ];

  const categories = ['Adventure', 'Romantic', 'Casual'];

  const [filters, setFilters] = useState({
    category: 'All',
    done: 'All',
    enthusiasm: 'desc', // 'asc' or 'desc' for sorting
  });

  const [allDateIdeas, setAllDateIdeas] = useState<DateIdea[]>(initialDateIdeas);
  const [editMode, setEditMode] = useState(false);
  const [currentDateIdea, setCurrentDateIdea] = useState<DateIdea | null>(null);

  // Filter date ideas based on the selected filters
  const filteredDateIdeas = allDateIdeas
    .filter((idea) => {
      const matchesCategory = filters.category === 'All' || idea.category === filters.category;
      const matchesDone = filters.done === 'All' || (filters.done === 'true' ? idea.done : !idea.done);
      return matchesCategory && matchesDone;
    })
    .sort((a, b) => {
      if (filters.enthusiasm === 'asc') {
        return a.enthusiasm - b.enthusiasm;
      } else {
        return b.enthusiasm - a.enthusiasm;
      }
    });

  const handleClearFilters = () => {
    setFilters({
      category: 'All',
      done: 'All',
      enthusiasm: 'desc',
    });
  };

  const handleEdit = (dateIdea: DateIdea) => {
    setCurrentDateIdea(dateIdea);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (updatedDateIdea: DateIdea) => {
    setAllDateIdeas((prev) =>
      prev.map((idea) => (idea.id === updatedDateIdea.id ? updatedDateIdea : idea))
    );
    setEditMode(false);
    setCurrentDateIdea(null);
  };

  const handleDelete = (dateIdea: DateIdea) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this date idea?');
    if (confirmDelete) {
      const updatedDateIdea = { ...dateIdea, done: false }; // Mark as inactive instead of deletion
      setAllDateIdeas((prev) =>
        prev.map((idea) => (idea.id === dateIdea.id ? updatedDateIdea : idea))
      );
      alert('Date Idea deactivated successfully!');
    }
  };

  // Toggle the 'done' status of a date idea
  const handleToggleDone = (id: string) => {
    setAllDateIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, done: !idea.done } : idea
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Ideas for an eternal honeymoon phase</h1>

          {/* Add Date Idea Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/DateIdea/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Date Idea
            </Link>

            <button
              className="bg-[#FEEC37] text-[#654321] px-4 py-2 rounded-md hover:bg-[#FFA24C] transition-colors"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded bg-white"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="All">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              className="p-2 border rounded bg-white"
              value={filters.done}
              onChange={(e) => setFilters({ ...filters, done: e.target.value })}
            >
              <option value="All">All</option>
              <option value="true">Done</option>
              <option value="false">Not Done</option>
            </select>

            <select
              className="p-2 border rounded bg-white"
              value={filters.enthusiasm}
              onChange={(e) => setFilters({ ...filters, enthusiasm: e.target.value })}
            >
              <option value="desc">Highest Enthusiasm</option>
              <option value="asc">Lowest Enthusiasm</option>
            </select>
          </div>

          {/* Date Idea Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredDateIdeas.length === 0 ? (
              <p className="text-[#654321]">No date ideas match your filters.</p>
            ) : (
              filteredDateIdeas.map((idea) => (
                <DateIdeaCard
                  key={idea.id}
                  dateIdea={idea}
                  onEdit={handleEdit}
                  onToggleDone={handleToggleDone} // Pass the function here
                />
              ))
            )}
          </div>

          {/* Edit Date Idea Form */}
          {editMode && currentDateIdea && (
            <div className="mt-12 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-[#654321] mb-4">Edit Date Idea</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentDateIdea);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1">Idea</label>
                  <input
                    type="text"
                    value={currentDateIdea.idea}
                    onChange={(e) =>
                      setCurrentDateIdea({ ...currentDateIdea, idea: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Category</label>
                  <input
                    type="text"
                    value={currentDateIdea.category}
                    onChange={(e) =>
                      setCurrentDateIdea({ ...currentDateIdea, category: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Review</label>
                  <textarea
                    value={currentDateIdea.review || ''}
                    onChange={(e) =>
                      setCurrentDateIdea({ ...currentDateIdea, review: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Enthusiasm</label>
                  <input
                    type="number"
                    value={currentDateIdea.enthusiasm}
                    onChange={(e) =>
                      setCurrentDateIdea({ ...currentDateIdea, enthusiasm: +e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <button type="submit" className="bg-[#FF77B7] text-white px-4 py-2 rounded-md">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DateIdeasPage;
