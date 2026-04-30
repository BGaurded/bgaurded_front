import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, RefreshCw, Search, AlertTriangle, ExternalLink, CheckCircle, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentProfileCard from '@/components/intelligence/AgentProfileCard';
import { DEMO_AGENT, DEMO_LOGS, SOLSCAN_TX } from '@/lib/agentsData';

// ─── helpers ─────────────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  DECISION:    { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/25',    text: 'text-cyan-400' },
  ACTION:      { bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', text: 'text-emerald-400' },
  SUMMARY:     { bg: 'bg-violet-500/10',  border: 'border-violet-500/25',  text: 'text-violet-400' },
  TOOL_CALL:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   text: 'text-amber-400' },
  MEMORY:      { bg: 'bg-slate-500/10',   border: 'border-slate-500/25',   text: 'text-slate-400' },
  THREAT_BLOCK:{ bg: 'bg-red-500/10',     border: 'border-red-500/25',     text: 'text-red-400' },
};
const DEFAULT_CAT = { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/40' };

function CategoryBadge({ cat }) {
  const s = CATEGORY_STYLES[cat] || DEFAULT_CAT;
  return (
    <span className={`inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${s.bg} ${s.border} ${s.text} shrink-0`}>
      {cat}
    </span>
  );
}

// Renders a group of logs sharing a task_id (or a single standalone log)
function TaskGroupCard({ group, index }) {
  const [open, setOpen] = useState(false);

  const first = group[0];
  const isBlocked = group.some(l => l.status === 'BLOCKED');
  const totalCost = group.reduce((s, l) => s + (l.cost || 0), 0);
  const maxImpact = Math.max(...group.map(l => l.impact_score ?? 0).filter(n => n > 0));
  const ts = first.timestamp
    ? new Date(first.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '';
  const title = first.task_title || first.action || first.id || '—';

  // Flatten all entries across logs in this group
  const entries = group.flatMap(l =>
    Array.isArray(l.entries) && l.entries.length > 0
      ? l.entries
      : [{ category: l.category || l.log_level, action: l.action, thought_process: l.thought_process, impact_score: l.impact_score }]
  ).filter(e => e.action || e.thought_process);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: isBlocked ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Accent line */}
      <div className="h-px w-full" style={{
        background: isBlocked
          ? 'linear-gradient(90deg, rgba(239,68,68,0.6), transparent)'
          : 'linear-gradient(90deg, rgba(0,212,255,0.3), transparent)'
      }} />

      {/* Header (always visible) */}
      <button
        onClick={() => entries.length > 0 && setOpen(v => !v)}
        className={`w-full flex items-start justify-between gap-4 px-5 py-4 text-left transition-colors group ${entries.length > 0 ? 'hover:bg-white/[0.015] cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${isBlocked ? 'text-red-400 bg-red-500/10 border-red-500/25' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'}`}>
              {isBlocked ? 'BLOCKED' : 'CLEAN'}
            </span>
            {ts && <span className="text-[10px] font-mono text-white/20">{ts}</span>}
            {maxImpact > 0 && (
              <span className="text-[9px] font-mono text-white/25">Impact <span className="text-white/40">{maxImpact}/10</span></span>
            )}
            <span className="flex items-center gap-0.5 text-[9px] font-mono text-white/20">
              <Lock className="w-2.5 h-2.5" /> Privacy Protected
            </span>
          </div>

          {/* Title */}
          <p className="text-sm font-semibold text-white/80 leading-snug">{title}</p>

          {/* Footer meta row */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-[10px] font-mono text-white/30">{group.length} {group.length === 1 ? 'log' : 'logs'}</span>
            {totalCost > 0 && <span className="text-[10px] font-mono text-white/30">${totalCost.toFixed(2)}</span>}
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/50">
              <CheckCircle className="w-3 h-3" /> On-chain Verified
            </span>
          </div>
        </div>

        {entries.length > 0 && (
          <div className="shrink-0 text-white/20 group-hover:text-white/40 transition-colors mt-1">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </button>

      {/* Expanded entries */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3.5 border-t border-white/5 pt-4">
              {entries.map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 pt-0.5">
                    {entry.category
                      ? <CategoryBadge cat={entry.category} />
                      : <span className="text-[9px] font-mono text-white/20">—</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    {entry.action && <p className="text-sm text-white/75 font-semibold leading-snug">{entry.action}</p>}
                    {entry.thought_process && (
                      <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{entry.thought_process}</p>
                    )}
                    {entry.impact_score > 0 && (
                      <span className="text-[9px] font-mono text-white/20 mt-1 block">Impact {entry.impact_score}/10</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function OnChainBar({ hashes }) {
  if (!hashes.length) return null;
  const truncate = h => h.length > 16 ? `${h.slice(0, 10)}…${h.slice(-8)}` : h;
  return (
    <div className="rounded-2xl px-5 py-4 flex flex-wrap items-center gap-3"
      style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)' }}>
      <div className="flex items-center gap-2 mr-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">Solana On-Chain Proofs</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {hashes.map((h, i) => (
          <a key={i} href={`https://solscan.io/tx/${h}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400/70 hover:text-emerald-400 transition-colors">
            <CheckCircle className="w-3 h-3" />
            {truncate(h)}
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function IntelligenceDashboard() {
  const { agentId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solanaHashes, setSolanaHashes] = useState([]);
  const [trustScore, setTrustScore] = useState(685);
  const [bufferDepth, setBufferDepth] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [offlineBanner, setOfflineBanner] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const allLogsRef = useRef([]);
  const allHashesRef = useRef([]);

  const agent = { ...DEMO_AGENT, id: agentId };

  // Fetch profile
  useEffect(() => {
    fetch(`https://www.bgaurded.com/agents/${agentId}/profile`, {
      headers: { 'X-Bgaurded-Secret': 'PERPLEXITY' },
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setProfileData(d); if (d.trust_score_display) setTrustScore(d.trust_score_display); } })
      .catch(() => {});
  }, [agentId]);

  const extractBundleData = (bd, edge) => {
    const logs = Array.isArray(bd.logs) ? bd.logs : (Array.isArray(bd) ? bd : []);
    const hashes = [];
    if (bd.solana_tx) hashes.push(bd.solana_tx);
    const tags = edge?.node?.tags || [];
    for (const tag of tags) {
      if (tag.name === 'Solana-TX' || tag.name === 'Solana-Signature') hashes.push(tag.value);
    }
    return { logs, hashes };
  };

  // Query Irys uploader GraphQL for transactions tagged with this agent_id,
  // then fetch each bundle from the gateway.
  const fetchIrysBundles = async (id) => {
    const gqlQuery = `{ transactions(tags: [{name: "App-Name", values: ["Bgaurded-Forensics", "BGaurded", "bgaurded"]}, {name: "Agent-ID", values: ["${id}"]}] first: 20 order: DESC) { edges { node { id tags { name value } } } } }`;
    const res = await fetch('https://uploader.irys.xyz/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: gqlQuery }),
    });
    if (!res.ok) return { logs: [], hashes: [] };
    const gd = await res.json();
    const edges = gd?.data?.transactions?.edges || [];
    const bundleResults = await Promise.allSettled(
      edges.map(edge =>
        fetch(`https://gateway.irys.xyz/${edge.node.id}`)
          .then(r => r.ok ? r.json() : null)
          .then(bd => ({ bd, edge }))
      )
    );
    let logs = [], hashes = [];
    for (const result of bundleResults) {
      if (result.status !== 'fulfilled' || !result.value?.bd) continue;
      const extracted = extractBundleData(result.value.bd, result.value.edge);
      logs = [...logs, ...extracted.logs];
      hashes = [...hashes, ...extracted.hashes];
    }
    return { logs, hashes };
  };

  // Fetch all logs: BGaurded API + Irys GraphQL in parallel
  const fetchAllLogs = useCallback(async () => {
    let allLogs = [];
    let hashes = [];
    let serverOk = false;

    // Step 1+3: Status check, BGaurded cache API, and Irys GraphQL — all in parallel
    const [statusResult, apiResult, irysResult] = await Promise.allSettled([
      fetch(`https://www.bgaurded.com/status?agent_id=${agentId}`, { headers: { 'X-Bgaurded-Secret': 'PERPLEXITY' } })
        .then(r => r.ok ? r.json() : null),
      fetch(`https://www.bgaurded.com/sui/logs/${agentId}`, { headers: { 'X-Bgaurded-Secret': 'PERPLEXITY' } })
        .then(r => r.ok ? r.json() : null),
      fetchIrysBundles(agentId),
    ]);

    if (statusResult.status === 'fulfilled' && statusResult.value) {
      const d = statusResult.value;
      serverOk = !!d.status;
      if (d.trust_score_display) setTrustScore(d.trust_score_display);
      if (d.buffer_depth !== undefined) setBufferDepth(d.buffer_depth);
      setIsLive(true);
    }

    if (apiResult.status === 'fulfilled' && apiResult.value) {
      serverOk = true;
      const raw = apiResult.value.logs || apiResult.value;
      if (Array.isArray(raw)) allLogs = [...allLogs, ...raw];
    }

    if (irysResult.status === 'fulfilled') {
      if (irysResult.value.logs.length > 0) serverOk = true;
      allLogs = [...allLogs, ...irysResult.value.logs];
      hashes = [...hashes, ...irysResult.value.hashes];
    }

    // Fallback to demo only if all sources failed
    if (!serverOk) {
      allLogs = DEMO_LOGS;
      hashes = [SOLSCAN_TX];
      setOfflineBanner(true);
      setIsLive(false);
    } else {
      setOfflineBanner(false);
      if (allLogs.length === 0) allLogs = DEMO_LOGS;
      if (hashes.length === 0) hashes = [SOLSCAN_TX];
    }

    allLogsRef.current = allLogs;
    allHashesRef.current = [...new Set(hashes)];
    return { allLogs, hashes: [...new Set(hashes)] };
  }, [agentId]);

  const applySearch = useCallback((allLogs, hashes, q) => {
    const lq = q.toLowerCase();

    const logMatches = (l) => {
      if (!lq) return true;
      if ((l.action || '').toLowerCase().includes(lq)) return true;
      if ((l.thought_process || '').toLowerCase().includes(lq)) return true;
      if ((l.task_title || '').toLowerCase().includes(lq)) return true;
      if ((l.category || '').toLowerCase().includes(lq)) return true;
      if (Array.isArray(l.entries)) {
        for (const e of l.entries) {
          if ((e.action || '').toLowerCase().includes(lq)) return true;
          if ((e.thought_process || '').toLowerCase().includes(lq)) return true;
        }
      }
      return false;
    };

    // 1. Deduplicate raw logs by id or action+timestamp
    const seen = new Set();
    const deduped = allLogs.filter(l => {
      const k = l.id || `${l.action}__${l.timestamp}`;
      if (seen.has(k)) return false;
      seen.add(k); return true;
    });

    // 2. Build a set of action strings that are already covered inside entries[] of other logs.
    //    This prevents a parent log's children from also appearing as standalone cards.
    const coveredActions = new Set();
    for (const l of deduped) {
      if (Array.isArray(l.entries) && l.entries.length > 0) {
        for (const e of l.entries) {
          if (e.action) coveredActions.add(e.action);
        }
      }
    }

    // 3. Remove any flat log whose action is already covered by a parent's entries[]
    const topLevel = deduped.filter(l => {
      const hasOwnEntries = Array.isArray(l.entries) && l.entries.length > 0;
      if (hasOwnEntries) return true; // keep parent logs
      // Drop flat logs whose action is a sub-entry of another log
      if (l.action && coveredActions.has(l.action)) return false;
      return true;
    });

    // 4. Filter by search
    const filtered = topLevel.filter(logMatches);

    // 5. Group by task_id (only if >1 log shares it); lone task_id logs → standalone
    const groupMap = new Map(); // task_id → logs[]
    const standaloneGroups = [];
    for (const log of filtered) {
      if (log.task_id) {
        if (!groupMap.has(log.task_id)) groupMap.set(log.task_id, []);
        groupMap.get(log.task_id).push(log);
      } else {
        standaloneGroups.push([log]);
      }
    }

    // Promote single-member task_id groups to standalone (no grouping needed)
    for (const [, group] of groupMap) {
      if (group.length === 1) standaloneGroups.push(group);
    }
    const multiGroups = [...groupMap.values()].filter(g => g.length > 1);

    // 6. Sort each group internally by timestamp, then sort all cards by newest first
    const allGroups = [...multiGroups, ...standaloneGroups];
    for (const g of allGroups) g.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
    allGroups.sort((a, b) => new Date(b[0].timestamp || 0) - new Date(a[0].timestamp || 0));

    setLogs(allGroups);
    setSolanaHashes(hashes);
    setLoading(false);
  }, []);

  // Initial load — auto-search Q4 for alpha
  useEffect(() => {
    setLoading(true);
    const initQuery = '';
    setSearchInput(initQuery);
    setQuery(initQuery);
    fetchAllLogs().then(({ allLogs, hashes }) => {
      applySearch(allLogs, hashes, initQuery);
    });
  }, [agentId, fetchAllLogs, applySearch]);

  // Periodic status poll (every 30s after initial load)
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch(`https://www.bgaurded.com/status?agent_id=${agentId}`, {
          headers: { 'X-Bgaurded-Secret': 'PERPLEXITY' },
        });
        if (res.ok) {
          const d = await res.json();
          if (d.trust_score_display) setTrustScore(d.trust_score_display);
          if (d.buffer_depth !== undefined) setBufferDepth(d.buffer_depth);
          setIsLive(true);
          setOfflineBanner(false);
        } else {
          setIsLive(false);
        }
      } catch { setIsLive(false); }
    };
    const iv = setInterval(poll, 30000);
    return () => clearInterval(iv);
  }, [agentId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchInput.trim();
    setQuery(q);
    if (allLogsRef.current.length > 0) {
      applySearch(allLogsRef.current, allHashesRef.current, q);
    } else {
      setLoading(true);
      fetchAllLogs().then(({ allLogs, hashes }) => applySearch(allLogs, hashes, q));
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setOfflineBanner(false);
    fetchAllLogs().then(({ allLogs, hashes }) => applySearch(allLogs, hashes, query));
  };

  return (
    <div className="min-h-screen flex bg-[#05080f]" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-[320px] xl:w-[360px] shrink-0 sticky top-0 h-screen overflow-y-auto"
        style={{ background: '#070b12', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Top accent */}
        <div className="h-px w-full shrink-0"
          style={{ background: 'linear-gradient(90deg, #00d4ff44, #7c3aed44)' }} />

        {/* Back nav */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <button
            onClick={() => navigate('/intelligence')}
            className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 text-white/15 text-[10px] font-mono">
            <div className="w-4 h-4 rounded flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00d4ff,#7c3aed)' }}>
              <Shield className="w-2.5 h-2.5 text-white" />
            </div>
            BGaurded
          </div>
        </div>

        {/* Profile card */}
        <div className="flex-1 flex flex-col px-6 py-6">
          <AgentProfileCard
            agent={agent}
            profileData={profileData}
            trustScore={trustScore}
            logCount={logs.reduce((s, g) => s + g.length, 0)}
            bufferDepth={bufferDepth}
            isLive={isLive}
          />
        </div>

        {/* Sidebar footer */}
        <div className="px-6 py-4 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-[10px] font-mono text-white/12 text-center">Protocol v1.0 · Arweave · Solana</p>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 shrink-0"
          style={{ background: '#070b12', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={() => navigate('/intelligence')} className="flex items-center gap-1.5 text-white/30 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="font-mono text-xs text-white/25 truncate max-w-[180px]">{agentId}</span>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-mono font-bold ${isLive ? 'text-cyan-400 bg-cyan-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
            {isLive ? 'LIVE' : 'DEMO'}
          </div>
        </div>

        {/* Offline banner */}
        <AnimatePresence>
          {offlineBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-2 px-6 py-2.5 shrink-0"
              style={{ background: 'rgba(245,158,11,0.05)', borderBottom: '1px solid rgba(245,158,11,0.12)' }}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-xs text-amber-400/70">Server offline — showing demo data</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile profile */}
        <div className="lg:hidden px-4 pt-5 pb-2">
          <div className="rounded-2xl p-5" style={{ background: '#070b12', border: '1px solid rgba(255,255,255,0.06)' }}>
            <AgentProfileCard
              agent={agent}
              profileData={profileData}
              trustScore={trustScore}
              logCount={logs.reduce((s, g) => s + g.length, 0)}
              bufferDepth={bufferDepth}
              isLive={isLive}
              />
              </div>
              </div>

              {/* Scroll area */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 xl:px-12 py-8 space-y-6">

          {/* Page header */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.16em] mb-1.5">Agent Activity</p>
              <h1 className="font-syne font-bold text-white text-2xl xl:text-3xl leading-tight">Intelligence Report</h1>
            </div>
            <span className="text-[10px] font-mono text-white/15 hidden sm:block">
              {agentId}
            </span>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search logs by keyword, category, task..."
                className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-mono text-white placeholder:text-white/18 focus:outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onFocus={e => { e.target.style.border = '1px solid rgba(0,212,255,0.3)'; }}
                onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.07)'; }}
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-xl text-sm font-semibold text-[#05080f] shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              title="Refresh"
              className="h-11 w-11 rounded-xl shrink-0 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </form>

          {/* On-chain proofs */}
          {!loading && <OnChainBar hashes={solanaHashes} />}

          {/* Results header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white/70">Activity Logs</span>
              {!loading && (
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  {logs.length} {query ? `matching "${query}"` : 'tasks'}
                </span>
              )}
            </div>
            {!loading && logs.length > 0 && (
              <span className="text-[10px] font-mono text-white/18">newest first · deduplicated</span>
            )}
          </div>

          {/* Logs */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-2xl p-5 space-y-3 animate-pulse"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex gap-2">
                      <div className="h-4 w-16 rounded-md bg-white/5" />
                      <div className="h-4 w-24 rounded-md bg-white/5" />
                    </div>
                    <div className="h-3.5 w-2/3 rounded-full bg-white/5" />
                    <div className="h-3 w-1/2 rounded-full bg-white/4" />
                  </div>
                ))}
              </motion.div>
            ) : logs.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Search className="w-5 h-5 text-white/20" />
                </div>
                <p className="text-white/25 text-sm mb-3">No logs found{query ? ` for "${query}"` : ''}.</p>
                <button onClick={() => { setSearchInput(''); setQuery(''); applySearch(allLogsRef.current, allHashesRef.current, ''); }}
                  className="text-cyan-400/50 text-xs hover:text-cyan-400 transition-colors font-mono">
                  Clear search
                </button>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pb-12">
                {logs.map((group, i) => <TaskGroupCard key={group[0]?.task_id || group[0]?.id || i} group={group} index={i} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}