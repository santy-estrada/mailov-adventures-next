'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/LoggedNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import ActivityCard from '@/components/ActivityCard';
import Link from 'next/link';
import { Activity } from '@/types/activity';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_ACTIVITY, GET_ACTIVITIES_BY_PARTNERSHIP, UPDATE_ACTIVITY } from '@/api/activity';

const ActivitiesPage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [partnershipId, setPartnershipId] = useState<string | null>(null);


  // Check if running on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPartnershipId = sessionStorage.getItem('partnershipId');
      setPartnershipId(storedPartnershipId);
    }
  }, []);

  // Apollo useQuery to fetch activities based on partnershipId
  const { loading, error, data } = useQuery(GET_ACTIVITIES_BY_PARTNERSHIP, {
    variables: { partnershipId: Number(partnershipId) },
    skip: !partnershipId, // Skip the query if no partnershipId
  });

  const [deleteActivity] = useMutation(DELETE_ACTIVITY);
  const [updateActivity] = useMutation(UPDATE_ACTIVITY);

  // Set activities from fetched data
  useEffect(() => {
    if (data) {
      setActivities(data.activitiesForPartnership);
    }
  }, [data]);

  const [activities, setActivities] = useState<Activity[]>([]);

  const handleEdit = (activity: Activity) => {
    setCurrentActivity(activity);
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight - 650, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = async (updatedActivity: Activity) => {
    try {
      const { data } = await updateActivity({
        variables: {
          id: Number(updatedActivity.id),
          updateActivityInput: {
            activityType: updatedActivity.activityType,
            userId: Number(updatedActivity.user.id), 
            date: updatedActivity.date,  // Ensure this handles null
          },
        },
      });
  
      // Update activities in the UI after saving
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === data.updateActivity.id ? data.updateActivity : activity
        )
      );
      setEditMode(false);
      setCurrentActivity(null);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };
  

  const handleDelete = async (activity: Activity) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
    if (confirmDelete) {
      try {
        // Call the delete mutation
        const { data } = await deleteActivity({
          variables: { id: Number(activity.id) },
        });

        // Remove the deleted activity from the UI
        setActivities((prev) => prev.filter((a) => a.id !== data.deleteActivity.id));
        alert('Activity deleted successfully!');
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading activities</p>;


  return (
    <div className="flex flex-col min-h-screen bg-[#B1D690]">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-[#654321] mb-8">Activities to keep things interesting</h1>

          {/* Add Activity Button */}
          <div className="text-right mb-4 space-x-4">
            <Link
              href="/activities/new"
              className="bg-[#FF77B7] text-white px-4 py-2 rounded-md hover:bg-[#FF27B7] transition-colors"
            >
              Add Activity
            </Link>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={handleEdit}
                  onDelete={handleDelete} // Pass delete handler to card
                />
              ))}
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
                    value={currentActivity.activityType || ''}
                    onChange={(e) =>
                      setCurrentActivity({
                        ...currentActivity,
                        activityType: e.target.value,
                      })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">User Name</label>
                  <input
                    type="text"
                    value={currentActivity.user?.name || ''}
                    onChange={(e) =>
                      setCurrentActivity({
                        ...currentActivity,
                        user: { ...currentActivity.user, name: e.target.value },
                      })
                    }
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Date Completed</label>
                  <input
                    type="date"
                    value={currentActivity.date || ''}
                    onChange={(e) =>
                      setCurrentActivity({ ...currentActivity, date: e.target.value })
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
