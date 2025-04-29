'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TaskCard({ task, mutate }) {
  const [status, setStatus] = useState(task.status);

  // Update task status
  async function handleChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    mutate();
  }

  // Delete task with confirmation toast
  function confirmDelete() {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Delete &quot;{task.title}&quot;?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={async () => {
                await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
                mutate();
                closeToast();
              }}
              className="text-red-600 font-bold"
            >
              Yes
            </button>
            <button onClick={closeToast} className="text-gray-600">
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  }

  return (
    <div className="bg-white p-3 rounded shadow flex items-center justify-between">
      <div>
        <p className="font-medium">{task.title}</p>
        <select
          className="mt-1 border p-1 text-sm"
          value={status}
          onChange={handleChange}
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        onClick={confirmDelete}
        className="text-red-500 hover:text-red-700 text-lg"
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
