import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Copy, Check, ChevronRight, Crown, Users, AlertTriangle, RefreshCw, Plus, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterAgentModal from '@/components/agents/RegisterAgentModal';

const CATEGORY_ORDER = [
  'Supervisor Agent', 'DeFi Agent', 'CFO Agent', 'Compliance Agent',
  'Operations Agent', 'Sales Agent', 'Data Agent', 'Custom Agent', 'Other',
];

const ACTIVITY_COLORS = {
  HIGH:   { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  MEDIUM: { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  LOW:    { text: 'text-slate-400',   bg: 'bg-slate-500/10',   border: 'border-slate-500/20' },
};

const STATUS_COLORS = {
  ACTIVE:          { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  REGISTERED:      { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  SUSPENDED:       { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  CIRCUIT_BREAKER: { text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20' },
};

function getTrustColor(score) {
  if (score >= 750) return 'text-emerald-400';
  if (score >= 650) return 'text-amber-400';
  if (score >= 500) return 'text-orange-400';
  return 'text-red-400';
}

function CopyId({ id }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const short = id.length > 20 ? `${id.slice(0, 12)}…${id.slice(-8)}` : id;
  return (
    <button onClick={copy} className="flex items-center gap-1.5 font-mono text-[11px] text-white/25 hover:text-white/50 transition-colors group">
      {short}
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </button>
  );
}

function AgentCard({ agent, navigate }) {
  const act = ACTIVITY_COLORS[agent.activity_level?.toUpperCase()] || ACTIVITY_COLORS.MEDIUM;
  const st  = STATUS_COLORS[agent.status?.toUpperCase()] || STATUS_COLORS.REGISTERED;
  const trustColor = getTrustColor(agent.trust_score || 300);

  return (
    <div className="rounded-2xl p-5 transition-all hover:border-white/15"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {agent.is_supervisor && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Crown className="w-2.5 h-2.5" /> SUPERVISOR
              </span>
            )}
            {agent.supervisor_agent_id && !agent.is_supervisor && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/30">
                <Users className="w-2.5 h-2.5" /> SUB-AGENT
              </span>
            )}
          </div>
          <h3 className="font-syne font-bold text-white text-base leading-tight truncate">{agent.agent_name || agent.name || agent.id}</h3>
          <CopyId id={agent.id || agent.agent_id || ''} />
        </div>
        <div className="text-right shrink-0">
          <div className={`font-syne font-bold text-3xl leading-none ${trustColor}`}>{agent.trust_score || '—'}</div>
          <div className="text-[9px] font-mono text-white/20 mt-0.5">Trust Score</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border ${act.bg} ${act.border} ${act.text}`}>
          {agent.activity_level?.toUpperCase() || 'MEDIUM'}
        </span>
        <span className={`inline-flex items-center text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border ${st.bg} ${st.border} ${st.text}`}>
          {agent.status?.toUpperCase() || 'REGISTERED'}
        </span>
        {(agent.buffer_depth > 0) && (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-white/30 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
            {agent.buffer_depth} logs pending
          </span>
        )}
      </div>

      <button
        onClick={() => navigate(`/intelligence/${encodeURIComponent(agent.id || agent.agent_id)}`)}
        className="w-full py-2.5 rounded-xl text-xs font-bold text-white/70 hover:text-white flex items-center justify-center gap-1.5 transition-all hover:bg-white/5"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        View Intelligence Report <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function YourAgents() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('bgaurded_api_key') || '');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);

  const fetchAgents = async (key) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://www.bgaurded.com/agents/registry', {
        headers: { 'X-BGaurded-API-Key': key },
      });
      if (!res.ok) throw new Error('Invalid API key or server error');
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.agents || []);
      setAgents(list);
    } catch (e) {
      setError(e.message || 'Failed to load agents');
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) fetchAgents(apiKey);
  }, [apiKey]);

  const handleConnect = (e) => {
    e.preventDefault();
    const key = apiKeyInput.trim();
    if (!key) return;
    localStorage.setItem('bgaurded_api_key', key);
    setApiKey(key);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('bgaurded_api_key');
    setApiKey('');
    setAgents([]);
  };

  // Group by category, sort by activity level
  const activityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  const grouped = {};
  for (const agent of agents) {
    const cat = agent.agent_type || agent.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(agent);
  }
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) =>
      (activityOrder[a.activity_level?.toUpperCase()] ?? 1) - (activityOrder[b.activity_level?.toUpperCase()] ?? 1)
    );
  }
  const orderedCategories = [
    ...CATEGORY_ORDER.filter(c => grouped[c]),
    ...Object.keys(grouped).filter(c => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <div className="bg-[#070b12] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-[120px]" />

      <RegisterAgentModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        apiKey={apiKey}
        onRegistered={() => fetchAgents(apiKey)}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">Agent Dashboard</p>
            <h1 className="font-syne font-bold text-3xl md:text-4xl text-white">Your Agents</h1>
          </div>
          {apiKey && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchAgents(apiKey)}
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setRegisterOpen(true)}
                className="h-10 px-5 rounded-xl text-sm font-bold text-black flex items-center gap-2 hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                <Plus className="w-4 h-4" /> Register New Agent
              </button>
            </div>
          )}
        </div>

        {/* Not connected */}
        {!apiKey && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto rounded-2xl p-8 text-center"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(0,212,255,0.2)' }}>
              <Key className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="font-syne font-bold text-white text-xl mb-2">Connect your BGaurded account</h2>
            <p className="text-white/35 text-sm mb-7">Enter your BGaurded API key to see and manage your agents.</p>
            <form onSubmit={handleConnect} className="space-y-3">
              <input
                type="password"
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                placeholder="BGaurded API Key"
                className="w-full h-11 px-4 rounded-xl text-sm font-mono text-white placeholder:text-white/20 focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-black hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                Connect
              </button>
            </form>
            <p className="text-xs text-white/20 mt-4 font-mono">
              Don't have an API key?{' '}
              <button onClick={() => navigate('/register')} className="text-cyan-400/60 hover:text-cyan-400 underline underline-offset-2">
                Register your first agent
              </button>
            </p>
          </motion.div>
        )}

        {/* Connected: loading */}
        {apiKey && loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl p-5 animate-pulse" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between mb-3">
                  <div className="h-5 w-40 rounded bg-white/5" />
                  <div className="h-8 w-12 rounded bg-white/5" />
                </div>
                <div className="h-3 w-32 rounded bg-white/5 mb-4" />
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-20 rounded-full bg-white/5" />
                  <div className="h-6 w-20 rounded-full bg-white/5" />
                </div>
                <div className="h-9 w-full rounded-xl bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {apiKey && !loading && error && (
          <div className="rounded-2xl p-5 flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-semibold text-sm mb-1">Failed to load agents</p>
              <p className="text-white/35 text-xs">{error}</p>
              <button onClick={handleDisconnect} className="text-xs text-red-400/60 hover:text-red-400 mt-2 underline underline-offset-2">
                Disconnect and re-enter API key
              </button>
            </div>
          </div>
        )}

        {/* Agent list */}
        {apiKey && !loading && !error && agents.length > 0 && (
          <div className="space-y-10">
            {orderedCategories.map(cat => (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-syne font-bold text-white text-lg">{cat}</h2>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
                    {grouped[cat].length}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grouped[cat].map(agent => (
                    <AgentCard key={agent.id || agent.agent_id} agent={agent} navigate={navigate} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {apiKey && !loading && !error && agents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Shield className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-white/30 text-sm mb-5">No agents found for this API key.</p>
            <button
              onClick={() => setRegisterOpen(true)}
              className="px-6 py-3 rounded-xl text-sm font-bold text-black hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
            >
              Register Your First Agent
            </button>
          </div>
        )}

        {/* Disconnect link */}
        {apiKey && !loading && (
          <div className="mt-10 text-center">
            <button onClick={handleDisconnect} className="text-xs text-white/15 hover:text-white/35 transition-colors font-mono underline underline-offset-2">
              Disconnect API key
            </button>
          </div>
        )}
      </div>
    </div>
  );
}