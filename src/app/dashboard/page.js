"use client"

import { use } from "react";
import { useState, useEffect } from "react";

export default function Dashboard({ searchParams }) {
  const { user_id: userId } = use(searchParams);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!userId) return;

    async function fetchTracks() {
      try {
        const res = await fetch(`https://fastapi-t67z.onrender.com/me/top-tracks?user_id=${userId}`);
        const data = await res.json();
        setTracks(data);
      } catch (err) {
        console.error("Error fetching tracks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, [userId]);

  if (loading) return <p className="text-center text-yellow-500 text-4xl mt-30">Loading your dashboard…</p>;

  if (tracks.length === 0) return <p>No tracks found.</p>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mt-15">Your Top Tracks</h1>
      <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {tracks.map((track, i) => (
          <div key={i} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href={track.spotify_url} target="_blank" rel="noopener noreferrer">
              <img className="rounded-t-lg" src={track.cover} alt={track.name} />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {track.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Artists: {track.artists.join(", ")}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Album: {track.album}
              </p>
              <a
                href={track.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Listen on Spotify
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
