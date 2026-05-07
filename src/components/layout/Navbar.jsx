import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Shield, User, ChevronDown, LogOut, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SignInModal from '@/components/auth/SignInModal';

const navLinks = [
  { label: 'Protocol', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Intelligence', path: '/intelligence' },
  { label: 'Research', path: '/research' },
  { label: 'Register', path: '/register' },
  { label: 'Docs', href: 'https://www.bgaurded.com/llms.txt' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bgaurded_user') || 'null'); } catch { return null; }
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [dropdownOpen]);

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('bgaurded_user', JSON.stringify(userData));
    setSignInOpen(false);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('bgaurded_user');
    setDropdownOpen(false);
  };

  const baseLinks = navLinks.filter(l => !l.href);
  const allLinks = user
    ? [...baseLinks, { label: 'Your Agents', path: '/your-agents' }]
    : baseLinks;
  const allNavItems = [...allLinks, ...navLinks.filter(l => l.href)];

  return (
    <>
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} onSignIn={handleSignIn} />

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070b12]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                <Shield className="relative w-8 h-8 text-white p-1.5" />
              </div>
              <span className="text-white font-syne font-bold text-xl tracking-tight">BGaurded</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {allNavItems.map(link => {
                if (link.href) {
                  return (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/50 hover:text-white/80">
                      {link.label}
                    </a>
                  );
                }
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                  >
                    {isActive && (
                      <motion.div layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}

              {/* Auth button */}
              {user ? (
                <div className="relative ml-2" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setDropdownOpen(v => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-xs font-bold text-black">
                      {(user.email || 'U')[0].toUpperCase()}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden"
                        style={{ background: '#0d1520', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <div className="px-4 py-2.5 border-b border-white/5">
                          <p className="text-xs text-white/30 font-mono truncate">{user.email}</p>
                        </div>
                        <button onClick={() => { navigate('/your-agents'); setDropdownOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                          <Bot className="w-4 h-4" /> Your Agents
                        </button>
                        <button onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-colors border-t border-white/5">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setSignInOpen(true)}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  Sign In
                </button>
              )}

              <Link
                to="/register"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-400 to-violet-600 text-black hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>

            <button className="md:hidden text-white/70 hover:text-white p-2" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#070b12]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {allNavItems.map(link => link.href ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path ? 'bg-white/8 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}>
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <button onClick={() => { handleSignOut(); setOpen(false); }}
                    className="w-full text-left block px-4 py-3 rounded-lg text-sm font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                    Sign Out
                  </button>
                ) : (
                  <button onClick={() => { setSignInOpen(true); setOpen(false); }}
                    className="w-full text-left block px-4 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
