'use client';

import { useEffect, useState } from 'react';

type Movie = {
  id: number;
  title: string;
  genre: string;
  priority: 'low' | 'medium' | 'high';
};

const MovieManager: React.FC = () => {
  const sampleMovies: Movie[] = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', priority: 'high' },
    { id: 2, title: 'The Godfather', genre: 'Crime', priority: 'medium' },
    { id: 3, title: 'Finding Nemo', genre: 'Animation', priority: 'low' },
  ];

  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    priority: 'low' as 'low' | 'medium' | 'high',
  });

  useEffect(() => {
    if (currentMovie) {
      setFormData({
        title: currentMovie.title,
        genre: currentMovie.genre,
        priority: currentMovie.priority,
      });
      window.scrollTo({ top: 90, behavior: 'smooth' });
    }
  }, [currentMovie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMovie) {
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === currentMovie.id ? { ...movie, ...formData } : movie
        )
      );
      alert('Movie updated successfully');
    } else {
      const newMovie: Movie = {
        id: movies.length + 1,
        ...formData,
      };
      setMovies((prev) => [...prev, newMovie]);
      alert('Movie added successfully');
    }
    setFormData({ title: '', genre: '', priority: 'low' });
    setCurrentMovie(null);
  };

  const handleEdit = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const handleDelete = (id: number) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
    alert('Movie deleted successfully');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {currentMovie ? 'Edit Movie' : 'Add New Movie'}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {currentMovie ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Movies List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Priority:</strong> {movie.priority}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(movie)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieManager;
