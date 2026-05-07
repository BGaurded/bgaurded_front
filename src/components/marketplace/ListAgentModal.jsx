import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ListAgentModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', description: '', category: '', url: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Agent/MCP Server Listing Submission');
    const body = encodeURIComponent(
      `Name: ${form.name}\nDescription: ${form.description}\nCategory: ${form.category}\nURL: ${form.url}\nContact Email: ${form.email}`
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
                <h2 className="font-syne font-bold text-white text-xl">List Your Agent</h2>
                <p className="text-xs text-white/35 mt-1">Submit for BGaurded review and certification</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Agent / MCP Server Name', key: 'name', placeholder: 'e.g. Alpha CFO Agent', required: true },
                { label: 'Short Description', key: 'description', placeholder: 'What does your agent do?', required: true },
                { label: 'GitHub or API Endpoint URL', key: 'url', placeholder: 'https://github.com/...', required: true },
                { label: 'Contact Email', key: 'email', placeholder: 'you@company.com', required: true, type: 'email' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">{field.label} {field.required && '*'}</label>
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
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Category *</label>
                <select
                  required
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <option value="" disabled>Select category</option>
                  <option value="AI Agent">AI Agent</option>
                  <option value="MCP Server">MCP Server</option>
                  <option value="Automation">Automation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                <Send className="w-4 h-4" />
                Submit for Review
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}