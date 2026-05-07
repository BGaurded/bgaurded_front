import { useState } from 'react';
import { X, Copy, Check, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AGENT_TYPES = [
  'DeFi Agent', 'Data Agent', 'Compliance Agent', 'Supervisor Agent',
  'Operations Agent', 'Sales Agent', 'CFO Agent', 'Custom Agent', 'Other',
];

const ACTIVITY_LEVELS = [
  { value: 'HIGH',   label: 'HIGH',   desc: 'Logs every action in real time', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8' },
  { value: 'MEDIUM', label: 'MEDIUM', desc: 'Logs key decisions and outcomes', color: 'text-amber-400',   border: 'border-amber-500/30',   bg: 'bg-amber-500/8' },
  { value: 'LOW',    label: 'LOW',    desc: 'Logs summaries and compliance checkpoints', color: 'text-slate-400', border: 'border-slate-500/30', bg: 'bg-slate-500/8' },
];

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">{label}</p>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <code className="flex-1 text-xs font-mono text-cyan-400 truncate">{value}</code>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="shrink-0 text-white/30 hover:text-white/70 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default function RegisterAgentModal({ isOpen, onClose, apiKey, onRegistered }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', type: '', description: '', activity: '', supervisorMode: 'standalone', supervisorId: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const totalSteps = 6;

  const reset = () => {
    setStep(1);
    setForm({ name: '', type: '', description: '', activity: '', supervisorMode: 'standalone', supervisorId: '' });
    setResult(null);
    setError('');
    setLoading(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const body = {
        agent_name: form.name,
        agent_type: form.type,
        description: form.description,
        activity_level: form.activity,
        supervisor_id: form.supervisorMode === 'supervisor' ? form.supervisorId : undefined,
      };
      const res = await fetch('https://www.bgaurded.com/agents/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-BGaurded-API-Key': apiKey },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Registration failed. Please check your API key and try again.');
      const data = await res.json();
      setResult(data);
      if (onRegistered) onRegistered();
      setStep(7); // success step
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const canNext = () => {
    if (step === 1) return form.name.trim().length > 0;
    if (step === 2) return form.type.length > 0;
    if (step === 3) return form.description.trim().length > 0;
    if (step === 4) return form.activity.length > 0;
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl z-10 overflow-hidden"
            style={{ background: '#0d1520', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div>
                {step <= totalSteps && (
                  <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Step {step} of {totalSteps}</p>
                )}
                <h2 className="font-syne font-bold text-white text-lg">
                  {step === 7 ? 'Agent Registered!' : 'Register New Agent'}
                </h2>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar */}
            {step <= totalSteps && (
              <div className="h-0.5 bg-white/5">
                <div className="h-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%`, background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }} />
              </div>
            )}

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">

                {/* Step 1: Name */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-white/50 text-sm mb-5">What is your agent's name?</p>
                    <input
                      autoFocus
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. DeFi Trading Agent"
                      className="w-full h-12 px-4 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </motion.div>
                )}

                {/* Step 2: Type */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-white/50 text-sm mb-5">What type of agent is it?</p>
                    <div className="grid grid-cols-3 gap-2">
                      {AGENT_TYPES.map(t => (
                        <button key={t} onClick={() => setForm({ ...form, type: t })}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                            form.type === t
                              ? 'text-white border-cyan-500/40 bg-cyan-500/10'
                              : 'text-white/40 hover:text-white/70'
                          }`}
                          style={{ border: form.type === t ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.07)' }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Description */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-white/50 text-sm mb-5">What does your agent do?</p>
                    <textarea
                      autoFocus
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe your agent's role and responsibilities"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </motion.div>
                )}

                {/* Step 4: Activity */}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-white/50 text-sm mb-5">How active is your agent?</p>
                    <div className="space-y-3">
                      {ACTIVITY_LEVELS.map(lvl => (
                        <button key={lvl.value} onClick={() => setForm({ ...form, activity: lvl.value })}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                            form.activity === lvl.value ? `${lvl.bg} border ${lvl.border}` : 'hover:bg-white/3'
                          }`}
                          style={{ border: form.activity === lvl.value ? undefined : '1px solid rgba(255,255,255,0.07)' }}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${lvl.color}`}
                            style={{ background: 'rgba(255,255,255,0.05)' }}>
                            {lvl.label[0]}
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${lvl.color}`}>{lvl.label}</p>
                            <p className="text-xs text-white/40">{lvl.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Supervisor */}
                {step === 5 && (
                  <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-white/50 text-sm mb-5">Does this agent have a supervisor?</p>
                    <div className="flex gap-3 mb-5">
                      {['standalone', 'supervisor'].map(mode => (
                        <button key={mode} onClick={() => setForm({ ...form, supervisorMode: mode })}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                            form.supervisorMode === mode
                              ? 'text-white border-cyan-500/40 bg-cyan-500/10'
                              : 'text-white/40 hover:text-white/70'
                          }`}
                          style={{ border: form.supervisorMode === mode ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.07)' }}
                        >
                          {mode === 'standalone' ? 'Standalone' : 'Has Supervisor'}
                        </button>
                      ))}
                    </div>
                    {form.supervisorMode === 'supervisor' && (
                      <input
                        type="text"
                        value={form.supervisorId}
                        onChange={e => setForm({ ...form, supervisorId: e.target.value })}
                        placeholder="Supervisor Agent ID (e.g. agt-xxx)"
                        className="w-full h-11 px-4 rounded-xl text-sm font-mono text-white placeholder:text-white/20 focus:outline-none"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    )}
                  </motion.div>
                )}

                {/* Step 6: Confirm */}
                {step === 6 && (
                  <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-white/50 text-sm mb-5">Confirm your agent details</p>
                    <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {[
                        { label: 'Name', value: form.name },
                        { label: 'Type', value: form.type },
                        { label: 'Activity', value: form.activity },
                        { label: 'Supervisor', value: form.supervisorMode === 'supervisor' ? (form.supervisorId || 'TBD') : 'None (Standalone)' },
                      ].map(row => (
                        <div key={row.label} className="flex items-start gap-3">
                          <span className="text-[10px] font-mono text-white/25 uppercase tracking-wider w-20 shrink-0 pt-0.5">{row.label}</span>
                          <span className="text-sm text-white/65">{row.value}</span>
                        </div>
                      ))}
                      {form.description && (
                        <div className="flex items-start gap-3">
                          <span className="text-[10px] font-mono text-white/25 uppercase tracking-wider w-20 shrink-0 pt-0.5">Desc</span>
                          <span className="text-sm text-white/65 line-clamp-2">{form.description}</span>
                        </div>
                      )}
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs mt-3">{error}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 7: Success */}
                {step === 7 && result && (
                  <motion.div key="s7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <p className="text-amber-400 text-sm font-semibold">⚠️ Save your API key now — it won't be shown again</p>
                    </div>
                    <div className="space-y-4">
                      {result.agent_id && <CopyField label="Agent ID" value={result.agent_id} />}
                      {result.api_key && <CopyField label="API Key" value={result.api_key} />}
                      {result.signing_key && <CopyField label="Signing Key" value={result.signing_key} />}
                    </div>
                    {result.agent_id && (
                      <a
                        href={`/intelligence/${encodeURIComponent(result.agent_id)}`}
                        className="mt-5 w-full py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                        style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
                      >
                        View My Agent <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {step <= 6 && (
              <div className="px-6 pb-5 flex items-center justify-between gap-3">
                <button
                  onClick={() => step === 1 ? handleClose() : setStep(s => s - 1)}
                  className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {step === 1 ? 'Cancel' : 'Back'}
                </button>
                {step < 6 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canNext()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black disabled:opacity-30 hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black disabled:opacity-50 hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
                  >
                    {loading ? 'Registering...' : 'Register Agent'}
                  </button>
                )}
              </div>
            )}

            {step === 7 && (
              <div className="px-6 pb-5 flex justify-end">
                <button onClick={handleClose} className="text-sm text-white/30 hover:text-white/60 transition-colors">Close</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}