'use client';

import React, { useState } from 'react';
import Embed3DModel from '@/components/Pet'; // Assuming this is the path of Embed3DModel

interface Pet {
  id: number;
  name: string;
  type: string;
  hungerLevel: number;
  happinessLevel: number;
  users: string[]; // The two users who have the pet
  lastFedDate: string;
  src: string; // URL of the embedded 3D model
}

const PetManager: React.FC = () => {
  const samplePets: Pet[] = [
    {
      id: 1,
      name: 'Fluffy',
      type: 'Dog',
      hungerLevel: 2,
      happinessLevel: 8,
      users: ['Alice', 'Bob'],
      lastFedDate: '2024-11-15',
      src: 'https://sketchfab.com/models/faef9fe5ace445e7b2989d1c1ece361c/embed',
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Cat',
      hungerLevel: 5,
      happinessLevel: 6,
      users: ['Charlie', 'Dave'],
      lastFedDate: '2024-11-20',
      src: 'https://sketchfab.com/models/726067b21dcc439895aec9c3d2410881/embed',
    },
  ];

  const [pets, setPets] = useState<Pet[]>(samplePets);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    hungerLevel: 1,
    happinessLevel: 1,
    users: ['', ''],
    lastFedDate: '',
    src: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentPet) {
      // Update pet
      const updatedPet: Pet = {
        ...currentPet,
        ...formData,
        hungerLevel: parseInt(formData.hungerLevel.toString(), 10),
        happinessLevel: parseInt(formData.happinessLevel.toString(), 10),
      };
      setPets((prev) =>
        prev.map((pet) => (pet.id === currentPet.id ? updatedPet : pet))
      );
      alert('Pet updated successfully!');
    } else {
      // Add new pet
      const newPet: Pet = {
        id: pets.length + 1,
        ...formData,
        hungerLevel: parseInt(formData.hungerLevel.toString(), 10),
        happinessLevel: parseInt(formData.happinessLevel.toString(), 10),
      };
      setPets((prev) => [...prev, newPet]);
      alert('Pet added successfully!');
    }

    // Reset form
    setFormData({
      name: '',
      type: '',
      hungerLevel: 1,
      happinessLevel: 1,
      users: ['', ''],
      lastFedDate: '',
      src: '',
    });
    setCurrentPet(null);
  };

  const handleEdit = (pet: Pet) => {
    setCurrentPet(pet);
    setFormData({ ...pet });
    window.scrollTo({ top: 90, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    alert('Pet deleted successfully!');
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Pet Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {currentPet ? 'Edit Pet' : 'Add New Pet'}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
            placeholder="Enter pet's name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
            placeholder="Enter pet's type (e.g., Dog, Cat)"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Hunger Level (0 to 999)</label>
          <input
            type="number"
            name="hungerLevel"
            value={formData.hungerLevel}
            onChange={handleChange}
            min={0}
            max={999}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Happiness Level (0 to 999)</label>
          <input
            type="number"
            name="happinessLevel"
            value={formData.happinessLevel}
            onChange={handleChange}
            min={0}
            max={999}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Users (Comma Separated)</label>
          <input
            type="text"
            name="users"
            value={formData.users.join(', ')}
            onChange={(e) =>
              setFormData({ ...formData, users: e.target.value.split(', ') })
            }
            required
            className="border rounded-md p-2 w-full"
            placeholder="Enter pet owners"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Last Fed Date</label>
          <input
            type="date"
            name="lastFedDate"
            value={formData.lastFedDate}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">3D Model URL</label>
          <input
            type="url"
            name="src"
            value={formData.src}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
            placeholder="Enter URL for 3D model"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {currentPet ? 'Update Pet' : 'Add Pet'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto flex-grow">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white p-4 rounded shadow-md flex flex-col">
            <div className="flex justify-center mb-4">
              <Embed3DModel src={pet.src} />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Hunger Level:</strong> {pet.hungerLevel}</p>
              <p><strong>Happiness Level:</strong> {pet.happinessLevel}</p>
              <p><strong>Users:</strong> {pet.users.join(', ')}</p>
              <p><strong>Last Fed:</strong> {pet.lastFedDate}</p>
            </div>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(pet)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pet.id)}
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

export default PetManager;
