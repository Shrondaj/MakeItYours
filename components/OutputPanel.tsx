import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface OutputPanelProps {
  outputText: string;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ outputText, isLoading, error, onRetry }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const wordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-semibold">Crafting the perfect text...</p>
          <p className="text-sm">This may take a moment.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
          <h3 className="font-bold mb-2">An Error Occurred</h3>
          <p className="text-center text-sm mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg"
          >
            Retry
          </button>
        </div>
      );
    }
    if (!outputText) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 p-4">
          <p>Your humanized text will appear here.</p>
        </div>
      );
    }
    return (
        <textarea
            value={outputText}
            readOnly
            className="w-full h-full bg-transparent text-slate-200 p-4 resize-none focus:outline-none"
        />
    );
  };
  
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-col p-1 shadow-lg">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-200">Humanized Output</h2>
          <p className="text-sm text-slate-400">Your refined, natural-sounding text.</p>
        </div>
        {outputText && !isLoading && !error && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <ClipboardIcon className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      <div className="flex-grow bg-slate-800 rounded-md overflow-y-auto min-h-[300px] lg:min-h-0">
        {renderContent()}
      </div>
      <div className="p-4 border-t border-slate-700/50">
        <span className="text-sm text-slate-400">{wordCount > 0 ? `${wordCount} words` : ''}</span>
      </div>
    </div>
  );
};