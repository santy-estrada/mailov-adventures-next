'use client';

import { useState } from 'react';

interface Question {
  id: number;
  questionText: string;
  category: string;
  answer: string | null;
  user: string;
  dateAsked: string;
}

const QuestionManager: React.FC = () => {
  const sampleQuestions: Question[] = [
    {
      id: 1,
      questionText: 'What is the meaning of life?',
      category: 'Philosophy',
      answer: '42',
      user: 'Alice',
      dateAsked: '2024-11-01',
    },
    {
      id: 2,
      questionText: 'What is your favorite color?',
      category: 'Personal',
      answer: null,
      user: 'Bob',
      dateAsked: '2024-11-02',
    },
    {
      id: 3,
      questionText: 'How do you cook pasta?',
      category: 'Cooking',
      answer: 'Boil water, add pasta, cook for 10 minutes.',
      user: 'Charlie',
      dateAsked: '2024-11-03',
    },
  ];

  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState<{
    questionText: string;
    category: string;
    answer: string | null;
    user: string;
    dateAsked: string;
  }>({
    questionText: '',
    category: '',
    answer: '',
    user: '',
    dateAsked: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentQuestion) {
      // Update question
      const updatedQuestion: Question = {
        ...currentQuestion,
        ...formData,
        answer: formData.answer || null,
      };
      setQuestions((prev) =>
        prev.map((question) =>
          question.id === currentQuestion.id ? updatedQuestion : question
        )
      );
      alert('Question updated successfully!');
    } else {
      // Add new question
      const newQuestion: Question = {
        id: questions.length + 1,
        ...formData,
        answer: formData.answer || null,
      };
      setQuestions((prev) => [...prev, newQuestion]);
      alert('Question added successfully!');
    }

    // Reset form
    setFormData({
      questionText: '',
      category: '',
      answer: '',
      user: '',
      dateAsked: '',
    });
    setCurrentQuestion(null);
  };

  const handleEdit = (question: Question) => {
    setCurrentQuestion(question);
    setFormData({ ...question });
    window.scrollTo({ top: 90, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
    alert('Question deleted successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Question Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {currentQuestion ? 'Edit Question' : 'Add New Question'}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Question</label>
          <input
            type="text"
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
            placeholder="The question must end with '?'"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Answer</label>
          <input
            type="text"
            name="answer"
            value={formData.answer ?? ''}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Leave empty if not answered"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">User</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date Asked</label>
          <input
            type="date"
            name="dateAsked"
            value={formData.dateAsked}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {currentQuestion ? 'Update Question' : 'Add Question'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => (
          <div key={question.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{question.questionText}</h3>
            <p><strong>Category:</strong> {question.category}</p>
            <p><strong>Answer:</strong> {question.answer || 'Not Answered'}</p>
            <p><strong>User:</strong> {question.user}</p>
            <p><strong>Date Asked:</strong> {question.dateAsked}</p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(question)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(question.id)}
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

export default QuestionManager;
