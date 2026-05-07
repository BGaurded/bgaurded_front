import { useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

export default function ExportModal({ isOpen, onClose, agentId }) {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [fromDate, setFromDate] = useState(toDateString(thirtyDaysAgo));
  const [toDate, setToDate] = useState(toDateString(today));
  const [includeFullLog, setIncludeFullLog] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      from_date: fromDate,
      to_date: toDate,
      include_full_log: includeFullLog,
    });
    if (revealed) params.set('reveal', 'true');

    const headers = {};
    if (revealed && secretKey) headers['X-Bgaurded-Secret'] = secretKey;

    const url = `https://www.bgaurded.com/agents/${agentId}/compliance-export?${params.toString()}`;

    const res = await fetch(url, { headers });
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `bgaurded-compliance-${agentId}-${fromDate}-${toDate}.json`;
    a.click();
    URL.revokeObjectURL(a.href);

    setLoading(false);
    onClose();
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    colorScheme: 'dark',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl p-6 z-10"
            style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Compliance</p>
                <h2 className="font-syne font-bold text-white text-lg">Export Compliance Report</h2>
              </div>
              <button onClick={onClose} className="text-white/25 hover:text-white/60 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[10px] font-mono text-white/35 uppercase tracking-widest mb-1.5">From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/35 uppercase tracking-widest mb-1.5">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeFullLog}
                  onChange={e => setIncludeFullLog(e.target.checked)}
                  className="w-4 h-4 rounded accent-cyan-400"
                />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Include full activity log</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={revealed}
                  onChange={e => setRevealed(e.target.checked)}
                  className="w-4 h-4 rounded accent-cyan-400"
                />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  Revealed export <span className="text-white/30 text-xs">(authorized use only)</span>
                </span>
              </label>
            </div>

            {/* Secret key input — shown only if revealed */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mb-5"
                >
                  <label className="block text-[10px] font-mono text-white/35 uppercase tracking-widest mb-1.5">BGaurded Secret Key</label>
                  <input
                    type="password"
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                    placeholder="Enter your secret key..."
                    className="w-full px-3 py-2 rounded-xl text-sm placeholder:text-white/20 focus:outline-none"
                    style={inputStyle}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Download button */}
            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #00b8a9)' , color: '#05080f' }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Downloading...</>
              ) : (
                <><Download className="w-4 h-4" /> Download JSON</>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-center text-[11px] text-white/20 mt-4 leading-relaxed">
              For compliance preparation only. Not official EU AI Act certification.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}