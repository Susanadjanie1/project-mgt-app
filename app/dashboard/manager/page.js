'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import KanbanBoard from 'app/kanban/KanbanBoard';

export default function ManagerDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return router.push('/auth/login');
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded || !['admin', 'manager'].includes(decoded.role)) {
        setLoading(false);
        router.push('/unauthorized');
      } else {
        setUser(decoded);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Token decode error:', error);
      router.push('/auth/login');
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner or animation
  }

  if (!user) {
    return null;  // Should not reach here, but a fallback
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <KanbanBoard />
    </div>
  );
}
