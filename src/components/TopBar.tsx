import React, { useState } from 'react';
import { Plus, Key, Check, AlertCircle, Columns, Pause, MoreHorizontal } from 'lucide-react';
import { DEFAULT_MODELS } from '../services/openrouter';

interface TopBarProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onNewChat: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  apiKey,
  onSaveApiKey,
  selectedModel,
  onSelectModel,
  onNewChat,
}) => {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [isCopied, setIsCopied] = useState(false);

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(tempKey);
    setShowKeyInput(false);
  };

  const currentModelName = DEFAULT_MODELS.find((m) => m.id === selectedModel)?.name || 'GPT-4o Mini';

  return (
    <header className="h-16 border-b border-slate-800/60 px-6 flex items-center justify-between bg-[#0b0f17]/80 backdrop-blur-md z-20">
      {/* Left section: Model Selector & OpenRouter Key Status Bar */}
      <div className="flex items-center space-x-3">
        {/* Model Selector dropdown button */}
        <div className="relative group">
          <select
            value={selectedModel}
            onChange={(e) => onSelectModel(e.target.value)}
            className="appearance-none bg-slate-900/80 border border-slate-700/60 text-slate-200 text-xs font-medium rounded-xl px-3.5 py-2 pr-8 hover:border-cyan-500/50 focus:outline-none focus:border-cyan-400 cursor-pointer transition-all shadow-inner"
          >
            {DEFAULT_MODELS.map((m) => (
              <option key={m.id} value={m.id} className="bg-slate-900 text-slate-200">
                {m.name} ({m.provider})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* OpenRouter API Key Input Bar Toggle / Indicator */}
        <div className="relative">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
              apiKey
                ? 'bg-slate-900/60 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/40 animate-pulse'
            }`}
            title="Configure OpenRouter API Key"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {apiKey ? `Key: ...${apiKey.slice(-4)}` : 'Enter OpenRouter API Key'}
            </span>
            {apiKey ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* Quick Popover Key Input Box */}
          {showKeyInput && (
            <div className="absolute top-12 left-0 w-80 glass-panel-glow p-4 rounded-2xl z-50 shadow-2xl border border-cyan-500/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" /> OpenRouter API Key
                </span>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Get key &rarr;
                </a>
              </div>
              <form onSubmit={handleKeySubmit} className="space-y-3">
                <input
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowKeyInput(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                  >
                    Save Key
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Right section: Top Action Controls matching design (New Chat, =, ||, ...) */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onNewChat}
          className="glass-button px-4 py-2 rounded-xl text-xs font-medium text-slate-200 flex items-center space-x-1.5 hover:text-white hover:border-cyan-500/60 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Chat</span>
        </button>

        {/* Layout action buttons from UI design (=, ||, ...) */}
        <div className="flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors" title="Toggle Layout">
            <Columns className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors" title="Pause / Stream Settings">
            <Pause className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors" title="More options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
