import React from 'react';
import { DateIdea } from '@/types/date';

interface DateIdeaCardProps {
  dateIdea: DateIdea; // Use your defined type for better consistency
  onEdit: (dateIdea: DateIdea) => void;
  onToggleDone: (id: string) => void;
}

const DateIdeaCard: React.FC<DateIdeaCardProps> = ({ dateIdea, onEdit, onToggleDone }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-[#654321]">{dateIdea.idea}</h3>
      <p className="text-[#654321] mt-2">
        <strong>Category:</strong> {dateIdea.category}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Enthusiasm:</strong> {dateIdea.enthusiasm}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Added:</strong> {new Date(dateIdea.dateAdded).toLocaleDateString()}
      </p>
      {dateIdea.review && (
        <p className="text-[#654321] mt-2">
          <strong>Review:</strong> {dateIdea.review}
        </p>
      )}
      <p className={`mt-4 font-semibold ${dateIdea.done ? 'text-green-500' : 'text-red-500'}`}>
        {dateIdea.done ? 'Completed' : 'Not Completed'}
      </p>
      <div className="flex justify-between mt-4">
        {/* Edit Button */}
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded hover:bg-orange-600"
          onClick={() => onEdit(dateIdea)}
        >
          Edit
        </button>

        {/* Toggle Done Button */}
        <button
          className={`px-3 py-1 rounded ${
            dateIdea.done ? 'bg-red-400 hover:bg-red-500' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
          onClick={() => onToggleDone(dateIdea.id.toString())}
        >
          {dateIdea.done ? 'Mark as Not Done' : 'Mark as Done'}
        </button>
      </div>
    </div>
  );
};

export default DateIdeaCard;
