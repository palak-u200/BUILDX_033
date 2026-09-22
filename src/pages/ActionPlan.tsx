import React from 'react';
import { Bot, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';
import styles from './ActionPlan.module.css';

const ActionPlan = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI-Generated Action Plan</h1>
        <p className={styles.subtitle}>Prioritized response tasks based on predictive risk and resource gap models</p>
      </div>

      <div className={styles.timeline}>
        {/* Task 1 */}
        <div className={`${styles.taskCard} ${styles.critical}`}>
          <div className={styles.taskIndicator}></div>
          <div className={styles.taskHeader}>
            <span className={styles.taskTitle}>Evacuate Low-Lying Areas in Zone 4</span>
            <span className={styles.taskPriority}>Critical Priority</span>
          </div>
          <p className={styles.taskDesc}>
            AI models predict river breach within 2 hours. Initiate immediate evacuation of Wardhaman Nagar and surrounding low-lying blocks.
          </p>
          <div className={styles.taskMeta}>
            <div className={styles.metaItem}><Clock size={14} /> Due: Immediately</div>
            <div className={styles.metaItem}><MapPin size={14} /> Zone 4</div>
            <div className={styles.metaItem}><Users size={14} /> Requires: 4 Rescue Teams</div>
          </div>
          <button className={styles.actionBtn}>
            <CheckCircle2 size={16} /> Deploy NDRF Battalion 3
          </button>
        </div>

        {/* Task 2 */}
        <div className={`${styles.taskCard} ${styles.critical}`}>
          <div className={styles.taskIndicator}></div>
          <div className={styles.taskHeader}>
            <span className={styles.taskTitle}>Reroute Ambulances to General Hospital</span>
            <span className={styles.taskPriority}>Critical Priority</span>
          </div>
          <p className={styles.taskDesc}>
            Zone 2 clinics are reporting power outages. Reroute all incoming critical patients to Nagpur General Hospital to avoid life-support failures.
          </p>
          <div className={styles.taskMeta}>
            <div className={styles.metaItem}><Clock size={14} /> Due: Next 30 mins</div>
            <div className={styles.metaItem}><MapPin size={14} /> Zone 2 -> City Center</div>
          </div>
          <button className={styles.actionBtn}>
            <CheckCircle2 size={16} /> Issue Reroute Command
          </button>
        </div>

        {/* Task 3 */}
        <div className={`${styles.taskCard} ${styles.high}`}>
          <div className={styles.taskIndicator}></div>
          <div className={styles.taskHeader}>
            <span className={styles.taskTitle}>Mobilize Additional Food Supplies</span>
            <span className={styles.taskPriority}>High Priority</span>
          </div>
          <p className={styles.taskDesc}>
            Current inventory models show a 2,500 shortfall in daily food packets for Shelter A given the expected influx of evacuees.
          </p>
          <div className={styles.taskMeta}>
            <div className={styles.metaItem}><Clock size={14} /> Due: Next 4 Hours</div>
            <div className={styles.metaItem}><MapPin size={14} /> Shelter A (South Nagpur)</div>
          </div>
          <button className={styles.actionBtn}>
            <CheckCircle2 size={16} /> Approve Emergency Procurement
          </button>
        </div>

        {/* Task 4 */}
        <div className={`${styles.taskCard} ${styles.medium}`}>
          <div className={styles.taskIndicator}></div>
          <div className={styles.taskHeader}>
            <span className={styles.taskTitle}>Pre-position JCBs for Debris Clearance</span>
            <span className={styles.taskPriority}>Medium Priority</span>
          </div>
          <p className={styles.taskDesc}>
            Historical data suggests a high likelihood of structural collapse in old city areas (Zone 1) post-flooding. Stage heavy machinery nearby.
          </p>
          <div className={styles.taskMeta}>
            <div className={styles.metaItem}><Clock size={14} /> Due: Next 12 Hours</div>
            <div className={styles.metaItem}><MapPin size={14} /> Zone 1 Staging Area</div>
          </div>
          <button className={styles.actionBtn} style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
            <CheckCircle2 size={16} /> Schedule Staging
          </button>
        </div>

      </div>
    </div>
  );
};

export default ActionPlan;
