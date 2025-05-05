'use client';

import KanbanBoard from "../../kanban/KanbanBoard"
import LogoutButton from "../../components/LogoutButton"

export default function MemberDashboard({ session }) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          My Tasks – {session.user.name}
        </h1>
        <LogoutButton />
      </div>

      <div className="space-y-6">
        <p>✔ View assigned tasks</p>
        <p>✔ Update task status</p>
        <p>✔ Log time and add comments</p>

        <KanbanBoard />
        {/* Add time logging/comment feature here */}
      </div>
    </div>
  );
}
