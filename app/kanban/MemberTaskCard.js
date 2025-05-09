"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function MemberTaskCard({ task, mutate }) {
  const [status, setStatus] = useState(task.status);
  const [comment, setComment] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTimeLogs, setShowTimeLogs] = useState(false);

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      mutate();
      toast.success("Status updated");
    } catch (error) {
      setStatus(task.status);
      toast.error(`Error: ${error.message}`);
    }
  }

  async function handleCommentSubmit() {
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await fetch(`/api/tasks/${task._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, text: comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add comment");
      }

      setComment("");
      setShowComments(true);
      mutate();
      toast.success("Comment added");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleTimeLog() {
    if (!timeSpent.trim()) return;

    const timeRegex = /^\d+(\.\d+)?[hm]$/;
    if (!timeRegex.test(timeSpent)) {
      toast.error("Please use format like '2h' or '30m'");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      let hours = timeSpent.endsWith("h")
        ? parseFloat(timeSpent.slice(0, -1))
        : parseFloat(timeSpent.slice(0, -1)) / 60;

      const response = await fetch(`/api/tasks/${task._id}/logtime`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, hours }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to log time");
      }

      setTimeSpent("");
      setShowTimeLogs(true);
      mutate();
      toast.success("Time logged successfully");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  function formatTimeDisplay(hours) {
    if (hours >= 1) {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${Math.round(hours * 60)}m`;
  }

  function formatDateTime(date) {
    return new Date(date).toLocaleString();
  }

  function getUserDisplay(userId) {
    if (!userId) return "Unknown user";
    if (typeof userId === "object") return userId.email || userId.name || "Unknown user";
    return userId;
  }

  function getStatusBadge(status) {
    const styles = {
      done: "bg-green-100 text-green-800",
      in_progress: "bg-blue-100 text-blue-800",
      todo: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs ${styles[status] || ""}`}>
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  }

  const totalTimeLogged = (task.timeLogs || []).reduce((acc, log) => acc + (log.hours || 0), 0);

  return (
    <div className="bg-white p-4 rounded shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-gray-800">{task.title}</h4>
        {getStatusBadge(status)}
      </div>

      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <p className="text-xs text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

      {task.assignedTo?.length > 0 && (
        <p className="text-xs text-gray-600 mt-1">
          Assigned to: {task.assignedTo.map(user => user.email || user).join(", ")}
        </p>
      )}

      {totalTimeLogged > 0 && (
        <p className="text-xs font-medium text-green-700 mt-1">
          Total time logged: {formatTimeDisplay(totalTimeLogged)}
        </p>
      )}

      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-700">Status:</label>
        <select
          className="mt-1 w-full p-2 text-sm border rounded"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Time Logs */}
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-medium text-gray-700">
            Time Logs {task.timeLogs?.length > 0 && `(${task.timeLogs.length})`}:
          </label>
          {task.timeLogs?.length > 0 && (
            <button
              onClick={() => setShowTimeLogs(!showTimeLogs)}
              className="text-xs text-blue-600"
            >
              {showTimeLogs ? "Hide" : "Show"}
            </button>
          )}
        </div>

        {showTimeLogs && (
          <div className="mt-2 max-h-40 overflow-y-auto bg-gray-50 p-2 rounded border">
            {task.timeLogs.map((log, index) => (
              <div key={index} className="text-xs p-1 border-b last:border-b-0">
                <div className="flex justify-between">
                  <span className="font-medium">{getUserDisplay(log.userId)}</span>
                  <span className="text-green-700">{formatTimeDisplay(log.hours)}</span>
                </div>
                <div className="text-gray-500">{formatDateTime(log.createdAt)}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex mt-1">
          <input
            type="text"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            className="flex-grow p-2 text-sm border rounded-l"
            placeholder="e.g. 2h or 30m"
            disabled={isSubmitting}
          />
          <button
            onClick={handleTimeLog}
            className="bg-green-500 text-white px-3 py-1 rounded-r text-sm hover:bg-green-600 disabled:bg-green-300"
            disabled={isSubmitting || !timeSpent.trim()}
          >
            Log
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Format: 1.5h or 30m</p>
      </div>

      {/* Comments */}
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-medium text-gray-700">
            Comments {task.comments?.length > 0 && `(${task.comments.length})`}:
          </label>
          {task.comments?.length > 0 && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-xs text-blue-600"
            >
              {showComments ? "Hide" : "Show"}
            </button>
          )}
        </div>

        {showComments && (
          <div className="mt-2 max-h-40 overflow-y-auto bg-gray-50 p-2 rounded border">
            {task.comments.map((comment, index) => (
              <div key={index} className="text-xs p-1 border-b last:border-b-0">
                <div className="font-medium">{getUserDisplay(comment.userId)}</div>
                <div className="whitespace-pre-wrap">{comment.text}</div>
                <div className="text-gray-500 text-right">{formatDateTime(comment.createdAt)}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex mt-1">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow p-2 text-sm border rounded-l"
            placeholder="Write a comment"
            disabled={isSubmitting}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isSubmitting || !comment.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
