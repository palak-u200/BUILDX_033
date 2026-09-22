import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type CommunicationStatus = 'ONLINE' | 'BLACKOUT' | 'SYNCHRONIZING';

export interface OfflineAction {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

// Define the shape of our global state
interface DisasterState {
  cityRiskLevel: number; // 0-100
  cityResilienceScore: number; // 0-100
  activeIncidents: number;
  criticalZones: number;
  peopleAtRisk: number;
  resourceStress: number; // 0-100
  availableRescueTeams: { available: number, total: number };
  availableAmbulances: { available: number, total: number };
  shelterCapacity: number; // Percentage 0-100

  // Communication Resilience
  communicationStatus: CommunicationStatus;
  lastSyncTime: string | null;
  offlineActionQueue: OfflineAction[];

  // Map Interaction
  selectedIncidentId: string | null;

  // Functions
  simulateScenario: (scenario: 'increase_rain' | 'road_block' | 'reset') => void;
  triggerBlackout: () => void;
  restoreCommunication: () => void;
  queueOfflineAction: (type: string, description: string) => void;
  syncComplete: () => void;
  setSelectedIncidentId: (id: string | null) => void;
}

const defaultState: Omit<DisasterState, 'simulateScenario' | 'triggerBlackout' | 'restoreCommunication' | 'queueOfflineAction' | 'syncComplete' | 'setSelectedIncidentId'> = {
  cityRiskLevel: 42,
  cityResilienceScore: 78,
  activeIncidents: 4,
  criticalZones: 1,
  peopleAtRisk: 1200,
  resourceStress: 35,
  availableRescueTeams: { available: 18, total: 20 },
  availableAmbulances: { available: 22, total: 25 },
  shelterCapacity: 85,
  communicationStatus: 'ONLINE',
  lastSyncTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  offlineActionQueue: [],
  selectedIncidentId: null,
};

const DisasterContext = createContext<DisasterState>({
  ...defaultState,
  simulateScenario: () => { },
  triggerBlackout: () => { },
  restoreCommunication: () => { },
  queueOfflineAction: () => { },
  syncComplete: () => { },
  setSelectedIncidentId: () => { },
});

export const DisasterProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(() => {
    // Load from local storage for demo persistence
    const saved = localStorage.getItem('disaster_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('disaster_state', JSON.stringify(state));
  }, [state]);

  const simulateScenario = (scenario: 'increase_rain' | 'road_block' | 'reset') => {
    if (scenario === 'increase_rain') {
      setState((prev: any) => ({
        ...prev,
        cityRiskLevel: 87,
        cityResilienceScore: 45,
        activeIncidents: 17,
        criticalZones: 4,
        peopleAtRisk: 4200,
        resourceStress: 88,
        availableRescueTeams: { available: 5, total: 20 },
        availableAmbulances: { available: 6, total: 25 },
        shelterCapacity: 22,
      }));
    } else if (scenario === 'reset') {
      setState((prev: any) => ({
        ...defaultState,
        communicationStatus: prev.communicationStatus,
        lastSyncTime: prev.lastSyncTime,
        offlineActionQueue: prev.offlineActionQueue,
      }));
    }
  };

  const triggerBlackout = () => {
    setState((prev: any) => ({
      ...prev,
      communicationStatus: 'BLACKOUT',
      lastSyncTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  const restoreCommunication = () => {
    setState((prev: any) => ({
      ...prev,
      communicationStatus: 'SYNCHRONIZING',
    }));

    // Simulate a 3-second sync process for the demo
    setTimeout(() => {
      syncComplete();
    }, 3000);
  };

  const syncComplete = () => {
    setState((prev: any) => ({
      ...prev,
      communicationStatus: 'ONLINE',
      offlineActionQueue: [],
      lastSyncTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  const queueOfflineAction = (type: string, description: string) => {
    const newAction: OfflineAction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      description,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setState((prev: any) => {
      // If we are online, just pretend it was executed immediately (or we could execute a real API call here)
      if (prev.communicationStatus === 'ONLINE') {
        return prev;
      }
      return {
        ...prev,
        offlineActionQueue: [...prev.offlineActionQueue, newAction]
      };
    });
  };

  const setSelectedIncidentId = (id: string | null) => {
    setState((prev: any) => ({ ...prev, selectedIncidentId: id }));
  };

  return (
    <DisasterContext.Provider value={{ ...state, simulateScenario, triggerBlackout, restoreCommunication, queueOfflineAction, syncComplete, setSelectedIncidentId }}>
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => useContext(DisasterContext);
