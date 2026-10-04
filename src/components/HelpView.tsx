import React from 'react';
import { HelpCircle, Key, MessageSquare, Mic, Sparkles, Image as ImageIcon } from 'lucide-react';

export const HelpView: React.FC = () => {
  const faqs = [
    {
      q: 'How do I get an OpenRouter API key for AlphaGPT?',
      a: 'Visit openrouter.ai, create a free account, generate an API Key in your key management settings, and paste it into the top bar key input box on AlphaGPT.',
      icon: Key,
    },
    {
      q: 'Can AlphaGPT answer all types of questions like ChatGPT?',
      a: 'Yes! By using OpenRouter, AlphaGPT connects directly to OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, DeepSeek R1, Llama 3.3, and other leading AI models.',
      icon: MessageSquare,
    },
    {
      q: 'How does Voice Speech Input work?',
      a: 'Click the microphone icon in the chat input bar to speak. AlphaGPT transcribes your voice directly into the chat prompt.',
      icon: Mic,
    },
    {
      q: 'Can I upload images to AlphaGPT?',
      a: 'Yes! Click the image icon in the input bar to attach any image file from your computer or phone.',
      icon: ImageIcon,
    },
    {
      q: 'Is my API key kept secure?',
      a: 'AlphaGPT saves your API key only in your local browser storage (localStorage). Requests are sent straight to OpenRouter.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-400" /> Help & User Guide
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Learn how to use AlphaGPT and integrate your OpenRouter API key.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const Icon = faq.icon;
          return (
            <div
              key={index}
              className="glass-panel p-5 rounded-2xl border border-slate-700/60 hover:border-cyan-500/40 transition-all space-y-2"
            >
              <h3 className="font-semibold text-slate-100 flex items-center gap-2.5 text-sm">
                <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
