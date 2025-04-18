import React from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the components folder
import { Outlet } from 'react-router-dom'; // To render the nested routes

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Render the page component here */}
      </div>
    </div>
  );
};

export default Layout;
