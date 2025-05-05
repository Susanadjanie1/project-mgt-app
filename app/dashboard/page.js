// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import jwt from 'jsonwebtoken';

// import AdminDashboard from './admin/AdminDashboardClient';
// import ManagerDashboard from './manager/ManagerDashboard';
// import MemberDashboard from './member/MemberDashboard';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       router.push('/auth/login');
//       return;
//     }

//     try {
//       const decoded = jwt.decode(token); // Only decode to extract user info (or use jwt.verify with secret if needed)

//       if (!decoded) throw new Error('Invalid token');

//       setUser(decoded);
//     } catch (err) {
//       console.error('Token error:', err);
//       router.push('/auth/login');
//     }
//   }, [router]);

//   if (!user) return <div>Loading...</div>;

//   switch (user.role) {
//     case 'admin':
//       return <AdminDashboard session={user} />;
//     case 'manager':
//       return <ManagerDashboard session={user} />;
//     case 'member':
//       return <MemberDashboard session={user} />;
//     default:
//       return (
//         <div className="p-8 text-center">
//           <h1 className="text-2xl font-bold">Access Denied</h1>
//           <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
//         </div>
//       );
//   }
// }
