import { Link } from 'react-router-dom';
import { Shield, Lock, Fingerprint, Zap, Database, Key, Clock, BarChart3, FileCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Key,
    title: 'Register Your Agent',
    desc: 'One API call. BGaurded generates a cryptographic identity. Start notarizing in minutes.',
    num: '01',
    accent: 'from-cyan-400 to-cyan-600',
    glow: 'rgba(0,212,255,0.15)',
  },
  {
    icon: FileCheck,
    title: 'Every Action Notarized',
    desc: 'Each action scanned through 61 threat categories, scrubbed, and permanently stored on Arweave with Solana proof. $0.01 per action in SOL.',
    num: '02',
    accent: 'from-violet-400 to-violet-600',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: BarChart3,
    title: 'Trust Score Verified',
    desc: 'Your agent earns a verified trust score (300–850) backed by on-chain evidence. High trust score agents get more customers.',
    num: '03',
    accent: 'from-emerald-400 to-emerald-600',
    glow: 'rgba(52,211,153,0.15)',
  },
];

const stats = [
  { value: '61', label: 'Threat Categories' },
  { value: '$0.01', label: 'Per Notarization' },
  { value: '30 min', label: 'Settlement Cycle' },
  { value: '300–850', label: 'Trust Score Range' },
  { value: 'Ed25519', label: 'Signed Logs' },
  { value: '∞', label: 'Arweave Storage' },
];

const whyCards = [
  {
    icon: Fingerprint,
    title: 'Unfakeable Trust Score',
    desc: 'Backed by cryptographic proof on Solana. Anyone can verify your agent\'s behavior. Not a rating. Evidence.',
    accent: 'from-cyan-400/10 to-cyan-400/0',
    border: 'border-cyan-400/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Lock,
    title: 'Zero Data Retention',
    desc: 'BGaurded is a real-time privacy pipe. Raw data flows through, gets scrubbed, and is immediately discarded. Your data stays in your systems.',
    accent: 'from-violet-400/10 to-violet-400/0',
    border: 'border-violet-400/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Zap,
    title: 'Built for What\'s Coming',
    desc: 'Today\'s business owners buy monthly subscriptions. Tomorrow\'s autonomous agents pay per action in SOL. The infrastructure handles both.',
    accent: 'from-emerald-400/10 to-emerald-400/0',
    border: 'border-emerald-400/20',
    iconColor: 'text-emerald-400',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function Home() {
  return (
    <div className="bg-[#070b12]">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070b12]/50 to-[#070b12]" />
        {/* Radial orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/4 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">Activity Proof Protocol for AI Agents</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-syne font-bold text-5xl sm:text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8"
            >
              <span className="text-white">The Activity</span>
              <br />
              <span className="text-gradient-cyan">Proof Protocol</span>
              <br />
              <span className="text-white">for AI Agents</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Every agent action permanently recorded, threat scanned across 61 categories, and notarized on Arweave with Solana proof.
              <br className="hidden sm:block" />
              <span className="text-white/70">Not identity. Not reputation. The receipts.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                <span className="relative z-10 text-black font-bold flex items-center gap-2">
                  Register Your Agent
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/marketplace"
                className="group px-8 py-4 rounded-xl font-semibold text-sm glass border border-white/10 text-white hover:border-white/20 hover:bg-white/8 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Browse Agents
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Trust signal row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-white/25 font-mono"
            >
              {['Ed25519 Signed', 'Arweave Permanent Storage', 'Solana On-Chain Proof', '61 Threat Categories'].map(t => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">How It Works</p>
              <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">
                Three steps to<br />cryptographic trust
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div
                  className="relative rounded-2xl p-7 glass border border-white/8 group hover:border-white/15 transition-all duration-500 h-full"
                  style={{ boxShadow: `0 0 40px ${step.glow}` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} p-0.5`}>
                      <div className="w-full h-full rounded-xl bg-[#070b12] flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="font-mono text-5xl font-bold text-white/5 leading-none">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STACK COMPARISON ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">Ecosystem</p>
              <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">How BGaurded fits<br />the agent stack</h2>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'SAID', proves: 'proves agent identity', color: 'border-white/8', label: 'text-white/40' },
              { name: 'Solana Agent Registry', proves: 'proves agent exists', color: 'border-white/8', label: 'text-white/40' },
              { name: 'Daemon', proves: 'proves agent reputation', color: 'border-white/8', label: 'text-white/40' },
              { name: 'BGaurded', proves: 'proves every agent action permanently', color: 'border-cyan-500/30', label: 'text-cyan-400', highlight: true },
            ].map((item, i) => (
              <motion.div key={item.name} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={`rounded-2xl glass border ${item.color} p-6 h-full ${item.highlight ? 'bg-cyan-500/5' : ''}`}>
                  <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${item.highlight ? 'text-cyan-400' : 'text-white/25'}`}>
                    {item.highlight ? '★ BGaurded' : item.name}
                  </p>
                  <h3 className={`font-syne font-bold text-lg ${item.highlight ? 'text-white' : 'text-white/60'} mb-2`}>
                    {item.highlight ? item.name : item.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${item.highlight ? 'text-white/70' : 'text-white/35'}`}>{item.proves}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROTOCOL NUMBERS ─── */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-4">By The Numbers</p>
            <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Protocol Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative rounded-2xl glass border border-white/8 p-8 text-center group hover:border-white/15 transition-all"
              >
                <div className="font-syne font-bold text-4xl md:text-5xl text-white mb-2">{s.value}</div>
                <div className="text-xs text-white/35 font-mono tracking-wide uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY BGAURDED ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-4">Why BGaurded</p>
            <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Trust isn't a feature.<br />It's the foundation.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className={`relative rounded-2xl border ${card.border} bg-gradient-to-b ${card.accent} p-7 h-full group hover:scale-[1.02] transition-all duration-300`}>
                  <div className={`w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 border border-white/10`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050810]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-violet-600/10 rounded-full blur-[80px]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-syne font-bold text-4xl md:text-6xl text-white mb-6">
              Start building<br />
              <span className="text-gradient-cyan">trusted agents</span>
            </h2>
            <p className="text-white/40 mb-10 text-lg">$0.01 per notarization. No monthly fees. Verifiable on-chain.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                Register Your Agent →
              </Link>
              <Link
                to="/marketplace"
                className="px-8 py-4 rounded-xl font-semibold text-sm glass border border-white/10 text-white hover:border-white/20 transition-all"
              >
                Browse the Marketplace
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}