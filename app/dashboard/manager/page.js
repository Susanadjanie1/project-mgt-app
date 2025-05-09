'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import KanbanBoard from 'app/kanban/KanbanBoard';
import ProjectMetrics from 'app/kanban/ProjectMetrics';
import LogoutButton from 'app/components/LogoutButton';
import { fetcherWithAuth } from 'lib/fetcherWithAuth';

export default function ManagerDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  const { data: tasks, error, mutate } = useSWR('/api/tasks', fetcherWithAuth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      // Assuming jwt is imported correctly where this component is used
      const decoded = window.jwt ? window.jwt.decode(token) : JSON.parse(atob(token.split('.')[1]));
      
      if (!decoded || decoded.role !== 'manager') {
        router.push('/unauthorized');
        return;
      }
      
      setUser(decoded);
    } catch (error) {
      console.error('Token decoding error:', error);
      router.push('/auth/login');
    }
  }, [router]);

  if (!user || !tasks) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load tasks</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">
          Manager Dashboard – {user.name || user.email}
        </h1>
        {/* <LogoutButton /> */}
      </div>

      <div className="space-y-8">
        <ProjectMetrics tasks={tasks} />
        <KanbanBoard tasks={tasks} mutate={mutate} />
      </div>
    </div>
  );
}