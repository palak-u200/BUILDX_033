import { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapControls } from './MapControls';
import { IncidentMarker, ShelterMarker, HospitalMarker, RescueTeamMarker, SensorMarker } from './MapMarkers';
import { RiskZoneLayer, RouteLayer } from './MapLayers';
import { useDisaster } from '../../context/DisasterContext';
import { useMapData } from '../../hooks/useMapData';
import { WifiOff, Loader2 } from 'lucide-react';

export const LiveDisasterMap = () => {
  const { communicationStatus, lastSyncTime, setSelectedIncidentId } = useDisaster();
  const { mapData, loading, error } = useMapData();
  const mapRef = useRef<any>(null);

  const [layers, setLayers] = useState({
    incidents: true,
    zones: true,
    shelters: true,
    hospitals: true,
    teams: true,
    sensors: true,
    routes: true,
  });

  const nagpurCenter: [number, number] = [21.1458, 79.0882];

  const handleLocationRequest = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 14);
        },
        () => {
          alert('Unable to retrieve your location for security reasons.');
        }
      );
    }
  };

  const handleIncidentSelect = (id: string) => {
    if (setSelectedIncidentId) {
      setSelectedIncidentId(id);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 rounded-lg overflow-hidden border border-white/10 bg-surfaceLight min-h-[400px] flex items-center justify-center flex-col gap-3">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm text-gray-400">Loading Live Disaster Map (OSM)...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 rounded-lg overflow-hidden border border-critical/30 bg-critical/10 min-h-[400px] flex items-center justify-center flex-col gap-3 p-6 text-center">
        <WifiOff className="text-critical" size={32} />
        <p className="text-sm text-white">{error}</p>
        <p className="text-xs text-gray-400">Please start the Node.js backend using `npm start` in the server directory.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-lg overflow-hidden border border-white/10 bg-surfaceLight min-h-[400px] relative">
      {communicationStatus !== 'ONLINE' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-background/90 backdrop-blur-md border border-warning/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <WifiOff size={16} className="text-warning" />
          <span className="text-xs font-semibold text-white">Offline Map — Last synchronized at {lastSyncTime}</span>
        </div>
      )}

      <MapControls layers={layers} setLayers={setLayers} onLocationRequest={handleLocationRequest} />

      <MapContainer 
        center={nagpurCenter} 
        zoom={12} 
        className="h-full w-full bg-background z-0"
        ref={mapRef}
      >
        {/* OpenStreetMap Base Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {mapData && (
          <>
            {layers.zones && mapData.zones.map(zone => (
              <RiskZoneLayer key={zone.id} zone={zone} />
            ))}
            
            {layers.routes && mapData.routes.map(route => (
              <RouteLayer key={route.id} route={route} />
            ))}

            {layers.incidents && mapData.incidents.map(incident => (
              <IncidentMarker key={incident.id} incident={incident} onSelect={handleIncidentSelect} />
            ))}

            {layers.shelters && mapData.shelters.map(shelter => (
              <ShelterMarker key={shelter.id} shelter={shelter} />
            ))}

            {layers.hospitals && mapData.hospitals.map(hospital => (
              <HospitalMarker key={hospital.id} hospital={hospital} />
            ))}

            {layers.teams && mapData.teams.map(team => (
              <RescueTeamMarker key={team.id} team={team} />
            ))}

            {layers.sensors && mapData.sensors.map(sensor => (
              <SensorMarker key={sensor.id} sensor={sensor} />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};
