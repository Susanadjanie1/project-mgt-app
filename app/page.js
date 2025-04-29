'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50 text-center px-4">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome to KanbanPro</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Organize your work and collaborate effortlessly with our Kanban-style project management app.
      </p>
      <button
        onClick={() => router.push('/login')}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
      >
        Get Started
      </button>
    </div>
  );
}
