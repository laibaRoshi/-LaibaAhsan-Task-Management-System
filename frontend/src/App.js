import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication status

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Send token in request header
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Fetch tasks only if user is authenticated
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);  // Re-run on authentication change

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Management System</h1>
          <p>Welcome to your task management dashboard. Stay organized and track your progress.</p>
          <nav>
            <ul>
              {isAuthenticated ? (
                <>
                  <li><button onClick={handleLogout}>Logout</button></li>
                  <li><Link to="/">Home</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={isAuthenticated ? (
              <div className="task-list">
                <h2>Your Tasks</h2>
                {tasks.length > 0 ? (
                  <ul>
                    {tasks.map((task) => (
                      <li key={task.id}>
                        <strong>{task.title}</strong> - Status: {task.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks available.</p>
                )}
              </div>
            ) : (
              <p>Please log in to view your tasks.</p>
            )} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
