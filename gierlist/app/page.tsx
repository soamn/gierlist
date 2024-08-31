"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
const Page = () => {
  const [streams, setStreams] = useState<any[]>([]);
  const router = useRouter();
  const getStreams = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stream");
      if (response.data.success) {
        setStreams(response.data.streams);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getStreams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Gierlist</h1>
        <p className="text-lg text-gray-400">
          Discover live streams from top creators
        </p>
        <div>
          <button
            className="w-fit bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Join The community
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {streams.length > 0 ? (
          streams.map((stream, index) => (
            <StreamCard key={index} stream={stream} />
          ))
        ) : (
          <div className="col-span-full text-center">
            <p>No streams available 🚦</p>
            <button
              className="w-fit bg-orange-600 hover:bg-orange-700 p-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              onClick={() => {
                router.push("/Stream");
              }}
            >
              Go Live Yourself
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StreamCard = ({ stream }: { stream: any }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/streams/${stream.user._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
    >
      <h2 className="text-xl font-semibold mb-2">{stream.streamName}</h2>
      <p className="text-gray-400">by {stream.user.username}</p>
    </div>
  );
};
export default Page;
