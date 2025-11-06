import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Footer } from './components/Footer';
import { humanizeText } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number>(0.8);
  const [topP, setTopP] = useState<number>(0.9);

  const handleHumanize = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to humanize.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputText('');

    try {
      const result = await humanizeText(inputText, temperature, topP);
      setOutputText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, temperature, topP]);
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      setError('Failed to paste from clipboard. Please paste manually.');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <InputPanel
            inputText={inputText}
            setInputText={setInputText}
            onHumanize={handleHumanize}
            isLoading={isLoading}
            onPaste={handlePaste}
            onClear={handleClear}
            temperature={temperature}
            setTemperature={setTemperature}
            topP={topP}
            setTopP={setTopP}
          />
          <OutputPanel
            outputText={outputText}
            isLoading={isLoading}
            error={error}
            onRetry={handleHumanize}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;