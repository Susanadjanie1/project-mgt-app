"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiMoon, 
  FiSun, 
  FiMenu, 
  FiLogOut
} from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

export function Navbar({ toggleSidebar }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Removed markAllAsRead function

  // Navigation links removed as requested

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and desktop navigation */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              {isLoggedIn && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-indigo-900 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-800 md:hidden"
                  onClick={toggleSidebar}
                  aria-label="Toggle sidebar navigation"
                >
                  <FiMenu className="h-6 w-6" />
                </button>
              )}
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
                  <div className="w-8 h-8 rounded-md bg-indigo-900 text-yellow-400 flex items-center justify-center mr-2">
                    <span className="font-bold text-lg">P</span>
                  </div>
                  <span className="font-bold text-xl text-indigo-900 dark:text-white">PlannyPro</span>
                </Link>
              </div>
              
              {/* Desktop navigation links removed as requested */}
            </div>
            
            {/* Right side - Actions section */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-indigo-900 dark:text-gray-400 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <FiSun className="h-5 w-5" />
                ) : (
                  <FiMoon className="h-5 w-5" />
                )}
              </button>
            
              {isLoggedIn ? (
                /* Logout button when logged in */
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    router.push("/");
                  }}
                  className="bg-indigo-900 text-white hover:bg-indigo-800 dark:bg-yellow-400 dark:text-indigo-900 dark:hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors flex items-center"
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              ) : (
                /* Login and Sign up for free buttons */
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-indigo-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-indigo-900 text-white hover:bg-indigo-800 dark:bg-yellow-400 dark:text-indigo-900 dark:hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
                  >
                    Sign up for free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu removed */}
    </>
  );
}