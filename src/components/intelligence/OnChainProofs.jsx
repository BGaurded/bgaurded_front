import { ExternalLink, CheckCircle, Link2 } from 'lucide-react';

function truncateHash(hash) {
  if (!hash || hash.length < 16) return hash;
  return hash.slice(0, 8) + '...' + hash.slice(-8);
}

export default function OnChainProofs({ hashes }) {
  return (
    <div className="rounded-2xl glass border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-3.5 h-3.5 text-emerald-400" />
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">On-Chain Proofs · Solana</p>
      </div>

      {!hashes || hashes.length === 0 ? (
        <p className="text-xs text-white/25">Logs settle to Solana every 30 minutes</p>
      ) : (
        <div className="space-y-2">
          {hashes.map((hash, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-white/4 last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-white/35">{truncateHash(hash)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-2.5 h-2.5" /> Verified
                </span>
                <a
                  href={`https://solscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Solscan
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}