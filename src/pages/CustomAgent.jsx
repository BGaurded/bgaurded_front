import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Shield, BadgeCheck, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  { icon: Shield, label: 'BGaurded Certified', desc: 'Every action notarized on Arweave from day one.' },
  { icon: Zap, label: 'Fully Configured', desc: 'Our team handles everything — setup, integration, testing.' },
  { icon: BadgeCheck, label: 'Dedicated Support', desc: 'Direct line to the BGaurded team throughout your build.' },
  { icon: Lock, label: 'Private by Default', desc: 'Your agent, your data. Never listed publicly without consent.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

export default function CustomAgent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', company: '', useCase: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Custom AI Agent Quote Request');
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company || 'N/A'}\nUse Case: ${form.useCase}\nContact Email: ${form.email}`
    );
    window.location.href = `mailto:andrewchaplin@bgaurded.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#070b12] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-violet-600/6 to-cyan-500/4 blur-[120px] rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </motion.button>

        {/* Hero */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-4">Custom Build</p>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
            Need a Custom AI Agent Built<br className="hidden md:block" /> for Your Exact Workflow?
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Fully configured by our team. BGaurded Certified from day one. Tell us what you need and we'll handle the rest.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,212,255,0.1))', border: '1px solid rgba(124,58,237,0.2)' }}>
                <f.icon className="w-4 h-4 text-violet-400" />
              </div>
              <p className="font-semibold text-white text-sm mb-1">{f.label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="max-w-xl mx-auto rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <BadgeCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-syne font-bold text-white text-xl mb-2">Request Sent!</h3>
                <p className="text-white/40 text-sm">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="font-syne font-bold text-white text-xl mb-1">Get a Quote</h2>
                <p className="text-xs text-white/35 mb-6">We'll get back to you within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: 'Name', key: 'name', placeholder: 'Your name', required: true },
                    { label: 'Company', key: 'company', placeholder: 'Your company (optional)', required: false },
                    { label: 'Contact Email', key: 'email', placeholder: 'you@company.com', required: true, type: 'email' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                        {field.label}{field.required && ' *'}
                      </label>
                      <input
                        required={field.required}
                        type={field.type || 'text'}
                        value={form[field.key]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Use Case Description *</label>
                    <textarea
                      required
                      value={form.useCase}
                      onChange={e => setForm({ ...form, useCase: e.target.value })}
                      placeholder="Describe what you need your agent to do..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors resize-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}