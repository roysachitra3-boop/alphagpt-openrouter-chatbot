import React, { useState, useRef, useEffect } from 'react';
import { Mic, Image as ImageIcon, Send, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string, image?: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Web Speech API for voice recognition
  const toggleVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!text.trim() && !image) || isLoading) return;
    onSendMessage(text, image);
    setText('');
    setImage(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full relative px-6 pb-6 pt-2">
      {/* Image Preview attachment badge */}
      {image && (
        <div className="mb-2 inline-flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/40 p-1.5 px-3 rounded-xl backdrop-blur-md">
          <img src={image} alt="Attachment" className="w-8 h-8 rounded object-cover" />
          <span className="text-xs text-slate-300">Image attached</span>
          <button
            type="button"
            onClick={() => setImage(undefined)}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Glass Input Bar matching reference image design */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-2 rounded-2xl flex items-center border border-slate-700/60 focus-within:border-cyan-500/60 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all bg-[#121826]/90"
      >
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none resize-none overflow-hidden max-h-32"
        />

        {/* Action controls inside input bar */}
        <div className="flex items-center space-x-2 pr-1">
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceRecognition}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-cyan-500 text-white shadow-[0_0_12px_#06b6d4] animate-pulse'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Voice Speech Input"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Image Attachment Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all"
            title="Attach Image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Submit Send Button with Cyan Accent matching UI reference */}
          <button
            type="submit"
            disabled={(!text.trim() && !image) || isLoading}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              text.trim() || image
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:from-cyan-400 hover:to-blue-400 cursor-pointer border border-cyan-400/40'
                : 'bg-slate-800/80 text-slate-500 border border-slate-700/40 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5 transform -rotate-45" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
