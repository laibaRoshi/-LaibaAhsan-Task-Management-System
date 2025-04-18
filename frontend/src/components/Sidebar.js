import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Task Manager</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className="text-white hover:bg-black hover:border-white p-2 rounded-md border border-transparent hover:border-white transition duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/tasks"
          className="text-white hover:bg-black hover:border-white p-2 rounded-md border border-transparent hover:border-white transition duration-300"
        >
          Tasks
        </Link>
        <Link
          to="/profile"
          className="text-white hover:bg-black hover:border-white p-2 rounded-md border border-transparent hover:border-white transition duration-300"
        >
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
