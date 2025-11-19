import React, { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { predictMatch } from './services/geminiService';
import { trainAndPredictTF } from './services/tfService';
import { PredictionData, ViewState, ModelType } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState<ModelType>(ModelType.GEMINI);

  const handleAnalyze = async (home: string, away: string, league: string, modelType: ModelType) => {
    setViewState(ViewState.ANALYZING);
    setErrorMsg(null);
    setCurrentModel(modelType);
    
    try {
      let data: PredictionData;
      
      if (modelType === ModelType.GEMINI) {
        data = await predictMatch(home, away, league);
      } else {
        // TensorFlow Mode
        data = await trainAndPredictTF(home, away, league);
      }

      setPredictionData(data);
      setViewState(ViewState.RESULT);
    } catch (error: any) {
      console.error(error);
      setViewState(ViewState.ERROR);
      setErrorMsg(error.message || "An unexpected error occurred");
    }
  };

  const handleReset = () => {
    setViewState(ViewState.IDLE);
    setPredictionData(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              MatchMind<span className="text-emerald-400">.AI</span>
            </h1>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-xs font-mono text-slate-500">Powered by</div>
             <div className="flex gap-2 text-[10px] font-bold text-slate-400">
               <span>GEMINI 2.5</span>
               <span className="text-slate-600">|</span>
               <span>TENSORFLOW.JS</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {viewState === ViewState.IDLE && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            <div className="text-center mb-12 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                Predict the Game.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Powered by Intelligence.
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Choose your engine: use <strong>Gemini 2.5</strong> for real-time web search analysis, or <strong>TensorFlow.js</strong> to train a neural network in your browser.
              </p>
            </div>
            <PredictionForm onAnalyze={handleAnalyze} viewState={viewState} />
          </div>
        )}

        {viewState === ViewState.ANALYZING && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-pulse">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
              <div className={`absolute inset-0 rounded-full border-4 border-t-${currentModel === ModelType.GEMINI ? 'emerald' : 'orange'}-500 animate-spin`}></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">
                {currentModel === ModelType.GEMINI ? 'Analyzing Web Data' : 'Training Neural Network'}
              </h3>
              <p className="text-slate-400 font-mono text-sm">
                {currentModel === ModelType.GEMINI 
                  ? 'Querying Mackolik & Soccerway...' 
                  : 'Optimizing Weights (Epoch 15/20)...'}
              </p>
            </div>
          </div>
        )}

        {viewState === ViewState.RESULT && predictionData && (
          <PredictionResult data={predictionData} onReset={handleReset} />
        )}

        {viewState === ViewState.ERROR && (
          <div className="max-w-md w-full bg-red-900/10 border border-red-900/50 rounded-2xl p-8 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
            <p className="text-red-200 mb-6">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center">
        <p className="text-slate-600 text-xs">
          Predictions are for entertainment purposes only. This tool uses AI to analyze public data and does not guarantee results.
        </p>
      </footer>
    </div>
  );
};

export default App;