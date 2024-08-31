"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("/api/profile", { token });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        {user ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Username
              </label>
              <div className="bg-gray-700 p-2 rounded-lg mt-1">
                {user.username}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <div className="bg-gray-700 p-2 rounded-lg mt-1">
                {user.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Stream Key
              </label>
              <input
                defaultValue={user.streamKey}
                type="text"
                className="bg-gray-700 p-2 rounded-lg mt-1 w-full"
                readOnly
              />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
