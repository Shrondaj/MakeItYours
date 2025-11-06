import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  onHumanize: () => void;
  isLoading: boolean;
  onPaste: () => void;
  onClear: () => void;
  temperature: number;
  setTemperature: (value: number) => void;
  topP: number;
  setTopP: (value: number) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  inputText, 
  setInputText, 
  onHumanize, 
  isLoading, 
  onPaste, 
  onClear,
  temperature,
  setTemperature,
  topP,
  setTopP
}) => {
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-col p-1 shadow-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-200">Your Text</h2>
        <p className="text-sm text-slate-400">Paste your AI-generated content here.</p>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Start by pasting or typing your text..."
          className="w-full h-full min-h-[300px] lg:min-h-0 bg-slate-800 text-slate-200 p-4 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-200"
          disabled={isLoading}
        />
      </div>
      <div className="px-5 pt-4 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label htmlFor="temperature" className="flex justify-between text-sm font-medium text-slate-300 mb-1">
              <span>Creativity (Temperature)</span>
              <span className="font-mono text-slate-400">{temperature.toFixed(2)}</span>
            </label>
            <input
              id="temperature"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              disabled={isLoading}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Set creativity level"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>
          <div>
            <label htmlFor="topP" className="flex justify-between text-sm font-medium text-slate-300 mb-1">
              <span>Consistency (Top-P)</span>
              <span className="font-mono text-slate-400">{topP.toFixed(2)}</span>
            </label>
            <input
              id="topP"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
              disabled={isLoading}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Set consistency level"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Focused</span>
              <span>Diverse</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
         <div className="flex items-center gap-4">
          <button onClick={onPaste} className="text-sm text-slate-400 hover:text-blue-400 transition-colors" disabled={isLoading}>Paste</button>
          <button onClick={onClear} className="text-sm text-slate-400 hover:text-red-400 transition-colors" disabled={isLoading || !inputText}>Clear</button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{wordCount} words</span>
          <button
            onClick={onHumanize}
            disabled={isLoading || !inputText.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed transform active:scale-95 shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Humanizing...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Humanize
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};