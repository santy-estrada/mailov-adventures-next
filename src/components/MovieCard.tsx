import React from 'react';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    genre: string;
    priority: 'low' | 'medium' | 'high';
    dateAdded: string;
  };
  onEdit: (movie: MovieCardProps['movie']) => void;
  onDelete: (movie: MovieCardProps['movie']) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-[#654321]">{movie.title}</h3>
      <p className="text-[#654321] mt-2">
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Priority:</strong> {movie.priority}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Added:</strong> {movie.dateAdded}
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded-md hover:bg-[#FF77B7] transition-colors"
          onClick={() => onEdit(movie)}
        >
          Edit
        </button>

      </div>
    </div>
  );
};

export default MovieCard;
