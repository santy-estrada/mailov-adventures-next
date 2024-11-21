import React from 'react';

interface FactCardProps {
  fact: {
    id: string;
    fact: string;
    importance: number;
    dateAdded: string;
    user: string;
  };
  onEdit: (fact: FactCardProps['fact']) => void;
  onDelete: (fact: FactCardProps['fact']) => void;
}

const FactCard: React.FC<FactCardProps> = ({ fact, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <p className="text-[#654321]">{fact.fact}</p>
      <p className="text-[#654321] mt-2">
        <strong>Importance:</strong> {fact.importance}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Added By:</strong> {fact.user}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Added:</strong> {fact.dateAdded}
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded-md hover:bg-[#FF77B7] transition-colors"
          onClick={() => onEdit(fact)}
        >
          Edit
        </button>

      </div>
    </div>
  );
};

export default FactCard;
