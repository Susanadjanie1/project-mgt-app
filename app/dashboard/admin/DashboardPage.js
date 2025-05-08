'use client';

import { useState } from "react";
// import LogoutButton from "../../components/LogoutButton";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 sm:p-10 lg:ml-64 pt-20" style={{ backgroundImage: "linear-gradient(to bottom, #F9FAFB, #F3F4F6)" }}> {/* Brand background */}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: "#4B0082" }}>Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {displayName}</p>
        </div>
        {/* <LogoutButton /> */}
      </div>

      {/* Project Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "#4B0082" }}>
          {selectedProjectId ? "Edit Project" : "Create New Project"}
        </h2>
        <ProjectForm
          onProjectCreated={() => setRefreshFlag((prev) => prev + 1)}
        />
      </div>

      {/* Project List */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "#4B0082" }}>
          Your Projects
        </h2>
        <ProjectList
          refreshFlag={refreshFlag}
          onProjectSelect={(id) => setSelectedProjectId(id)}
        />
      </div>

      {/* Task Section */}
      {selectedProjectId ? (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6 border border-gray-100">
          <h2 className="text-2xl font-semibold" style={{ color: "#4B0082" }}>
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
              className="px-6 py-3 rounded-xl shadow transition-all text-white"
              style={{ 
                backgroundColor: "#4B0082", 
                boxShadow: "0 4px 6px rgba(75, 0, 130, 0.15)",
                transition: "all 0.2s ease" 
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#3A0068";
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(75, 0, 130, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#4B0082";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(75, 0, 130, 0.15)";
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "6px" }}>⬇</span> Export Project Report
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-10 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: "rgba(75, 0, 130, 0.1)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#4B0082">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Select a project to manage tasks</p>
          <button 
            className="mt-4 px-4 py-2 text-sm font-medium rounded-lg" 
            style={{ 
              color: "#4B0082",
              border: "1px solid #4B0082"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(75, 0, 130, 0.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Browse Projects
          </button>
        </div>
      )}
    </div>
  );
}