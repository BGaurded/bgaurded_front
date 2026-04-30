import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IntelligenceLookup() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) { setError('Please enter an agent ID.'); return; }
    setError('');
    navigate(`/intelligence/${encodeURIComponent(val)}`);
  };

  return (
    <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />
      {/* Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-[480px] text-center"
      >
        {/* Wordmark */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
            <Shield className="absolute inset-0 m-auto w-5 h-5 text-white" />
          </div>
          <span className="font-syne font-bold text-white text-xl tracking-tight">BGaurded</span>
        </div>

        {/* Headline */}
        <h1 className="font-syne font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1 }}>
          Agent Intelligence
        </h1>
        <p className="text-white/35 text-[15px] leading-relaxed mb-10">
          Enter an agent ID to view their trust score<br />and activity logs
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder="Enter agent ID..."
            autoFocus
            className="w-full h-[56px] px-5 rounded-2xl text-white text-base font-mono placeholder:text-white/20 focus:outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: input ? '0 0 0 1px rgba(0,212,255,0.15)' : 'none',
            }}
            onFocus={e => { e.target.style.border = '1px solid rgba(0,212,255,0.35)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
            onBlur={e => { e.target.style.border = error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
          />

          {error && <p className="text-red-400 text-sm text-left">{error}</p>}

          <button
            type="submit"
            className="w-full h-[56px] rounded-2xl font-syne font-bold text-[15px] text-[#05080f] flex items-center justify-center gap-2.5 transition-all hover:opacity-92 active:scale-[0.99]"
            style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)' }}
          >
            View Agent <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Try demo */}
        <p className="mt-6 text-white/20 text-[13px] font-mono">
          Try:{' '}
          <button
            onClick={() => navigate('/intelligence/agent-alpha-001')}
            className="text-white/40 hover:text-cyan-400 transition-colors underline underline-offset-2"
          >
            agent-alpha-001
          </button>
        </p>
      </motion.div>

      {/* Footer protocol line */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/12 text-[11px] font-mono whitespace-nowrap">
        <span className="w-1 h-1 rounded-full bg-cyan-400/40 inline-block" />
        Arweave · Solana · BGaurded Protocol v1.0
        <span className="w-1 h-1 rounded-full bg-violet-400/40 inline-block" />
      </div>
    </div>
  );
}