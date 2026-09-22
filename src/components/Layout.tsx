import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { ShieldAlert, Activity, ClipboardList, Target, Bell, Search } from 'lucide-react';
import styles from './Layout.module.css';

const Layout = () => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <ShieldAlert size={24} className="text-gradient" />
            <span className="text-gradient">NAGPUR RESQ</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            <Activity size={20} />
            Command Center
          </NavLink>
          <NavLink
            to="/gap-analysis"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            <Target size={20} />
            Resource Gap
          </NavLink>
          <NavLink
            to="/action-plan"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            <ClipboardList size={20} />
            AI Action Plan
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <div className={styles.statusIndicator}>
              <div className={`${styles.statusDot} critical-pulse`}></div>
              ALERT: SEVERE FLOODING (ZONE 4)
            </div>
          </div>
          <div className={styles.topbarRight}>
            <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            <div className={styles.userProfile}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Gov Auth</span>
                <span className={styles.userRole}>Nodal Officer</span>
              </div>
              <div className={styles.avatar}>GO</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`${styles.pageContainer} fade-in`} key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
