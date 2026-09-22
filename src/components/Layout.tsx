import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { ShieldAlert, Activity, Bell, Map as MapIcon, Home, Users, Settings, ActivitySquare, BarChart3, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { EmergencyOfflineBanner } from './EmergencyOfflineBanner';

const Layout = () => {
  const location = useLocation();
  const { communicationStatus, triggerBlackout, restoreCommunication } = useDisaster();

  const navGroups = [
    {
      title: "COMMAND CENTER",
      links: [
        { to: "/dashboard", icon: <Activity size={18} />, label: "Dashboard" },
        { to: "/map", icon: <MapIcon size={18} />, label: "Live Disaster Map" },
        { to: "/decision-assistant", icon: <AlertTriangle size={18} />, label: "AI Decision Assistant" },
      ]
    },
    {
      title: "OPERATIONS",
      links: [
        { to: "/gap-analysis", icon: <BarChart3 size={18} />, label: "Resource Gap Analysis" },
        { to: "/intelligence", icon: <ActivitySquare size={18} />, label: "Disaster Intelligence" },
        { to: "/shelters", icon: <Home size={18} />, label: "Shelter Management" },
        { to: "/rescue-teams", icon: <Users size={18} />, label: "Rescue Teams" },
        { to: "/incidents", icon: <AlertTriangle size={18} />, label: "Emergency Incidents" },
      ]
    },
    {
      title: "SYSTEM",
      links: [
        { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
      ]
    }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-white/10 flex flex-col z-10 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="font-display text-lg font-bold tracking-wider flex items-center gap-2">
            <ShieldAlert size={24} className="text-primary" />
            <span className="text-white">NAGPUR RESQ</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6 custom-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-500 tracking-wider mb-2 px-3">{group.title}</span>
              {group.links.map((link, lIdx) => (
                <NavLink
                  key={lIdx}
                  to={link.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                      ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Decorative Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Topbar */}
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-critical/10 text-critical px-3 py-1.5 rounded-full text-sm font-semibold border border-critical/20">
              <div className="w-2 h-2 bg-critical rounded-full critical-pulse"></div>
              ALERT: SEVERE FLOODING (ZONE 4)
            </div>
          </div>
          <div className="flex items-center gap-5">
            {/* Demo Controls */}
            {communicationStatus === 'ONLINE' ? (
              <button 
                onClick={triggerBlackout}
                className="hidden lg:flex items-center gap-2 bg-surfaceLight hover:bg-critical/20 text-gray-400 hover:text-critical px-3 py-1.5 rounded text-xs font-medium border border-white/10 transition-colors"
              >
                <WifiOff size={14} /> Simulate Blackout
              </button>
            ) : communicationStatus === 'BLACKOUT' ? (
              <button 
                onClick={restoreCommunication}
                className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <Wifi size={14} /> Restore Communication
              </button>
            ) : null}

            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-white">Gov Auth</span>
                <span className="text-xs text-gray-400">Super Admin</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                GO
              </div>
            </div>
          </div>
        </header>

        <EmergencyOfflineBanner />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 relative z-0 fade-in" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
