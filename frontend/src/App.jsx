// App.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllBalloonData } from './utils/fetchBalloonData';
import './App.css';

function App() {
  const [balloons, setBalloons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchAllBalloonData();
      setBalloons(data);
      setIsLoading(false);
    };

    fetchAndSetData();
    const interval = setInterval(fetchAndSetData, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">🎈 Windborne Balloon Tracker</h1>
      {isLoading ? (
        <p>Loading live data...</p>
      ) : (
        <ul className="space-y-2">
          {balloons.map((entry, idx) => (
            <li key={idx} className="bg-gray-100 rounded p-2 shadow-sm">
              <strong>{entry.fileName}</strong>: {JSON.stringify(entry.data).slice(0, 200)}...
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
