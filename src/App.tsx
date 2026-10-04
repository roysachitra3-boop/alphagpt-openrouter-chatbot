import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ChatWorkspace } from './components/ChatWorkspace';
import { ExploreView } from './components/ExploreView';
import { SavedView } from './components/SavedView';
import { SettingsView } from './components/SettingsView';
import { HelpView } from './components/HelpView';
import {
  ChatMessage,
  getStoredApiKey,
  setStoredApiKey,
  getStoredModel,
  setStoredModel,
  sendMessageToOpenRouter,
} from './services/openrouter';

const INITIAL_DEMO_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-demo-1',
    role: 'user',
    content: 'Tell me about the future of artificial intelligence.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'msg-demo-2',
    role: 'assistant',
    content:
      'The future of AI is incredibly promising. We can expect advancements in healthcare, autonomous systems, creative arts, and beyond. AI will become more integrated into our daily lives, enhancing productivity, and solving complex problems.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('chat');
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('openai/gpt-4o-mini');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_DEMO_MESSAGES);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setApiKey(getStoredApiKey());
    setSelectedModel(getStoredModel());
  }, []);

  const handleSaveApiKey = (key: string) => {
    setStoredApiKey(key);
    setApiKey(key);
  };

  const handleSelectModel = (modelId: string) => {
    setStoredModel(modelId);
    setSelectedModel(modelId);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveTab('chat');
  };

  const handleToggleSaveMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, saved: !m.saved } : m))
    );
  };

  const handleSendMessage = async (text: string, image?: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    const assistantMsgId = `msg-assistant-${Date.now()}`;

    try {
      if (!apiKey) {
        // Fallback friendly simulation if no API key is provided yet
        setTimeout(() => {
          const simulatedMsg: ChatMessage = {
            id: assistantMsgId,
            role: 'assistant',
            content: `I am **AlphaGPT**. To connect live to OpenRouter AI models (GPT-4o, Claude 3.5, DeepSeek R1, Llama 3.3), please enter your OpenRouter API Key in the top bar above!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, simulatedMsg]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Add empty assistant message shell for streaming
      const assistantShell: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantShell]);

      await sendMessageToOpenRouter(
        newMessages,
        apiKey,
        selectedModel,
        (chunkText) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: chunkText } : m
            )
          );
        }
      );
    } catch (error: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: `⚠️ Error communicating with OpenRouter: ${error?.message || 'Unknown error'}`,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    setActiveTab('chat');
    handleSendMessage(promptText);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070a0f] text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-radial-glow">
        <TopBar
          apiKey={apiKey}
          onSaveApiKey={handleSaveApiKey}
          selectedModel={selectedModel}
          onSelectModel={handleSelectModel}
          onNewChat={handleNewChat}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'chat' && (
            <ChatWorkspace
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              onSelectPrompt={handleSelectPrompt}
              onToggleSaveMessage={handleToggleSaveMessage}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreView onSelectPrompt={handleSelectPrompt} />
          )}

          {activeTab === 'saved' && (
            <SavedView
              savedMessages={messages.filter((m) => m.saved)}
              onToggleSaveMessage={handleToggleSaveMessage}
              onSendPrompt={handleSelectPrompt}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              apiKey={apiKey}
              onSaveApiKey={handleSaveApiKey}
              selectedModel={selectedModel}
              onSelectModel={handleSelectModel}
            />
          )}

          {activeTab === 'help' && <HelpView />}
        </main>
      </div>
    </div>
  );
}
