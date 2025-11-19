import React, { useState } from 'react';
import { ViewState, ModelType } from '../types';

interface Props {
  onAnalyze: (home: string, away: string, league: string, modelType: ModelType) => void;
  viewState: ViewState;
}

export const PredictionForm: React.FC<Props> = ({ onAnalyze, viewState }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [league, setLeague] = useState('');
  const [modelType, setModelType] = useState<ModelType>(ModelType.GEMINI);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam && awayTeam) {
      onAnalyze(homeTeam, awayTeam, league || 'General', modelType);
    }
  };

  const isLoading = viewState === ViewState.ANALYZING;

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          New Prediction
        </h2>
        <p className="text-slate-400 text-sm mt-2">Enter match details to initialize analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Model Selector */}
        <div className="bg-slate-950 p-1 rounded-lg flex border border-slate-800">
          <button
            type="button"
            onClick={() => setModelType(ModelType.GEMINI)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              modelType === ModelType.GEMINI 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Gemini 2.5 AI
          </button>
          <button
            type="button"
            onClick={() => setModelType(ModelType.TENSORFLOW)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              modelType === ModelType.TENSORFLOW 
                ? 'bg-orange-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            TensorFlow.js
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            League / Tournament (Optional)
          </label>
          <input
            type="text"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            placeholder="e.g. Premier League, Champions League"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Home Team
            </label>
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              placeholder="e.g. Arsenal"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Away Team
            </label>
            <input
              type="text"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              placeholder="e.g. Liverpool"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-lg font-bold text-white uppercase tracking-widest shadow-lg transition-all transform active:scale-95 ${
            isLoading
              ? 'bg-slate-700 cursor-not-allowed'
              : modelType === ModelType.GEMINI
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 shadow-emerald-900/20'
                : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-900/20'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>
                {modelType === ModelType.GEMINI ? 'Searching Data...' : 'Training Neural Net...'}
              </span>
            </span>
          ) : (
            modelType === ModelType.GEMINI ? 'Run Gemini Analysis' : 'Train & Predict (TF.js)'
          )}
        </button>
      </form>
    </div>
  );
};