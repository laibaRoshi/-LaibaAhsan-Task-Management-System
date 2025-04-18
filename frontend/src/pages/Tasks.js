import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTasks, addTask, deleteTask, updateTask } from '../api/taskApi';

const Tasks = () => {
  const location = useLocation();
  const filter = location.state?.filter || 'all'; // Default to 'all' if no filter is passed

  const [tasks, setTasks] = useState([]);  // Initialize tasks as an empty array
  const [loading, setLoading] = useState(false);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const taskData = await getTasks();
        setTasks(taskData || []);  // Ensure tasks is always an array
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);  // Ensure tasks is an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add task handler
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task handler
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task handler (update status to 'Completed')
  const handleEditTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Filter tasks based on the selected filter (e.g., 'all', 'Completed', 'In Progress', 'Pending')
  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        {filter === 'all' ? 'All Tasks' : `${filter} Tasks`}
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">Status: {task.status}</p>
                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                <p className="text-sm text-gray-600">Priority: {task.priority}</p>
              </div>
              <div className="text-3xl">
                {task.status === 'Completed' ? '✅' : task.status === 'Pending' ? '⏳' : '🚧'}
              </div>
              <div>
                {/* Button to change task status to 'Completed' */}
                <button onClick={() => handleEditTask(task.id, { status: 'Completed' })} className="text-green-500 mr-2">Complete</button>
                {/* Button to delete task */}
                <button onClick={() => handleDeleteTask(task.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button to add a new task */}
      <button
        onClick={() => handleAddTask({ title: 'New Task', status: 'Pending', dueDate: '2025-05-01', priority: 'Medium' })}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Task
      </button>
    </div>
  );
};

export default Tasks;
