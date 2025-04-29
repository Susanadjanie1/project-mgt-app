'use client';
import TaskCard from './TaskCard';

export default function TaskColumn({ status, tasks, mutate }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow min-h-[200px]">
      <h2 className="font-bold text-lg capitalize mb-4">
        {status.replace('_', ' ')}
      </h2>
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} mutate={mutate} />
        ))}
      </div>
    </div>
  );
}
