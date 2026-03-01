
import HeroPage from './components/pages/Hero';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
import CustomerDashboard from './components/pages/CustomerDashboard';
import OwnerDashboard from './components/pages/OwnerDashboard';
import SetupShop from './components/pages/SetupShop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/setup-shop" element={<SetupShop />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
    </Routes>
  );
}

export default App;
