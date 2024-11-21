import React from 'react';

interface QuestionCardProps {
  question: {
    id: string;
    questionText: string;
    category: string;
    answer: string | null;
    dateAsked: string;
    user: string;
  };
  onEdit: (question: QuestionCardProps['question']) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onEdit }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-[#654321]">{question.questionText}</h3>
      <p className="text-[#654321] mt-2">
        <strong>Category:</strong> {question.category}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Asked:</strong> {question.dateAsked}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Asked by:</strong> {question.user}
      </p>

      {/* Display answer only if it is not null */}
      {question.answer && (
        <p className="mt-2">
          <strong>Answer:</strong> <span className="text-green-500">{question.answer}</span>
        </p>
      )}

      <p className={`mt-2 font-semibold ${question.answer ? 'text-green-500' : 'text-red-500'}`}>
        {question.answer ? 'Answered' : 'Not Answered'}
      </p>

      <div className="flex justify-between mt-4">
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded hover:bg-orange-600"
          onClick={() => onEdit(question)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
