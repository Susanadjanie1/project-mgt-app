"use client";
import { useRouter } from "next/navigation";
import {
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiArrowRight,
  FiGlobe,
  FiShield,
  FiClock,
} from "react-icons/fi";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
   
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto py-20 px-6 md:px-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Project Management Made{" "}
              <span className="text-yellow-400">Simple</span>
            </h1>
            <p className="text-lg text-gray-100 max-w-lg mb-8">
              Organize your work and collaborate effortlessly with our smart
              Kanban-style project management platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => router.push("/auth/signup")}
                className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center"
              >
                Get Started Free <FiArrowRight className="ml-2" />
              </button>
              <button
                onClick={() => router.push("/demo")}
                className="bg-transparent hover:bg-indigo-800 border border-white text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
              >
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/api/placeholder/600/400"
              alt="PlannyPro Dashboard Preview"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-900">10,000+</p>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-900">50,000+</p>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-900">99.9%</p>
            <p className="text-gray-600">Uptime</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage projects efficiently and keep your
              team aligned.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<FiGrid className="w-8 h-8 text-yellow-400" />}
              title="Intuitive Kanban Boards"
              text="Drag & drop tasks between customizable columns to visualize workflow and track progress."
            />
            <Feature
              icon={<FiUsers className="w-8 h-8 text-yellow-400" />}
              title="Team Collaboration"
              text="Assign tasks, mention team members, and collaborate in real-time with comments."
            />
            <Feature
              icon={<FiBarChart2 className="w-8 h-8 text-yellow-400" />}
              title="Analytics Dashboard"
              text="Gain insights with visual metrics and track project velocity with interactive charts."
            />
            <Feature
              icon={<FiGlobe className="w-8 h-8 text-yellow-400" />}
              title="Access Anywhere"
              text="Cloud-based platform works on all devices, so you can manage projects from anywhere."
            />
            <Feature
              icon={<FiShield className="w-8 h-8 text-yellow-400" />}
              title="Enterprise Security"
              text="Advanced encryption and role-based permissions keep your data secure and private."
            />
            <Feature
              icon={<FiClock className="w-8 h-8 text-yellow-400" />}
              title="Time Tracking"
              text="Built-in time tracking allows you to measure effort and improve estimation."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
            Trusted by Teams Worldwide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="PlannyPro simplified how our remote team handles projects. We actually ship faster now!"
              author="Sarah Johnson"
              role="Product Manager, TechCorp"
            />
            <Testimonial
              quote="The analytics dashboard gives us valuable insights we never had before. Game changer for our agency."
              author="Michael Chen"
              role="Creative Director, DesignWorks"
            />
            <Testimonial
              quote="We reduced project delays by 40% in just two months after switching to PlannyPro."
              author="Jessica Rodriguez"
              role="Operations Lead, StartupX"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your project management?
          </h2>
          <p className="text-lg mb-10 text-gray-200 max-w-2xl mx-auto">
            Join thousands of teams who've improved productivity with PlannyPro.
            Get started for free, no credit card required.
          </p>
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold py-4 px-8 rounded-lg shadow-lg transition text-lg"
          >
            Start Free Trial
          </button>
          <p className="mt-4 text-sm text-gray-300">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </section>

      {/* Simple Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the plan that's right for your team. All plans include core
            features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingTier
              name="Starter"
              price="Free"
              features={[
                "Up to 5 team members",
                "3 active projects",
                "Basic Kanban boards",
                "Core task management",
              ]}
              cta="Sign Up Free"
              highlight={false}
            />
            <PricingTier
              name="Professional"
              price="$12"
              period="per user/month"
              features={[
                "Unlimited team members",
                "Unlimited projects",
                "Advanced reporting",
                "Time tracking",
                "Priority support",
              ]}
              cta="Start 14-Day Trial"
              highlight={true}
            />
            <PricingTier
              name="Enterprise"
              price="Custom"
              features={[
                "Everything in Professional",
                "Custom integrations",
                "Dedicated account manager",
                "Enterprise security",
                "SSO authentication",
              ]}
              cta="Contact Sales"
              highlight={false}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">PlannyPro</h3>
              <p className="text-sm">
                Modern project management for teams of all sizes.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} PlannyPro. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm mr-4 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm mr-4 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-indigo-900 mb-3">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function Testimonial({ quote, author, role }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-indigo-900">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
}

function PricingTier({ name, price, period, features, cta, highlight }) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlight
          ? "bg-indigo-900 text-white ring-2 ring-yellow-400 shadow-xl"
          : "bg-white shadow-md"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-2 ${
          highlight ? "text-white" : "text-indigo-900"
        }`}
      >
        {name}
      </h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {period && (
          <span
            className={`text-sm ${
              highlight ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {" "}
            {period}
          </span>
        )}
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className={`h-5 w-5 ${
                highlight ? "text-yellow-400" : "text-indigo-500"
              } mr-2 mt-0.5`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className={highlight ? "text-gray-100" : "text-gray-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 px-4 rounded-lg font-medium transition ${
          highlight
            ? "bg-yellow-400 hover:bg-yellow-500 text-indigo-900"
            : "bg-indigo-100 hover:bg-indigo-200 text-indigo-900"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
