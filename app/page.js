'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">PlannyPro</h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Organize your work and collaborate effortlessly with our smart Kanban-style project management platform.
        </p>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What You Can Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Feature icon="🗂️" title="Drag & Drop Tasks" text="Easily organize tasks into columns like Todo, In Progress, and Done." />
          <Feature icon="👥" title="Assign Users" text="Collaborate in real-time with your team and assign responsibilities." />
          <Feature icon="📊" title="Track Progress" text="Use metrics and charts to visualize how projects are moving." />
        </div>
      </section>

      {/* Testimonials Section (Optional for Trust) */}
      <section className="bg-green-100 py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Trusted by Teams</h2>
        <p className="text-center max-w-2xl mx-auto text-gray-700 mb-4">“PlannyPro simplified how our remote team handles projects. We actually ship faster now!” — Product Manager</p>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-green-700 text-white text-sm py-4 text-center">
        &copy; {new Date().getFullYear()} PlannyPro. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
