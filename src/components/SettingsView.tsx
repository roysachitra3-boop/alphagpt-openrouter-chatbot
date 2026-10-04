import React, { useState } from 'react';
import { Settings, Key, Cpu, ShieldCheck, Check, Trash2 } from 'lucide-react';
import { DEFAULT_MODELS, removeStoredApiKey } from '../services/openrouter';

interface SettingsViewProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  apiKey,
  onSaveApiKey,
  selectedModel,
  onSelectModel,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(inputKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearKey = () => {
    removeStoredApiKey();
    onSaveApiKey('');
    setInputKey('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" /> Settings & Configuration
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage your OpenRouter API keys, model preferences, and browser local storage.
        </p>
      </div>

      {/* OpenRouter API Key Configuration Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">OpenRouter API Key</h3>
            <p className="text-xs text-slate-400">
              Your API key is kept locally in your browser's <code className="text-cyan-300">localStorage</code>. It is never sent to any intermediate backend server.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveKey} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Enter or update OpenRouter key:</label>
            <input
              type="password"
              placeholder="sk-or-v1-xxxxxxxxxxxxxxxx"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              Get a free or paid key from OpenRouter.ai &rarr;
            </a>

            <div className="flex space-x-3">
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-medium rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Key</span>
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center space-x-1.5"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5 text-white" /> : null}
                <span>{savedSuccess ? 'Saved!' : 'Save Key'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Default Model Selector Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">AI Model Selection</h3>
            <p className="text-xs text-slate-400">
              Select your default AI engine powered by OpenRouter.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {DEFAULT_MODELS.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'glass-panel-glow border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-100">{model.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                    {model.provider}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{model.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy & Safety Note */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
        <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="text-slate-200 font-medium">100% Client-Side Privacy:</span> AlphaGPT communicates directly from your browser to OpenRouter endpoints. Your API key and private conversation logs never pass through third-party servers.
        </div>
      </div>
    </div>
  );
};
