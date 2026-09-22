import { Polygon, Polyline } from 'react-leaflet';
import type { RiskZone, MapRouteData } from '../../types/map.types';

export const RiskZoneLayer = ({ zone }: { zone: RiskZone }) => {
  return (
    <Polygon
      positions={zone.coordinates}
      pathOptions={{
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.2,
        weight: 2,
        dashArray: '5, 10'
      }}
    />
  );
};

export const RouteLayer = ({ route }: { route: MapRouteData }) => {
  const getRouteOptions = () => {
    switch(route.type) {
      case 'SAFE': return { color: '#10b981', weight: 4, opacity: 0.8 };
      case 'CAUTION': return { color: '#f97316', weight: 4, opacity: 0.8, dashArray: '10, 10' };
      case 'BLOCKED': return { color: '#ef4444', weight: 4, opacity: 0.8, dashArray: '5, 10' };
      default: return { color: '#3b82f6', weight: 4 };
    }
  };

  return (
    <Polyline
      positions={route.coordinates}
      pathOptions={getRouteOptions()}
    />
  );
};
