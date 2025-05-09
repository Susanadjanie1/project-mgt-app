"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import KanbanBoard from "app/kanban/KanbanBoard";
import LogoutButton from "app/components/LogoutButton";
import { fetcherWithAuth } from "lib/fetcherWithAuth";

export default function MemberDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { data: tasks, error, mutate } = useSWR("/api/tasks", fetcherWithAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      if (decoded.role !== "member") {
        router.push("/unauthorized");
        return;
      }

      setUser(decoded);
      localStorage.setItem("userId", decoded.userId); // Make sure userId is available for task card
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/auth/login");
    }
  }, [router]);

  if (error) return <p className="text-red-600">Failed to load tasks.</p>;
  if (!tasks) return <p>Loading tasks...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Tasks</h2>
        <LogoutButton />
      </div>
      <KanbanBoard tasks={tasks} mutate={mutate} role="member" />
    </div>
  );
}
