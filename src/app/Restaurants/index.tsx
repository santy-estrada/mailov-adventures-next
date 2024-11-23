'use client';
import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import RestaurantCard from '@/components/RestaurantCard';
import Link from 'next/link';

interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisineType: string;
  dateAdded: string;
  extraInfo: string;
  visited: boolean;
  active: boolean; // Add the active property
}

interface RestaurantsPageProps {
  locations: string[]; // Locations from backend or provided data
  cuisineTypes: string[]; // Cuisines from backend or provided data
}

const RestaurantsPage: React.FC<RestaurantsPageProps> = ({
  locations = [], // Default empty array if not provided
  cuisineTypes = [], // Default empty array if not provided
}) => {
  // Sample restaurant data with "active" property
  const initialRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Pizza Place',
      location: 'New York',
      cuisineType: 'Italian',
      dateAdded: '2024-01-01',
      extraInfo: 'Best pizza in town!',
      visited: false,
      active: true, // Active by default
    },
    {
      id: '2',
      name: 'Sushi World',
      location: 'Medellin',
      cuisineType: 'Japanese',
      dateAdded: '2024-02-01',
      extraInfo: 'Fresh sushi with a variety of rolls.',
      visited: true,
      active: true,
    },
    {
      id: '3',
      name: 'Taco Stand',
      location: 'Washington',
      cuisineType: 'Mexican',
      dateAdded: '2024-03-01',
      extraInfo: 'Authentic street tacos.',
      visited: false,
      active: true,
    },
  ];

  // Dynamically extract unique cuisine and location values from the restaurant data
  const cuisineVector = Array.from(
    new Set(initialRestaurants.map((restaurant) => restaurant.cuisineType))
  );
  const locationVector = Array.from(
    new Set(initialRestaurants.map((restaurant) => restaurant.location))
  );

  const [filters, setFilters] = useState({
    cuisineType: 'All',
    location: '',
    visited: 'All',
  });

  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [editMode, setEditMode] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);

  // Filter active restaurants only
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesCuisine =
      filters.cuisineType === 'All' || restaurant.cuisineType === filters.cuisineType;
    const matchesLocation =
      !filters.location || restaurant.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesVisited =
      filters.visited === 'All' ||
      (filters.visited === 'true' ? restaurant.visited : !restaurant.visited);
    const isActive = restaurant.active; // Only show active restaurants

    return matchesCuisine && matchesLocation && matchesVisited && isActive;
  });

  const handleEdit = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (updatedRestaurant: Restaurant) => {
    setAllRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
      )
    );
    setEditMode(false);
    setCurrentRestaurant(null);
  };

  const toggleVisited = (id: string) => {
    setAllRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, visited: !restaurant.visited } : restaurant
      )
    );
  };

  const clearFilters = () => {
    setFilters({
      cuisineType: 'All',
      location: '',
      visited: 'All',
    });
  };

  const handleDelete = (restaurant: Restaurant) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this restaurant?');
    if (confirmDelete) {
      const updatedRestaurant = { ...restaurant, active: false };
      setAllRestaurants((prev) =>
        prev.map((r) => (r.id === restaurant.id ? updatedRestaurant : r))
      );
      alert('Restaurant deactivated successfully!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">
            Restaurants throughout relationship:
          </h1>

          {/* Add Restaurant Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/Restaurants/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Restaurant
            </Link>

            <button
              className="bg-[#FEEC37] text-[#654321] px-4 py-2 rounded-md hover:bg-[#FFA24C] transition-colors"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded bg-white"
              value={filters.cuisineType}
              onChange={(e) => setFilters({ ...filters, cuisineType: e.target.value })}
            >
              <option value="All">All Cuisines</option>
              {cuisineVector.length > 0 ? (
                cuisineVector.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine}
                  </option>
                ))
              ) : (
                <option value="No cuisines available">No cuisines available</option>
              )}
            </select>

            <select
              className="p-2 border rounded bg-white"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="">All Locations</option>
              {locationVector.length > 0 ? (
                locationVector.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))
              ) : (
                <option value="No locations available">No locations available</option>
              )}
            </select>

            <select
              className="p-2 border rounded bg-white"
              value={filters.visited}
              onChange={(e) => setFilters({ ...filters, visited: e.target.value })}
            >
              <option value="All">All</option>
              <option value="true">Visited</option>
              <option value="false">Not Visited</option>
            </select>
          </div>

          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRestaurants.length === 0 ? (
              <p className="text-[#654321]">No restaurants match your filters.</p>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onEdit={handleEdit}
                  onToggleVisited={toggleVisited}
                />
              ))
            )}
          </div>

          {/* Edit Restaurant Form */}
          {editMode && currentRestaurant && (
            <div className="mt-12 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-[#654321] mb-4">Edit Restaurant</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentRestaurant);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={currentRestaurant.name}
                    onChange={(e) =>
                      setCurrentRestaurant({ ...currentRestaurant, name: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Location</label>
                  <input
                    type="text"
                    value={currentRestaurant.location}
                    onChange={(e) =>
                      setCurrentRestaurant({ ...currentRestaurant, location: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Cuisine Type</label>
                  <input
                    type="text"
                    value={currentRestaurant.cuisineType}
                    onChange={(e) =>
                      setCurrentRestaurant({ ...currentRestaurant, cuisineType: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Extra Info</label>
                  <textarea
                    value={currentRestaurant.extraInfo}
                    onChange={(e) =>
                      setCurrentRestaurant({ ...currentRestaurant, extraInfo: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FEEC37] px-4 py-2 rounded text-[#654321] font-bold hover:bg-yellow-400"
                >
                  Save Changes
                </button>
              </form>
              <button
                onClick={() => handleDelete(currentRestaurant)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
              >
                Delete Restaurant
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
