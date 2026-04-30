import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, ArrowUpRight } from 'lucide-react';
import TrustScoreBadge from '@/components/shared/TrustScoreBadge';
import QuoteModal from '@/components/shared/QuoteModal';

export default function AgentCard({ agent }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (agent.isCustom) {
    return (
      <>
        <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
        <Link to={`/marketplace/${agent.id}`} className="block group">
          <div className="relative rounded-2xl glass border border-violet-500/15 p-6 hover:border-violet-500/30 hover:bg-white/4 transition-all duration-300 h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-start gap-4 mb-5">
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
                <span>✦</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-syne font-bold text-white text-lg leading-tight">{agent.name}</h3>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
                </div>
                <p className="text-sm text-white/35 mt-1 line-clamp-2 leading-relaxed">{agent.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <TrustScoreBadge score={agent.trustScore} />
              <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                <BadgeCheck className="w-3 h-3" /> BGaurded Certified
              </div>
            </div>
            <div className="h-px bg-white/5 mb-5" />
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => { e.preventDefault(); setQuoteOpen(true); }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
              >
                Get a Quote
              </button>
              <div className="text-xs font-medium text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View Details <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  }

  return (
    <Link to={`/marketplace/${agent.id}`} className="block group">
      <div className="relative rounded-2xl glass border border-white/8 p-6 hover:border-white/15 hover:bg-white/4 transition-all duration-300 h-full overflow-hidden">
        {/* Gradient top-right glow on hover */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header row */}
        <div className="flex items-start gap-4 mb-5">
          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
            <span>{agent.initial}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-syne font-bold text-white text-lg leading-tight">{agent.name}</h3>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
            </div>
            <p className="text-sm text-white/35 mt-1 line-clamp-2 leading-relaxed">{agent.tagline}</p>
          </div>
        </div>

        {/* Trust + cert row */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <TrustScoreBadge score={agent.trustScore} />
          <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
            <BadgeCheck className="w-3 h-3" /> BGaurded Certified
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-5" />

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-syne font-bold text-2xl text-white">${agent.price}</span>
            <span className="text-xs text-white/25">/month</span>
          </div>
          {agent.stripeUrl && (
            <a
              href={agent.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black hover:opacity-90 transition-all hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}