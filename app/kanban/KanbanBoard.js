'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';
import TaskColumn from './TaskColumn';
import { fetcherWithAuth } from 'lib/fetcherWithAuth';

const STATUSES = ['todo', 'in_progress', 'done'];

export default function KanbanBoard({ userId, tasks: propTasks, mutate: propMutate }) {
  const [userRole, setUserRole] = useState(null);

  // Only fetch tasks if they weren't passed as props
  const {
    data: fetchedTasks,
    error,
    mutate: fetchMutate,
  } = useSWR(propTasks ? null : '/api/tasks', fetcherWithAuth);

  const tasks = propTasks || fetchedTasks;
  const mutate = propMutate || fetchMutate;

  // Get user role from token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded?.role || 'guest');
      } catch (err) {
        console.error('Failed to decode JWT:', err);
        setUserRole('guest');
      }
    }
  }, []);

  if (error) {
    console.error(error);
    return <div className="p-4 text-red-500">Failed to load tasks.</div>;
  }

  if (!tasks) {
    return <div className="p-4">Loading tasks...</div>;
  }

  if (!Array.isArray(tasks)) {
    console.error("Expected an array but got:", tasks);
    return <div className="p-4 text-red-500">Unexpected data format.</div>;
  }

  const filteredTasks = userId
    ? tasks.filter((t) => t.assignedTo?.includes(userId))
    : tasks;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kanban Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={filteredTasks.filter((task) => task.status === status)}
            mutate={mutate}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );
}
