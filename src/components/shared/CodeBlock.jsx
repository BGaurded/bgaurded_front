import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language = 'python' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-[#0F172A] px-4 py-2 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="bg-[#1E293B] p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}