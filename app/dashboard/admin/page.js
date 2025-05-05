"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardClient from "../../components/AdminDashboardClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Adjust this to your actual login path
      return;
    }

    try {
      // Decode payload (safely, without verifying)
      const decoded = JSON.parse(atob(token.split('.')[1]));

      if (decoded.role !== "admin") {
        router.push("/unauthorized");
      } else {
        setUser(decoded);
      }
    } catch (error) {
      console.error("Token decode failed:", error);
      router.push("/login");
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>Welcome, {user.email}</h1>
      <p>Your role: {user.role}</p> */}
      <AdminDashboardClient session={user} />
    </div>
  );
}
