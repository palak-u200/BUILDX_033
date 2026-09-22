import React from 'react';
import { Target, Shield, Truck, Stethoscope } from 'lucide-react';
import styles from './GapAnalysis.module.css';

const GapAnalysis = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Resource Gap Analysis</h1>
        <p className={styles.subtitle}>AI-driven prediction of resource shortfalls based on current incident severity</p>
      </div>

      <div className={styles.grid}>
        {/* Healthcare Gap */}
        <div className={`glass-panel ${styles.card}`}>
          <h2 className={styles.cardTitle}>
            <Stethoscope size={20} className="text-gradient" /> Healthcare & Medical
          </h2>
          
          <div className={styles.gapItem}>
            <div className={styles.gapLabel}>
              <span>ICU Beds (Zone 4)</span>
              <span className={styles.criticalText}>Shortfall: 45</span>
            </div>
            <div className={styles.gapBarContainer}>
              <div className={styles.gapBarAvailable} style={{ width: '40%' }}></div>
              <div className={styles.gapBarRequired} style={{ left: '40%', width: '60%' }}></div>
            </div>
            <div className={styles.gapStatus}>
              <span>Available: 30</span>
              <span>Required: 75</span>
            </div>
          </div>

          <div className={styles.gapItem}>
            <div className={styles.gapLabel}>
              <span>Ambulances</span>
              <span className={styles.warningText}>Shortfall: 12</span>
            </div>
            <div className={styles.gapBarContainer}>
              <div className={styles.gapBarAvailable} style={{ width: '70%', backgroundColor: 'var(--status-warning)' }}></div>
              <div className={styles.gapBarRequired} style={{ left: '70%', width: '30%', backgroundColor: 'rgba(245, 158, 11, 0.5)' }}></div>
            </div>
            <div className={styles.gapStatus}>
              <span>Available: 28</span>
              <span>Required: 40</span>
            </div>
          </div>
        </div>

        {/* Rescue Personnel Gap */}
        <div className={`glass-panel ${styles.card}`}>
          <h2 className={styles.cardTitle}>
            <Shield size={20} className="text-gradient" /> Rescue Personnel
          </h2>
          
          <div className={styles.gapItem}>
            <div className={styles.gapLabel}>
              <span>NDRF Teams</span>
              <span className={styles.safeText}>Sufficient</span>
            </div>
            <div className={styles.gapBarContainer}>
              <div className={styles.gapBarAvailable} style={{ width: '100%', backgroundColor: 'var(--status-safe)' }}></div>
            </div>
            <div className={styles.gapStatus}>
              <span>Available: 8</span>
              <span>Required: 6</span>
            </div>
          </div>

          <div className={styles.gapItem}>
            <div className={styles.gapLabel}>
              <span>Heavy Earth Movers (JCBs)</span>
              <span className={styles.criticalText}>Shortfall: 5</span>
            </div>
            <div className={styles.gapBarContainer}>
              <div className={styles.gapBarAvailable} style={{ width: '30%' }}></div>
              <div className={styles.gapBarRequired} style={{ left: '30%', width: '70%' }}></div>
            </div>
            <div className={styles.gapStatus}>
              <span>Available: 2</span>
              <span>Required: 7</span>
            </div>
          </div>
        </div>

        {/* Relief Supplies Gap */}
        <div className={`glass-panel ${styles.card}`}>
          <h2 className={styles.cardTitle}>
            <Truck size={20} className="text-gradient" /> Relief Supplies
          </h2>
          
          <div className={styles.gapItem}>
            <div className={styles.gapLabel}>
              <span>Food Packets (Daily)</span>
              <span className={styles.warningText}>Shortfall: 2,500</span>
            </div>
            <div className={styles.gapBarContainer}>
              <div className={styles.gapBarAvailable} style={{ width: '75%', backgroundColor: 'var(--status-warning)' }}></div>
              <div className={styles.gapBarRequired} style={{ left: '75%', width: '25%', backgroundColor: 'rgba(245, 158, 11, 0.5)' }}></div>
            </div>
            <div className={styles.gapStatus}>
              <span>Available: 7,500</span>
              <span>Required: 10,000</span>
            </div>
          </div>

          <div className={styles.gapItem}>
            <div className={styles.gapLabel}>
              <span>Drinking Water (Liters)</span>
              <span className={styles.safeText}>Sufficient</span>
            </div>
            <div className={styles.gapBarContainer}>
              <div className={styles.gapBarAvailable} style={{ width: '100%', backgroundColor: 'var(--status-safe)' }}></div>
            </div>
            <div className={styles.gapStatus}>
              <span>Available: 50,000</span>
              <span>Required: 30,000</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GapAnalysis;
