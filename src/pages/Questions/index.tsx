'use client';
import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import QuestionCard from '@/components/QuestionCard';
import Link from 'next/link';

interface Question {
  id: string;
  questionText: string;
  category: string;
  answer: string | null;
  dateAsked: string;
  user: string;
}

interface QuestionsPageProps {
  categories: string[]; // Categories from backend or provided data
}

const QuestionsPage: React.FC<QuestionsPageProps> = ({ categories = [] }) => {
  // Sample question data
  const initialQuestions: Question[] = [
    {
      id: '1',
      questionText: 'What is your favorite color?',
      category: 'Personal',
      answer: 'Blue',
      dateAsked: '2024-11-10',
      user: 'User1',
    },
    {
      id: '2',
      questionText: 'Where do you see yourself in 5 years?',
      category: 'Future',
      answer: null,
      dateAsked: '2024-11-15',
      user: 'User2',
    },
    {
      id: '3',
      questionText: 'What is your favorite movie?',
      category: 'Entertainment',
      answer: 'Inception',
      dateAsked: '2024-11-18',
      user: 'User1',
    },
  ];

  // Dynamically extract unique categories from the question data
  const categoryVector = Array.from(new Set(initialQuestions.map((question) => question.category)));

  const [filters, setFilters] = useState({
    category: 'All',
    answered: 'All', // Filter for answered or not answered
  });

  const [allQuestions, setAllQuestions] = useState<Question[]>(initialQuestions);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const filteredQuestions = allQuestions.filter((question) => {
    const categoryMatch = filters.category === 'All' || question.category === filters.category;
    const answeredMatch =
      filters.answered === 'All' || (filters.answered === 'Answered' && question.answer !== null) || (filters.answered === 'Not Answered' && question.answer === null);
    return categoryMatch && answeredMatch;
  });

  const handleEdit = (question: Question) => {
    setCurrentQuestion(question);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (updatedQuestion: Question) => {
    // Prevent empty (whitespace only) answers
    if (updatedQuestion.answer?.trim() === '') {
        updatedQuestion.answer = '';
    }

    setAllQuestions((prev) =>
      prev.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
    setEditMode(false);
    setCurrentQuestion(null);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this question?');
    if (confirmed) {
      setAllQuestions((prev) => prev.filter((question) => question.id !== id));
    }
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      answered: 'All',
    });
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Questions to Know Each Other</h1>

          {/* Add Question Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/Questions/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Question
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
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="All">All Categories</option>
              {categoryVector.length > 0 ? (
                categoryVector.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))
              ) : (
                <option value="No categories available">No categories available</option>
              )}
            </select>
            <select
              className="p-2 border rounded bg-white ml-4"
              value={filters.answered}
              onChange={(e) => setFilters({ ...filters, answered: e.target.value })}
            >
              <option value="All">All Questions</option>
              <option value="Answered">Answered</option>
              <option value="Not Answered">Not Answered</option>
            </select>
          </div>

          {/* Question Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredQuestions.length === 0 ? (
              <p className="text-[#654321]">No questions match your filters.</p>
            ) : (
              filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} onEdit={handleEdit} />
              ))
            )}
          </div>

          {/* Edit Question Form */}
          {editMode && currentQuestion && (
            <div className="mt-12 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-[#654321] mb-4">Edit Question</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentQuestion);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1">Question Text</label>
                  <input
                    type="text"
                    value={currentQuestion.questionText}
                    onChange={(e) =>
                      setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Category</label>
                  <input
                    type="text"
                    value={currentQuestion.category}
                    onChange={(e) =>
                      setCurrentQuestion({ ...currentQuestion, category: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Answer</label>
                  <input
                    type="text"
                    value={currentQuestion.answer || ''}
                    onChange={(e) =>
                      setCurrentQuestion({ ...currentQuestion, answer: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-[#FEEC37] px-4 py-2 rounded text-[#654321] font-bold hover:bg-yellow-400"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 px-4 py-2 rounded text-white font-bold hover:bg-red-600"
                    onClick={() => handleDelete(currentQuestion.id)}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuestionsPage;
