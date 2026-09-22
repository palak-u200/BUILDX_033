import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import GapAnalysis from './pages/GapAnalysis';
import ActionPlan from './pages/ActionPlan';
import Incidents from './pages/Incidents';
import Shelters from './pages/Shelters';
import RescueTeams from './pages/RescueTeams';
import Intelligence from './pages/Intelligence';
import Settings from './pages/Settings';
import { DisasterProvider } from './context/DisasterContext';

function App() {
  return (
    <DisasterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* COMMAND CENTER */}
            <Route path="map" element={<LiveMap />} />
            <Route path="decision-assistant" element={<ActionPlan />} />
            {/* OPERATIONS */}
            <Route path="gap-analysis" element={<GapAnalysis />} />
            <Route path="intelligence" element={<Intelligence />} />
            <Route path="shelters" element={<Shelters />} />
            <Route path="rescue-teams" element={<RescueTeams />} />
            <Route path="incidents" element={<Incidents />} />
            {/* SYSTEM */}
            <Route path="settings" element={<Settings />} />
            {/* Fallback: unknown URLs land on the dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </DisasterProvider>
  );
}

export default App;
