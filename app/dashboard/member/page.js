'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import jwt from 'jsonwebtoken';
import MemberDashboard from './MemberDashboard';
import { fetcherWithAuth } from 'lib/fetcherWithAuth';

export default function MemberPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const decoded = jwt.decode(token);

      if (!decoded || decoded.role !== 'member') {
        router.push('/unauthorized');
        return;
      }

      setUser(decoded);
    } catch (error) {
      console.error('Token decoding error:', error);
      router.push('/auth/login');
    }
  }, [router]);

  const { data: tasks, error, mutate } = useSWR('/api/tasks', fetcherWithAuth);

  if (!user || !tasks) return <div>Loading...</div>;
  if (error) return <div>Failed to load tasks</div>;

  return (
    <MemberDashboard session={{ user }} tasks={tasks} mutate={mutate} />
  );
}
