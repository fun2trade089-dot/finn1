import { useState, useEffect, type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import TopFunds from './pages/TopFunds';
import StockPredictor from './pages/StockPredictor';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import { supabase } from './utils/supabaseClient';
import type { Session } from '@supabase/supabase-js';

// Separate component to handle Auth navigation
const AuthHandler = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return <>{children}</>;
};

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const showNav = location.pathname !== '/login' && location.pathname !== '/reset-password';

  return (
    <div className="min-h-screen bg-primary text-white flex flex-col">
      {showNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showNav && <Footer />}
    </div>
  );
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-success border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAuthenticated = !!session;

  return (
    <Router>
      <AuthHandler>
        <Layout>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="/reset-password" 
              element={<ResetPassword />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/calculators" 
              element={isAuthenticated ? <Calculators /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/top-sips" 
              element={isAuthenticated ? <TopFunds /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/predictor" 
              element={isAuthenticated ? <StockPredictor /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Layout>
      </AuthHandler>
    </Router>
  );
}

export default App;
