"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import requireUser from "@/lib/requireUser"; // 👈 Protect page!

export default function ProjectPage() {
  requireUser(); // 👈 Force login or redirect

  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      const projectTasks = data.tasks.filter((task) => task.projectId === id);
      setTasks(projectTasks);
    }
    fetchTasks();
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks for Project {id}</h1>

      {/* ✅ Project Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">{tasks.length}</h2>
          <p className="text-gray-600">Total Tasks</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">
            {tasks.filter((task) => task.status === "Done").length}
          </h2>
          <p className="text-gray-600">Completed Tasks</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">
            {Math.round(
              (tasks.filter((task) => task.status === "Done").length /
                (tasks.length || 1)) *
                100
            )}
            %
          </h2>
          <p className="text-gray-600">Completion Rate</p>
        </div>
      </div>

      {/* ✅ Task List */}
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="mt-2 text-sm text-blue-600">Status: {task.status}</p>
            <p className="mt-1 text-sm text-green-600">
              Priority: {task.priority}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
