import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw, AlertTriangle } from 'lucide-react';
import AgentProfileCard from '@/components/intelligence/AgentProfileCard';
import LogCard from '@/components/intelligence/LogCard';
import OnChainProofs from '@/components/intelligence/OnChainProofs';
import { DEMO_AGENT, DEMO_LOGS, SOLSCAN_TX } from '@/lib/agentsData';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Intelligence() {
  const [query, setQuery] = useState('Q4');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solanaHashes, setSolanaHashes] = useState([]);
  const [trustScore, setTrustScore] = useState(685);
  const [bufferDepth, setBufferDepth] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [offlineBanner, setOfflineBanner] = useState(false);

  const searchLogs = useCallback(async (searchQuery) => {
    setLoading(true);
    setOfflineBanner(false);
    let allLogs = [];
    let hashes = [];

    try {
      const res = await fetch(`https://www.bgaurded.com/sui/logs/${DEMO_AGENT.id}`, {
        headers: { 'X-Bgaurded-Secret': 'PERPLEXITY' },
      });
      if (res.ok) {
        const data = await res.json();
        const rawLogs = data.logs || data;
        if (Array.isArray(rawLogs)) allLogs = [...allLogs, ...rawLogs];
      }
    } catch { }

    try {
      const graphqlRes = await fetch('https://arweave.net/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `{
            transactions(
              tags: [
                { name: "App-Name", values: ["Bgaurded-Forensics", "BGaurded"] }
                { name: "Agent-ID", values: ["${DEMO_AGENT.id}"] }
              ]
              first: 100
              sort: HEIGHT_DESC
            ) {
              edges { node { id tags { name value } } }
            }
          }`,
        }),
      });
      if (graphqlRes.ok) {
        const graphqlData = await graphqlRes.json();
        const edges = graphqlData?.data?.transactions?.edges || [];
        for (const edge of edges.slice(0, 5)) {
          try {
            const bundleRes = await fetch(`https://arweave.net/${edge.node.id}`);
            if (bundleRes.ok) {
              const bundleData = await bundleRes.json();
              const bundleLogs = bundleData.logs || (Array.isArray(bundleData) ? bundleData : []);
              allLogs = [...allLogs, ...bundleLogs];
              if (bundleData.solana_tx) hashes.push(bundleData.solana_tx);
              const solTag = edge.node.tags?.find(t => t.name === 'Solana-TX');
              if (solTag) hashes.push(solTag.value);
            }
          } catch { }
        }
      }
    } catch { }

    if (allLogs.length === 0) {
      allLogs = DEMO_LOGS;
      hashes = [SOLSCAN_TX];
      setOfflineBanner(true);
    }

    const q = searchQuery.toLowerCase();
    const filtered = allLogs.filter(log => JSON.stringify(log).toLowerCase().includes(q));
    const seen = new Set();
    const deduped = filtered.filter(log => {
      const key = log.id || JSON.stringify(log).slice(0, 100);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    deduped.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    if (hashes.length === 0) hashes = [SOLSCAN_TX];

    setLogs(deduped);
    setSolanaHashes([...new Set(hashes)]);
    setLoading(false);
  }, []);

  useEffect(() => { searchLogs('Q4'); }, [searchLogs]);

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch(`https://www.bgaurded.com/status?agent_id=${DEMO_AGENT.id}`, {
          headers: { 'X-Bgaurded-Secret': 'PERPLEXITY' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.trust_score) setTrustScore(data.trust_score);
          if (data.buffer_depth !== undefined) setBufferDepth(data.buffer_depth);
          setIsLive(true);
        }
      } catch { setIsLive(false); }
    };
    poll();
    const interval = setInterval(poll, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) searchLogs(query.trim());
  };

  return (
    <div className="min-h-screen bg-[#070b12] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/4 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-600/4 blur-[100px] rounded-full" />

      {/* Top Bar */}
      <div className="relative border-b border-white/5 bg-[#070b12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 opacity-80" />
              <Shield className="relative w-7 h-7 text-white p-1.5" />
            </div>
            <span className="text-white font-syne font-bold text-lg">BGaurded</span>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/40 font-medium">Agent Intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-cyan-400 animate-pulse-glow' : 'bg-amber-400'}`} />
            <span className={`text-xs font-mono font-bold tracking-widest ${isLive ? 'text-cyan-400' : 'text-amber-400'}`}>
              {isLive ? 'LIVE' : 'DEMO'}
            </span>
          </div>
        </div>
      </div>

      {offlineBanner && (
        <div className="relative border-b border-amber-500/15 bg-amber-500/5 px-4 py-2.5 flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs text-amber-400/80">BGaurded server offline — showing demo data</span>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-7">
          {/* Left */}
          <div className="flex-1 lg:w-[65%] space-y-5">
            {/* Search */}
            <div className="rounded-2xl glass border border-white/8 p-5">
              <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-3">Search Agent Logs</p>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Q4 Chaplin account, invoice reconciliation..."
                    className="pl-9 bg-white/4 border-white/8 text-white placeholder:text-white/20 focus:border-cyan-500/40"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-semibold text-sm text-black hover:opacity-90 transition-all"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
                >
                  Search
                </button>
              </form>
            </div>

            {/* On-Chain Proofs */}
            {!loading && <OnChainProofs hashes={solanaHashes} />}

            {/* Activity Logs */}
            <div className="rounded-2xl glass border border-white/8 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-white">Agent Activity Logs</p>
                  {!loading && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      {logs.length} results
                    </span>
                  )}
                </div>
                <button
                  onClick={() => searchLogs(query)}
                  className="p-2 rounded-lg glass border border-white/8 text-white/30 hover:text-white hover:border-white/15 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="rounded-xl glass border border-white/5 p-5 space-y-3 animate-pulse">
                      <div className="h-3 bg-white/5 rounded-full w-1/3" />
                      <div className="h-2.5 bg-white/5 rounded-full w-2/3" />
                      <div className="h-2.5 bg-white/5 rounded-full w-1/2" />
                    </div>
                  ))
                ) : logs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white/25 text-sm">No logs found matching your search.</p>
                  </div>
                ) : (
                  logs.map((log, i) => <LogCard key={log.id || i} log={log} />)
                )}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:w-[35%]">
            <AgentProfileCard
              agent={DEMO_AGENT}
              trustScore={trustScore}
              logCount={logs.length}
              bufferDepth={bufferDepth}
              isLive={isLive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}