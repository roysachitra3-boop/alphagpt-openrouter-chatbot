import React from 'react';
import { Sparkles, Code, PenTool, Brain, ArrowRight } from 'lucide-react';

interface ExploreViewProps {
  onSelectPrompt: (promptText: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectPrompt }) => {
  const categories = [
    {
      title: 'Creative & Writing',
      icon: PenTool,
      prompts: [
        'Write a compelling blog post about the future of artificial intelligence in everyday life.',
        'Create a futuristic sci-fi flash fiction story set on a cyberpunk space colony.',
        'Draft a persuasive cold email template for selling B2B SaaS AI software.',
      ],
    },
    {
      title: 'Coding & Architecture',
      icon: Code,
      prompts: [
        'Write a full-stack TypeScript React component for an interactive data dashboard with Tailwind CSS.',
        'Explain how to design a high-throughput event-driven microservices system.',
        'Optimize a Python algorithm to find prime numbers using Sieve of Eratosthenes.',
      ],
    },
    {
      title: 'Science & Reasoning',
      icon: Brain,
      prompts: [
        'Explain quantum computing, quantum entanglement, and qubits to a high school student.',
        'What are the core differences between nuclear fission and fusion energy production?',
        'Analyze the economic impact of global autonomous transportation networks.',
      ],
    },
    {
      title: 'Image Prompts & Design',
      icon: Sparkles,
      prompts: [
        'Generate a detailed prompt for Midjourney/DALL-E: Futuristic glassmorphic HUD user interface.',
        'Design a sleek dark mode color palette for a high-performance web application.',
        'Draft visual storyboard notes for an AI product announcement trailer.',
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" /> Explore Prompts & Capabilities
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Select any prompt template below to launch into your chat session immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-700/60 hover:border-cyan-500/50 transition-all space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-100">{cat.title}</h3>
              </div>

              <div className="space-y-2.5">
                {cat.prompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => onSelectPrompt(prompt)}
                    className="w-full text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                  >
                    <span className="line-clamp-2">{prompt}</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
