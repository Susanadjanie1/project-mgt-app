'use client';

import { useRouter } from "next/navigation";
import { 
  Home, 
  LayoutDashboard, 
  FilePlus, 
  ListTodo, 
  ClipboardList, 
  UserCircle,
  LogOut,
  PlusCircle
} from "lucide-react";

export default function Sidebar({ activeView, setActiveView, displayName, selectedProjectId }) {
  const router = useRouter();
  
  const handleLogout = () => {
    // Implement your logout logic here
    router.push('/auth/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white shadow-lg z-10">
      <div className="p-6 border-b border-indigo-800">
        <h2 className="text-xl font-bold">Project Manager</h2>
        <div className="flex items-center mt-4">
          <UserCircle className="h-6 w-6 mr-2" />
          <div>
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs opacity-70 capitalize">Admin</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider opacity-70 mb-2">Navigation</p>
        
        <nav>
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors ${
              activeView === 'dashboard' ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveView('createProject')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors ${
              activeView === 'createProject' ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'
            }`}
          >
            <FilePlus className="h-5 w-5 mr-3" />
            <span>Create Project</span>
          </button>
          
          <button 
            onClick={() => setActiveView('projects')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors ${
              activeView === 'projects' ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'
            }`}
          >
            <ClipboardList className="h-5 w-5 mr-3" />
            <span>Projects</span>
          </button>
          
          <button 
            onClick={() => setActiveView('allTasks')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors ${
              activeView === 'allTasks' ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'
            }`}
          >
            <ListTodo className="h-5 w-5 mr-3" />
            <span>View All Tasks</span>
          </button>
          
          <button 
            onClick={() => setActiveView('createTask')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors ${
              activeView === 'createTask' ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'
            }`}
          >
            <FilePlus className="h-5 w-5 mr-3" />
            <span>Create Task</span>
          </button>
          
          {selectedProjectId && (
            <button 
              onClick={() => setActiveView('tasks')}
              className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors ${
                activeView === 'tasks' ? 'bg-indigo-800 font-medium' : 'hover:bg-indigo-800/50'
              }`}
            >
              <ListTodo className="h-5 w-5 mr-3" />
              <span>Manage Tasks</span>
            </button>
          )}
        </nav>
      </div>
      
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider opacity-70 mb-2">Role Views</p>
        
        <nav>
          <button 
            onClick={() => router.push('/dashboard')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors hover:bg-indigo-800/50`}
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Admin View</span>
          </button>
          
          <button 
            onClick={() => router.push('/dashboard/manager')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors hover:bg-indigo-800/50`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            <span>Manager View</span>
          </button>
          
          <button 
            onClick={() => router.push('/dashboard/member')}
            className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors hover:bg-indigo-800/50`}
          >
            <UserCircle className="h-5 w-5 mr-3" />
            <span>Member View</span>
          </button>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-indigo-800/50 text-red-300 hover:text-red-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}