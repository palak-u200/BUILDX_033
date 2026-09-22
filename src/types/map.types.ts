export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Incident {
  id: string;
  type: string;
  severity: Severity;
  latitude: number;
  longitude: number;
  location: string;
  description: string;
  timestamp: string;
  status: string;
  assignedTeam?: string;
  recommendedAction?: string;
}

export interface RiskZone {
  id: string;
  level: string;
  color: string;
  coordinates: [number, number][];
}

export interface Shelter {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  capacity: number;
  occupancy: number;
  status: string;
  contact: string;
}

export interface Hospital {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  emergencyBeds: number;
  icuBeds: number;
  ambulances: number;
  status: string;
}

export interface RescueTeam {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'AVAILABLE' | 'DEPLOYED' | 'EN ROUTE' | 'OFFLINE';
  personnel: number;
  vehicles: number;
  assignedIncidentId?: string;
}

export interface WaterSensor {
  id: string;
  latitude: number;
  longitude: number;
  waterLevel: number;
  dangerThreshold: number;
  rateOfRise: number;
  status: string;
}

export interface MapRouteData {
  id: string;
  type: 'SAFE' | 'CAUTION' | 'BLOCKED';
  coordinates: [number, number][];
}

export interface MapData {
  incidents: Incident[];
  zones: RiskZone[];
  shelters: Shelter[];
  hospitals: Hospital[];
  teams: RescueTeam[];
  sensors: WaterSensor[];
  routes: MapRouteData[];
}
