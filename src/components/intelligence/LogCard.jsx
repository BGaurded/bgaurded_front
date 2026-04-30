import { Lock, CheckCircle } from 'lucide-react';

const statusConfig = {
  CLEAN: { border: 'border-l-emerald-500', dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  BLOCKED: { border: 'border-l-red-500', dot: 'bg-red-400', badge: 'text-red-400 bg-red-500/10 border-red-500/20' },
};

const categoryConfig = {
  DECISION: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  ACTION: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  SUMMARY: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  TOOL_CALL: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  MEMORY: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  THREAT_BLOCK: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function LogCard({ log }) {
  const localTime = new Date(log.timestamp).toLocaleString();
  const status = log.status || 'CLEAN';
  const cfg = statusConfig[status] || statusConfig.CLEAN;

  return (
    <div className={`rounded-xl glass border border-white/6 border-l-2 ${cfg.border} overflow-hidden`}>
      {/* Header */}
      <div className="px-4 py-2.5 flex items-center gap-3 border-b border-white/4">
        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        <span className="text-[10px] font-mono text-white/25 flex-1">{localTime}</span>
        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
          {status}
        </span>
      </div>

      <div className="p-4">
        {/* Task title */}
        {log.task_id && (
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h4 className="font-semibold text-white/80 text-sm">{log.task_title || log.task_id}</h4>
            <span className="text-[10px] font-mono text-white/20">
              {log.task_id} · {log.entries?.length || 1} logs · ${log.cost?.toFixed(2) || '0.01'}
            </span>
          </div>
        )}

        {/* Entries */}
        <div className="space-y-3">
          {(log.entries || [{ category: log.category, action: log.action, thought_process: log.thought_process }]).map((entry, i) => (
            <div key={i} className="flex gap-3">
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 h-fit ${categoryConfig[entry.category] || 'text-white/30 bg-white/5 border-white/8'}`}>
                {entry.category}
              </span>
              <div>
                <p className="text-sm text-white/70 font-medium leading-snug">{entry.action}</p>
                {entry.thought_process && (
                  <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{entry.thought_process}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-white/4 mt-4 pt-3 flex flex-wrap items-center gap-3">
          {log.impact_score && (
            <span className="text-xs font-mono text-white/30">Impact: <span className="text-white/50">{log.impact_score}/10</span></span>
          )}
          <span className="flex items-center gap-1 text-[10px] text-white/20">
            <Lock className="w-3 h-3" /> Privacy Protected
          </span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400/60">
            <CheckCircle className="w-3 h-3" /> On-chain Verified
          </span>
          {log.agent_id && (
            <span className="text-[9px] font-mono text-white/15 ml-auto">{log.agent_id}</span>
          )}
        </div>
      </div>
    </div>
  );
}