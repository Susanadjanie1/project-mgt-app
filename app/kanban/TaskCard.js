// TaskCard.js
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskCard({ task, mutate }) {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo?.[0]?._id || "");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Unauthorized or failed to fetch");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      }
    }

    fetchUsers();
  }, []);

  async function handleChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);

    await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    mutate();
  }

  async function handlePriorityChange(e) {
    const newPriority = e.target.value;
    setPriority(newPriority);

    await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: newPriority }),
    });

    mutate();
  }

  async function handleAssign(e) {
    const userId = e.target.value;
    setAssignedTo(userId);

    const userEmail = users.find(u => u._id === userId)?.email;
    if (!userEmail) return;

    await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTo: [userEmail] }),
    });

    mutate();
  }

  function confirmDelete() {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Delete &quot;{task.title}&quot;?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={async () => {
                await fetch(`/api/tasks/${task._id}`, { method: "DELETE" });
                mutate();
                closeToast();
              }}
              className="text-red-600 font-bold"
            >
              Yes
            </button>
            <button onClick={closeToast} className="text-gray-600">
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  }

  return (
    <div className="bg-white p-3 rounded shadow flex flex-col space-y-2">
      <div>
        <p className="font-semibold">{task.title}</p>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs">Due: {task.dueDate}</p>

        <label className="block mt-2 text-xs font-medium">Status:</label>
        <select
          className="border p-1 text-sm w-full"
          value={status}
          onChange={handleChange}
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label className="block mt-2 text-xs font-medium">Priority:</label>
        <select
          className="border p-1 text-sm w-full"
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label className="block mt-2 text-xs font-medium">Assign to:</label>
        <select
          className="border p-1 text-sm w-full"
          value={assignedTo}
          onChange={handleAssign}
        >
          <option value="">-- Unassigned --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={confirmDelete}
        className="text-red-500 hover:text-red-700 text-sm self-end"
        aria-label="Delete task"
      >
        ✕ Delete
      </button>
    </div>
  );
}