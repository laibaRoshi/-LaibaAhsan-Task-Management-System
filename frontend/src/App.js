import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // API call to your backend to fetch tasks
        const response = await fetch('http://localhost:5023/api/tasks'); // Replace with your actual API URL
        const data = await response.json();
        setTasks(data); // Set the fetched tasks into state
      } catch (error) {
        console.error('Error fetching tasks:', error); // Handle any errors
      }
    };
    
    fetchTasks();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management System</h1>
        <p>Welcome to your task management dashboard. Stay organized and track your progress.</p>
      </header>

      <div className="task-list">
        <h2>Your Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - Status: {task.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
