import React, { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5023/api/tasks')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check if you're getting the expected response from the backend
        setTasks(data); // Save the fetched tasks into state
      })
      .catch(error => console.error('Error:', error));
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
