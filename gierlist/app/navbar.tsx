"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Gierlist</h1>
        <div className="space-x-4">
          <button
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>
          <button
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </button>
          <button
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => handleNavigation("/Stream")}
          >
            Go Live
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
