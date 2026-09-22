import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import type { Incident, Shelter, Hospital, RescueTeam, WaterSensor } from '../../types/map.types';

// Standardize SVG icons
const createIcon = (svgPath: string, color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>${svgPath}</svg>`;
  return L.divIcon({
    html: svg,
    className: 'custom-map-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
};

const icons = {
  incident: {
    CRITICAL: createIcon('<circle cx="12" cy="10" r="3"></circle>', '#ef4444'),
    HIGH: createIcon('<circle cx="12" cy="10" r="3"></circle>', '#f97316'),
    MEDIUM: createIcon('<circle cx="12" cy="10" r="3"></circle>', '#eab308'),
    LOW: createIcon('<circle cx="12" cy="10" r="3"></circle>', '#3b82f6'),
  },
  shelter: createIcon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', '#10b981'),
  hospital: createIcon('<path d="M12 6v12M6 12h12"></path>', '#ffffff'),
  team: createIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>', '#3b82f6'),
  sensor: createIcon('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', '#06b6d4')
};

export const IncidentMarker = ({ incident, onSelect }: { incident: Incident, onSelect: (id: string) => void }) => (
  <Marker 
    position={[incident.latitude, incident.longitude]} 
    icon={icons.incident[incident.severity] || icons.incident.MEDIUM}
    eventHandlers={{ click: () => onSelect(incident.id) }}
  >
    <Popup className="disaster-popup">
      <div className="p-1">
        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{color: incident.severity === 'CRITICAL' ? '#ef4444' : '#f97316'}}>
          {incident.severity} • {incident.type}
        </div>
        <div className="font-semibold text-[15px] mb-2">{incident.location}</div>
        <div className="text-sm text-gray-300 mb-2">{incident.description}</div>
        
        <div className="flex flex-col gap-1 text-xs text-gray-400 mt-3 pt-2 border-t border-white/10">
          <div>Status: <span className="text-white">{incident.status}</span></div>
          <div>Reported: {new Date(incident.timestamp).toLocaleTimeString()}</div>
        </div>
      </div>
    </Popup>
  </Marker>
);

export const ShelterMarker = ({ shelter }: { shelter: Shelter }) => (
  <Marker position={[shelter.latitude, shelter.longitude]} icon={icons.shelter}>
    <Popup className="disaster-popup">
      <div className="p-1">
        <div className="text-xs font-bold text-safe uppercase tracking-wider mb-1">RELIEF SHELTER</div>
        <div className="font-semibold text-[15px] mb-2">{shelter.name}</div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <div className="bg-surface/50 p-2 rounded">
            <div className="text-xs text-gray-400">Occupancy</div>
            <div className="font-display font-semibold">{shelter.occupancy} / {shelter.capacity}</div>
          </div>
          <div className="bg-surface/50 p-2 rounded">
            <div className="text-xs text-gray-400">Status</div>
            <div className="font-semibold text-safe">{shelter.status}</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">Contact: {shelter.contact}</div>
      </div>
    </Popup>
  </Marker>
);

export const HospitalMarker = ({ hospital }: { hospital: Hospital }) => (
  <Marker position={[hospital.latitude, hospital.longitude]} icon={icons.hospital}>
    <Popup className="disaster-popup">
      <div className="p-1">
        <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">MEDICAL FACILITY</div>
        <div className="font-semibold text-[15px] mb-2">{hospital.name}</div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <div className="bg-surface/50 p-2 rounded">
            <div className="text-xs text-gray-400">Emergency Beds</div>
            <div className="font-display font-semibold text-warning">{hospital.emergencyBeds}</div>
          </div>
          <div className="bg-surface/50 p-2 rounded">
            <div className="text-xs text-gray-400">ICU Available</div>
            <div className="font-semibold text-primary">{hospital.icuBeds}</div>
          </div>
        </div>
      </div>
    </Popup>
  </Marker>
);

export const RescueTeamMarker = ({ team }: { team: RescueTeam }) => (
  <Marker position={[team.latitude, team.longitude]} icon={icons.team}>
    <Popup className="disaster-popup">
      <div className="p-1">
        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">RESCUE TEAM • {team.status}</div>
        <div className="font-semibold text-[15px] mb-2">{team.name}</div>
        
        <div className="flex flex-col gap-1 text-xs text-gray-300">
          <div>Personnel: {team.personnel}</div>
          <div>Vehicles: {team.vehicles}</div>
          {team.assignedIncidentId && <div>Assigned To: {team.assignedIncidentId}</div>}
        </div>
      </div>
    </Popup>
  </Marker>
);

export const SensorMarker = ({ sensor }: { sensor: WaterSensor }) => (
  <Marker position={[sensor.latitude, sensor.longitude]} icon={icons.sensor}>
    <Popup className="disaster-popup">
      <div className="p-1">
        <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">WATER SENSOR • {sensor.id}</div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <div className="bg-surface/50 p-2 rounded">
            <div className="text-xs text-gray-400">Current Level</div>
            <div className={`font-display font-semibold ${sensor.status === 'CRITICAL' ? 'text-critical' : 'text-accent'}`}>{sensor.waterLevel}m</div>
          </div>
          <div className="bg-surface/50 p-2 rounded">
            <div className="text-xs text-gray-400">Rate of Rise</div>
            <div className="font-semibold text-warning">+{sensor.rateOfRise}m/hr</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2 border-t border-white/10 pt-2">Danger Threshold: {sensor.dangerThreshold}m</div>
      </div>
    </Popup>
  </Marker>
);
