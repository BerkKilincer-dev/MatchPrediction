// Web Scraping Service for Football Data
// Note: For production, you should run scraping on a backend server with proper CORS handling
// This is a simplified version for demonstration

export interface TeamStats {
  name: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: string[]; // Last 5 matches: 'W', 'D', 'L'
  position: number;
  
  // Enhanced features for better accuracy
  recentGoalsScored: number;      // Average goals scored in last 5 matches
  recentGoalsConceded: number;    // Average goals conceded in last 5 matches
  winStreak: number;              // Current winning streak
  cleanSheetRate: number;         // Percentage of matches without conceding
  daysRest: number;               // Days since last match
  pointsPerGame: number;          // Average points per game
  homeFormScore: number;          // Form score when playing at home (0-1)
  awayFormScore: number;          // Form score when playing away (0-1)
  attackStrength: number;         // Offensive power rating (0-1)
  defenseStrength: number;        // Defensive power rating (0-1)
}

export interface MatchData {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  league: string;
  headToHead: {
    homeWins: number;
    draws: number;
    awayWins: number;
  };
}

// Enhanced team strength calculation with more factors
export const calculateTeamStrength = (stats: TeamStats): number => {
  const totalMatches = stats.wins + stats.draws + stats.losses;
  if (totalMatches === 0) return 0.5;

  const winRate = stats.wins / totalMatches;
  const drawRate = stats.draws / totalMatches;
  const goalDiff = (stats.goalsFor - stats.goalsAgainst) / totalMatches;
  
  // Form calculation (last 5 matches)
  const formScore = stats.form.reduce((acc, result) => {
    if (result === 'W') return acc + 3;
    if (result === 'D') return acc + 1;
    return acc;
  }, 0) / 15; // Max 15 points (5 wins)

  // Win streak bonus (momentum effect)
  const streakBonus = Math.min(stats.winStreak * 0.05, 0.15); // Max 15% bonus

  // Clean sheet bonus (defensive stability)
  const defensiveBonus = stats.cleanSheetRate * 0.10;

  // Recent form (last 5 matches more important than overall)
  const recentPerformance = (
    stats.recentGoalsScored * 0.15 - 
    stats.recentGoalsConceded * 0.10
  );

  // Attack and defense balance
  const balanceScore = (stats.attackStrength + stats.defenseStrength) / 2;

  // Enhanced weighted strength calculation
  const strength = (
    winRate * 0.25 +                              // Overall win rate
    formScore * 0.20 +                            // Recent form
    (goalDiff + 2) / 4 * 0.15 +                   // Goal differential
    streakBonus +                                  // Momentum
    defensiveBonus +                               // Defensive quality
    recentPerformance * 0.10 +                    // Recent goal performance
    balanceScore * 0.10 +                         // Team balance
    (1 - Math.min(stats.position, 20) / 20) * 0.05 // League position
  );

  return Math.max(0.1, Math.min(1, strength));
};

// Generate synthetic match data based on team names
// In production, this would scrape real data from Mackolik, Soccerway, etc.
export const getMatchData = async (
  homeTeamName: string,
  awayTeamName: string,
  league: string
): Promise<MatchData> => {
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Generate enhanced semi-realistic data based on team names
  const generateTeamStats = (teamName: string, isHome: boolean): TeamStats => {
    // Use team name to generate consistent but varied stats
    let hash = 0;
    for (let i = 0; i < teamName.length; i++) {
      hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const totalMatches = 20 + Math.floor(random(hash) * 18);
    const wins = Math.floor(random(hash + 1) * totalMatches * 0.6);
    const losses = Math.floor(random(hash + 2) * (totalMatches - wins) * 0.6);
    const draws = totalMatches - wins - losses;

    const goalsFor = wins * 2 + draws + Math.floor(random(hash + 3) * wins);
    const goalsAgainst = losses * 2 + draws + Math.floor(random(hash + 4) * losses);
    const points = wins * 3 + draws;
    
    // Generate form (last 5 matches)
    const formOptions = ['W', 'D', 'L'];
    const form: string[] = [];
    for (let i = 0; i < 5; i++) {
      const formIndex = Math.floor(random(hash + 5 + i) * formOptions.length);
      form.push(formOptions[formIndex]);
    }

    // Adjust form to be more realistic
    const winBias = isHome ? 0.1 : 0;
    const formWeight = wins / totalMatches + winBias;
    for (let i = 0; i < 5; i++) {
      if (random(hash + 10 + i) < formWeight) {
        form[i] = 'W';
      } else if (random(hash + 20 + i) < 0.3) {
        form[i] = 'D';
      } else {
        form[i] = 'L';
      }
    }

    // Calculate enhanced features
    const recentWins = form.filter(f => f === 'W').length;
    const recentDraws = form.filter(f => f === 'D').length;
    const recentLosses = form.filter(f => f === 'L').length;
    
    const recentGoalsScored = recentWins * 2.2 + recentDraws * 1.1 + recentLosses * 0.6;
    const recentGoalsConceded = recentWins * 0.7 + recentDraws * 1.1 + recentLosses * 2.1;
    
    // Calculate win streak
    let winStreak = 0;
    for (let i = 0; i < form.length; i++) {
      if (form[i] === 'W') winStreak++;
      else break;
    }
    
    // Clean sheet rate (percentage of matches without conceding)
    const cleanSheets = Math.floor(wins * 0.5 + draws * 0.3);
    const cleanSheetRate = cleanSheets / totalMatches;
    
    // Days rest (random between 3-7 days)
    const daysRest = 3 + Math.floor(random(hash + 30) * 5);
    
    // Points per game
    const pointsPerGame = points / totalMatches;
    
    // Home/Away form scores
    const homeWins = isHome ? wins : Math.floor(wins * 0.6);
    const awayWins = isHome ? Math.floor(wins * 0.4) : wins;
    const homeFormScore = homeWins / Math.max(totalMatches / 2, 1);
    const awayFormScore = awayWins / Math.max(totalMatches / 2, 1);
    
    // Attack and defense strengths
    const avgGoalsScored = goalsFor / totalMatches;
    const avgGoalsConceded = goalsAgainst / totalMatches;
    const attackStrength = Math.min(avgGoalsScored / 2.5, 1); // Normalize to 0-1
    const defenseStrength = Math.max(1 - avgGoalsConceded / 2.5, 0); // Inverse, normalized

    return {
      name: teamName,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      points,
      form,
      position: Math.floor(random(hash + 6) * 18) + 1,
      
      // Enhanced features
      recentGoalsScored: recentGoalsScored / 5, // Average per match
      recentGoalsConceded: recentGoalsConceded / 5,
      winStreak,
      cleanSheetRate,
      daysRest,
      pointsPerGame,
      homeFormScore: Math.min(homeFormScore, 1),
      awayFormScore: Math.min(awayFormScore, 1),
      attackStrength,
      defenseStrength,
    };
  };

  const homeTeam = generateTeamStats(homeTeamName, true);
  const awayTeam = generateTeamStats(awayTeamName, false);

  // Generate head-to-head data
  const h2hTotal = Math.floor(Math.random() * 8) + 5;
  const homeWins = Math.floor(Math.random() * (h2hTotal * 0.5));
  const awayWins = Math.floor(Math.random() * (h2hTotal * 0.5));
  const draws = h2hTotal - homeWins - awayWins;

  return {
    homeTeam,
    awayTeam,
    league,
    headToHead: {
      homeWins,
      draws,
      awayWins,
    },
  };
};

// Convert match data to enhanced training features (14 features now!)
export const matchDataToFeatures = (matchData: MatchData, isHome: boolean): number[] => {
  const team = isHome ? matchData.homeTeam : matchData.awayTeam;
  const opponent = isHome ? matchData.awayTeam : matchData.homeTeam;

  const strength = calculateTeamStrength(team);
  const opponentStrength = calculateTeamStrength(opponent);
  
  const formScore = team.form.reduce((acc, result) => {
    if (result === 'W') return acc + 1;
    if (result === 'D') return acc + 0.5;
    return acc;
  }, 0) / 5;

  const totalMatches = team.wins + team.draws + team.losses;
  const goalDiffNorm = totalMatches > 0 
    ? (team.goalsFor - team.goalsAgainst) / totalMatches / 3  // Normalize to roughly -1 to 1
    : 0;

  const h2hTotal = matchData.headToHead.homeWins + matchData.headToHead.draws + matchData.headToHead.awayWins;
  const h2hScore = h2hTotal > 0
    ? isHome 
      ? matchData.headToHead.homeWins / h2hTotal
      : matchData.headToHead.awayWins / h2hTotal
    : 0.33;

  const homeAdvantage = isHome ? 0.15 : 0;

  // Enhanced features (8 new features!)
  const recentGoalsBalance = team.recentGoalsScored - team.recentGoalsConceded;
  const winStreakNorm = Math.min(team.winStreak / 5, 1); // Normalize to 0-1
  const restAdvantage = (team.daysRest - opponent.daysRest) / 7; // Normalized difference
  const homeAwayFormDiff = isHome 
    ? team.homeFormScore - team.awayFormScore
    : team.awayFormScore - team.homeFormScore;
  const attackDefenseBalance = team.attackStrength - team.defenseStrength; // Positive = attack-focused
  const pointsPerGameDiff = team.pointsPerGame - opponent.pointsPerGame;
  const cleanSheetAdvantage = team.cleanSheetRate - opponent.cleanSheetRate;
  const positionDifference = (opponent.position - team.position) / 20; // Positive = facing lower team

  return [
    // Original 6 features
    strength,                                      // 1. Team strength
    opponentStrength,                              // 2. Opponent strength
    formScore,                                     // 3. Form score
    Math.max(-1, Math.min(1, goalDiffNorm)),      // 4. Goal differential
    h2hScore,                                      // 5. Head-to-head
    homeAdvantage,                                 // 6. Home advantage
    
    // New 8 enhanced features
    Math.max(-2, Math.min(2, recentGoalsBalance)),// 7. Recent goals balance
    winStreakNorm,                                 // 8. Win streak
    team.cleanSheetRate,                           // 9. Clean sheet rate
    Math.max(-1, Math.min(1, restAdvantage)),     // 10. Rest advantage
    Math.max(-1, Math.min(1, homeAwayFormDiff)),  // 11. Home/away form difference
    team.attackStrength,                           // 12. Attack strength
    team.defenseStrength,                          // 13. Defense strength
    Math.max(-0.5, Math.min(0.5, pointsPerGameDiff)) // 14. Points per game difference
  ];
};

