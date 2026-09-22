import { Users, Ambulance, Home, AlertTriangle, TrendingUp, TrendingDown, Map as MapIcon, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icon fix removed for stability

const Dashboard = () => {
  const nagpurCenter: [number, number] = [21.1458, 79.0882];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white">Command Center Overview</h1>
        <p className="text-sm text-gray-400">Real-time disaster monitoring and resource status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium text-gray-400">
            Active Incidents
            <AlertTriangle size={18} className="text-critical" />
          </div>
          <div className="text-3xl font-display font-bold text-white">17</div>
          <div className="text-sm flex items-center gap-1 text-critical">
            <TrendingUp size={14} /> +3 in last hour
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium text-gray-400">
            Available Rescue Teams
            <Users size={18} className="text-primary" />
          </div>
          <div className="text-3xl font-display font-bold text-white">11 <span className="text-xl text-gray-500">/ 20</span></div>
          <div className="text-sm flex items-center gap-1 text-safe">
            <TrendingDown size={14} /> 9 deployed
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium text-gray-400">
            Hospital Bed Capacity
            <Ambulance size={18} className="text-warning" />
          </div>
          <div className="text-3xl font-display font-bold text-white">84%</div>
          <div className="text-sm flex items-center gap-1 text-critical">
            <TrendingUp size={14} /> approaching capacity
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium text-gray-400">
            Shelter Occupancy
            <Home size={18} className="text-safe" />
          </div>
          <div className="text-3xl font-display font-bold text-white">68%</div>
          <div className="text-sm flex items-center gap-1 text-gray-400">
            Sufficient capacity
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        {/* Map Section */}
        <div className="glass-panel p-5 flex flex-col lg:col-span-2">
          <h2 className="text-lg mb-4 flex items-center gap-2 font-display font-semibold">
            <MapIcon size={20} className="text-primary" /> Live Disaster Map
          </h2>
          <div className="flex-1 rounded-lg overflow-hidden border border-white/10 bg-surfaceLight min-h-[400px]">
            <MapContainer center={nagpurCenter} zoom={12} className="h-full w-full bg-background z-0">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[21.1500, 79.1000]}>
                <Popup>Critical Flooding Zone <br/> Wardhaman Nagar</Popup>
              </Marker>
              <Circle center={[21.1500, 79.1000]} radius={1500} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }} />
              
              <Marker position={[21.1200, 79.0500]}>
                <Popup>Shelter A (Capacity: 68%)</Popup>
              </Marker>
              <Circle center={[21.1200, 79.0500]} radius={500} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.2 }} />
            </MapContainer>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="glass-panel p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg flex items-center gap-2 font-display font-semibold">
              <AlertTriangle size={20} className="text-warning" /> AI Decision Alerts
            </h2>
            <button className="text-xs text-primary hover:text-white flex items-center">View All <ChevronRight size={14}/></button>
          </div>
          
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            <div className="p-3 bg-critical/10 border-l-4 border-critical rounded flex flex-col gap-1">
              <span className="font-semibold text-sm text-white">Water level rising rapidly at Nag Nadi</span>
              <span className="text-xs text-gray-400">AI Prediction: Overflow in 2 hours</span>
              <button className="mt-2 text-xs bg-critical text-white py-1 px-2 rounded w-fit hover:bg-red-600 transition-colors">Review Actions</button>
            </div>

            <div className="p-3 bg-warning/10 border-l-4 border-warning rounded flex flex-col gap-1">
              <span className="font-semibold text-sm text-white">Power outage reported in Zone 2</span>
              <span className="text-xs text-gray-400">Affecting 2 hospitals. Reroute required.</span>
              <button className="mt-2 text-xs bg-warning text-white py-1 px-2 rounded w-fit hover:bg-orange-600 transition-colors">Review Actions</button>
            </div>

            <div className="p-3 bg-primary/10 border-l-4 border-primary rounded flex flex-col gap-1">
              <span className="font-semibold text-sm text-white">NDRF Battalion 3 arrived at staging area</span>
              <span className="text-xs text-gray-400">Ready for deployment.</span>
              <button className="mt-2 text-xs bg-primary text-white py-1 px-2 rounded w-fit hover:bg-blue-600 transition-colors">Assign Team</button>
            </div>
            
            <div className="p-3 bg-surfaceLight border-l-4 border-gray-500 rounded flex flex-col gap-1">
              <span className="font-semibold text-sm text-white">Shelter B reached 90% capacity</span>
              <span className="text-xs text-gray-400">Prepare alternative shelter locations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
