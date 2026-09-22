import React from 'react';
import { Users, Ambulance, Home, AlertTriangle, TrendingUp, TrendingDown, Map as MapIcon } from 'lucide-react';
import styles from './Dashboard.module.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default leaflet icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const nagpurCenter: [number, number] = [21.1458, 79.0882];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Command Center Overview</h1>
        <p className={styles.subtitle}>Real-time disaster monitoring and resource status</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statHeader}>
            Active Incidents
            <AlertTriangle size={18} color="var(--status-critical)" />
          </div>
          <div className={styles.statValue}>14</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={14} /> +3 in last hour
          </div>
        </div>

        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statHeader}>
            Available Rescue Teams
            <Users size={18} color="var(--accent-blue)" />
          </div>
          <div className={styles.statValue}>42/50</div>
          <div className={`${styles.statTrend} ${styles.trendDown}`}>
            8 deployed
          </div>
        </div>

        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statHeader}>
            Hospital Bed Capacity
            <Ambulance size={18} color="var(--status-warning)" />
          </div>
          <div className={styles.statValue}>84%</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={14} /> approaching capacity
          </div>
        </div>

        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statHeader}>
            Shelter Occupancy
            <Home size={18} color="var(--status-safe)" />
          </div>
          <div className={styles.statValue}>45%</div>
          <div className={`${styles.statTrend} ${styles.trendDown}`}>
            Sufficient capacity
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={`glass-panel ${styles.mapSection}`}>
          <h2 className={styles.sectionTitle}>
            <MapIcon size={20} className="text-gradient" /> Live Situation Map
          </h2>
          <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
            <MapContainer center={nagpurCenter} zoom={12} style={{ height: '100%', width: '100%', backgroundColor: '#0b0f19' }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[21.1500, 79.1000]}>
                <Popup>
                  Critical Flooding Zone <br /> Wardhaman Nagar
                </Popup>
              </Marker>
              <Circle center={[21.1500, 79.1000]} radius={1500} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }} />
              
              <Marker position={[21.1200, 79.0500]}>
                <Popup>
                  Shelter A (Capacity: 45%)
                </Popup>
              </Marker>
              <Circle center={[21.1200, 79.0500]} radius={500} pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.2 }} />
            </MapContainer>
          </div>
        </div>

        <div className={`glass-panel ${styles.alertsSection}`}>
          <h2 className={styles.sectionTitle}>Recent Intelligence</h2>
          <div className={styles.alertList}>
            <div className={styles.alertItem}>
              <span className={styles.alertTitle}>Water level rising rapidly at Nag Nadi</span>
              <span className={styles.alertTime}>10 mins ago • AI Prediction: Overflow in 2 hours</span>
            </div>
            <div className={styles.alertItem} style={{ borderLeftColor: 'var(--status-warning)', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
              <span className={styles.alertTitle}>Power outage reported in Zone 2</span>
              <span className={styles.alertTime}>45 mins ago • Affecting 2 hospitals</span>
            </div>
            <div className={styles.alertItem} style={{ borderLeftColor: 'var(--status-info)', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
              <span className={styles.alertTitle}>NDRF Battalion 3 arrived at staging area</span>
              <span className={styles.alertTime}>1 hour ago • Ready for deployment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
