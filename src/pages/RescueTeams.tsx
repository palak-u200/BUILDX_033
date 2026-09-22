import { Users, Truck } from 'lucide-react';
import { useMapData } from '../hooks/useMapData';
import type { RescueTeam } from '../types/map.types';

const statusStyles: Record<RescueTeam['status'], string> = {
  AVAILABLE: 'text-safe bg-safe/10 border-safe/30',
  DEPLOYED: 'text-warning bg-warning/10 border-warning/30',
  'EN ROUTE': 'text-primary bg-primary/10 border-primary/30',
  OFFLINE: 'text-gray-400 bg-surfaceLight border-white/10',
};

const RescueTeams = () => {
  const { mapData, loading, error } = useMapData();
  const teams: RescueTeam[] = mapData?.teams ?? [];

  const available = teams.filter(t => t.status === 'AVAILABLE').length;
  const deployed = teams.filter(t => t.status === 'DEPLOYED' || t.status === 'EN ROUTE').length;
  const totalPersonnel = teams.reduce((sum, t) => sum + t.personnel, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Rescue Teams</h1>
        <p className="text-sm text-gray-400">NDRF / SDRF / Fire & Civil Defense units — live status from MongoDB</p>
      </div>

      {loading && <div className="glass-panel p-6 text-sm text-gray-400">Loading teams…</div>}
      {error && <div className="glass-panel p-6 text-sm text-critical border border-critical/30">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-5 flex flex-col gap-2">
              <span className="text-sm text-gray-400">Available Units</span>
              <span className="text-3xl font-display font-bold text-safe">{available}</span>
            </div>
            <div className="glass-panel p-5 flex flex-col gap-2">
              <span className="text-sm text-gray-400">Deployed / En Route</span>
              <span className="text-3xl font-display font-bold text-warning">{deployed}</span>
            </div>
            <div className="glass-panel p-5 flex flex-col gap-2">
              <span className="text-sm text-gray-400">Total Personnel</span>
              <span className="text-3xl font-display font-bold text-white">{totalPersonnel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map(team => (
              <div key={team.id} className="glass-panel p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    <div>
                      <h3 className="font-semibold text-white font-display">{team.name}</h3>
                      <span className="text-xs text-gray-500">{team.id}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded border ${statusStyles[team.status] ?? statusStyles.OFFLINE}`}>
                    {team.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surfaceLight/50 p-2 rounded border border-white/5">
                    <span className="text-xs text-gray-400 block">Personnel</span>
                    <span className="font-semibold text-white">{team.personnel}</span>
                  </div>
                  <div className="bg-surfaceLight/50 p-2 rounded border border-white/5">
                    <span className="text-xs text-gray-400 block">Vehicles</span>
                    <span className="font-semibold text-white flex items-center gap-1"><Truck size={14} className="text-gray-400" /> {team.vehicles}</span>
                  </div>
                </div>

                {team.assignedIncidentId && (
                  <div className="text-xs text-gray-300 border-t border-white/10 pt-3">
                    Assigned to: <span className="text-critical font-semibold">{team.assignedIncidentId}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {teams.length === 0 && <div className="glass-panel p-6 text-sm text-gray-400">No rescue teams in the database.</div>}
        </>
      )}
    </div>
  );
};

export default RescueTeams;
