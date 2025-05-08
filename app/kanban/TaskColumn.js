// app/kanban/TaskColumn.js
"use client";

import TaskCard from "./TaskCard";

export default function TaskColumn({ status, tasks, mutate }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-semibold capitalize mb-2">{status.replace('_', ' ')}</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} mutate={mutate} />
        ))}
      </div>
    </div>
  );
}
