'use client';

import { useState } from "react";
import LogoutButton from "./LogoutButton";
import ProjectForm from "../dashboard/admin/ProjectForm";
import ProjectList from "../dashboard/admin/ProjectList";
import TeamAssignmentForm from "./TeamAssignmentForm";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { toast } from "react-toastify";

export default function AdminDashboardClient({ session }) {
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const displayName = session?.name || session?.email || "Admin";

  const handleExport = async (projectId) => {
    const res = await fetch(`/api/projects/${projectId}/report`);
    if (!res.ok) {
      toast.error("Report generation failed");
      return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-${projectId}-report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Project report downloaded");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard – {displayName}</h1>
        <LogoutButton />
      </div>

      {/* Project creation form */}
      <div className="mb-6">
        <ProjectForm
          onProjectCreated={() => setRefreshFlag((prev) => prev + 1)}
        />
      </div>

      {/* List of all projects */}
      <div className="mb-6">
        <ProjectList
          refreshFlag={refreshFlag}
          onProjectSelect={(id) => setSelectedProjectId(id)}
        />
      </div>

      {/* Display feedback when no project is selected */}
      {!selectedProjectId ? (
        <div className="mt-6">
          <p>Please select a project to manage tasks.</p>
        </div>
      ) : (
        // If a project is selected, show the task-related components
        <div className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Manage Project Tasks</h2>

          {/* Task creation/edit form */}
          <TaskForm
            projectId={selectedProjectId}
            selectedTask={taskToEdit}
            onTaskSaved={() => {
              setRefreshFlag((prev) => prev + 1);
              setTaskToEdit(null); // Clear task after saving
            }}
          />

          {/* Task list */}
          <TaskList
            projectId={selectedProjectId}
            refreshFlag={refreshFlag}
            onEditTask={setTaskToEdit} // Allow task editing
          />

          {/* Export report button */}
          <div className="mt-6">
            <button
              onClick={() => handleExport(selectedProjectId)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Export Project Report
            </button>
          </div>

          {/* Team assignment form */}
          {/* <div className="mt-6">
            <h3 className="text-lg font-semibold">Assign Team to Project</h3>
            <TeamAssignmentForm projectId={selectedProjectId} />
          </div> */}
        </div>
      )}
    </div>
  );
}
