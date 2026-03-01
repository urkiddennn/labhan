import { Suspense, lazy } from 'react';
import HeroPage from './components/pages/Hero';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy load actual pages to split chunks
const LoginPage = lazy(() => import('./components/pages/Login'));
const SignupPage = lazy(() => import('./components/pages/Signup'));
const CustomerDashboard = lazy(() => import('./components/pages/CustomerDashboard'));
const OwnerDashboard = lazy(() => import('./components/pages/OwnerDashboard'));
const SetupShop = lazy(() => import('./components/pages/SetupShop'));

function App() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#69b8c4]" size={40} />
      </div>
    }>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/setup-shop" element={<SetupShop />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Suspense>
  );
}

export default App;
