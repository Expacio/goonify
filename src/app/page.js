"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        // Reload page only if it comes back via back/forward navigation
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mt-30">
        Welcome to <span className="text-green-500 text-4xl font-extrabold">Goonify</span>
      </h1>
      <button
        className="bg-indigo-600 hover:bg-green-600 transition duration-200 w-35 h-10 rounded-md mt-25 text-center text-sl flex items-center gap-2"
        onClick={() => (document.location.href = "https://fastapi-t67z.onrender.com/login")}
      >
        Connect Spotify
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-spotify"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
          </svg>
        </span>
      </button>
    </div>
  );
}
