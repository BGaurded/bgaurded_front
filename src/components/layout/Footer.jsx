import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const links = [
  { label: 'Protocol', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Intelligence', path: '/intelligence' },
  { label: 'Register', path: '/register' },
  { label: 'Connect', path: '/connect' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070b12] border-t border-white/5 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/5 blur-[80px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 opacity-80" />
                <Shield className="relative w-7 h-7 text-white p-1.5" />
              </div>
              <span className="text-white font-syne font-bold text-lg">BGaurded</span>
            </div>
            <p className="text-sm text-white/35 max-w-xs leading-relaxed">
              The trust layer for the agentic economy.<br />
              Secured by Solana and Arweave.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 font-mono font-medium">$GUARD</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-white/35 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-mono">Secured by Solana · Archived on Arweave · Ed25519 Signed</p>
          <p className="text-xs text-white/20 font-mono">BGaurded Protocol v1.0</p>
        </div>
      </div>
    </footer>
  );
}