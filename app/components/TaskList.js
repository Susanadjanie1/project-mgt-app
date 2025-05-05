'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm"; // Ensure path is correct

export default function TaskList({ projectId, refreshFlag, onTaskEdited }) {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    fetch(`/api/tasks?projectId=${projectId}`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(() => toast.error("Failed to fetch tasks"));
  }, [projectId, refreshFlag]);

  const deleteTask = async (taskId) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
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
    onTaskEdited(); // Refresh task list in parent
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Tasks</h3>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="p-4 border rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">
                Priority: {task.priority} | Due: {task.dueDate?.slice(0, 10)} 
                {/* Display formatted due date */}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(task)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
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
