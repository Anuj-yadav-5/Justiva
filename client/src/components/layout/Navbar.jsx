import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Document Studio', path: '/workspace' },
    { label: 'Compare Contracts', path: '/comparison' },
    { label: 'Indian Laws', path: '/research' },
    { label: 'Lawyer Brief', path: '/lawyer-brief' },
    { label: 'My Documents', path: '/dashboard' }
  ];

  const isDarkPage = location.pathname === '/' || location.pathname.startsWith('/research');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-[#12332F]/95 backdrop-blur-md py-3 shadow-md border-b border-white/10' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#D9FF4A] flex items-center justify-center text-[#12332F] font-bold shadow-sm">
              <Scale size={18} strokeWidth={2.5} />
            </div>
            <span className={`text-lg font-bold tracking-tight ${isDarkPage || scrolled ? 'text-white' : 'text-[#12332F]'}`}>
              JUSTIVA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    active
                      ? 'bg-[#D9FF4A] text-[#12332F] font-semibold shadow-sm'
                      : isDarkPage || scrolled
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-[#17201E]/80 hover:text-[#17201E] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/workspace"
              className="px-4 py-1.5 text-xs font-bold rounded-full bg-[#D9FF4A] text-[#12332F] hover:bg-[#c6ee3b] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>Open Studio</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl ${
              isDarkPage || scrolled ? 'text-white' : 'text-[#12332F]'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12332F] border-b border-white/10 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
