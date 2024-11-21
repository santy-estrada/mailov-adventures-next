'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: number;
  activityType: string;
  dateCompleted: string | null;
  user: string;
}

const ActivityManager: React.FC = () => {
  const sampleActivities: Activity[] = [
    { id: 1, activityType: 'Hiking', dateCompleted: null, user: 'Alice' },
    { id: 2, activityType: 'Movie Night', dateCompleted: '2024-11-15', user: 'Bob' },
    { id: 3, activityType: 'Cooking Class', dateCompleted: null, user: 'Charlie' },
  ];

  const [activities, setActivities] = useState<Activity[]>(sampleActivities);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    activityType: '',
    dateCompleted: '',
    user: '',
  });

  useEffect(() => {
    if (currentActivity) {
      setFormData({
        activityType: currentActivity.activityType,
        dateCompleted: currentActivity.dateCompleted || '',
        user: currentActivity.user,
      });
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  }, [currentActivity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentActivity) {
      // Edit activity
      const updatedActivity = {
        ...currentActivity,
        ...formData,
        dateCompleted: formData.dateCompleted || null,
      };
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === currentActivity.id ? updatedActivity : activity
        )
      );
      alert('Activity updated successfully!');
    } else {
      // Add new activity
      const newActivity: Activity = {
        id: activities.length + 1,
        ...formData,
        dateCompleted: formData.dateCompleted || null,
      };
      setActivities((prev) => [...prev, newActivity]);
      alert('New activity added successfully!');
    }

    setFormData({ activityType: '', dateCompleted: '', user: '' });
    setCurrentActivity(null);
  };

  const handleEdit = (activity: Activity) => {
    setCurrentActivity(activity);
  };

  const handleDelete = (id: number) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
    alert('Activity deleted successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Activity Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2">
          {currentActivity ? 'Edit Activity' : 'Add New Activity'}
        </h3>
        <div className="mb-4">
          <label className="block mb-1">Activity Type</label>
          <input
            type="text"
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date Completed</label>
          <input
            type="date"
            name="dateCompleted"
            value={formData.dateCompleted}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {currentActivity ? 'Update Activity' : 'Add Activity'}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">Existing Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-4 rounded shadow-md">
            <h4 className="text-lg font-semibold">{activity.activityType}</h4>
            <p>
              <strong>Date Completed:</strong>{' '}
              {activity.dateCompleted ? activity.dateCompleted : 'Not Completed'}
            </p>
            <p>
              <strong>User:</strong> {activity.user}
            </p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(activity)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity.id)}
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

export default ActivityManager;
