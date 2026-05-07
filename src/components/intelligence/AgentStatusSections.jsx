import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink } from 'lucide-react';

// ─── Circuit Breaker ──────────────────────────────────────────────────────────

function CircuitBreakerBadge({ status }) {
  if (!status) return null;

  const configs = {
    ACTIVE: {
      label: '🟢 Circuit Breaker Armed',
      className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      pulse: false,
    },
    CIRCUIT_BREAKER: {
      label: '🔴 Circuit Breaker Triggered',
      className: 'text-red-400 bg-red-500/10 border-red-500/25',
      pulse: true,
    },
    HEARTBEAT_WARNING: {
      label: '🟡 Heartbeat Warning',
      className: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
      pulse: false,
    },
    HEARTBEAT_CRITICAL: {
      label: '🟠 Heartbeat Critical',
      className: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
      pulse: true,
    },
  };

  const cfg = configs[status] || configs.ACTIVE;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-3 py-1.5 rounded-full border ${cfg.className} ${cfg.pulse ? 'animate-pulse' : ''}`}>
      {cfg.label}
    </span>
  );
}

function ResetModal({ agentId, onClose, onSuccess }) {
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    setLoading(true);
    setError('');
    const res = await fetch(`https://www.bgaurded.com/agents/${agentId}/circuit-breaker/reset`, {
      method: 'POST',
      headers: { 'X-Bgaurded-Secret': secretKey },
    });
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.message || data.error || 'Reset failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-sm rounded-2xl p-6 z-10"
        style={{ background: '#0d1117', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-syne font-bold text-white text-base">Reset Agent</h2>
          <button onClick={onClose} className="text-white/25 hover:text-white/60 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-white/40 mb-4 leading-relaxed">
          Enter your BGaurded secret key to reset the circuit breaker. A new API key will be issued.
        </p>
        <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Secret Key</label>
        <input
          type="password"
          value={secretKey}
          onChange={e => setSecretKey(e.target.value)}
          placeholder="Enter your secret key..."
          className="w-full px-3 py-2 rounded-xl text-sm placeholder:text-white/20 focus:outline-none mb-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
        />
        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
        <button
          onClick={handleReset}
          disabled={loading || !secretKey}
          className="w-full h-10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Resetting...</> : 'Reset Agent'}
        </button>
      </motion.div>
    </div>
  );
}

// ─── Heartbeat ────────────────────────────────────────────────────────────────

function HeartbeatSection({ heartbeat }) {
  if (!heartbeat) return null;

  const activityColors = {
    HIGH: 'text-red-400 bg-red-500/10 border-red-500/25',
    MEDIUM: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
    LOW: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  };
  const statusColors = {
    HEALTHY: 'text-emerald-400',
    WARNING: 'text-yellow-400',
    CRITICAL: 'text-red-400',
  };

  const lastNotarized = heartbeat.last_notarization_minutes != null
    ? heartbeat.last_notarization_minutes === 0
      ? 'Just now'
      : `${heartbeat.last_notarization_minutes} min ago`
    : 'Never';

  return (
    <div className="rounded-xl p-4 space-y-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] mb-3">Heartbeat Monitor</p>

      {heartbeat.activity_level && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/25">Activity Level</span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${activityColors[heartbeat.activity_level] || 'text-white/40 bg-white/5 border-white/10'}`}>
            {heartbeat.activity_level}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/25">Last Notarization</span>
        <span className="text-[10px] font-mono text-white/45">{lastNotarized}</span>
      </div>
      {heartbeat.status && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/25">Heartbeat</span>
          <span className={`text-[10px] font-mono font-semibold ${statusColors[heartbeat.status] || 'text-white/40'}`}>{heartbeat.status}</span>
        </div>
      )}
      {heartbeat.warn_after_minutes != null && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/25">Warns after</span>
          <span className="text-[10px] font-mono text-white/35">{heartbeat.warn_after_minutes} min silent</span>
        </div>
      )}
      {heartbeat.suspend_after_minutes != null && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/25">Suspends after</span>
          <span className="text-[10px] font-mono text-white/35">{heartbeat.suspend_after_minutes} min silent</span>
        </div>
      )}
    </div>
  );
}

// ─── Hierarchy ────────────────────────────────────────────────────────────────

function HierarchySection({ hierarchy, agentId }) {
  const navigate = useNavigate();
  if (!hierarchy) return null;

  const isSupervisor = hierarchy.role === 'supervisor';
  const isSubAgent = hierarchy.role === 'sub_agent';

  return (
    <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] mb-3">Agent Hierarchy</p>

      {!isSupervisor && !isSubAgent && (
        <span className="text-xs text-white/30 font-mono">👤 Standalone Agent</span>
      )}

      {isSupervisor && (
        <div className="space-y-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border text-cyan-400 bg-cyan-500/10 border-cyan-500/25">
            👑 Supervisor Agent
          </span>
          {Array.isArray(hierarchy.sub_agents) && hierarchy.sub_agents.length > 0 && (
            <div className="space-y-1.5 mt-2">
              {hierarchy.sub_agents.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/intelligence/${sub.id}`)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left hover:bg-white/5 transition-colors group"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-[10px] font-mono text-white/45 group-hover:text-white/70 truncate">{sub.name || sub.id}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {sub.trust_score && <span className="text-[10px] font-mono text-white/25">{sub.trust_score}</span>}
                    <ExternalLink className="w-2.5 h-2.5 text-white/20 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {isSubAgent && hierarchy.supervisor && (
        <button
          onClick={() => navigate(`/intelligence/${hierarchy.supervisor.id}`)}
          className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/70 hover:text-cyan-400 transition-colors"
        >
          🔗 Reports to: <span className="underline underline-offset-2">{hierarchy.supervisor.name || hierarchy.supervisor.id}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function AgentStatusSections({ agentId }) {
  const [cbStatus, setCbStatus] = useState(null);
  const [heartbeat, setHeartbeat] = useState(null);
  const [hierarchy, setHierarchy] = useState(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (!agentId) return;
    Promise.allSettled([
      fetch(`https://www.bgaurded.com/agents/${agentId}/circuit-breaker/status`).then(r => r.ok ? r.json() : null),
      fetch(`https://www.bgaurded.com/agents/${agentId}/heartbeat`).then(r => r.ok ? r.json() : null),
      fetch(`https://www.bgaurded.com/agents/${agentId}/hierarchy`).then(r => r.ok ? r.json() : null),
    ]).then(([cbRes, hbRes, hierRes]) => {
      if (cbRes.status === 'fulfilled' && cbRes.value) setCbStatus(cbRes.value.status || cbRes.value);
      if (hbRes.status === 'fulfilled' && hbRes.value) setHeartbeat(hbRes.value);
      if (hierRes.status === 'fulfilled' && hierRes.value) setHierarchy(hierRes.value);
    });
  }, [agentId]);

  const handleResetSuccess = () => {
    setResetOpen(false);
    setResetSuccess(true);
    setTimeout(() => window.location.reload(), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {resetOpen && (
          <ResetModal agentId={agentId} onClose={() => setResetOpen(false)} onSuccess={handleResetSuccess} />
        )}
      </AnimatePresence>

      {resetSuccess && (
        <div className="rounded-xl px-4 py-3 mb-3 text-xs text-emerald-400 font-mono"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          ✓ Agent restored. New API key issued.
        </div>
      )}

      {/* Circuit Breaker */}
      {cbStatus && (
        <div className="rounded-xl p-4 mb-3" style={{
          background: 'rgba(255,255,255,0.02)',
          border: cbStatus === 'CIRCUIT_BREAKER' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.06)',
        }}>
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] mb-3">Circuit Breaker</p>
          <CircuitBreakerBadge status={cbStatus} />
          {cbStatus === 'CIRCUIT_BREAKER' && (
            <button
              onClick={() => setResetOpen(true)}
              className="mt-3 w-full h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all hover:opacity-90"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
            >
              Reset Agent
            </button>
          )}
        </div>
      )}

      {/* Heartbeat */}
      {heartbeat && <div className="mb-3"><HeartbeatSection heartbeat={heartbeat} /></div>}

      {/* Hierarchy */}
      {hierarchy && <div className="mb-3"><HierarchySection hierarchy={hierarchy} agentId={agentId} /></div>}
    </>
  );
}