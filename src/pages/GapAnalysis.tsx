import { Shield, Truck, Stethoscope } from 'lucide-react';

const GapAnalysis = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Resource Gap Analysis</h1>
        <p className="text-sm text-gray-400">AI-driven prediction of resource shortfalls based on current incident severity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Healthcare Gap */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/10 pb-3 font-display">
            <Stethoscope size={20} className="text-primary" /> Healthcare & Medical
          </h2>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">ICU Beds (Zone 4)</span>
              <span className="text-critical font-semibold">Shortfall: 45</span>
            </div>
            <div className="h-2 bg-surfaceLight rounded-full overflow-hidden relative">
              <div className="absolute left-0 h-full bg-primary" style={{ width: '40%' }}></div>
              <div className="absolute h-full bg-critical/50" style={{ left: '40%', width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Available: 30</span>
              <span>Required: 75</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Ambulances</span>
              <span className="text-warning font-semibold">Shortfall: 12</span>
            </div>
            <div className="h-2 bg-surfaceLight rounded-full overflow-hidden relative">
              <div className="absolute left-0 h-full bg-warning" style={{ width: '70%' }}></div>
              <div className="absolute h-full bg-warning/40" style={{ left: '70%', width: '30%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Available: 28</span>
              <span>Required: 40</span>
            </div>
          </div>
        </div>

        {/* Rescue Personnel Gap */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/10 pb-3 font-display">
            <Shield size={20} className="text-primary" /> Rescue Personnel
          </h2>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">NDRF Teams</span>
              <span className="text-safe font-semibold">Sufficient</span>
            </div>
            <div className="h-2 bg-surfaceLight rounded-full overflow-hidden relative">
              <div className="absolute left-0 h-full bg-safe" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Available: 8</span>
              <span>Required: 6</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Heavy Earth Movers (JCBs)</span>
              <span className="text-critical font-semibold">Shortfall: 5</span>
            </div>
            <div className="h-2 bg-surfaceLight rounded-full overflow-hidden relative">
              <div className="absolute left-0 h-full bg-primary" style={{ width: '30%' }}></div>
              <div className="absolute h-full bg-critical/50" style={{ left: '30%', width: '70%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Available: 2</span>
              <span>Required: 7</span>
            </div>
          </div>
        </div>

        {/* Relief Supplies Gap */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/10 pb-3 font-display">
            <Truck size={20} className="text-primary" /> Relief Supplies
          </h2>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Food Packets (Daily)</span>
              <span className="text-warning font-semibold">Shortfall: 2,500</span>
            </div>
            <div className="h-2 bg-surfaceLight rounded-full overflow-hidden relative">
              <div className="absolute left-0 h-full bg-warning" style={{ width: '75%' }}></div>
              <div className="absolute h-full bg-warning/40" style={{ left: '75%', width: '25%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Available: 7,500</span>
              <span>Required: 10,000</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Drinking Water (Liters)</span>
              <span className="text-safe font-semibold">Sufficient</span>
            </div>
            <div className="h-2 bg-surfaceLight rounded-full overflow-hidden relative">
              <div className="absolute left-0 h-full bg-safe" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Available: 50,000</span>
              <span>Required: 30,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapAnalysis;
