"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectForm({ project = null, onProjectCreated }) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("User not authenticated.");

    let payload;
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      return alert("Invalid token format.");
    }

    const createdBy = payload?.userId;
    if (!createdBy) return alert("Invalid token payload.");

    const method = project ? "PATCH" : "POST";
    const url = project ? `/api/projects/${project._id}` : "/api/projects";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Corrected token format
      },
      body: JSON.stringify({ title, description, createdBy }),
    });

    const data = await res.json();

    if (res.ok) {
      setTitle("");
      setDescription("");
      onProjectCreated?.();
      setIsOpen(false); // Close the modal after successful submission

      // Show toast on success
      toast.success("Project created successfully!");
    } else {
      alert("Failed to save project: " + (data.error || "Unknown error"));
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        {project ? "Edit Project" : "Create Project"}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {project ? "Update Project" : "Create Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
              <textarea
                placeholder="Project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)} // Close modal without saving
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  {project ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{/* 
      Toast container */}
      {/* <toast.Container /> */}
    </>
  );
}
