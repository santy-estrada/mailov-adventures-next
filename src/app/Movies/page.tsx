'use client';

import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  genre: string;
  priority: 'low' | 'medium' | 'high';
  dateAdded: string;
}

const MoviesPage: React.FC = () => {
  // Sample movie data
  const initialMovies: Movie[] = [
    {
      id: '1',
      title: 'The Shawshank Redemption',
      genre: 'Drama',
      priority: 'high',
      dateAdded: '2024-01-01',
    },
    {
      id: '2',
      title: 'Inception',
      genre: 'Sci-Fi',
      priority: 'medium',
      dateAdded: '2024-02-01',
    },
    {
      id: '3',
      title: 'The Dark Knight',
      genre: 'Action',
      priority: 'high',
      dateAdded: '2024-03-01',
    },
  ];

  const genreVector = Array.from(new Set(initialMovies.map((movie) => movie.genre)));
  const [filters, setFilters] = useState({
    genre: 'All',
    priority: 'All',
  });

  const [allMovies, setAllMovies] = useState<Movie[]>(initialMovies);
  const [editMode, setEditMode] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const filteredMovies = allMovies.filter((movie) => {
    const matchesGenre = filters.genre === 'All' || movie.genre === filters.genre;
    const matchesPriority = filters.priority === 'All' || movie.priority === filters.priority;
    return matchesGenre && matchesPriority;
  });

  const handleEdit = (movie: Movie) => {
    setCurrentMovie(movie);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (updatedMovie: Movie) => {
    setAllMovies((prev) =>
      prev.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    );
    setEditMode(false);
    setCurrentMovie(null);
  };

  const clearFilters = () => {
    setFilters({
      genre: 'All',
      priority: 'All',
    });
  };

  const handleDelete = (movie: Movie) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      setAllMovies((prev) => prev.filter((m) => m.id !== movie.id));
      alert('Movie deleted successfully!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Films that move us:</h1>

          {/* Add Movie Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/Movies/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Movie
            </Link>

            <button
              className="bg-[#FEEC37] text-[#654321] px-4 py-2 rounded-md hover:bg-[#FFA24C] transition-colors"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded bg-white"
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            >
              <option value="All">All Genres</option>
              {genreVector.length > 0 ? (
                genreVector.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))
              ) : (
                <option value="No genres available">No genres available</option>
              )}
            </select>

            <select
              className="p-2 border rounded bg-white"
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="All">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Movie Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMovies.length === 0 ? (
              <p className="text-[#654321]">No movies match your filters.</p>
            ) : (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

          {/* Edit Movie Form */}
          {editMode && currentMovie && (
            <div className="mt-12 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-[#654321] mb-4">Edit Movie</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentMovie);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1">Title</label>
                  <input
                    type="text"
                    value={currentMovie.title}
                    onChange={(e) =>
                      setCurrentMovie({ ...currentMovie, title: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Genre</label>
                  <input
                    type="text"
                    value={currentMovie.genre}
                    onChange={(e) =>
                      setCurrentMovie({ ...currentMovie, genre: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Priority</label>
                  <select
                    value={currentMovie.priority}
                    onChange={(e) =>
                      setCurrentMovie({ ...currentMovie, priority: e.target.value as 'low' | 'medium' | 'high' })
                    }
                    className="p-2 border rounded w-full"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
                onClick={() => handleDelete(currentMovie)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
              >
                Delete Movie
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MoviesPage;
