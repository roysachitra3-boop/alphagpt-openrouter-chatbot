import React from 'react';
import { ChatMessage } from '../services/openrouter';
import { Bookmark, Copy, Check } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  onToggleSave?: (id: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onToggleSave }) => {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[82%] px-5 py-4 rounded-2xl text-sm leading-relaxed transition-all shadow-xl group ${
          isUser
            ? 'glass-panel text-slate-100 rounded-br-sm border-slate-700/60 hover:border-slate-600'
            : 'glass-panel-glow text-slate-100 rounded-bl-sm border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
        }`}
      >
        {/* Assistant Glowing Circle Indicator (matching reference image) */}
        {!isUser && (
          <div className="absolute -top-2 -left-2 flex items-center justify-center">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500 border-2 border-[#0b0f17] items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              </span>
            </span>
          </div>
        )}

        {/* User image attachment if present */}
        {message.image && (
          <div className="mb-3 overflow-hidden rounded-xl border border-slate-700/60">
            <img src={message.image} alt="User attachment" className="max-h-60 object-cover w-full" />
          </div>
        )}

        {/* Message Content */}
        <div className="whitespace-pre-wrap break-words">{message.content}</div>

        {/* Action icons on hover */}
        <div
          className={`absolute top-2.5 ${
            isUser ? '-left-12' : '-right-14'
          } opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 backdrop-blur-md`}
        >
          <button
            onClick={handleCopy}
            className="p-1 text-slate-400 hover:text-cyan-400 rounded transition-colors"
            title="Copy message"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(message.id)}
              className={`p-1 rounded transition-colors ${
                message.saved ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'
              }`}
              title={message.saved ? 'Unsave message' : 'Save message'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
