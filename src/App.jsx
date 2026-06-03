import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardContent from "./components/DashboardContent";
import './App.css'
import General from "./pages/General";
import Overview from "./pages/Overview";
import TourLocations from "./pages/TourLocations";
import TourActivity from "./pages/TourActivity";
import TourEvents from "./pages/TourEvents";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />

  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<DashboardContent />} />
    <Route path="overview" element={<Overview />} />
    <Route path="tour-locations" element={<TourLocations />} />
    <Route path="tour-activity" element={<TourActivity />} />
    <Route path="tour-events" element={<TourEvents />} />
    <Route path="tour-package/create-tour-Package" element={<General />} />
  </Route>
</Routes>
  );
}

export default App;
