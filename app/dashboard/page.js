import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import KanbanBoard from "../kanban/KanbanBoard";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/login");

  const allowedRoles = ["admin", "manager", "member"];
  if (!allowedRoles.includes(session.user.role)) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {session.user.name} ({session.user.role})
        </h1>
        <LogoutButton />
      </div>

      <KanbanBoard />
    </div>
  );
}
