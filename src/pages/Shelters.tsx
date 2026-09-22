import { Home, Phone } from 'lucide-react';
import { useMapData } from '../hooks/useMapData';
import type { Shelter } from '../types/map.types';

const Shelters = () => {
  const { mapData, loading, error } = useMapData();
  const shelters: Shelter[] = mapData?.shelters ?? [];

  const totalCapacity = shelters.reduce((sum, s) => sum + s.capacity, 0);
  const totalOccupancy = shelters.reduce((sum, s) => sum + s.occupancy, 0);
  const occupancyPct = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Shelter Management</h1>
        <p className="text-sm text-gray-400">Relief camps across Nagpur — live occupancy from MongoDB</p>
      </div>

      {loading && <div className="glass-panel p-6 text-sm text-gray-400">Loading shelters…</div>}
      {error && <div className="glass-panel p-6 text-sm text-critical border border-critical/30">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-5 flex flex-col gap-2">
              <span className="text-sm text-gray-400">Total Shelters</span>
              <span className="text-3xl font-display font-bold text-white">{shelters.length}</span>
            </div>
            <div className="glass-panel p-5 flex flex-col gap-2">
              <span className="text-sm text-gray-400">Total Occupancy</span>
              <span className="text-3xl font-display font-bold text-white">
                {totalOccupancy.toLocaleString()} <span className="text-lg text-gray-500">/ {totalCapacity.toLocaleString()}</span>
              </span>
            </div>
            <div className="glass-panel p-5 flex flex-col gap-2">
              <span className="text-sm text-gray-400">City-wide Occupancy</span>
              <span className={`text-3xl font-display font-bold ${occupancyPct > 80 ? 'text-critical' : occupancyPct > 60 ? 'text-warning' : 'text-safe'}`}>
                {occupancyPct}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shelters.map(shelter => {
              const pct = Math.round((shelter.occupancy / shelter.capacity) * 100);
              const barColor = pct > 80 ? 'bg-critical' : pct > 60 ? 'bg-warning' : 'bg-safe';
              const statusColor = shelter.status === 'NEAR_CAPACITY' ? 'text-warning' : 'text-safe';
              return (
                <div key={shelter.id} className="glass-panel p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Home size={20} className="text-safe" />
                      <div>
                        <h3 className="font-semibold text-white font-display">{shelter.name}</h3>
                        <span className="text-xs text-gray-500">{shelter.id}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold uppercase ${statusColor}`}>{shelter.status.replace('_', ' ')}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Occupancy</span>
                      <span className="text-white font-semibold">{shelter.occupancy} / {shelter.capacity}</span>
                    </div>
                    <div className="h-2 bg-surfaceLight rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-white/10 pt-3">
                    <Phone size={12} /> {shelter.contact}
                  </div>
                </div>
              );
            })}
          </div>

          {shelters.length === 0 && <div className="glass-panel p-6 text-sm text-gray-400">No shelters in the database.</div>}
        </>
      )}
    </div>
  );
};

export default Shelters;
