'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
// import AssignedTasks from '@/components/AssignedTasks';

export default function MemberDashboard() {
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <AssignedTasks userId={user.userId} /> */}
    </div>
  );
}
