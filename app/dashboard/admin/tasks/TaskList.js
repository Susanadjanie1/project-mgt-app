"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskForm from "../TaskForm";
import { fetcherWithAuth } from "lib/fetcherWithAuth";

export default function TaskList({ projectId, refreshFlag, onTaskEdited }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks whether projectId is provided or not
    setLoading(true);
    
    const endpoint = projectId 
      ? `/api/tasks?projectId=${projectId}` 
      : '/api/tasks'; // Endpoint for all tasks
    
    fetcherWithAuth(endpoint)
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        toast.error("Failed to fetch tasks");
        setLoading(false);
        console.error("Task fetch error:", error);
      });
  }, [projectId, refreshFlag]);

  const deleteTask = async (taskId) => {
    try {
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
        const errorData = await res.json();
        toast.error(errorData.message || "Delete failed");
      }
    } catch (error) {
      toast.error("Error deleting task");
      console.error("Delete task error:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleTaskSaved = () => {
    setShowEditModal(false);
    setSelectedTask(null);
    
    // Refetch tasks using the appropriate endpoint
    const endpoint = projectId 
      ? `/api/tasks?projectId=${projectId}` 
      : '/api/tasks/all';
      
    setLoading(true);
    fetcherWithAuth(endpoint)
      .then(data => {
        setTasks(data);
        setLoading(false);
        if (onTaskEdited) onTaskEdited();
      })
      .catch(() => {
        toast.error("Failed to fetch updated tasks");
        setLoading(false);
      });
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">
        {projectId ? "Project Tasks" : "All Tasks"}
      </h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">No tasks found. Create a new task to get started.</p>
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg border border-gray-200 transition"
            >
              {!projectId && task.projectName && (
                <div className="mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {task.projectName}
                  </span>
                </div>
              )}
              <h4 className="text-lg font-bold mb-1">{task.title}</h4>
              <p className="text-gray-600 mb-2 line-clamp-2">{task.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Priority: <span className="font-medium">{task.priority}</span> | Due:{" "}
                <span>{task.dueDate?.slice(0, 10) || "Not set"}</span>
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
      )}

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
              projectId={selectedTask.projectId}
              selectedTask={selectedTask}
              onTaskSaved={handleTaskSaved}
            />
          </div>
        </div>
      )}
    </div>
  );
}