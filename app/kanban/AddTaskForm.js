'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AddTaskForm({ mutate }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  });
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status: 'todo' }),
    });

    setForm({ title: '', description: '', priority: '', dueDate: '' });
    mutate();
    setShowForm(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowForm(prev => !prev)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showForm ? 'Cancel' : '➕ Add Task'}
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 bg-white p-6 rounded shadow max-w-xl"
          >
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Task description"
                required
              />
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1">
                <label className="block text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#008236] text-white px-4 py-2 rounded hover:bg-[#008236]"
              >
                Save Task
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
