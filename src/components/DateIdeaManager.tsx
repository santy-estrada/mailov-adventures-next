'use client';

import { useState } from 'react';

interface DateIdea {
  id: number;
  idea: string;
  category: string;
  review: string | null;
  enthusiasm: number;
  done: boolean;
  user: string;
  dateAdded: string;
}

const DateIdeaManager: React.FC = () => {
  const sampleDateIdeas: DateIdea[] = [
    {
      id: 1,
      idea: 'Picnic in the park',
      category: 'Outdoor',
      review: 'It was amazing!',
      enthusiasm: 750,
      done: true,
      user: 'Alice',
      dateAdded: '2024-11-01',
    },
    {
      id: 2,
      idea: 'Cooking together',
      category: 'Indoor',
      review: null,
      enthusiasm: 500,
      done: false,
      user: 'Bob',
      dateAdded: '2024-11-10',
    },
    {
      id: 3,
      idea: 'Visit a museum',
      category: 'Cultural',
      review: 'Very informative.',
      enthusiasm: 600,
      done: true,
      user: 'Charlie',
      dateAdded: '2024-11-15',
    },
  ];

  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>(sampleDateIdeas);
  const [currentIdea, setCurrentIdea] = useState<DateIdea | null>(null);
  const [formData, setFormData] = useState({
    idea: '',
    category: '',
    review: '',
    enthusiasm: 0,
    done: false,
    user: '',
    dateAdded: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentIdea) {
      // Update existing idea
      const updatedIdea: DateIdea = {
        ...currentIdea,
        ...formData,
        enthusiasm: Number(formData.enthusiasm),
      };
      setDateIdeas((prev) =>
        prev.map((idea) => (idea.id === currentIdea.id ? updatedIdea : idea))
      );
      alert('Date idea updated successfully!');
    } else {
      // Add new date idea
      const newIdea: DateIdea = {
        id: dateIdeas.length + 1,
        ...formData,
        enthusiasm: Number(formData.enthusiasm),
        dateAdded: new Date().toISOString().split('T')[0],
      };
      setDateIdeas((prev) => [...prev, newIdea]);
      alert('Date idea added successfully!');
    }

    // Reset form
    setFormData({
      idea: '',
      category: '',
      review: '',
      enthusiasm: 0,
      done: false,
      user: '',
      dateAdded: '',
    });
    setCurrentIdea(null);
  };

  const handleEdit = (idea: DateIdea) => {
    setCurrentIdea(idea);
    setFormData({ ...idea, review: idea.review || '' });
    window.scrollTo({ top: 90, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setDateIdeas((prev) => prev.filter((idea) => idea.id !== id));
    alert('Date idea deleted successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Date Idea Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {currentIdea ? 'Edit Date Idea' : 'Add New Date Idea'}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Idea</label>
          <textarea
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
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
          <label className="block mb-1">Review</label>
          <textarea
            name="review"
            value={formData.review || ''}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Enthusiasm</label>
          <input
            type="number"
            name="enthusiasm"
            value={formData.enthusiasm}
            onChange={handleChange}
            required
            min={0}
            max={999}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Done</label>
          <input
            type="checkbox"
            name="done"
            checked={formData.done}
            onChange={handleChange}
            className="mr-2"
          />
          Completed
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {currentIdea ? 'Update Date Idea' : 'Add Date Idea'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Date Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dateIdeas.map((idea) => (
          <div key={idea.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{idea.idea}</h3>
            <p>
              <strong>Category:</strong> {idea.category}
            </p>
            <p>
              <strong>Review:</strong> {idea.review || 'No review yet'}
            </p>
            <p>
              <strong>Enthusiasm:</strong> {idea.enthusiasm}
            </p>
            <p>
              <strong>Done:</strong> {idea.done ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>User:</strong> {idea.user}
            </p>
            <p>
              <strong>Date Added:</strong> {idea.dateAdded}
            </p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(idea)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(idea.id)}
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

export default DateIdeaManager;
