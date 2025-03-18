'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import DateIdeaCard from '@/components/DateIdeaCard';
import Link from 'next/link';
import { DateIdea } from '@/types/date';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REVIEW, GET_DATE_IDEAS_PER_PARTNERSHIP, SET_AS_DONE } from '@/api/date';


const DateIdeasPage: React.FC = () => {
  const [partnershipId, setPartnershipId] = useState<number | null>(null);

  useEffect(() => {
    const storedId = sessionStorage.getItem('partnershipId');
    if (storedId) {
      setPartnershipId(Number(storedId));
    }
  }, []);

  const { loading, error, data } = useQuery(GET_DATE_IDEAS_PER_PARTNERSHIP, {
    skip: partnershipId === null, // Prevent running the query before partnershipId is set
    variables: { partnershipId },
  });
  const [filters, setFilters] = useState({
    category: 'All',
    done: 'All',
    enthusiasm: 'desc', // 'asc' or 'desc' for sorting
  });

  const [allDateIdeas, setAllDateIdeas] = useState<DateIdea[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentDateIdea, setCurrentDateIdea] = useState<DateIdea | null>(null);
  const [setAsDone] = useMutation(SET_AS_DONE);
  const [addReview] = useMutation(ADD_REVIEW);

  useEffect(() => {
    if (data?.dateIdeasForPartnership) {
      setAllDateIdeas(data.dateIdeasForPartnership);
      
      // Extract unique categories from the date ideas
      const uniqueCategories = [
        ...new Set(data.dateIdeasForPartnership.map((idea: DateIdea) => idea.category)),
      ];
      setCategories(uniqueCategories as string[]);
    }
  }, [data]);

  // Filter and sort the date ideas
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

  const handleSave = async (updatedDateIdea: DateIdea) => {
    try {
      const { data } = await addReview({
        variables: {
          id: updatedDateIdea.id, // Pass the ID of the DateIdea
          updateDateIdeaInput: {
            review: updatedDateIdea.review, // Pass the updated review
            // Include other fields if needed, like category, enthusiasm
          },
        },
      });

      if (data.updateDateIdea) {
        // Update the local state to reflect the updated review
        setAllDateIdeas((prev) =>
          prev.map((idea) =>
            idea.id === updatedDateIdea.id ? { ...idea, review: data.updateDateIdea.review } : idea
          )
        );
        setEditMode(false);
        setCurrentDateIdea(null);
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleToggleDone = async (id: string) => {
    const dateIdea = allDateIdeas.find((idea) => idea.id.toString() === id);

    if (!dateIdea) return;

    try {
      const { data } = await setAsDone({
        variables: {
          id: Number(dateIdea.id), // Pass the id
          updateDateIdeaInput: { done: !dateIdea.done }, // Toggle done status
        },
      });

      if (data.updateDateIdea) {
        setAllDateIdeas((prev) =>
          prev.map((idea) =>
            idea.id === dateIdea.id ? { ...idea, done: data.updateDateIdea.done } : idea
          )
        );
      }
    } catch (error) {
      console.error('Error toggling done status:', error);
    }
  };


  if (loading) return <p>Loading date ideas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Ideas for an eternal honeymoon phase</h1>

          {/* Add Date Idea Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/date-idea/new"
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
