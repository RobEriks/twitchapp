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
  "bobross",
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
            `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${username}`
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
  

  return <div>Twitch test</div>;
};

export default TwitchApp;
