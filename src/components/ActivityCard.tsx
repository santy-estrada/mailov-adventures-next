import React from 'react';
import { Activity } from '@/types/activity';

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-[#654321]">{activity.activityType} Activity</h3>
      <p className="text-[#654321] mt-2">
        <strong>User:</strong> {activity.user?.name} {/* Access user name here */}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Completed:</strong> {activity.date || 'Not completed yet'}
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded hover:bg-orange-600"
          onClick={() => onEdit(activity)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => onDelete(activity)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
