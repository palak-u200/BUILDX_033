import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

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
  
  // Simulation functions
  simulateScenario: (scenario: 'increase_rain' | 'road_block' | 'reset') => void;
}

const defaultState: DisasterState = {
  cityRiskLevel: 42,
  cityResilienceScore: 78,
  activeIncidents: 4,
  criticalZones: 1,
  peopleAtRisk: 1200,
  resourceStress: 35,
  availableRescueTeams: { available: 18, total: 20 },
  availableAmbulances: { available: 22, total: 25 },
  shelterCapacity: 85,
  simulateScenario: () => {},
};

const DisasterContext = createContext<DisasterState>(defaultState);

export const DisasterProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DisasterState>(defaultState);

  const simulateScenario = (scenario: 'increase_rain' | 'road_block' | 'reset') => {
    if (scenario === 'increase_rain') {
      setState(prev => ({
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
      setState(defaultState);
    }
  };

  return (
    <DisasterContext.Provider value={{ ...state, simulateScenario }}>
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => useContext(DisasterContext);
