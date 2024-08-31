"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useRouter } from "next/navigation";

const Page = () => {
  const [streamName, setStreamName] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [user, setUser] = useState<any>();
  const [live, setLive] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<any>(null);
  const router = useRouter();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("/api/profile", { token });
      if (response.data.success) {
        setUser(response.data.user);
        try {
          const streamResponse = await axios.get(
            `/api/stream/live?of=${response.data.user._id}`
          );
          if (streamResponse.data.success) {
            setLive(true);

            setStreamName(streamResponse.data.stream.streamName);
            setStreamDescription(streamResponse.data.stream.streamDescription);
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(streamResponse.data.mediaurl);
              hls.attachMedia(videoRef.current);

              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
              });

              hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                  switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                      setError(
                        "Network error - please check your connection or OBS configuration."
                      );
                      break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                      setError("Media error - unable to process the stream.");
                      hls.recoverMediaError();
                      break;
                    default:
                      setError("An error occurred while loading the stream.");
                      hls.destroy();
                      break;
                  }
                }
              });
            }
          } else {
            setError(
              "The stream could not be retrieved. Please start the stream from OBS."
            );
          }
        } catch (error) {
          setError(
            "The stream could not be retrieved from OBS, or you haven't created the stream."
          );
        }
      }
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleGoLive = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("/api/stream/createStream", {
        token,
        streamName,
        streamDescription,
      });

      if (response.data.success) {
        setLive(true);
        if (Hls.isSupported()) {
          const hls = new Hls();
          setUser(response.data.user);
          hls.loadSource(
            `http://localhost:8000/live/${response.data.user.streamKey}/index.m3u8`
          );
          hls.attachMedia(videoRef.current);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current.play();
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  setError(
                    "Network error - please check your connection or OBS configuration."
                  );
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  setError("Media error - unable to process the stream.");
                  hls.recoverMediaError();
                  break;
                default:
                  setError("An error occurred while loading the stream.");
                  hls.destroy();
                  break;
              }
            }
          });
        }
      } else {
        setError(
          "Failed to start the stream. Please ensure all fields are filled out."
        );
      }
    } catch (error) {
      setError("Error starting the stream. Please try again.");
    }
  };

  const handleStopLive = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("/api/stream/stopStream", { token });
      if (response.data.success) {
        setLive(false);
        window.location.href = window.location.href; // Force page reload
      } else {
        setError("Failed to stop the stream. Please try again.");
      }
    } catch (error) {
      setError("Error stopping the stream. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-center p-4">
      <div className="w-full lg:w-1/2">
        <div className="flex justify-center">
          <video
            ref={videoRef}
            controls
            className="w-full h-auto rounded-lg shadow-lg mb-4"
          ></video>
        </div>
        {streamName && (
          <>
            <div>
              <p className="text-gray-400">
                Streamer: <span className="text-red-700">{user.username}</span>
              </p>
            </div>
            <div className="text-center mt-2">
              <h2 className="text-xl font-bold">{streamName}</h2>
              <p className="text-gray-400">{streamDescription}</p>
            </div>
            <div className="w-1/2"></div>
          </>
        )}
      </div>

      <div className="w-full lg:w-1/2 lg:pl-8">
        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 max-w-lg text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleGoLive}
          className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <label
            htmlFor="streamName"
            className="block text-sm font-semibold mb-2"
          >
            Stream Name:
          </label>
          <input
            type="text"
            id="streamName"
            onChange={(e) => setStreamName(e.target.value)}
            required
            className="w-full p-2 mb-4 bg-slate-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 "
          />

          <label
            htmlFor="streamDescription"
            className="block text-sm font-semibold mb-2"
          >
            Stream Description:
          </label>
          <textarea
            id="streamDescription"
            onChange={(e) => setStreamDescription(e.target.value)}
            className="w-full p-2 mb-4 bg-slate-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          ></textarea>

          {live ? (
            <button
              type="button"
              onClick={handleStopLive}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-all duration-200"
            >
              🔴 STOP LIVE
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all duration-200"
            >
              Go Live
            </button>
          )}
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">
            Steps to start the Stream:
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to your Profile page and copy the stream Key.</li>
            <li>
              Head into OBS, go to Settings &gt; Stream, and select 'Custom' as
              the service.
            </li>
            <li>
              Paste the streamKey and set the server URL to{" "}
              <code>http://localhost:8000/live</code>.
            </li>
            <li>Start the stream in OBS.</li>
            <li>Press the "Go Live" button here.</li>
          </ol>
        </div>
      </div>

      <div className="w-full text-center lg:hidden mt-4 text-red-500">
        You need a larger device to start streaming.
      </div>
    </div>
  );
};

export default Page;
