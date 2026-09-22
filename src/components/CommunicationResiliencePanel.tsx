import { useDisaster } from '../context/DisasterContext';
import { Wifi, WifiOff, Smartphone, Server, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const CommunicationResiliencePanel = () => {
  const { communicationStatus, lastSyncTime, offlineActionQueue } = useDisaster();

  if (communicationStatus === 'ONLINE') return null;

  return (
    <div className="glass-panel p-5 flex flex-col gap-4 border-critical/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-critical/5 rounded-full blur-2xl"></div>
      
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <h2 className="text-lg font-semibold flex items-center gap-2 font-display text-white">
          <ShieldCheck size={20} className="text-critical" />
          Emergency Communication Resilience
        </h2>
        <span className="text-xs bg-critical/20 text-critical px-2 py-1 rounded border border-critical/30 uppercase font-bold tracking-wider animate-pulse">
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="flex flex-col gap-1 p-3 bg-surfaceLight/50 rounded border border-white/5">
          <span className="text-xs text-gray-500 uppercase font-semibold">Internet</span>
          <div className="flex items-center gap-2 text-critical text-sm font-medium">
            <WifiOff size={16} /> OFFLINE
          </div>
        </div>
        
        <div className="flex flex-col gap-1 p-3 bg-surfaceLight/50 rounded border border-white/5">
          <span className="text-xs text-gray-500 uppercase font-semibold">Mobile Network</span>
          <div className="flex items-center gap-2 text-critical text-sm font-medium">
            <Smartphone size={16} /> OFFLINE
          </div>
        </div>

        <div className="flex flex-col gap-1 p-3 bg-surfaceLight/50 rounded border border-white/5">
          <span className="text-xs text-gray-500 uppercase font-semibold">Emergency Local Net</span>
          <div className="flex items-center gap-2 text-safe text-sm font-medium">
            <Wifi size={16} /> ACTIVE
          </div>
        </div>

        <div className="flex flex-col gap-1 p-3 bg-surfaceLight/50 rounded border border-white/5">
          <span className="text-xs text-gray-500 uppercase font-semibold">Cached Data</span>
          <div className="flex items-center gap-2 text-warning text-sm font-medium">
            <Server size={16} /> AVAILABLE
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5 text-sm text-gray-400 relative z-10">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          Last Sync: <span className="text-white font-medium">{lastSyncTime}</span>
        </div>
        <div className="text-xs uppercase tracking-wider font-semibold">
          Data Integrity: <span className="text-warning">LAST KNOWN STATE</span>
        </div>
      </div>

      {offlineActionQueue.length > 0 && (
        <div className="mt-2 bg-surfaceLight p-3 rounded-lg border border-white/10 relative z-10">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Offline Action Queue</h3>
          <div className="flex flex-col gap-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
            {offlineActionQueue.map(action => (
              <div key={action.id} className="flex items-start gap-2 text-xs text-gray-300 pb-2 border-b border-white/5 last:border-0 last:pb-0">
                <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col flex-1">
                  <span className="font-medium">{action.description}</span>
                  <span className="text-gray-500">{action.type} • {action.timestamp}</span>
                </div>
                <span className="text-[10px] bg-warning/20 text-warning px-1.5 py-0.5 rounded uppercase">Pending</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
