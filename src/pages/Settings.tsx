import { WifiOff, Wifi, RefreshCw, Database, Activity } from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';

const Settings = () => {
  const { communicationStatus, triggerBlackout, restoreCommunication, simulateScenario, lastSyncTime } = useDisaster();

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Settings</h1>
        <p className="text-sm text-gray-400">System configuration and demo controls</p>
      </div>

      {/* Communication Resilience Demo */}
      <div className="glass-panel p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-display flex items-center gap-2">
          <Activity size={20} className="text-primary" /> Communication Resilience
        </h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Current Status</span>
          <span className={`font-semibold px-2 py-0.5 rounded border ${
            communicationStatus === 'ONLINE' ? 'text-safe bg-safe/10 border-safe/30'
            : communicationStatus === 'BLACKOUT' ? 'text-critical bg-critical/10 border-critical/30'
            : 'text-warning bg-warning/10 border-warning/30'
          }`}>
            {communicationStatus}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Last Sync</span>
          <span className="text-white font-medium">{lastSyncTime}</span>
        </div>
        <div className="flex gap-3 mt-2">
          {communicationStatus === 'ONLINE' ? (
            <button onClick={triggerBlackout} className="flex items-center gap-2 bg-surfaceLight hover:bg-critical/20 text-gray-300 hover:text-critical px-4 py-2 rounded-md text-sm font-medium border border-white/10 transition-colors">
              <WifiOff size={16} /> Simulate Blackout
            </button>
          ) : communicationStatus === 'BLACKOUT' ? (
            <button onClick={restoreCommunication} className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <Wifi size={16} /> Restore Communication
            </button>
          ) : (
            <span className="text-sm text-warning flex items-center gap-2"><RefreshCw size={16} className="animate-spin" /> Synchronizing…</span>
          )}
        </div>
      </div>

      {/* Scenario Simulation */}
      <div className="glass-panel p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-display flex items-center gap-2">
          <Activity size={20} className="text-warning" /> Scenario Simulation
        </h2>
        <p className="text-sm text-gray-400">Load a severe flood scenario to stress-test the dashboard, or reset to baseline.</p>
        <div className="flex gap-3">
          <button onClick={() => simulateScenario('increase_rain')} className="bg-critical hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Simulate Severe Flood
          </button>
          <button onClick={() => simulateScenario('reset')} className="bg-surfaceLight hover:bg-white/10 text-white px-4 py-2 rounded-md text-sm font-medium border border-white/10 transition-colors">
            Reset to Baseline
          </button>
        </div>
      </div>

      {/* Backend Connection */}
      <div className="glass-panel p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-display flex items-center gap-2">
          <Database size={20} className="text-accent" /> Backend Connection
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">API Endpoint</span>
            <span className="text-white font-mono text-xs">http://localhost:5000/api</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Database</span>
            <span className="text-white font-mono text-xs">MongoDB — nagpur-resq</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Data Source</span>
            <span className="text-safe font-medium">Live (seeded demo data)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
