import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomQuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', company: '', useCase: '', budget: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Custom AI Agent Quote Request');
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nUse Case: ${form.useCase}\nBudget: ${form.budget}\nContact Email: ${form.email}`
    );
    window.location.href = `mailto:andrewchaplin@bgaurded.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl p-6 z-10"
            style={{ background: '#0d1520', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-syne font-bold text-white text-xl">Get a Custom Quote</h2>
                <p className="text-xs text-white/35 mt-1">We'll get back to you within 24 hours</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Name', key: 'name', placeholder: 'Your name', required: true },
                { label: 'Company', key: 'company', placeholder: 'Your company', required: false },
                { label: 'Contact Email', key: 'email', placeholder: 'you@company.com', required: true, type: 'email' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                    {field.label} {field.required && '*'}
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
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Budget Range *</label>
                <select
                  required
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <option value="" disabled>Select budget range</option>
                  <option value="Under $1k">Under $1k</option>
                  <option value="$1k-$5k">$1k–$5k</option>
                  <option value="$5k-$25k">$5k–$25k</option>
                  <option value="$25k+">$25k+</option>
                </select>
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