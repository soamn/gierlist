"use client";
import axios from "axios";
import Hls from "hls.js";
import React, { useEffect, useRef, useState } from "react";

const StreamPage = ({ params }: { params: { _id: string } }) => {
  const [streamData, setStreamData] = useState<any>(null);
  const [live, setLive] = useState(false);
  const videoRef = useRef<any>(null);

  const fetchStream = async () => {
    if (!params._id) {
      console.log(params._id);
      return;
    }

    try {
      const response = await axios.get(`/api/stream/live?of=${params._id}`);
      if (response.data.success) {
        setStreamData(response.data.stream);
        setLive(true);

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(response.data.mediaurl);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current.play();
          });
        }
      } else {
        console.error("Stream not available");
      }
    } catch (error) {
      console.error("Error fetching the stream", error);
    }
  };

  useEffect(() => {
    fetchStream();
  }, []);

  if (!streamData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex">
      <div className="w-1/2">
        <video ref={videoRef} controls className="w-full h-auto"></video>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">{streamData.streamName}</h2>
          <p className="text-gray-400">{streamData.streamDescription}</p>
          <p className="text-gray-500">by {streamData.user.username}</p>
        </div>
      </div>

      <div className="w-1/2 pl-6"></div>
    </div>
  );
};

export default StreamPage;
