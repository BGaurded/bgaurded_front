const levels = [
  {
    level: 'HIGH',
    subtitle: 'Financial / Payments / Sensitive Data',
    warn: '5 minutes',
    suspend: '30 minutes',
    note: 'For agents handling money or sensitive data',
    border: 'rgba(239,68,68,0.25)',
    bg: 'rgba(239,68,68,0.04)',
    labelColor: 'text-red-400',
    labelBg: 'bg-red-500/10 border-red-500/25',
  },
  {
    level: 'MEDIUM',
    subtitle: 'General Purpose (Default)',
    warn: '30 minutes',
    suspend: '2 hours',
    note: 'For general workflow agents',
    border: 'rgba(234,179,8,0.25)',
    bg: 'rgba(234,179,8,0.04)',
    labelColor: 'text-yellow-400',
    labelBg: 'bg-yellow-500/10 border-yellow-500/25',
  },
  {
    level: 'LOW',
    subtitle: 'Scheduled / Infrequent',
    warn: '4 hours',
    suspend: '16 hours',
    note: 'For weekly or scheduled task agents',
    border: 'rgba(16,185,129,0.25)',
    bg: 'rgba(16,185,129,0.04)',
    labelColor: 'text-emerald-400',
    labelBg: 'bg-emerald-500/10 border-emerald-500/25',
  },
];

export default function ActivityLevelCards() {
  return (
    <div className="mb-10">
      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">agent_activity levels</p>
      <p className="text-xs text-white/30 mb-4">Choose the activity level that matches your agent's operation frequency.</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {levels.map(l => (
          <div
            key={l.level}
            className="rounded-xl p-4"
            style={{ background: l.bg, border: `1px solid ${l.border}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${l.labelColor} ${l.labelBg}`}>
                {l.level}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-white/60 mb-3">{l.subtitle}</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                <span className="text-[10px] font-mono text-white/35">Warns after {l.warn} silent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                <span className="text-[10px] font-mono text-white/35">Suspends after {l.suspend} silent</span>
              </div>
            </div>
            <p className="text-[10px] text-white/25 mt-3 pt-3 border-t leading-relaxed" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {l.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}