'use client';

import useSWR from 'swr';
import TaskColumn from './TaskColumn';
import { fetcherWithAuth } from 'lib/fetcherWithAuth';

const STATUSES = ['todo', 'in_progress', 'done'];

export default function KanbanBoard({ userId }) {
  const { data: tasks, error, mutate } = useSWR('/api/tasks', fetcherWithAuth);

  if (error) {
    console.error(error);
    return <div className="p-4 text-red-500">Failed to load tasks.</div>;
  }

  if (!tasks) {
    return <div className="p-4">Loading...</div>;
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
          />
        ))}
      </div>
    </div>
  );
}
