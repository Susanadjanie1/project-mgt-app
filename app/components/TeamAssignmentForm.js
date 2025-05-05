// 'use client';

// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// export default function TeamAssignmentForm({ projectId }) {
//   const [users, setUsers] = useState([]);
//   const [selectedUserIds, setSelectedUserIds] = useState([]);
//   const [loading, setLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     // Fetch all users (members) to assign
//     fetch('/api/users')
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch(() => {
//         toast.error('Failed to load users');
//         setLoading(false); // Stop loading even if there's an error
//       });
//   }, []);

//   async function handleAssign() {
//     if (selectedUserIds.length === 0) {
//       toast.warning('Please select at least one user');
//       return;
//     }

//     try {
//       const res = await fetch(`/api/projects/${projectId}/team`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ memberIds: selectedUserIds }),
//       });

//       if (!res.ok) throw new Error('Failed to assign team');
//       toast.success('Team successfully assigned');
//       setSelectedUserIds([]); // Clear selection after assignment
//     } catch (error) {
//       toast.error(error.message || 'Failed to assign team');
//     }
//   }

//   function toggleUser(id) {
//     setSelectedUserIds((prev) =>
//       prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
//     );
//   }

//   if (loading) {
//     return <div>Loading users...</div>; // Loading state while fetching users
//   }

//   return (
//     <div className="space-y-4">
//       {users.length === 0 ? (
//         <p>No users available to assign.</p> // Handling empty user list
//       ) : (
//         Array.isArray(users) && users.map((user) => (
        
//           <label key={user._id} className="block">
//             <input
//               type="checkbox"
//               checked={selectedUserIds.includes(user._id)}
//               onChange={() => toggleUser(user._id)}
//               className="mr-2"
//             />
//             {user.name} ({user.email})
//           </label>
//         ))
//       )}

//       <button
//         onClick={handleAssign}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         disabled={selectedUserIds.length === 0} // Disable the button if no users are selected
//       >
//         Assign Team
//       </button>
//     </div>
//   );
// }
