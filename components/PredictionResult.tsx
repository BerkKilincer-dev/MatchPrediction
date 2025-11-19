import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PredictionData } from '../types';

interface Props {
  data: PredictionData;
  onReset: () => void;
}

export const PredictionResult: React.FC<Props> = ({ data, onReset }) => {
  const chartData = [
    { name: data.homeTeam, value: data.probabilities.home, color: '#10b981' }, // Emerald
    { name: 'Draw', value: data.probabilities.draw, color: '#94a3b8' }, // Slate 400
    { name: data.awayTeam, value: data.probabilities.away, color: '#06b6d4' }, // Cyan
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      
      {/* Match Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-slate-500 to-cyan-500"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center flex-1">
            <h3 className="text-emerald-400 font-bold text-xl md:text-2xl tracking-wider">{data.homeTeam}</h3>
            <div className="text-xs text-slate-500 mt-1 uppercase">Home</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums">
              {data.predictedScore}
            </div>
            <div className="text-xs font-mono text-slate-400 mt-2 bg-slate-800 px-3 py-1 rounded-full">
              PREDICTED SCORE
            </div>
          </div>

          <div className="text-center flex-1">
            <h3 className="text-cyan-400 font-bold text-xl md:text-2xl tracking-wider">{data.awayTeam}</h3>
            <div className="text-xs text-slate-500 mt-1 uppercase">Away</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Win Probabilities */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h4 className="text-slate-300 font-semibold mb-4 text-center text-sm uppercase tracking-widest border-b border-slate-800 pb-2">
            Win Probability
          </h4>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold text-slate-500 opacity-20">AI</span>
            </div>
          </div>
        </div>

        {/* Analysis Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h4 className="text-slate-300 font-semibold mb-4 text-sm uppercase tracking-widest border-b border-slate-800 pb-2">
              Model Analysis
            </h4>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
              {data.analysis}
            </div>
          </div>

           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h4 className="text-slate-300 font-semibold mb-4 text-sm uppercase tracking-widest border-b border-slate-800 pb-2">
              Key Factors
            </h4>
            <ul className="space-y-2">
              {data.keyFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-slate-300 text-sm">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Sources */}
      {data.sources.length > 0 && (
        <div className="mt-6 bg-slate-950 border border-slate-900 rounded-xl p-4">
          <h5 className="text-xs font-bold text-slate-500 uppercase mb-3">Data Sources (Search Grounding)</h5>
          <div className="flex flex-wrap gap-2">
            {data.sources.map((source, i) => (
              <a 
                key={i} 
                href={source.uri} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-500 border border-slate-800 px-3 py-1 rounded-full transition-colors truncate max-w-[200px]"
              >
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700"
        >
          Analyze Another Match
        </button>
      </div>
    </div>
  );
};
