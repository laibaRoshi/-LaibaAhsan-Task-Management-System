import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { status } = useParams(); // Get the task status from the URL parameter

  // Sample tasks data (you would replace this with real data from your backend)
  const allTasks = [
    { id: 1, title: 'Finish React Project', status: 'Completed', priority: 'High', dueDate: '2025-04-20' },
    { id: 2, title: 'Write Unit Tests', status: 'Pending', priority: 'Medium', dueDate: '2025-04-22' },
    { id: 3, title: 'Build Task Management API', status: 'In Progress', priority: 'Low', dueDate: '2025-04-25' },
    { id: 4, title: 'Fix Bugs in Code', status: 'Completed', priority: 'Medium', dueDate: '2025-04-18' },
    { id: 5, title: 'Research New Technologies', status: 'Pending', priority: 'High', dueDate: '2025-04-30' },
  ];

  // Filter tasks based on the status passed in the URL
  const filteredTasks = allTasks.filter((task) => task.status.toLowerCase() === status.toLowerCase());

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">{status.charAt(0).toUpperCase() + status.slice(1)} Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-2">Due: {task.dueDate}</p>
            <p className={`text-sm font-bold mt-2 ${task.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {task.status}
            </p>
            <p className="text-sm text-gray-500 mt-2">Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
