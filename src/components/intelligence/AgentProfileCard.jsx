import { useState, useEffect } from 'react';
import { Copy, Check, Lock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

function getScoreColor(score) {
  if (score >= 800) return { hex: '#10b981', label: 'Excellent', ring: 'rgba(16,185,129,0.2)' };
  if (score >= 740) return { hex: '#3b82f6', label: 'Very Good', ring: 'rgba(59,130,246,0.2)' };
  if (score >= 670) return { hex: '#f59e0b', label: 'Good', ring: 'rgba(245,158,11,0.2)' };
  if (score >= 580) return { hex: '#f59e0b', label: 'Fair', ring: 'rgba(245,158,11,0.2)' };
  return { hex: '#ef4444', label: 'Poor', ring: 'rgba(239,68,68,0.2)' };
}

export default function AgentProfileCard({ agent, profileData, trustScore, logCount, bufferDepth, isLive }) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(300);

  useEffect(() => {
    const target = trustScore;
    const start = 300;
    const duration = 1000;
    const startTime = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedScore(Math.round(start + (target - start) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trustScore]);

  const { hex, label, ring } = getScoreColor(animatedScore);
  const scorePercent = ((animatedScore - 300) / 550) * 100;
  const displayName = profileData?.name || agent.name || agent.id;
  const displayPurpose = profileData?.purpose || agent.purpose || '—';
  const displayBirthday = profileData?.birthday || agent.birthday || '—';
  const displayVersion = profileData?.protocol_version || 'Data Lifecycle v1.0';

  const copyId = () => {
    navigator.clipboard.writeText(agent.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Live / Demo pill */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-white/20" />
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.15em]">Agent Profile</span>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${isLive ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className={`text-[9px] font-mono font-bold tracking-widest ${isLive ? 'text-cyan-400' : 'text-amber-400'}`}>
            {isLive ? 'LIVE' : 'DEMO'}
          </span>
        </div>
      </div>

      {/* Avatar + identity */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div
          className="w-[76px] h-[76px] rounded-[20px] flex items-center justify-center text-white text-2xl font-syne font-bold mb-4 relative shrink-0"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
            boxShadow: `0 0 0 4px rgba(255,255,255,0.04), 0 0 40px ${ring}`,
          }}
        >
          {displayName[0]?.toUpperCase()}
        </div>
        <h2 className="font-syne font-bold text-white text-xl leading-tight">{displayName}</h2>
        <button
          onClick={copyId}
          className="flex items-center gap-1.5 mt-1.5 text-[10px] font-mono text-white/20 hover:text-white/45 transition-colors group"
        >
          {agent.id}
          {copied
            ? <Check className="w-2.5 h-2.5 text-emerald-400" />
            : <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          }
        </button>
      </div>

      {/* Trust score block */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] text-center mb-4">AI Trust Score</p>

        {/* Score number */}
        <div className="text-center mb-5">
          <motion.span
            className="font-syne font-bold leading-none"
            style={{ fontSize: '4rem', color: hex, textShadow: `0 0 30px ${ring}` }}
          >
            {animatedScore}
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 rounded-full overflow-hidden mb-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${scorePercent}%`, background: `linear-gradient(90deg, ${hex}cc, ${hex}22)` }}
            initial={{ width: 0 }}
            animate={{ width: `${scorePercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-white/15 mb-3">
          <span>300</span><span>850</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: hex }}>{label}</span>
          <span className="text-[10px] text-white/20 font-mono">{logCount} actions</span>
        </div>
      </div>

      {/* Metadata rows */}
      <div className="space-y-3 mb-6">
        {[
          { label: 'Registered', value: displayBirthday },
          { label: 'Status', value: bufferDepth > 0 ? `Processing ${bufferDepth}` : 'Idle' },
          { label: 'Queue Depth', value: `${bufferDepth} / 100`, mono: true },
          { label: 'Protocol', value: displayVersion },
        ].map(row => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider shrink-0">{row.label}</span>
            <span className={`text-xs text-right text-white/45 ${row.mono ? 'font-mono' : ''}`}>{row.value}</span>
          </div>
        ))}
        <div>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider block mb-1">Purpose</span>
          <p className="text-xs text-white/35 leading-relaxed">{displayPurpose}</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reveal Original Data */}
      <div
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl cursor-not-allowed opacity-30"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        title="Available when live data connection is active"
      >
        <Lock className="w-3.5 h-3.5 text-white/50" />
        <span className="text-xs font-medium text-white/50">Reveal Original Data</span>
      </div>
    </div>
  );
}