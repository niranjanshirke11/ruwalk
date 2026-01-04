import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Checking...");
  const [activity, setActivity] = useState(null);

  async function fetchActivity() {
    const token = prompt("Paste your Strava access token:");

    const res = await fetch(
      `http://localhost:4000/strava/latest-activity?token=${token}`
    );

    const data = await res.json();
    setActivity(data);
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Failed"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Ruwalk</h1>
      <p className="text-gray-600 mb-6">
        Post-run territory capture using Strava
      </p>

      <p className="text-sm text-gray-500 mb-4">Backend Status: {status}</p>

      <div className="space-y-4 flex flex-col items-center">
        <button
          onClick={fetchActivity}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Fetch Last Run
        </button>

        {activity && (
          <pre className="mt-4 p-3 bg-white rounded-lg text-sm">
            {JSON.stringify(activity, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
