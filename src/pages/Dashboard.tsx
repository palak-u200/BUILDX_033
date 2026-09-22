import { Users, Ambulance, Home, AlertTriangle, TrendingUp, TrendingDown, Map as MapIcon, ChevronRight, WifiOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDisaster } from '../context/DisasterContext';
import { CommunicationResiliencePanel } from '../components/CommunicationResiliencePanel';
import { LiveDisasterMap } from '../components/map/LiveDisasterMap';

// Icon fix removed for stability

const Dashboard = () => {
  const { communicationStatus, queueOfflineAction, selectedIncidentId } = useDisaster();
  
  const handleAction = (type: string, desc: string) => {
    queueOfflineAction(type, desc);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white">Command Center Overview</h1>
        <p className="text-sm text-gray-400">Real-time disaster monitoring and resource status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 flex flex-col gap-3 relative overflow-hidden">
          {communicationStatus !== 'ONLINE' && <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center"><WifiOff size={24} className="text-gray-500 opacity-50"/></div>}
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
      {communicationStatus !== 'ONLINE' && <CommunicationResiliencePanel />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        {/* Map Section */}
        <div className="flex flex-col lg:col-span-2 h-full min-h-[400px]">
          <LiveDisasterMap />
        </div>

        {/* Alerts Section */}
        <div className="glass-panel p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg flex items-center gap-2 font-display font-semibold">
              <AlertTriangle size={20} className="text-warning" /> AI Decision Alerts
            </h2>
            <Link to="/incidents" className="text-xs text-primary hover:text-white flex items-center">View All <ChevronRight size={14}/></Link>
          </div>
          
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {selectedIncidentId === 'INC-001' && (
              <div className="p-3 bg-critical/10 border-l-4 border-critical rounded flex flex-col gap-1 fade-in">
                <span className="font-semibold text-xs text-critical uppercase tracking-wider">SIMULATED AI RECOMMENDATION</span>
                <span className="font-semibold text-sm text-white">Water level rising rapidly at Wardhaman Nagar</span>
                <span className="text-xs text-gray-400">AI Prediction: Overflow in 2 hours</span>
                <ul className="text-xs text-gray-300 list-disc ml-4 my-2">
                  <li>Deploy Rescue Team RT-03</li>
                  <li>Open Shelter S-02</li>
                  <li>Restrict Road R-12</li>
                </ul>
                <button onClick={() => handleAction('INCIDENT_UPDATE', 'Approved AI Recommendation for INC-001')} className="mt-1 text-xs bg-critical text-white py-1 px-2 rounded w-fit hover:bg-red-600 transition-colors">
                  {communicationStatus === 'BLACKOUT' ? 'Save Locally' : 'Execute Actions'}
                </button>
              </div>
            )}
            
            {selectedIncidentId === 'INC-002' && (
              <div className="p-3 bg-warning/10 border-l-4 border-warning rounded flex flex-col gap-1 fade-in">
                <span className="font-semibold text-xs text-warning uppercase tracking-wider">SIMULATED AI RECOMMENDATION</span>
                <span className="font-semibold text-sm text-white">Power outage reported in Dharampeth</span>
                <span className="text-xs text-gray-400">Affecting 2 hospitals.</span>
                <ul className="text-xs text-gray-300 list-disc ml-4 my-2">
                  <li>Initiate ambulance reroute from Zone 2</li>
                </ul>
                <button onClick={() => handleAction('RESOURCE_REROUTE', 'Initiated ambulance reroute from Zone 2')} className="mt-1 text-xs bg-warning text-white py-1 px-2 rounded w-fit hover:bg-orange-600 transition-colors">
                  {communicationStatus === 'BLACKOUT' ? 'Queue Action' : 'Execute Reroute'}
                </button>
              </div>
            )}

            {!selectedIncidentId && (
              <div className="p-4 flex flex-col items-center justify-center text-center text-gray-500 h-32 border border-dashed border-white/10 rounded-lg">
                <MapIcon size={24} className="mb-2 opacity-50" />
                <span className="text-sm">Select an incident on the map to generate AI recommendations.</span>
              </div>
            )}

            <div className="p-3 bg-primary/10 border-l-4 border-primary rounded flex flex-col gap-1 opacity-70">
              <span className="font-semibold text-sm text-white">NDRF Battalion 3 arrived at staging area</span>
              <span className="text-xs text-gray-400">Ready for deployment.</span>
            </div>
            
            <div className="p-3 bg-surfaceLight border-l-4 border-gray-500 rounded flex flex-col gap-1 opacity-70">
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
