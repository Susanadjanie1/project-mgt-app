'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Projects', href: '/dashboard/projects' },
  { name: 'Tasks', href: '/dashboard/tasks' },
  { name: 'Reports', href: '/dashboard/reports' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-[#4B0082] text-white p-6 flex flex-col justify-between shadow-xl">
      <div>
        <h2 className="text-2xl font-bold mb-10">LuxDash</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-lg hover:bg-[#3A006B] transition ${
                pathname === item.href ? 'bg-[#3A006B]' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <Link href="/logout" className="flex items-center gap-2 text-sm hover:opacity-80">
        <FiLogOut size={18} />
        Logout
      </Link>
    </aside>
  );
}
