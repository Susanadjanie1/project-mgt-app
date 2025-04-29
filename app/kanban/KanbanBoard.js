'use client';
import useSWR from 'swr';
import AddTaskForm from './AddTaskForm';
import TaskColumn from './TaskColumn';

const fetcher = url => fetch(url).then(res => res.json());

const STATUSES = ['todo', 'in_progress', 'done'];

export default function KanbanBoard() {
  const { data, error, mutate } = useSWR('/api/tasks', fetcher);
  const tasks = data || [];

  if (error) return <div className="p-4 text-red-500">Failed to load tasks</div>;
  if (!data)  return <div className="p-4">Loading tasks…</div>;

  return (
    <div className="p-4">
      {/* Add new task */}
      <AddTaskForm mutate={mutate} />

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {STATUSES.map(status => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter(t => t.status === status)}
            mutate={mutate}
          />
        ))}
      </div>
    </div>
  );
}
