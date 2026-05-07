import { Link, useNavigate } from 'react-router-dom';
import { Shield, Link2, Star, CheckCircle2, ArrowRight, ChevronRight, Lock, Zap, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const featureCards = [
  {
    icon: Shield,
    title: '61 Threat Categories',
    desc: 'Every log scanned for jailbreaks, prompt injection, exfiltration, and obfuscation before hitting the chain. Malicious agents get caught.',
    accent: 'from-cyan-400/10 to-cyan-400/0',
    border: 'border-cyan-400/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Link2,
    title: 'On-Chain Proof',
    desc: 'Every agent action permanently stored on Arweave with a Solana anchor transaction. Tamper-proof, publicly verifiable, forever.',
    accent: 'from-violet-400/10 to-violet-400/0',
    border: 'border-violet-400/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Star,
    title: 'Trust Score Governance',
    desc: 'Agents earn a trust score 300–850. Bad behavior triggers automatic circuit breakers. Good behavior builds verifiable on-chain reputation.',
    accent: 'from-amber-400/10 to-amber-400/0',
    border: 'border-amber-400/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: CheckCircle2,
    title: 'Independent Verification',
    desc: 'PoV Oracle independently verifies every agent claim before it reaches the blockchain. Agents that lie get caught and penalized.',
    accent: 'from-emerald-400/10 to-emerald-400/0',
    border: 'border-emerald-400/20',
    iconColor: 'text-emerald-400',
  },
];

const verifyChecklist = [
  'The action taken by the agent',
  'The agent\'s thought process and reasoning',
  'The task it was part of',
  'The outcome and impact score',
  'Whether PII was present (22+ types scrubbed)',
  'Whether a threat was detected (61 categories)',
  'The independent PoV Oracle verdict',
  'The Arweave transaction ID',
  'The Solana anchor proof',
  'The agent\'s cumulative trust score delta',
];



const howItWorksSteps = [
  {
    num: '01',
    title: 'Agent Registers',
    accent: 'from-cyan-400 to-cyan-600',
    color: 'text-cyan-400',
    glow: 'rgba(0,212,255,0.15)',
    content: (
      <div className="space-y-3">
        <div className="rounded-xl p-4 font-mono text-xs text-white/60" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-cyan-400/70 mb-1">$ pip install bgaurded</div>
          <div className="text-cyan-400/70">$ python -m bgaurded register</div>
        </div>
        <p className="text-sm text-white/40 leading-relaxed">Answer 6 questions. Keypair generated automatically. Agent ID and API key saved to .env</p>
      </div>
    ),
  },
  {
    num: '02',
    title: 'Agent Logs Actions',
    accent: 'from-violet-400 to-violet-600',
    color: 'text-violet-400',
    glow: 'rgba(139,92,246,0.15)',
    content: <p className="text-sm text-white/40 leading-relaxed">Every decision, action, and outcome gets notarized with a task ID that groups them into a single audit trail card.</p>,
  },
  {
    num: '03',
    title: 'BGaurded Verifies',
    accent: 'from-emerald-400 to-emerald-600',
    color: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.15)',
    content: (
      <div className="space-y-1.5">
        {['Scanned for 61 threat categories', 'PII scrubbed (22+ types)', 'Independently verified by PoV Oracle', 'Committed to Arweave permanently', 'Anchored on Solana'].map(item => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-sm text-white/50">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '04',
    title: 'See Everything On Chain',
    accent: 'from-amber-400 to-amber-600',
    color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.15)',
    content: <p className="text-sm text-white/40 leading-relaxed">Your Intelligence Report shows every agent action grouped by task, with trust score, on-chain proof, and downloadable compliance export.</p>,
  },
];

const pricingTiers = [
  {
    label: 'Free Tier',
    sub: 'First 100 logs',
    price: 'FREE',
    priceNote: 'No credit card needed',
    features: ['Full threat scanning', 'PII scrubbing', 'Arweave storage', 'Solana proof', 'Trust score', 'No credit card needed'],
    highlight: false,
    cta: 'Get Started',
    ctaLink: 'https://www.bgaurded.com/llms.txt',
  },
  {
    label: 'Pay Per Use',
    sub: '$0.002 per log',
    price: '$2',
    priceNote: 'per 1,000 logs',
    features: ['Everything in free tier', 'Unlimited logs', 'Compliance export', 'Policy engine', 'Access control', 'Pay in SOL — more coming soon'],
    highlight: true,
    cta: 'Start Notarizing',
    ctaLink: '/register',
  },
  {
    label: 'Enterprise',
    sub: '$0.002 per log',
    price: 'Custom',
    priceNote: 'volume pricing',
    features: ['Everything in Pay Per Use', 'Dedicated support', 'Custom policy templates', 'SLA guarantee', 'White-glove onboarding'],
    highlight: false,
    cta: 'Contact Us',
    ctaLink: 'mailto:andrewchaplin@bgaurded.com',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#070b12]">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070b12]/50 to-[#070b12]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/4 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-center">

            {/* Pill badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2.5 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">AI Agent Governance Protocol</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-syne font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight mb-4"
            >
              <span className="text-gradient-cyan">The Accountability</span>
              <br />
              <span className="text-white">Layer for AI Agents</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-sm font-mono text-white/30 tracking-widest uppercase mb-8"
            >
              Verify every agent action and thought process. On chain.
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Every decision, every action, every outcome — independently verified by PoV Oracle, PII scrubbed, and permanently committed to Arweave with Solana proof.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://www.bgaurded.com/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105 text-black"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                <span className="flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <button
                onClick={() => navigate('/intelligence/agt-defi-q3-intelligence-f20b0204')}
                className="group px-8 py-4 rounded-xl font-semibold text-sm glass border border-white/10 text-white hover:border-white/20 hover:bg-white/8 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  View Live Demo <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-white/25 font-mono"
            >
              {['Ed25519 Signed', 'Arweave Permanent Storage', 'Solana On-Chain Proof', '61 Threat Categories', 'First 100 Logs Free'].map(t => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT BGAURDED VERIFIES ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/4 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-4">Full Audit Trail</p>
            <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-4">
              Not just what your agent did.
              <br /><span className="text-gradient-cyan">Why it did it.</span>
            </h2>
            <p className="text-white/40 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
              BGaurded captures and verifies the full picture — every log includes the agent's reasoning, not just its output.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="inline-block text-left rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-5">BGaurded Verifies</p>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-2.5">
                {verifyChecklist.map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">Core Protocol</p>
              <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Agent Accountability<br />Protocol</h2>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((card, i) => (
              <motion.div key={card.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={`relative rounded-2xl border ${card.border} bg-gradient-to-b ${card.accent} p-7 h-full group hover:scale-[1.02] transition-all duration-300`}>
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 border border-white/10">
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">How It Works</p>
              <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">How BGaurded Works</h2>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, i) => (
              <motion.div key={step.num} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="relative rounded-2xl p-6 glass border border-white/8 group hover:border-white/15 transition-all duration-500 h-full"
                  style={{ boxShadow: `0 0 40px ${step.glow}` }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.accent} p-0.5`}>
                      <div className="w-full h-full rounded-xl bg-[#070b12] flex items-center justify-center">
                        <span className={`text-xs font-bold font-mono ${step.color}`}>{step.num}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
                  {step.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Circuit Breaker + PoV Oracle cards */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mt-10 space-y-5">

            {/* Circuit Breaker */}
            <div className="rounded-2xl glass border border-white/8 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">STEP 02 — A</span>
                </div>
                <h2 className="font-semibold text-white text-sm">Automatic Circuit Breaker Protection</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-white/50 leading-relaxed">
                  BGaurded monitors every agent in real time. If an agent's trust score drops below 600 — through repeated threats detected, PII violations, failed verifications, or supervisor flags — the circuit breaker fires automatically.
                </p>
                <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
                  <p className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest mb-3">When triggered</p>
                  {[
                    'Agent is immediately suspended',
                    'API key revoked',
                    'Supervisor notified via webhook',
                    'All pending logs held until investigation completes',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="text-red-400 font-mono text-xs shrink-0 mt-0.5">→</span>
                      <span className="text-sm text-white/55">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/30 italic leading-relaxed">
                  The circuit breaker cannot be argued with. It fires on data, not narrative.
                </p>
              </div>
            </div>

            {/* PoV Oracle */}
            <div className="rounded-2xl glass border border-white/8 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20">
                  <span className="text-[10px] font-mono font-bold text-violet-400 tracking-widest">STEP 02 — B</span>
                </div>
                <h2 className="font-semibold text-white text-sm">Independent Verification Before Chain Commit</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-white/50 leading-relaxed">
                  Before any agent action reaches Arweave or Solana, BGaurded calls PoV Oracle — an independent third-party verification server.
                </p>
                <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.12)' }}>
                  <p className="text-[10px] font-mono text-violet-400/60 uppercase tracking-widest mb-3">PoV Oracle checks</p>
                  {[
                    'Did the agent actually do what it claims?',
                    'Does the evidence URL confirm the action?',
                    "Is the agent's thought process consistent with the action taken?",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="text-violet-400 font-mono text-xs shrink-0 mt-0.5">→</span>
                      <span className="text-sm text-white/55">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4 space-y-1.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">If hallucination_check.passed == false</p>
                  {['Log rejected', 'Trust score penalized -10', 'Violation logged permanently'].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="text-red-400 font-mono text-xs shrink-0 mt-0.5">→</span>
                      <span className="text-sm text-white/45">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/30 italic leading-relaxed">
                  Only verified actions reach the blockchain. The agent cannot talk its way onto the chain.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">Pricing</p>
              <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Simple, transparent pricing</h2>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.label} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={`relative rounded-2xl p-7 h-full flex flex-col transition-all duration-300 ${
                  tier.highlight
                    ? 'border border-cyan-500/30 bg-gradient-to-b from-cyan-500/8 to-transparent'
                    : 'glass border border-white/8'
                }`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-black"
                      style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">{tier.label}</p>
                    <p className={`text-sm font-mono mb-1 ${tier.highlight ? 'text-cyan-400' : 'text-white/50'}`}>{tier.sub}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-syne font-bold text-4xl text-white">{tier.price}</span>
                      {tier.priceNote && <span className="text-sm text-white/30">{tier.priceNote}</span>}
                    </div>
                  </div>
                  <div className="space-y-2.5 flex-1 mb-7">
                    {tier.features.map(f => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${tier.highlight ? 'text-cyan-400' : 'text-emerald-400/70'}`} />
                        <span className="text-sm text-white/55">{f}</span>
                      </div>
                    ))}
                  </div>
                  {tier.ctaLink.startsWith('http') || tier.ctaLink.startsWith('mailto') ? (
                    <a
                      href={tier.ctaLink}
                      target={tier.ctaLink.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all hover:opacity-90 ${
                        tier.highlight ? 'text-black' : 'text-white border border-white/12 hover:bg-white/5'
                      }`}
                      style={tier.highlight ? { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' } : {}}
                    >
                      {tier.cta}
                    </a>
                  ) : (
                    <Link
                      to={tier.ctaLink}
                      className={`w-full py-3 rounded-xl text-sm font-bold text-center block transition-all hover:opacity-90 ${
                        tier.highlight ? 'text-black' : 'text-white border border-white/12 hover:bg-white/5'
                      }`}
                      style={tier.highlight ? { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' } : {}}
                    >
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="text-center space-y-2">
            <p className="text-sm text-white/35 font-mono">Log retrieval: <span className="text-white/55">$0.005 per retrieval</span></p>
            <p className="text-sm text-white/30">No monthly fees. No subscriptions. Pay in SOL — More payment methods coming soon.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY BGAURDED ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-4">Why BGaurded</p>
            <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">Trust isn't a feature.<br />It's the foundation.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Fingerprint, title: 'Unfakeable Trust Score', desc: 'Backed by cryptographic proof on Solana. Anyone can verify your agent\'s behavior. Not a rating. Evidence.', accent: 'from-cyan-400/10 to-cyan-400/0', border: 'border-cyan-400/20', iconColor: 'text-cyan-400' },
              { icon: Lock, title: 'Zero Data Retention', desc: 'BGaurded is a real-time privacy pipe. Raw data flows through, gets scrubbed, and is immediately discarded. Your data stays in your systems.', accent: 'from-violet-400/10 to-violet-400/0', border: 'border-violet-400/20', iconColor: 'text-violet-400' },
              { icon: Zap, title: 'Built for What\'s Coming', desc: 'Today\'s business owners buy monthly subscriptions. Tomorrow\'s autonomous agents pay per action in SOL. The infrastructure handles both.', accent: 'from-emerald-400/10 to-emerald-400/0', border: 'border-emerald-400/20', iconColor: 'text-emerald-400' },
            ].map((card, i) => (
              <motion.div key={card.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={`relative rounded-2xl border ${card.border} bg-gradient-to-b ${card.accent} p-7 h-full group hover:scale-[1.02] transition-all duration-300`}>
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 border border-white/10">
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
            <p className="text-white/40 mb-2 text-lg">First 100 logs free. Then $0.002 per log ($2 per 1,000).</p>
            <p className="text-white/30 mb-10 text-sm font-mono">No monthly fees. No subscriptions. Pay in SOL only.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.bgaurded.com/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                Get Started →
              </a>
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-semibold text-sm glass border border-white/10 text-white hover:border-white/20 transition-all"
              >
                Register Your Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
