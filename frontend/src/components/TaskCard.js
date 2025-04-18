// src/components/TaskCard.js
import React from 'react';

const statusColors = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
};

const priorityColors = {
  High: 'text-red-600',
  Medium: 'text-yellow-600',
  Low: 'text-green-600',
};

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <span className={`text-sm px-2 py-1 rounded ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 mb-1"><span className="font-medium">Due:</span> {task.dueDate}</p>
      <p className="text-gray-600">
        <span className="font-medium">Priority:</span>{' '}
        <span className={priorityColors[task.priority]}>{task.priority}</span>
      </p>
    </div>
  );
};

export default TaskCard;
