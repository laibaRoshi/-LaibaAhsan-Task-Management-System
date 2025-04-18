import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend API
  useEffect(() => {
    fetch('http://localhost:5162/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data)) // Set fetched tasks into state
      .catch(error => console.error('Error fetching tasks:', error));
  }, []); // Empty dependency array makes this effect run once on component mount

  // Calculate total tasks and status-based counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;

  // Doughnut chart data
  const taskData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, pendingTasks],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Tasks */}
        <Link to="/tasks" state={{ filter: 'all' }}>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:bg-blue-100 cursor-pointer">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Tasks</h2>
              <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
            </div>
            <div className="text-4xl text-gray-600">📋</div>
          </div>
        </Link>

        {/* Completed Tasks */}
        <Link to="/tasks" state={{ filter: 'Completed' }}>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:bg-green-100 cursor-pointer">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Completed Tasks</h2>
              <p className="text-2xl font-bold text-gray-800">{completedTasks}</p>
            </div>
            <div className="text-4xl text-green-600">✅</div>
          </div>
        </Link>

        {/* Pending Tasks */}
        <Link to="/tasks" state={{ filter: 'Pending' }}>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:bg-red-100 cursor-pointer">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Pending Tasks</h2>
              <p className="text-2xl font-bold text-gray-800">{pendingTasks}</p>
            </div>
            <div className="text-4xl text-red-600">⏳</div>
          </div>
        </Link>

        {/* In Progress Tasks */}
        <Link to="/tasks" state={{ filter: 'In Progress' }}>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:bg-yellow-100 cursor-pointer">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">In Progress Tasks</h2>
              <p className="text-2xl font-bold text-gray-800">{inProgressTasks}</p>
            </div>
            <div className="text-4xl text-yellow-600">🚧</div>
          </div>
        </Link>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-2 md:col-span-1">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Task Status</h2>
          <Doughnut data={taskData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
