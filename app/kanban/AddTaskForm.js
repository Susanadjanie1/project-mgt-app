'use client';
import { useState } from 'react';

export default function AddTaskForm({ mutate }) {
  const [title, setTitle] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status: 'todo' }),
    });
    setTitle('');
    mutate(); // re-fetch tasks
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2 flex-1"
        placeholder="New task title…"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
