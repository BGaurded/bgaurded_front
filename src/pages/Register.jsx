import { useState, useRef } from 'react';
import { Terminal, Zap, Store, Lock } from 'lucide-react';
import CodeBlock from '@/components/shared/CodeBlock';
import { motion } from 'framer-motion';
import ListAgentModal from '@/components/marketplace/ListAgentModal';

const cliCode = `pip install bgaurded
python -m bgaurded register`;

const sdkCode = `pip install bgaurded

from bgaurded import BgaurdedClient
import os

client = BgaurdedClient(
    signing_key=os.getenv("BGAURDED_SIGNING_KEY")
)

# Log a decision
client.notarize(
    agent_id="your_agent_id",
    action="Decided to send payment reminder to Entity_01",
    thought_process="Invoice #4471 is 30 days overdue. Good payment history. Send reminder.",
    evidence_url="https://bgaurded.com/evidence/1",
    impact_score=7,
    category="DECISION",
    task_id="task_001"
)

# Each call: $0.01 notarization fee in SOL
# Same task_id groups them on the dashboard`;

const flowSteps = [
  { icon: Terminal, label: 'Install & Register', step: 1, color: 'text-cyan-400', bg: 'from-cyan-400 to-cyan-600' },
  { icon: Zap, label: 'Notarize', step: 2, color: 'text-emerald-400', bg: 'from-emerald-400 to-emerald-600' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Register() {
  const [listOpen, setListOpen] = useState(false);
  const cliRef = useRef(null);

  const scrollToCLI = () => {
    cliRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#070b12] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />

      <ListAgentModal isOpen={listOpen} onClose={() => setListOpen(false)} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">Agent Onboarding</p>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-4">Register Your Agent</h1>
          <p className="text-white/40 text-lg">BGaurded is the activity proof protocol for AI agents. Every action your agent takes is permanently recorded on Arweave, threat scanned across 61 categories, and verified on Solana. $0.01 per proof. First 100 free.</p>
        </motion.div>

        {/* Two Path Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 mb-14"
        >
          {/* List on Marketplace */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(0,212,255,0.2)' }}>
              <Store className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-syne font-bold text-white text-lg mb-2">List on Marketplace</h3>
            <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">
              Make your agent or MCP server discoverable. Get BGaurded Certified and reach buyers actively looking for verified AI.
            </p>
            <button
              onClick={() => setListOpen(true)}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-black hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
            >
              Submit Your Listing
            </button>
          </div>

          {/* Private API Access */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-syne font-bold text-white text-lg mb-2">Private API Access</h3>
            <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">
              Use BGaurded's notarization protocol privately. Get your API key, plug into trust scoring, and keep your agent off the public marketplace.
            </p>
            <button
              onClick={scrollToCLI}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Get Your API Key
            </button>
          </div>
        </motion.div>

        {/* Flow Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 md:gap-6 mb-14"
        >
          {flowSteps.map((s, i) => (
            <div key={s.step} className="flex items-center gap-3 md:gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.bg} p-0.5`}>
                  <div className="w-full h-full rounded-xl bg-[#070b12] flex items-center justify-center">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-wider uppercase">{s.label}</span>
              </div>
              {i < flowSteps.length - 1 && (
                <div className="w-8 md:w-16 h-px bg-gradient-to-r from-white/10 to-white/5 mt-[-18px]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step 1: CLI Registration */}
        <div ref={cliRef}>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
            <div className="rounded-2xl glass border border-white/8 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest">STEP 01</span>
                </div>
                <h2 className="font-semibold text-white text-sm">Install and Register (CLI)</h2>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-white/50 leading-relaxed">
                  Registration is now done through our CLI. No form needed.
                </p>
                <CodeBlock code={cliCode} language="bash" />
                <p className="text-sm text-white/40 leading-relaxed">
                  The CLI will ask you <span className="text-white/70 font-semibold">4 questions</span> and handle everything automatically — including keypair generation and registration.
                </p>
                <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">You will receive</p>
                  {['Your Agent ID', 'Your API Key', 'Your dashboard URL'].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                  <p className="text-xs text-white/30 mt-3 pt-3 border-t border-white/5">
                    All saved automatically to your <span className="font-mono text-white/50">.env</span> file.
                  </p>
                </div>
                <div className="rounded-xl p-4" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <p className="text-xs text-cyan-400/70 leading-relaxed">
                    <span className="text-cyan-400 font-semibold">Note:</span> The CLI generates your keypair automatically. You do not need to run keygen separately.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Step 2: SDK */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
          <div className="rounded-2xl glass border border-white/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">STEP 02</span>
              </div>
              <h2 className="font-semibold text-white text-sm">Start Notarizing</h2>
            </div>
            <div className="p-6">
              <CodeBlock code={sdkCode} language="python" />
            </div>
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
          <div className="rounded-2xl glass border border-white/8 p-6 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.03), rgba(124,58,237,0.03))' }}
          >
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Pricing</p>
            <p className="text-white/60 text-sm">
              <span className="text-white font-semibold">$0.01</span> per notarized action (SOL) · No monthly protocol fee · Or buy a pre-built agent from our{' '}
              <a href="/marketplace" className="text-cyan-400 hover:underline">marketplace</a>
            </p>
          </div>
        </motion.div>

        {/* Notarization note */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
            <p className="text-sm text-white/40 leading-relaxed">
              Every agent action is notarized on <span className="text-white/70 font-semibold">Arweave</span> and verified on{' '}
              <span className="text-white/70 font-semibold">Solana</span>. <span className="text-white font-semibold">$0.01</span> per notarization paid in SOL.{' '}
              No subscriptions. No percentages. Pay only for what you use.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}