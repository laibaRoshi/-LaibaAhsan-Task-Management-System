import React, { useState, useEffect } from 'react';

const AddTaskModal = ({ isOpen, onClose, onSubmit, existingTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending'); // Default status is Pending

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDueDate(existingTask.dueDate);
      setPriority(existingTask.priority);
      setStatus(existingTask.status);
    }
  }, [existingTask]);

  const handleSubmit = () => {
    const taskData = {
      title,
      dueDate,
      priority,
      status,
    };
    onSubmit(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold">{existingTask ? 'Edit Task' : 'Add New Task'}</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {existingTask ? 'Save Changes' : 'Add Task'}
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
