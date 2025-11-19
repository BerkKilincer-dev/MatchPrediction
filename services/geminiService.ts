import { GoogleGenerativeAI } from "@google/generative-ai";
import { PredictionData, GroundingChunk } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const predictMatch = async (
  homeTeam: string,
  awayTeam: string,
  league: string
): Promise<PredictionData> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Analyze the upcoming ${league} match between ${homeTeam} (Home) and ${awayTeam} (Away).
    
    Use Google Search to find the latest:
    1. Team form (last 5 matches).
    2. Head-to-head history.
    3. Injury reports and suspensions.
    4. Standings tables from reliable sources (like Mackolik, Soccerway, ESPN).
    
    Act as a sophisticated machine learning sports model. Aggregate this data to calculate win probabilities.
    
    CRITICAL: You MUST output the result in the following STRICT textual format so I can parse it. Do not use markdown code blocks (like \`\`\`json). Just plain text formatted exactly as below:

    [PROBABILITIES]
    HOME: <number>%
    DRAW: <number>%
    AWAY: <number>%
    
    [SCORE]
    <Home Score> - <Away Score>
    
    [ANALYSIS]
    <Write a detailed paragraph analyzing the match using the gathered data.>

    [FACTORS]
    - <Key factor 1>
    - <Key factor 2>
    - <Key factor 3>
  `;

  try {
    const modelInstance = genAI.getGenerativeModel({ 
      model: model,
      tools: [{ googleSearch: {} }],
    });

    const result = await modelInstance.generateContent(prompt);
    const response = await result.response;
    const text = response.text() || "";
    
    // @ts-ignore - Grounding metadata may not be in type definitions yet
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

    // Parse the text response manually since we can't use JSON schema with tools
    const probRegex = /HOME:\s*(\d+)%[\s\S]*?DRAW:\s*(\d+)%[\s\S]*?AWAY:\s*(\d+)%/i;
    const scoreRegex = /\[SCORE\]\s*\n*(.*?)\n/i;
    const analysisRegex = /\[ANALYSIS\]\s*\n*([\s\S]*?)\n*\[FACTORS\]/i;
    const factorsRegex = /\[FACTORS\]\s*\n*([\s\S]*)/i;

    const probMatch = text.match(probRegex);
    const scoreMatch = text.match(scoreRegex);
    const analysisMatch = text.match(analysisRegex);
    const factorsMatch = text.match(factorsRegex);

    const probabilities = probMatch
      ? {
          home: parseInt(probMatch[1], 10),
          draw: parseInt(probMatch[2], 10),
          away: parseInt(probMatch[3], 10),
        }
      : { home: 33, draw: 33, away: 33 }; // Fallback

    const predictedScore = scoreMatch ? scoreMatch[1].trim() : "N/A";
    const analysis = analysisMatch ? analysisMatch[1].trim() : text.slice(0, 500) + "..."; // Fallback to raw text if parse fails
    
    const keyFactorsRaw = factorsMatch ? factorsMatch[1].trim() : "";
    const keyFactors = keyFactorsRaw
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 0);

    const sources = groundingChunks
      .map(chunk => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || "#",
      }))
      .filter(s => s.uri !== "#");

    // Deduplicate sources
    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

    return {
      homeTeam,
      awayTeam,
      league,
      probabilities,
      predictedScore,
      analysis,
      keyFactors,
      sources: uniqueSources,
      modelUsed: 'Gemini 2.5 Flash',
    };

  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error("Failed to generate prediction. Please check your API key and try again.");
  }
};