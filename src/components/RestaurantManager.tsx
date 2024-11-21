'use client';

import { useState } from 'react';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  dateAdded: string;
  extra: string;
  visited: boolean;
}

const RestaurantManager: React.FC = () => {
  const sampleRestaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Pizza Place',
      location: 'New York',
      cuisine: 'Italian',
      dateAdded: '2024-01-10',
      extra: 'Great for family gatherings.',
      visited: true,
    },
    {
      id: 2,
      name: 'Sushi World',
      location: 'Los Angeles',
      cuisine: 'Japanese',
      dateAdded: '2024-02-20',
      extra: 'A sushi lover\'s dream!',
      visited: false,
    },
    {
      id: 3,
      name: 'Burger Joint',
      location: 'Chicago',
      cuisine: 'American',
      dateAdded: '2024-03-15',
      extra: 'Best burgers in town!',
      visited: true,
    },
  ];

  const [restaurants, setRestaurants] = useState<Restaurant[]>(sampleRestaurants);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cuisine: '',
    dateAdded: '',
    extra: '',
    visited: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentRestaurant) {
      // Update restaurant
      const updatedRestaurant: Restaurant = {
        ...currentRestaurant,
        ...formData,
        visited: formData.visited,
      };
      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant.id === currentRestaurant.id ? updatedRestaurant : restaurant
        )
      );
      alert('Restaurant updated successfully!');
    } else {
      // Add new restaurant
      const newRestaurant: Restaurant = {
        id: restaurants.length + 1,
        ...formData,
        visited: formData.visited,
      };
      setRestaurants((prev) => [...prev, newRestaurant]);
      alert('Restaurant added successfully!');
    }

    // Reset form
    setFormData({
      name: '',
      location: '',
      cuisine: '',
      dateAdded: '',
      extra: '',
      visited: false,
    });
    setCurrentRestaurant(null);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setFormData({ ...restaurant });
    window.scrollTo({ top: 90, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
    alert('Restaurant deleted successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurant Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {currentRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
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
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
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
        <div className="mb-4">
          <label className="block mb-1">Extra Information</label>
          <textarea
            name="extra"
            value={formData.extra}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="visited"
              checked={formData.visited}
              onChange={handleChange}
              className="mr-2"
            />
            Visited
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {currentRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
            <p><strong>Date Added:</strong> {restaurant.dateAdded}</p>
            <p><strong>Visited:</strong> {restaurant.visited ? 'Yes' : 'No'}</p>
            <p><strong>Extra Information:</strong> {restaurant.extra}</p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(restaurant)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(restaurant.id)}
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

export default RestaurantManager;
