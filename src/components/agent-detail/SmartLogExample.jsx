import { Lock, CheckCircle } from 'lucide-react';

const categoryConfig = {
  DECISION: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  ACTION: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  SUMMARY: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  TOOL_CALL: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function SmartLogExample() {
  return (
    <div className="rounded-xl glass border border-white/6 overflow-hidden border-l-2 border-l-emerald-500">
      <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-mono text-white/25 flex-1">Apr 27, 2026 · 12:30 AM</span>
        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
          CLEAN
        </span>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h4 className="text-sm font-semibold text-white/80">Reconcile Q4 Invoices — Entity_01</h4>
          <span className="text-[10px] font-mono text-white/20">task_001 · 3 logs · $0.03</span>
        </div>

        <div className="space-y-3">
          <LogEntry category="DECISION" action="Decided to send payment reminder" thought="Invoice #4471 is 30 days overdue. Entity_01 has good payment history. Standard protocol: send reminder at 30 days." />
          <LogEntry category="ACTION" action="Sent payment reminder to Entity_01" thought="Standard 30-day protocol applied. Reminder delivered successfully." />
          <LogEntry category="SUMMARY" action="Invoice #4471 reminder complete" thought="Expecting resolution within 7 days." />
        </div>

        <div className="border-t border-white/4 mt-4 pt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-white/30">Impact: <span className="text-white/50">7/10</span></span>
          <span className="flex items-center gap-1 text-[10px] text-white/20"><Lock className="w-3 h-3" /> Privacy Protected</span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400/60"><CheckCircle className="w-3 h-3" /> On-chain Verified</span>
        </div>
      </div>
    </div>
  );
}

function LogEntry({ category, action, thought }) {
  return (
    <div className="flex gap-3">
      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 h-fit ${categoryConfig[category] || 'text-white/30 bg-white/5 border-white/8'}`}>
        {category}
      </span>
      <div>
        <p className="text-sm text-white/70 font-medium leading-snug">{action}</p>
        <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{thought}</p>
      </div>
    </div>
  );
}