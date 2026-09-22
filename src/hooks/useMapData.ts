import { useEffect, useState } from 'react';
import type { MapData } from '../types/map.types';

const API_URL = 'http://localhost:5000/api/map/data';

/**
 * Shared hook that fetches live map data from the backend (MongoDB).
 * Used by LiveDisasterMap, Incidents, Shelters, RescueTeams, and Intelligence pages
 * so every page reads from a single source of truth.
 */
export const useMapData = (pollMs: number = 0) => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let intervalId: number | undefined;

    const fetchMapData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch map data from MongoDB API');
        const data = await response.json();
        if (!cancelled) {
          setMapData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError('Unable to connect to live map servers. Ensure the backend is running.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMapData();
    if (pollMs > 0) {
      intervalId = window.setInterval(fetchMapData, pollMs);
    }

    return () => {
      cancelled = true;
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [pollMs]);

  return { mapData, loading, error };
};
