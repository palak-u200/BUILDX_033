import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GapAnalysis from './pages/GapAnalysis';
import ActionPlan from './pages/ActionPlan';
import { DisasterProvider } from './context/DisasterContext';

function App() {
  return (
    <DisasterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="gap-analysis" element={<GapAnalysis />} />
            <Route path="action-plan" element={<ActionPlan />} />
          </Route>
        </Routes>
      </Router>
    </DisasterProvider>
  );
}

export default App;
