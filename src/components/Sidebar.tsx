import React from 'react';
import { MessageSquare, Compass, Bookmark, Settings, HelpCircle } from 'lucide-react';

export type NavTab = 'chat' | 'explore' | 'saved' | 'settings' | 'help';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'chat' as NavTab, label: 'Chat', icon: MessageSquare },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
    { id: 'saved' as NavTab, label: 'Saved', icon: Bookmark },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
    { id: 'help' as NavTab, label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 flex flex-col justify-between p-5 border-r border-slate-800/60 bg-[#0c1017]/90 backdrop-blur-xl h-full select-none z-10">
      {/* Brand Logo */}
      <div className="space-y-8">
        <div className="flex items-center space-x-3 px-2 pt-1">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.5)]">
            {/* Custom stylized A / Delta icon matching reference design */}
            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 3L2 20h20L12 3zm0 4.8L17.6 17H6.4L12 7.8z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            Alpha<span className="text-cyan-400">GPT</span>
          </span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'glass-panel-glow text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] border-cyan-500/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Card */}
      <div className="pt-4 border-t border-slate-800/60">
        <div className="glass-panel p-3 rounded-2xl flex items-center space-x-3 border border-slate-700/40 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-cyan-500/40 flex items-center justify-center">
              {/* Profile Avatar */}
              <svg className="w-10 h-10 text-slate-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0c1017]"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-100 leading-tight">Alex</span>
            <span className="text-xs text-slate-400 leading-tight font-light">Pro Member</span>
          </div>
          {/* Cyan Glow Accent Line at bottom of profile card */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
        </div>
      </div>
    </aside>
  );
};
