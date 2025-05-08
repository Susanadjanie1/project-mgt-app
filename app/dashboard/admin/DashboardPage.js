'use client';

import { useState } from "react";
import LogoutButton from "../../components/LogoutButton";
import ProjectForm from "./ProjectForm";
import ProjectList from "../projects/ProjectList";
import TaskForm from "../../components/TaskForm";
import TaskList from "../tasks/TaskList";
import { toast } from "react-toastify";

export default function DashboardPage({ session }) {
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const displayName = session?.name || session?.email || "Admin";

  const handleExport = async (projectId) => {
    const res = await fetch(`/api/reports/${projectId}`);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 sm:p-10 lg:ml-64 pt-20"> {/* Added pt-20 for space for the navbar */}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {displayName}</p>
        </div>
        <LogoutButton />
      </div>

      {/* Project Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {selectedProjectId ? "Edit Project" : "Create New Project"}
        </h2>
        <ProjectForm
          onProjectCreated={() => setRefreshFlag((prev) => prev + 1)}
        />
      </div>

      {/* Project List */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Projects
        </h2>
        <ProjectList
          refreshFlag={refreshFlag}
          onProjectSelect={(id) => setSelectedProjectId(id)}
        />
      </div>

      {/* Task Section */}
      {selectedProjectId ? (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Manage Project Tasks
          </h2>

          <TaskForm
            projectId={selectedProjectId}
            selectedTask={taskToEdit}
            onTaskSaved={() => {
              setRefreshFlag((prev) => prev + 1);
              setTaskToEdit(null);
            }}
          />

          <TaskList
            projectId={selectedProjectId}
            refreshFlag={refreshFlag}
            onEditTask={setTaskToEdit}
          />

          <div className="pt-4 text-right">
            <button
              onClick={() => handleExport(selectedProjectId)}
              className="bg-black text-white px-6 py-3 rounded-xl shadow hover:bg-gray-800 transition-all"
            >
              ⬇ Export Project Report
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10 text-lg">
          Select a project to manage tasks.
        </div>
      )}
    </div>
  );
}
