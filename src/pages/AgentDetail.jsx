import { useParams, Link } from 'react-router-dom';
import { AGENTS, SOLSCAN_TX } from '@/lib/agentsData';
import { BadgeCheck, ExternalLink, Lock, CheckCircle, FileText, ArrowLeft, MessageSquare } from 'lucide-react';
import TrustScoreBadge, { getScoreMeta } from '@/components/shared/TrustScoreBadge';
import SmartLogExample from '@/components/agent-detail/SmartLogExample';
import QuoteModal from '@/components/shared/QuoteModal';
import { motion } from 'framer-motion';
import { useState } from 'react';

const protections = [
  'Real client names aliased — Entity_01 not Mr. Chaplin',
  'Real figures fuzzed — $50,247 not $50,000',
  '61 threat categories scanned on every action',
  'Permanent Arweave storage',
  'Solana proof — anyone can verify',
  'Raw data never stored — fetched on demand, discarded after use',
  'DISCARD_INSTRUCTION sent to agent after every task',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function AgentDetail() {
  const { agentId } = useParams();
  const agent = AGENTS.find(a => a.id === agentId);
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#070b12] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Agent not found</h2>
          <Link to="/marketplace" className="text-cyan-400 hover:underline">← Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const scoreMeta = getScoreMeta(agent.trustScore);
  const scorePercent = ((agent.trustScore - 300) / 550) * 100;

  return (
    <div className="bg-[#070b12] min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/4 blur-[120px] rounded-full" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-violet-600/4 blur-[100px] rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back */}
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Marketplace
        </Link>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="rounded-2xl glass border border-white/8 p-8">
            <div className="flex flex-col md:flex-row items-start gap-7">
              {/* Avatar */}
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-3xl font-bold shrink-0`}>
                {agent.initial}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="font-syne font-bold text-3xl md:text-4xl text-white">{agent.name}</h1>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5" /> BGaurded Certified
                  </span>
                </div>
                <p className="text-white/40 mb-6 leading-relaxed">{agent.description}</p>

                {/* Trust Score */}
                <div className="mb-5">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Trust Score</span>
                    <span className={`text-3xl font-syne font-bold ${scoreMeta.color}`}>{agent.trustScore}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${scoreMeta.bgLight} ${scoreMeta.color}`}>{scoreMeta.label}</span>
                  </div>
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden max-w-sm">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                      className={`absolute inset-y-0 left-0 rounded-full`}
                      style={{ background: `linear-gradient(90deg, ${scoreMeta.color === 'text-emerald-500' ? '#10b981' : scoreMeta.color === 'text-blue-600' ? '#2563eb' : '#f59e0b'}, transparent)` }}
                    />
                  </div>
                  <div className="flex justify-between max-w-sm mt-1">
                    <span className="text-[10px] font-mono text-white/20">300</span>
                    <span className="text-[10px] font-mono text-white/20">850</span>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={`https://solscan.io/tx/${SOLSCAN_TX}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View on Solscan
                  </a>
                  {!agent.isCustom && (
                    <div className="flex items-baseline gap-1">
                      <span className="font-syne font-bold text-3xl text-white">${agent.price}</span>
                      <span className="text-sm text-white/30">/month</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Capabilities */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="rounded-2xl glass border border-white/8 p-6 h-full">
              <h2 className="font-syne font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600" />
                Capabilities
              </h2>
              <div className="space-y-3">
                {agent.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/60">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Data Protection */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="rounded-2xl glass border border-white/8 p-6 h-full">
              <h2 className="font-syne font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-violet-400 to-violet-600" />
                Data Protection
              </h2>
              <div className="space-y-3">
                {protections.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <Lock className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-white/45 leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Smart Log */}
        <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-6">
          <div className="rounded-2xl glass border border-white/8 p-6">
            <h2 className="font-syne font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600" />
              Smart Logging Example
            </h2>
            <SmartLogExample />
          </div>
        </motion.div>

        {/* Purchase */}
        <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          {agent.isCustom ? (
            /* Custom Agent — quote only */
            <div className="rounded-2xl glass border border-violet-500/15 p-8 hover:border-violet-500/25 transition-colors text-center">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="font-syne font-bold text-white text-lg mb-2">Ready to get started?</h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-md mx-auto mb-6">
                Pricing varies based on complexity and scope. Most custom agents start at <span className="text-white/70 font-semibold">$499/month</span>. Contact us to discuss your requirements.
              </p>
              <button
                onClick={() => setQuoteOpen(true)}
                className="px-8 py-3 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                Get a Custom Quote
              </button>
            </div>
          ) : (
            /* Standard agents — preprogrammed + custom */
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl glass border border-cyan-500/15 p-6 hover:border-cyan-500/25 transition-colors">
                <h3 className="font-syne font-bold text-white mb-1">Preprogrammed Tasks</h3>
                <p className="text-xs text-white/30 mb-5">Ready-to-deploy configuration</p>
                <div className="space-y-2 mb-6">
                  {agent.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-sm text-white/40">
                      <FileText className="w-3.5 h-3.5 text-white/20 shrink-0" />
                      {cap}
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
                >
                  Buy Preprogrammed — ${agent.price}/mo
                </button>
              </div>
              <div className="rounded-2xl glass border border-violet-500/15 p-6 hover:border-violet-500/25 transition-colors">
                <h3 className="font-syne font-bold text-white mb-1">Custom Tasks</h3>
                <p className="text-xs text-white/30 mb-5">We configure it for your exact workflow</p>
                <p className="text-sm text-white/40 leading-relaxed mb-5">
                  Pricing varies based on complexity and scope. Most custom agents start at <span className="text-white/70 font-semibold">$499/month</span>. Contact us to discuss your requirements.
                </p>
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="w-full py-3 rounded-xl font-bold text-sm glass border border-white/15 text-white hover:border-violet-500/40 hover:bg-violet-500/5 transition-all"
                >
                  Get a Custom Quote
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
      </div>
    </div>
  );
}