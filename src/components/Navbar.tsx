import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp, Calculator, List, Cpu, Menu, X, Rocket, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../utils/supabaseClient';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <TrendingUp size={18} /> },
    { name: 'Calculators', path: '/calculators', icon: <Calculator size={18} /> },
    { name: 'Top SIPs', path: '/top-sips', icon: <List size={18} /> },
    { name: 'Stock Predictor', path: '/predictor', icon: <Cpu size={18} /> },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4",
      scrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-success p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Rocket className="text-primary" size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-bold font-heading tracking-tight">
            Finnbase
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-success",
                location.pathname === link.path ? "text-success" : "text-gray-400"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-danger transition-colors text-sm font-bold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white relative z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-4 text-2xl font-bold",
                location.pathname === link.path ? "text-success" : "text-gray-400"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-4 text-2xl font-bold text-gray-400 hover:text-danger"
          >
            <LogOut size={24} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
