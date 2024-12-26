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

  return <div>Twitch test</div>;
};

export default TwitchApp;
