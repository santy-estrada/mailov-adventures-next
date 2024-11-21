import React from 'react';

interface ActivityCardProps {
  activity: {
    id: string;
    activityType: string;
    user: string;
    dateCompleted: string | null;
  };
  onEdit: (activity: ActivityCardProps['activity']) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onEdit }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-[#654321]">{activity.activityType} Activity</h3>
      <p className="text-[#654321] mt-2">
        <strong>User:</strong> {activity.user}
      </p>
      <p className="text-[#654321] mt-2">
        <strong>Date Completed:</strong> {activity.dateCompleted || 'Not completed yet'}
      </p>
      <div className="flex justify-between mt-4">
        {/* Edit Button */}
        <button
          className="bg-[#FFA24C] text-white px-3 py-1 rounded hover:bg-orange-600"
          onClick={() => onEdit(activity)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
