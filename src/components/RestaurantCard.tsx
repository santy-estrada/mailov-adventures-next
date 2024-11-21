import React from 'react';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    location: string;
    cuisineType: string;
    dateAdded: string;
    extraInfo: string;
    visited: boolean;
  };
  onEdit: (restaurant: RestaurantCardProps['restaurant']) => void;
  onToggleVisited: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onToggleVisited,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-[#654321]">{restaurant.name}</h3>
      <p className="text-[#654321] mt-2">
        <strong>Location:</strong> {restaurant.location}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Cuisine:</strong> {restaurant.cuisineType}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Added:</strong> {restaurant.dateAdded}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Extra Info:</strong> {restaurant.extraInfo}
      </p>
      <p className={`mt-4 font-semibold ${restaurant.visited ? 'text-green-500' : 'text-red-500'}`}>
        {restaurant.visited ? 'Visited' : 'Not Visited'}
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded hover:bg-orange-600"
          onClick={() => onEdit(restaurant)}
        >
          Edit
        </button>
        <button
          className={`px-3 py-1 rounded ${
            restaurant.visited ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
          onClick={() => onToggleVisited(restaurant.id)}
        >
          {restaurant.visited ? 'Mark as Not Visited' : 'Mark as Visited'}
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
