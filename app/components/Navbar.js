"use client";

import { useState, useEffect } from "react";
import { FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function Navbar({ toggleSidebar }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between">
      {/* Hamburger: only show on small screens */}
      {/* <div className="md:hidden">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <FiMenu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div> */}

      {/* <div className="flex-1 text-center font-bold text-lg text-gray-800 dark:text-white">
        
      </div> */}

      {/* Theme toggle button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <FiSun className="h-5 w-5" />
          ) : (
            <FiMoon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
}
