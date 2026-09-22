import { AlertTriangle } from 'lucide-react';
import { useMapData } from '../hooks/useMapData';
import type { Incident, Severity } from '../types/map.types';

const severityStyles: Record<Severity, { text: string; bg: string; border: string }> = {
  CRITICAL: { text: 'text-critical', bg: 'bg-critical/10', border: 'border-critical/40' },
  HIGH: { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/40' },
  MEDIUM: { text: 'text-yellow-300', bg: 'bg-yellow-300/10', border: 'border-yellow-300/40' },
  LOW: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/40' },
};

const Incidents = () => {
  const { mapData, loading, error } = useMapData();

  const incidents: Incident[] = mapData?.incidents ?? [];
  const active = incidents.filter(i => i.status === 'ACTIVE');
  const other = incidents.filter(i => i.status !== 'ACTIVE');

  const renderCard = (incident: Incident) => {
    const s = severityStyles[incident.severity] ?? severityStyles.MEDIUM;
    return (
      <div key={incident.id} className={`glass-panel p-5 flex flex-col gap-2 border-l-4 ${s.border} hover:bg-white/5 transition-colors`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${s.text}`}>
            {incident.severity} • {incident.type}
          </span>
          <span className="text-xs text-gray-400 px-2 py-0.5 rounded bg-surfaceLight border border-white/10">
            {incident.status}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white font-display flex items-center gap-2">
          <AlertTriangle size={18} className={s.text} /> {incident.location}
        </h3>
        <p className="text-sm text-gray-300">{incident.description}</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 border-t border-white/10 pt-3 mt-1">
          <span>ID: <span className="text-white">{incident.id}</span></span>
          <span>Reported: {new Date(incident.timestamp).toLocaleString()}</span>
          {incident.assignedTeam && <span>Team: <span className="text-primary">{incident.assignedTeam}</span></span>}
        </div>
        {incident.recommendedAction && (
          <div className="text-xs text-gray-300 bg-surfaceLight/50 p-2 rounded border border-white/5">
            <span className="text-primary font-semibold uppercase tracking-wider">AI Action: </span>
            {incident.recommendedAction}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Emergency Incidents</h1>
        <p className="text-sm text-gray-400">Live incident feed from the field — synced from MongoDB</p>
      </div>

      {loading && <div className="glass-panel p-6 text-sm text-gray-400">Loading incidents…</div>}
      {error && <div className="glass-panel p-6 text-sm text-critical border border-critical/30">{error}</div>}

      {!loading && !error && (
        <>
          <div className="text-sm text-gray-400">
            <span className="text-critical font-semibold">{active.length} active</span> · {other.length} resolved / monitored
          </div>
          {active.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active</h2>
              {active.map(renderCard)}
            </div>
          )}
          {other.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Monitoring / Under Control</h2>
              {other.map(renderCard)}
            </div>
          )}
          {incidents.length === 0 && (
            <div className="glass-panel p-6 text-sm text-gray-400">No incidents in the database. Run the seed script.</div>
          )}
        </>
      )}
    </div>
  );
};

export default Incidents;
