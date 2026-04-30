import { Shield } from 'lucide-react';

function getScoreMeta(score) {
  if (score >= 800) return {
    label: 'Excellent',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10 border-emerald-500/20',
    hex: '#10b981',
  };
  if (score >= 740) return {
    label: 'Very Good',
    color: 'text-blue-400',
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10 border-blue-500/20',
    hex: '#3b82f6',
  };
  if (score >= 670) return {
    label: 'Good',
    color: 'text-amber-400',
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-500/10 border-amber-500/20',
    hex: '#f59e0b',
  };
  if (score >= 580) return {
    label: 'Fair',
    color: 'text-amber-400',
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-500/10 border-amber-500/20',
    hex: '#f59e0b',
  };
  return {
    label: 'Poor',
    color: 'text-red-400',
    bg: 'bg-red-500',
    bgLight: 'bg-red-500/10 border-red-500/20',
    hex: '#ef4444',
  };
}

export default function TrustScoreBadge({ score, size = 'sm' }) {
  const meta = getScoreMeta(score);

  if (size === 'lg') {
    return (
      <div className="flex items-center gap-2">
        <Shield className={`w-5 h-5 ${meta.color}`} />
        <span className={`text-lg font-syne font-bold ${meta.color}`}>{score}</span>
        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${meta.bgLight} ${meta.color}`}>
          {meta.label}
        </span>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${meta.bgLight} ${meta.color}`}>
      <Shield className="w-3 h-3" />
      {score} · {meta.label}
    </span>
  );
}

export { getScoreMeta };