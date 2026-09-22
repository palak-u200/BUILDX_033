import { useDisaster } from '../context/DisasterContext';
import { WifiOff, AlertTriangle } from 'lucide-react';

export const EmergencyOfflineBanner = () => {
  const { communicationStatus, lastSyncTime } = useDisaster();

  if (communicationStatus === 'ONLINE') return null;

  return (
    <div className={`w-full flex items-center justify-between px-6 py-3 border-b backdrop-blur-md sticky top-16 z-10 transition-colors duration-500
      ${communicationStatus === 'BLACKOUT' ? 'bg-critical/10 border-critical/30 text-white' : 'bg-warning/10 border-warning/30 text-white'}
    `}>
      <div className="flex items-center gap-3">
        {communicationStatus === 'BLACKOUT' ? (
          <>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-critical opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-critical"></span>
            </div>
            <div className="flex items-center gap-2">
              <WifiOff size={18} className="text-critical" />
              <span className="font-semibold text-sm tracking-wide text-critical">COMMUNICATION BLACKOUT</span>
            </div>
            <span className="text-xs text-gray-400 font-medium ml-2 border-l border-white/20 pl-4 hidden md:inline-block">Emergency Offline Mode Active</span>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-warning border-t-transparent"></div>
              <span className="font-semibold text-sm tracking-wide text-warning">SYNCHRONIZING EMERGENCY DATA</span>
            </div>
            <span className="text-xs text-gray-400 font-medium ml-2 border-l border-white/20 pl-4 hidden md:inline-block">Restoring connection to cloud</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-gray-400">
          <AlertTriangle size={14} className={communicationStatus === 'BLACKOUT' ? 'text-critical' : 'text-warning'} />
          Local Emergency Data: <span className="font-semibold text-white">ACTIVE</span>
        </div>
        <div className="hidden sm:block text-gray-400">
          Last Synchronization: <span className="font-semibold text-white">{lastSyncTime || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};
