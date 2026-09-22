import { useState } from 'react';
import { Layers, MapPin, Search, AlertTriangle, ShieldAlert, Home, Ambulance, Truck, Navigation, Activity } from 'lucide-react';

interface MapControlsProps {
  layers: any;
  setLayers: (layers: any) => void;
  onLocationRequest: () => void;
}

export const MapControls = ({ layers, setLayers, onLocationRequest }: MapControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLayer = (key: string) => {
    setLayers((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <div className="glass-panel p-2 flex items-center gap-2">
        <div className="relative">
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search location..." 
            className="bg-surface/50 border border-white/10 rounded-md py-1 pl-8 pr-3 text-sm text-white focus:outline-none focus:border-primary w-48 transition-all"
          />
        </div>
        <button 
          onClick={onLocationRequest}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-primary"
          title="My Location"
        >
          <Navigation size={18} />
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-md transition-colors ${isOpen ? 'bg-primary text-white' : 'hover:bg-white/10 text-gray-300'}`}
          title="Map Layers"
        >
          <Layers size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="glass-panel p-3 w-64 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-sm font-semibold mb-3 border-b border-white/10 pb-2">Map Layers</h3>
          <div className="flex flex-col gap-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.incidents} onChange={() => toggleLayer('incidents')} className="accent-primary" />
              <AlertTriangle size={14} className="text-warning" /> Incidents
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.zones} onChange={() => toggleLayer('zones')} className="accent-primary" />
              <ShieldAlert size={14} className="text-critical" /> Risk Zones
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.shelters} onChange={() => toggleLayer('shelters')} className="accent-primary" />
              <Home size={14} className="text-safe" /> Shelters
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.hospitals} onChange={() => toggleLayer('hospitals')} className="accent-primary" />
              <Ambulance size={14} className="text-white" /> Hospitals
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.teams} onChange={() => toggleLayer('teams')} className="accent-primary" />
              <Truck size={14} className="text-primary" /> Rescue Teams
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.sensors} onChange={() => toggleLayer('sensors')} className="accent-primary" />
              <Activity size={14} className="text-accent" /> Water Sensors
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded">
              <input type="checkbox" checked={layers.routes} onChange={() => toggleLayer('routes')} className="accent-primary" />
              <MapPin size={14} className="text-safe" /> Routes
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
