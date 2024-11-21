'use client';

import React, { useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import ActivityCard from '@/components/ActivityCard';
import Link from 'next/link';

interface Activity {
  id: string;
  activityType: string;
  user: string;
  dateCompleted: string | null;
  active: boolean; // Add active property to control visibility
}

const ActivitiesPage: React.FC = () => {
  // Sample activity data with "active" property
  const initialActivities: Activity[] = [
    {
      id: '1',
      activityType: 'Adventure',
      user: 'User1',
      dateCompleted: '2024-10-01',
      active: true, // Active by default
    },
    {
      id: '2',
      activityType: 'Romantic',
      user: 'User2',
      dateCompleted: null,
      active: true,
    },
    {
      id: '3',
      activityType: 'Casual',
      user: 'User1',
      dateCompleted: '2024-11-01',
      active: true,
    },
  ];

  const activityTypes = ['Adventure', 'Romantic', 'Casual'];

  const [filters, setFilters] = useState({
    activityType: 'All',
  });

  const [allActivities, setAllActivities] = useState<Activity[]>(initialActivities);
  const [editMode, setEditMode] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  // Filter activities based on the selected filters and active status
  const filteredActivities = allActivities.filter((activity) => {
    const matchesActivityType =
      filters.activityType === 'All' || activity.activityType === filters.activityType;
    const isActive = activity.active; // Only show active activities
    return matchesActivityType && isActive;
  });

  const handleEdit = (activity: Activity) => {
    setCurrentActivity(activity);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (updatedActivity: Activity) => {
    setAllActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
    setEditMode(false);
    setCurrentActivity(null);
  };

  const handleDelete = (activity: Activity) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
    if (confirmDelete) {
      const updatedActivity = { ...activity, active: false }; // Deactivate instead of deleting
      setAllActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? updatedActivity : a))
      );
      alert('Activity deactivated successfully!');
    }
  };

  const handleClearFilters = () => {
    setFilters({
      activityType: 'All',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Activities to keep things interesting</h1>

          {/* Add Activity Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/Activities/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Activity
            </Link>

            <button
              className="bg-[#FEEC37] text-[#654321] px-4 py-2 rounded-md hover:bg-[#FFA24C] transition-colors"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded bg-white"
              value={filters.activityType}
              onChange={(e) => setFilters({ ...filters, activityType: e.target.value })}
            >
              <option value="All">All Activity Types</option>
              {activityTypes.map((activityType, index) => (
                <option key={index} value={activityType}>
                  {activityType}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredActivities.length === 0 ? (
              <p className="text-[#654321]">No activities match your filters.</p>
            ) : (
              filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={handleEdit}
                  onDelete={handleDelete} // Pass delete handler to card
                />
              ))
            )}
          </div>

          {/* Edit Activity Form */}
          {editMode && currentActivity && (
            <div className="mt-12 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold text-[#654321] mb-4">Edit Activity</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(currentActivity);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1">Activity Type</label>
                  <input
                    type="text"
                    value={currentActivity.activityType}
                    onChange={(e) =>
                      setCurrentActivity({ ...currentActivity, activityType: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">User</label>
                  <input
                    type="text"
                    value={currentActivity.user}
                    onChange={(e) =>
                      setCurrentActivity({ ...currentActivity, user: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Date Completed</label>
                  <input
                    type="date"
                    value={currentActivity.dateCompleted || ''}
                    onChange={(e) =>
                      setCurrentActivity({ ...currentActivity, dateCompleted: e.target.value })
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
                onClick={() => handleDelete(currentActivity)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
              >
                Delete Activity
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
