'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProjectEditModal from './ProjectEditModal';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function ProjectList({ refreshFlag, onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [refreshFlag]);

  const deleteProject = (id) => {
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to delete this project?</p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            onClick={() => toast.dismiss(toastId)}  // Cancel action
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={async () => {
              toast.dismiss(toastId);  // Close the toast
              try {
                const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                if (res.ok) {
                  setProjects((prev) => prev.filter((p) => p._id !== id));  // Remove project from list
                  toast.success('Project deleted successfully');
                } else {
                  throw new Error('Failed to delete project');
                }
              } catch (error) {
                toast.error(error.message || 'Delete failed');
              }
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>,
      {
        autoClose: false,  // Prevents auto closing until the user acts
        closeOnClick: false,  // Prevents closing if the user clicks anywhere else
        draggable: false,  // Disables dragging
      }
    );
  };

  const handleUpdate = (updatedProject) => {
    setProjects(projects.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Projects</h2>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="divide-y">
          {projects.map((project) => (
            <li
              key={project._id}
              className="flex justify-between items-center p-4 hover:bg-gray-100 rounded-lg shadow-sm cursor-pointer transition"
              onClick={() => onProjectSelect?.(project._id)}
            >
              <div>
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <div className="flex gap-4 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();  // Prevents event bubbling
                    setEditingProject(project);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();  // Prevents event bubbling
                    deleteProject(project._id);  // Calls delete function with project id
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <ProjectEditModal
        isOpen={!!editingProject}
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onUpdated={handleUpdate}
      />
    </div>
  );
}
