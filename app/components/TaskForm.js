'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';

export default function TaskForm({ projectId, selectedTask, onTaskSaved }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: [],
    priority: 'medium',
    dueDate: '',
  });

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // 🔑 Retrieve token

        const res = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`, // 🛡️ Send token in header
          },
        });

        if (!res.ok) throw new Error('Unauthorized or failed');

        const data = await res.json();
        const userOptions = data.map((user) => ({
          value: user.email,
          label: user.email,
        }));
        setUsers(userOptions);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch users for assigning tasks');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      setTask({
        title: selectedTask.title,
        description: selectedTask.description,
        assignedTo: selectedTask.assignedTo.map(email => ({
          value: email,
          label: email,
        })),
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate || '',
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssignChange = (selectedOptions) => {
    const emails = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setTask((prev) => ({
      ...prev,
      assignedTo: emails, // Set the assignedTo field as an array of emails
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = selectedTask ? 'PUT' : 'POST';
    const url = selectedTask
      ? `/api/tasks/${selectedTask._id}`
      : '/api/tasks';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          projectId, // Include projectId
        }),
      });

      if (res.ok) {
        toast.success('Task saved successfully');
        onTaskSaved();
        setIsModalOpen(false); // Close modal after submission
        setTask({
          title: '',
          description: '',
          assignedTo: [],
          priority: 'medium',
          dueDate: '',
        });
      } else {
        toast.error('Task save failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Open and Close modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assign Task
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold">
              {selectedTask ? 'Edit Task' : 'Create Task'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm">Assign To</label>
                <Select
                  isMulti
                  name="assignedTo"
                  value={task.assignedTo.map(email => (
                    users.find(user => user.value === email) || null
                  ))}
                  onChange={handleAssignChange}
                  options={users}
                  className="w-full"
                  placeholder="Select team members..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {selectedTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
