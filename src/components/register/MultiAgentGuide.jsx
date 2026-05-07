import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '@/components/shared/CodeBlock';

const step1Code = `python -m bgaurded register \\
  --is_supervisor true \\
  --dev_email you@example.com

# Response:
# ✓ Agent registered successfully
# agent_id: agt-supervisor-abc123
# supervisor_agent_id: sup-xyz789   <-- save this!
# API key saved to .env`;

const step2Code = `python -m bgaurded register \\
  --supervisor_agent_id sup-xyz789 \\
  --agent_activity MEDIUM \\
  --dev_email you@example.com

# BGaurded links the sub-agent automatically
# Sub-agent appears in supervisor's dashboard`;

export default function MultiAgentGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-10">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all hover:bg-white/[0.015] text-left"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-white/70">How to set up a multi-agent hierarchy</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
        }
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              {/* Step 1 */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">STEP 01</span>
                  <span className="text-sm font-semibold text-white/70">Register Supervisor Agent</span>
                </div>
                <div className="p-5">
                  <CodeBlock code={step1Code} language="bash" />
                  <div className="flex justify-center my-3">
                    <ArrowDown className="w-4 h-4 text-white/20" />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Save this <span className="font-mono text-cyan-400/70">supervisor_agent_id</span> — you'll need it for step 2.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">STEP 02</span>
                  <span className="text-sm font-semibold text-white/70">Register Sub-Agents</span>
                </div>
                <div className="p-5">
                  <CodeBlock code={step2Code} language="bash" />
                  <p className="text-xs text-white/40 leading-relaxed mt-4">
                    BGaurded links them automatically. Sub-agents report to the supervisor.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}