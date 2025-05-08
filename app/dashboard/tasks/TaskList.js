"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskForm from "../../components/TaskForm";
import { fetcherWithAuth } from "lib/fetcherWithAuth";

export default function TaskList({ projectId, refreshFlag, onTaskEdited }) {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    fetcherWithAuth(`/api/tasks?projectId=${projectId}`)
      .then(setTasks)
      .catch(() => toast.error("Failed to fetch tasks"));
  }, [projectId, refreshFlag]);

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      toast.success("Task deleted");
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } else {
      toast.error("Delete failed");
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleTaskSaved = () => {
    setShowEditModal(false);
    setSelectedTask(null);
    fetcherWithAuth(`/api/tasks?projectId=${projectId}`)
      .then(setTasks)
      .catch(() => toast.error("Failed to fetch updated tasks"));
  };
  

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Tasks</h3>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg border border-gray-200 transition"
            >
              <h4 className="text-lg font-bold mb-1">{task.title}</h4>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Priority: <span className="font-medium">{task.priority}</span> | Due:{" "}
                <span>{task.dueDate?.slice(0, 10)}</span>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <TaskForm
              projectId={projectId}
              selectedTask={selectedTask}
              onTaskSaved={handleTaskSaved}
            />
          </div>
        </div>
      )}
    </div>
  );
}
