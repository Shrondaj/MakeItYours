
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            AI Humanizer Pro
          </h1>
        </div>
      </div>
    </header>
  );
};
