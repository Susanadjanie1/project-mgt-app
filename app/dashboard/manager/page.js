'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import KanbanBoard from 'app/kanban/KanbanBoard';
import ProjectMetrics from 'app/kanban/ProjectMetrics';
import jwt from 'jsonwebtoken';
import { fetcherWithAuth } from 'lib/fetcherWithAuth';

export default function ManagerDashboard() {
  const { data: tasks, error, mutate } = useSWR('/api/tasks', fetcherWithAuth);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      setRole(decoded?.role || null);
    }
  }, []);

  if (error) return <div>Failed to load tasks</div>;
  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
        Manager Dashboard
      </h1>

      <ProjectMetrics tasks={tasks} />

      <KanbanBoard tasks={tasks} mutate={mutate} />
    </div>
  );
}
