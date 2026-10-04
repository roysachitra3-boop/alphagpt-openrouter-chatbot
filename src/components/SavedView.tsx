import React from 'react';
import { ChatMessage } from '../services/openrouter';
import { Bookmark, Trash2, ArrowUpRight } from 'lucide-react';

interface SavedViewProps {
  savedMessages: ChatMessage[];
  onToggleSaveMessage: (id: string) => void;
  onSendPrompt: (text: string) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedMessages,
  onToggleSaveMessage,
  onSendPrompt,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-cyan-400 fill-current" /> Saved Messages & Prompts
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Access your bookmarked AI answers, ideas, and saved key responses.
        </p>
      </div>

      {savedMessages.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No saved items yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hover over any AI or user message in the chat and click the bookmark icon to save it here for future reference.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedMessages.map((msg) => (
            <div
              key={msg.id}
              className="glass-panel p-5 rounded-2xl border border-slate-700/60 hover:border-cyan-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  msg.role === 'user' ? 'bg-slate-800 text-slate-300' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {msg.role === 'user' ? 'User Prompt' : 'AlphaGPT Answer'}
                </span>
                <span className="text-[11px] text-slate-500">{msg.timestamp}</span>
              </div>

              <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </p>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onSendPrompt(msg.content)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 flex items-center space-x-1 transition-colors"
                >
                  <span>Ask again</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onToggleSaveMessage(msg.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-950/40 text-xs text-red-400 hover:text-red-300 flex items-center space-x-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
