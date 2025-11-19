export interface PredictionData {
  homeTeam: string;
  awayTeam: string;
  league: string;
  probabilities: {
    home: number;
    draw: number;
    away: number;
  };
  predictedScore: string;
  analysis: string;
  keyFactors: string[];
  sources: Array<{
    title: string;
    uri: string;
  }>;
  modelUsed: 'Gemini 2.5 Flash' | 'TensorFlow.js Neural Net';
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export enum ViewState {
  IDLE,
  ANALYZING,
  RESULT,
  ERROR
}

export enum ModelType {
  GEMINI = 'GEMINI',
  TENSORFLOW = 'TENSORFLOW'
}