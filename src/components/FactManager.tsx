'use client';

import { useState } from 'react';

interface Fact {
  id: number;
  factText: string;
  importance: number;
  user: string;
  dateAdded: string;
}

const FactManager: React.FC = () => {
  const sampleFacts: Fact[] = [
    {
      id: 1,
      factText: 'The Earth orbits the Sun.',
      importance: 5,
      user: 'Alice',
      dateAdded: '2024-11-01',
    },
    {
      id: 2,
      factText: 'Water boils at 100°C.',
      importance: 4,
      user: 'Bob',
      dateAdded: '2024-11-02',
    },
    {
      id: 3,
      factText: 'Honey never spoils.',
      importance: 3,
      user: 'Charlie',
      dateAdded: '2024-11-03',
    },
  ];

  const [facts, setFacts] = useState<Fact[]>(sampleFacts);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [formData, setFormData] = useState({
    factText: '',
    importance: 1,
    user: '',
    dateAdded: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentFact) {
      // Update fact
      const updatedFact: Fact = {
        ...currentFact,
        ...formData,
        importance: parseInt(formData.importance.toString(), 10),
      };
      setFacts((prev) =>
        prev.map((fact) => (fact.id === currentFact.id ? updatedFact : fact))
      );
      alert('Fact updated successfully!');
    } else {
      // Add new fact
      const newFact: Fact = {
        id: facts.length + 1,
        ...formData,
        importance: parseInt(formData.importance.toString(), 10),
      };
      setFacts((prev) => [...prev, newFact]);
      alert('Fact added successfully!');
    }

    // Reset form
    setFormData({
      factText: '',
      importance: 1,
      user: '',
      dateAdded: '',
    });
    setCurrentFact(null);
  };

  const handleEdit = (fact: Fact) => {
    setCurrentFact(fact);
    setFormData({ ...fact });
    window.scrollTo({ top: 90, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setFacts((prev) => prev.filter((fact) => fact.id !== id));
    alert('Fact deleted successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fact Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {currentFact ? 'Edit Fact' : 'Add New Fact'}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Fact Text</label>
          <input
            type="text"
            name="factText"
            value={formData.factText}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
            placeholder="Enter the fact"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Importance (1 to 5)</label>
          <input
            type="number"
            name="importance"
            value={formData.importance}
            onChange={handleChange}
            min={1}
            max={5}
            required
            className="border rounded-md p-2 w-full"
            placeholder="Importance (1 to 5)"
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
            placeholder="User who added the fact"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date Added</label>
          <input
            type="date"
            name="dateAdded"
            value={formData.dateAdded}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {currentFact ? 'Update Fact' : 'Add Fact'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Facts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facts.map((fact) => (
          <div key={fact.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{fact.factText}</h3>
            <p><strong>Importance:</strong> {fact.importance}</p>
            <p><strong>User:</strong> {fact.user}</p>
            <p><strong>Date Added:</strong> {fact.dateAdded}</p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(fact)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(fact.id)}
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

export default FactManager;
