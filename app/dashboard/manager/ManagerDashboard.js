'use client';

import KanbanBoard from "../../kanban/KanbanBoard"
import LogoutButton from "../../components/LogoutButton"

export default function ManagerDashboard({ session }) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Manager Panel – {session.user.name}
        </h1>
        <LogoutButton />
      </div>

      <div className="space-y-6">
        <p>✔ Manage tasks within assigned projects</p>
        <p>✔ Update status and priorities</p>
        <p>✔ Assign team members to tasks</p>

        <KanbanBoard />
        {/* Add task assignment or metrics display */}
      </div>
    </div>
  );
}
