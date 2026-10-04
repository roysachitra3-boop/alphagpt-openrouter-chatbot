import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../services/openrouter';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface ChatWorkspaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, image?: string) => void;
  isLoading: boolean;
  onSelectPrompt: (promptText: string) => void;
  onToggleSaveMessage?: (id: string) => void;
}

export const ChatWorkspace: React.FC<ChatWorkspaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onSelectPrompt,
  onToggleSaveMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'Generate an Image',
    'Explain Quantum Computing',
    'Write a Blog Post',
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full overflow-hidden relative">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Welcome Section Header (Matching Reference Design) */}
        <div className="text-center my-6 space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Welcome to AlphaGPT!
          </h1>
          <p className="text-sm text-slate-400 font-light">
            How can I assist you today?
          </p>

          {/* Quick Prompt Suggestion Chips (Matching Reference Design) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 max-w-xl mx-auto">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onSelectPrompt(prompt)}
                className="glass-button px-5 py-2.5 rounded-2xl text-xs font-medium text-slate-200 border border-slate-700/60 hover:border-cyan-500/50 hover:text-white shadow-md transition-all duration-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message Bubble List */}
        <div className="max-w-4xl mx-auto space-y-2">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onToggleSave={onToggleSaveMessage}
            />
          ))}

          {/* Loading indicator streaming message */}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start my-3">
              <div className="glass-panel-glow px-5 py-4 rounded-2xl rounded-bl-sm text-sm text-slate-300 border-cyan-500/40 flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs text-slate-400 font-light">AlphaGPT is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input controls fixed at bottom */}
      <div className="max-w-4xl mx-auto w-full">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
