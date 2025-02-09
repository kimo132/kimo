export interface GameLevel {
  name: string;
  pointsReward: number;
  emptyCells: number;
}

export interface GameState {
  points: number;
  hintsUsed: number;
  mistakes: number;
  currentLevel: string;
  gameStatus: 'playing' | 'won' | 'lost';
}

export interface Cell {
  value: number | null;
  isFixed: boolean;
  notes: number[];
  isValid: boolean;
  isHighlighted: boolean;
  isCorrect?: boolean;
  solution?: number;
}