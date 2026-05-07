import { Shield, Network } from 'lucide-react';

export default function AgentTypeCards({ selected, onSelect }) {
  const cards = [
    {
      id: 'single',
      icon: Shield,
      title: 'Single Agent',
      description: 'Registering one agent for your workflow. BGaurded monitors it automatically and notifies you directly if anything goes wrong.',
      badge: 'Most Common',
      badgeStyle: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
      iconColor: 'text-cyan-400',
      iconBg: 'rgba(0,212,255,0.1)',
      iconBorder: 'rgba(0,212,255,0.2)',
    },
    {
      id: 'multi',
      icon: Network,
      title: 'Multi-Agent Team',
      description: 'Building a team of agents with a supervisor orchestrating sub-agents. Register your supervisor first to get a supervisor_agent_id then use it when registering sub-agents.',
      badge: 'Advanced',
      badgeStyle: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
      iconColor: 'text-violet-400',
      iconBg: 'rgba(124,58,237,0.1)',
      iconBorder: 'rgba(124,58,237,0.2)',
    },
  ];

  return (
    <div className="mb-10">
      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-center mb-4">Choose Your Setup</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map(card => {
          const Icon = card.icon;
          const isSelected = selected === card.id;
          return (
            <button
              key={card.id}
              onClick={() => onSelect(card.id)}
              className="text-left rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: isSelected ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? card.id === 'single' ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(124,58,237,0.3)'
                  : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: card.iconBg, border: `1px solid ${card.iconBorder}` }}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${card.badgeStyle}`}>
                  {card.badge}
                </span>
              </div>
              <h3 className="font-syne font-bold text-white text-base mb-1.5">{card.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{card.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}