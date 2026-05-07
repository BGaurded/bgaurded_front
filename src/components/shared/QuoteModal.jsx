import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Custom Agent Quote Request');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || 'N/A'}\n\nWhat they need:\n${form.message}`
    );
    window.location.href = `mailto:andrewchaplin@bgaurded.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl p-6 z-10"
            style={{ background: '#0d1520', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-syne font-bold text-white text-xl">Get a Custom Quote</h2>
                <p className="text-xs text-white/35 mt-1">We'll get back to you within 24 hours</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Company <span className="text-white/20 normal-case font-sans tracking-normal">(optional)</span></label>
                <input
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  placeholder="Your company"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Tell us what you need *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe what you need your agent to do..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 transition-colors resize-none"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}