'use client';

import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import FactCard from '@/components/FactCard';
import Link from 'next/link';

interface Fact {
  id: string;
  fact: string;
  importance: number;
  dateAdded: string;
  user: string;
}

const FactsPage: React.FC = () => {
  // Sample fact data
  const initialFacts: Fact[] = [
    {
      id: '1',
      fact: 'The Earth is round.',
      importance: 5,
      dateAdded: '2024-01-01',
      user: 'John Doe',
    },
    {
      id: '2',
      fact: 'Water boils at 100°C.',
      importance: 3,
      dateAdded: '2024-02-01',
      user: 'Jane Smith',
    },
    {
      id: '3',
      fact: 'Honey never spoils.',
      importance: 4,
      dateAdded: '2024-03-01',
      user: 'John Doe',
    },
  ];

  const [filters, setFilters] = useState({
    importance: 'All',
  });

  const [allFacts, setAllFacts] = useState<Fact[]>(initialFacts);
  const [editMode, setEditMode] = useState(false);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);

  const filteredFacts = allFacts.filter((fact) => {
    const matchesImportance =
      filters.importance === 'All' || fact.importance === parseInt(filters.importance);
    return matchesImportance;
  });

  const handleEdit = (fact: Fact) => {
    setCurrentFact(fact);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (updatedFact: Fact) => {
    setAllFacts((prev) =>
      prev.map((fact) => (fact.id === updatedFact.id ? updatedFact : fact))
    );
    setEditMode(false);
    setCurrentFact(null);
  };

  const clearFilters = () => {
    setFilters({
      importance: 'All',
    });
  };

  const handleDelete = (fact: Fact) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this fact?');
    if (confirmDelete) {
      setAllFacts((prev) => prev.filter((f) => f.id !== fact.id));
      alert('Fact deleted successfully!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Amazing Facts</h1>

          {/* Add Fact Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/Facts/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Fact
            </Link>

            <button
              className="bg-[#FEEC37] text-[#654321] px-4 py-2 rounded-md hover:bg-[#FFA24C] transition-colors"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <select
              className="p-2 border rounded bg-white"
              value={filters.importance}
              onChange={(e) => setFilters({ ...filters, importance: e.target.value })}
            >
              <option value="All">All Importance Levels</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  Importance {level}
                </option>
              ))}
            </select>
          </div>

          {/* Fact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredFacts.length === 0 ? (
              <p className="text-[#654321]">No facts match your filters.</p>
            ) : (
              filteredFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  fact={fact}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

          {/* Edit Fact Form */}
          {editMode && currentFact && (
            <div className="mt-12 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-[#654321] mb-4">Edit Fact</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentFact);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1">Fact</label>
                  <textarea
                    value={currentFact.fact}
                    onChange={(e) =>
                      setCurrentFact({ ...currentFact, fact: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Importance</label>
                  <select
                    value={currentFact.importance}
                    onChange={(e) =>
                      setCurrentFact({
                        ...currentFact,
                        importance: parseInt(e.target.value),
                      })
                    }
                    className="p-2 border rounded w-full"
                  >
                    {[1, 2, 3, 4, 5].map((level) => (
                      <option key={level} value={level}>
                        Importance {level}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-[#FEEC37] px-4 py-2 rounded text-[#654321] font-bold hover:bg-yellow-400"
                >
                  Save Changes
                </button>
              </form>
              <button
                onClick={() => handleDelete(currentFact)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
              >
                Delete Fact
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FactsPage;
