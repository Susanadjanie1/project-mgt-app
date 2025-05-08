"use client";
import { useState } from "react";
export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
    } else {
      setSuccess("Signup successful! Redirecting to sign-in...");
      setTimeout(() => window.location.href = "/auth/signin", 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold" style={{ color: "#4B0082" }}>Sign Up</h2>
          <p className="mt-2 text-gray-600">Create your account</p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 text-sm text-green-800 bg-green-100 rounded-md">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ 
                focusRing: "#4B0082", 
                focusBorderColor: "#4B0082" 
              }}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ 
                focusRing: "#4B0082", 
                focusBorderColor: "#4B0082" 
              }}
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium rounded-md shadow transition duration-200 focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: "#4B0082", 
              hover: { backgroundColor: "#3A0068" },
              focusRing: "#FFD700",
              focusRingOffset: "2px"
            }}
          >
            Sign Up
          </button>
        </form>
        
        <div className="text-center pt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">or</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a 
              href="/auth/signin" 
              className="font-medium"
              style={{ 
                color: "#4B0082", 
                hover: { color: "#FFD700" }
              }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}