import React, { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTasks(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="task-list">
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
