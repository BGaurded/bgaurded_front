import { Link } from 'react-router-dom';
import { Shield, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const integrations = [
  { name: 'QuickBooks', desc: 'Invoices, payments, accounts', icon: 'Q', color: 'bg-green-600', glow: 'rgba(22,163,74,0.15)' },
  { name: 'Salesforce', desc: 'CRM, deals, client records', icon: 'S', color: 'bg-blue-500', glow: 'rgba(59,130,246,0.15)' },
  { name: 'Google Workspace', desc: 'Gmail, Drive, Sheets', icon: 'G', color: 'bg-red-500', glow: 'rgba(239,68,68,0.15)' },
  { name: 'Shopify', desc: 'Orders, inventory', icon: 'Sh', color: 'bg-lime-600', glow: 'rgba(101,163,13,0.08)' },
  { name: 'Slack', desc: 'Communications', icon: 'Sl', color: 'bg-purple-600', glow: 'rgba(147,51,234,0.08)' },
  { name: 'HubSpot', desc: 'Marketing pipeline', icon: 'H', color: 'bg-orange-500', glow: 'rgba(249,115,22,0.08)' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function Connect() {
  return (
    <div className="bg-[#070b12] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-cyan-500/4 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-violet-600/4 blur-[100px] rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">Data Integrations</p>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-4">Connect Your Business Data</h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
            Connect your data sources to your BGaurded certified agent. Every data interaction will be permanently recorded and threat scanned.
          </p>
        </motion.div>

        {/* Purchase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/6 to-cyan-500/4 p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/70 leading-relaxed">
              Data connections are configured after purchasing an agent. Buy an agent from our marketplace to get started.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-black shrink-0 hover:opacity-90 transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
          >
            Browse Agents <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Privacy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-cyan-500/15 bg-gradient-to-r from-cyan-500/5 to-transparent p-5 mb-10 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm mb-1">BGaurded Data Lifecycle v1.0</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Raw data is fetched on demand, passed to your agent, and immediately discarded after the task is notarized. Your data stays in your systems.
            </p>
          </div>
        </motion.div>

        {/* Integration Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((intg, i) => (
            <motion.div
              key={intg.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div
                className="rounded-2xl glass border border-white/8 transition-all duration-300 p-5 h-full flex flex-col"
                style={{ boxShadow: `0 0 30px ${intg.glow}` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl ${intg.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {intg.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{intg.name}</h3>
                    <p className="text-xs text-white/30">{intg.desc}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="w-full py-2.5 rounded-xl text-xs text-center font-semibold text-white/25 border border-white/6 cursor-default select-none">
                    Available after purchase
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}