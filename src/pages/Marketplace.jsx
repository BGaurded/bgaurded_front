import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, BadgeCheck, Plus, ArrowUpRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ListAgentModal from '@/components/marketplace/ListAgentModal';

const FILTER_TABS = ['All', 'AI Agents', 'MCP Servers', 'Automations'];

const REGISTRY = [
  {
    id: 'alpha-cfo',
    name: 'Alpha CFO Agent',
    description: 'Financial operations and compliance — fully verified.',
    trustScore: 685,
    category: 'AI Agent',
    color: 'from-blue-600 to-indigo-700',
    initial: 'C',
  },
  {
    id: 'sales-mcp',
    name: 'Sales Automation MCP',
    description: 'CRM pipeline and outreach automation — trust notarized.',
    trustScore: 724,
    category: 'MCP Server',
    color: 'from-emerald-500 to-teal-600',
    initial: 'S',
  },
];

function getTrustColor(score) {
  if (score >= 800) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Excellent' };
  if (score >= 740) return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'Very Good' };
  if (score >= 670) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Good' };
  return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Fair' };
}

function RegistryCard({ agent }) {
  const sc = getTrustColor(agent.trustScore);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl glass border border-white/8 p-6 hover:border-white/15 hover:bg-white/[0.015] transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
          {agent.initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-syne font-bold text-white text-lg leading-tight">{agent.name}</h3>
          <p className="text-sm text-white/35 mt-1 leading-relaxed">{agent.description}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.border} ${sc.text}`}>
          <Shield className="w-3 h-3" /> {agent.trustScore} · {sc.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
          <BadgeCheck className="w-3 h-3" /> BGaurded Certified
        </span>
        <span className="inline-flex items-center text-[10px] font-mono text-white/40 bg-white/5 border border-white/8 px-2 py-1 rounded-full">
          {agent.category}
        </span>
      </div>

      <div className="h-px bg-white/5 mb-5" />

      <button className="flex items-center gap-1.5 text-sm font-semibold text-cyan-400 group-hover:gap-2.5 transition-all">
        View Details <ArrowUpRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function Marketplace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [listOpen, setListOpen] = useState(false);

  const filtered = REGISTRY.filter(a => {
    const matchesTab = activeTab === 'All' ||
      (activeTab === 'AI Agents' && a.category === 'AI Agent') ||
      (activeTab === 'MCP Servers' && a.category === 'MCP Server') ||
      (activeTab === 'Automations' && a.category === 'Automation');
    const matchesSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#070b12] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-cyan-500/5 to-violet-600/5 blur-[100px] rounded-full" />

      <ListAgentModal isOpen={listOpen} onClose={() => setListOpen(false)} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">Public Registry</p>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
            Verified Agent Marketplace
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Every agent listed here has permanent on-chain proof of their actions. Not just a profile. BGaurded activity proof.
          </p>
        </motion.div>

        {/* Search + List button row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search agents, MCP servers, automations..."
              className="w-full h-11 pl-11 pr-4 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <button
            onClick={() => setListOpen(true)}
            className="h-11 px-5 rounded-xl text-sm font-bold text-black shrink-0 hover:opacity-90 transition-all hover:scale-[1.02] flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
          >
            <Plus className="w-4 h-4" /> List Your Agent
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-1 p-1 rounded-xl glass border border-white/8 mb-10 w-fit"
        >
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-white'
                  : 'text-white/35 hover:text-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Registry Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {filtered.map(agent => (
            <RegistryCard key={agent.id} agent={agent} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-20 text-white/25 text-sm font-mono">
              No results found.
            </div>
          )}
        </div>

        {/* Custom AI Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.08))',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <div>
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Custom Build</p>
            <h3 className="font-syne font-bold text-white text-xl mb-1">Need a custom AI agent built for your exact workflow?</h3>
            <p className="text-white/40 text-sm">Fully configured by our team. BGaurded Certified from day one.</p>
          </div>
          <button
            onClick={() => navigate('/custom-agent')}
            className="shrink-0 px-7 py-3 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all hover:scale-[1.02] whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
          >
            Get a Quote
          </button>
        </motion.div>

      </div>
    </div>
  );
}