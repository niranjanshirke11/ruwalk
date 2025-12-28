import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:4000/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Failed"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Ruwalk</h1>
      <p className="text-gray-600 mb-6">
        Post-run territory capture using Strava
      </p>

      <p className="text-sm text-gray-500 mb-4">Backend Status: {status}</p>

      <button className="px-6 py-3 bg-black text-white rounded-lg">
        Start
      </button>
    </div>
  );
}
