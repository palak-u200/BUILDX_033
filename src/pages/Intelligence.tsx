import { Activity, ShieldAlert, Waves } from 'lucide-react';
import { useMapData } from '../hooks/useMapData';
import type { WaterSensor, RiskZone } from '../types/map.types';

const Intelligence = () => {
  const { mapData, loading, error } = useMapData();
  const sensors: WaterSensor[] = mapData?.sensors ?? [];
  const zones: RiskZone[] = mapData?.zones ?? [];

  const criticalSensors = sensors.filter(s => s.status === 'CRITICAL');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Disaster Intelligence</h1>
        <p className="text-sm text-gray-400">Sensor telemetry and risk zone analytics — synced from MongoDB</p>
      </div>

      {loading && <div className="glass-panel p-6 text-sm text-gray-400">Loading intelligence data…</div>}
      {error && <div className="glass-panel p-6 text-sm text-critical border border-critical/30">{error}</div>}

      {!loading && !error && (
        <>
          {criticalSensors.length > 0 && (
            <div className="glass-panel p-4 border-l-4 border-critical flex items-center gap-3">
              <Waves size={20} className="text-critical" />
              <span className="text-sm text-white">
                {criticalSensors.length} water sensor{criticalSensors.length > 1 ? 's' : ''} above danger threshold — immediate attention required
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Water Sensors */}
            <div className="glass-panel p-5 flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 font-display border-b border-white/10 pb-3">
                <Activity size={20} className="text-accent" /> Water Level Sensors
              </h2>
              <div className="flex flex-col gap-3">
                {sensors.map(sensor => {
                  const pct = Math.min(100, Math.round((sensor.waterLevel / sensor.dangerThreshold) * 100));
                  const barColor = sensor.status === 'CRITICAL' ? 'bg-critical' : sensor.status === 'WARNING' ? 'bg-warning' : 'bg-safe';
                  const textColor = sensor.status === 'CRITICAL' ? 'text-critical' : sensor.status === 'WARNING' ? 'text-warning' : 'text-safe';
                  return (
                    <div key={sensor.id} className="flex flex-col gap-1.5 bg-surfaceLight/40 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white">{sensor.id}</span>
                        <span className={`text-xs font-bold uppercase ${textColor}`}>{sensor.status}</span>
                      </div>
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Level: <span className={textColor}>{sensor.waterLevel}m</span> / {sensor.dangerThreshold}m</span>
                        <span>Trend: {sensor.rateOfRise >= 0 ? '+' : ''}{sensor.rateOfRise} m/hr</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Zones */}
            <div className="glass-panel p-5 flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 font-display border-b border-white/10 pb-3">
                <ShieldAlert size={20} className="text-critical" /> Active Risk Zones
              </h2>
              <div className="flex flex-col gap-3">
                {zones.map(zone => (
                  <div key={zone.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-surfaceLight/40">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">{zone.level} Risk — {zone.id}</div>
                      <div className="text-xs text-gray-400">{zone.coordinates.length} boundary points</div>
                    </div>
                  </div>
                ))}
                {zones.length === 0 && <div className="text-sm text-gray-400">No risk zones defined.</div>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Intelligence;
