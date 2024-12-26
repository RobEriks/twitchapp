"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const usernames = [
  "squillakilla",
  "trentthetraveler",
  "The_Happy_Hob",
  "Rhykker",
  "Xaryu",
  "Payo",
  "slop3",
  "BobRoss",
];

const TwitchApp: React.FC = () => {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const requests = usernames.map((username) =>
          axios.get(
            `https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=${username}`
          )
        );
  
        const responses = await Promise.all(requests);
        const streamData = responses.map((response, index) => ({
          username: usernames[index],
          stream: response.data.stream,
        }));
  
        setStreams(streamData);
        setLoading(false);
      } catch (err) {
        setError("Failed");
        setLoading(false);
      }
    };
  
    fetchStreams();
  }, []);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-600 text-black">
        Loading ..
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-500 text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Status
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {streams.map(({ username, stream }) => (
          <a
            key={username}
            href={`https://www.twitch.tv/${username}`}
            className="p-4 rounded-lg shadow-lg bg-gray-600 hover:bg-slate-900 transition"
          >
            <h2 className="text-xl font-bold">{username}</h2>
            {stream ? (
              <>
                <p className="text-green-400">Online</p>
                <p className="mt-2">{stream.channel.status}</p>
              </>
            ) : (
              <p className="text-red-600">Offline</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TwitchApp;
