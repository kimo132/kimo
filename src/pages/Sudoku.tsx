import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Save, Check, AlertCircle, Trash2, CreditCard, HelpCircle, Award } from 'lucide-react';
import { translations } from '../translations';
import type { Language, Cell, GameState, GameLevel } from '../types';

const LEVELS: Record<string, GameLevel> = {
  easy: { name: 'easy', pointsReward: 15, emptyCells: 30 },
  medium: { name: 'medium', pointsReward: 30, emptyCells: 40 },
  hard: { name: 'hard', pointsReward: 60, emptyCells: 50 },
  expert: { name: 'expert', pointsReward: 100, emptyCells: 60 }
};

const HINT_COST = 25;
const MAX_MISTAKES = 3;

function generateSudoku(level: GameLevel): { grid: Cell[][], solution: number[][] } {
  const grid: Cell[][] = Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({
      value: null,
      isFixed: false,
      notes: [],
      isValid: true,
      isHighlighted: false
    }))
  );

  const isValid = (row: number, col: number, num: number): boolean => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x].value === num) return false;
    }

    for (let x = 0; x < 9; x++) {
      if (grid[x][col].value === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j].value === num) return false;
      }
    }

    return true;
  };

  const fillGrid = (row: number = 0, col: number = 0): boolean => {
    if (col === 9) {
      row++;
      col = 0;
    }
    if (row === 9) return true;

    if (grid[row][col].value !== null) {
      return fillGrid(row, col + 1);
    }

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    for (const num of nums) {
      if (isValid(row, col, num)) {
        grid[row][col].value = num;
        if (fillGrid(row, col + 1)) return true;
        grid[row][col].value = null;
      }
    }

    return false;
  };

  fillGrid();

  const solution = grid.map(row => row.map(cell => cell.value || 0));
  const emptyCellsCount = level.emptyCells;
  
  let cleared = 0;
  while (cleared < emptyCellsCount) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col].value !== null && !grid[row][col].isFixed) {
      grid[row][col].value = null;
      grid[row][col].solution = solution[row][col];
      cleared++;
    }
  }

  return { grid, solution };
}

export function SudokuPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [gameState, setGameState] = useState<GameState>({
    points: 100,
    hintsUsed: 0,
    mistakes: 0,
    currentLevel: 'easy',
    gameStatus: 'playing'
  });
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [showBuyPoints, setShowBuyPoints] = useState(false);
  const content = translations[language].sudoku;

  useEffect(() => {
    startNewGame(gameState.currentLevel);
  }, []);

  const startNewGame = (levelName: string) => {
    const level = LEVELS[levelName];
    const { grid: newGrid, solution: newSolution } = generateSudoku(level);
    setGrid(newGrid);
    setSolution(newSolution);
    setGameState(prev => ({
      ...prev,
      currentLevel: levelName,
      mistakes: 0,
      gameStatus: 'playing'
    }));
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isFixed || gameState.gameStatus !== 'playing') return;
    
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], isHighlighted: true };
    setGrid(newGrid);
    setSelectedCell([row, col]);

    setTimeout(() => {
      const updatedGrid = [...grid];
      updatedGrid[row][col] = { ...updatedGrid[row][col], isHighlighted: false };
      setGrid(updatedGrid);
    }, 300);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || gameState.gameStatus !== 'playing') return;
    const [row, col] = selectedCell;
    if (grid[row][col].isFixed) return;

    const newGrid = [...grid];
    if (isNoteMode) {
      const notes = new Set(newGrid[row][col].notes);
      if (notes.has(num)) {
        notes.delete(num);
      } else {
        notes.add(num);
      }
      newGrid[row][col] = {
        ...newGrid[row][col],
        notes: Array.from(notes).sort()
      };
      setGrid(newGrid);
    } else {
      const isCorrect = solution[row][col] === num;
      
      newGrid[row][col] = {
        ...newGrid[row][col],
        value: num,
        notes: [],
        isValid: isCorrect,
        isCorrect
      };
      
      newGrid[row][col].isHighlighted = true;
      setGrid(newGrid);

      setTimeout(() => {
        newGrid[row][col].isHighlighted = false;
        setGrid([...newGrid]);
      }, 300);

      if (!isCorrect) {
        handleMistake();
      } else {
        checkWinCondition(newGrid);
      }
    }
  };

  const handleMistake = () => {
    setGameState(prev => {
      const newMistakes = prev.mistakes + 1;
      if (newMistakes >= MAX_MISTAKES) {
        return {
          ...prev,
          mistakes: newMistakes,
          gameStatus: 'lost'
        };
      }
      return {
        ...prev,
        mistakes: newMistakes
      };
    });
  };

  const checkWinCondition = (currentGrid: Cell[][]) => {
    const isComplete = currentGrid.every(row =>
      row.every(cell => cell.value !== null && cell.isValid)
    );

    if (isComplete) {
      const level = LEVELS[gameState.currentLevel];
      setGameState(prev => ({
        ...prev,
        points: prev.points + level.pointsReward,
        gameStatus: 'won'
      }));
    }
  };

  const useHint = () => {
    if (!selectedCell || gameState.points < HINT_COST) return;
    
    const [row, col] = selectedCell;
    if (grid[row][col].isFixed) return;

    setGameState(prev => ({
      ...prev,
      points: prev.points - HINT_COST,
      hintsUsed: prev.hintsUsed + 1
    }));

    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      value: solution[row][col],
      notes: [],
      isValid: true,
      isHighlighted: true
    };
    setGrid(newGrid);

    setTimeout(() => {
      newGrid[row][col].isHighlighted = false;
      setGrid([...newGrid]);
    }, 300);
  };

  const clearNotes = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      notes: []
    };
    setGrid(newGrid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            {content.back}
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => setIsNoteMode(!isNoteMode)}
              className={`p-2 rounded-lg transition-all ${
                isNoteMode ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {content.noteMode}
            </button>
            {isNoteMode && (
              <button
                onClick={clearNotes}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => startNewGame(gameState.currentLevel)}
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            {Object.entries(LEVELS).map(([key, level]) => (
              <button
                key={key}
                onClick={() => startNewGame(key)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  gameState.currentLevel === key
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {content.levels[key as keyof typeof content.levels]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span>{content.points}: {gameState.points}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>{content.mistakes}: {gameState.mistakes}/{MAX_MISTAKES}</span>
          </div>
          <button
            onClick={() => setShowBuyPoints(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-all"
          >
            <CreditCard className="w-5 h-5" />
            {content.buyPoints.button}
          </button>
        </div>

        <div className="grid grid-cols-9 gap-1 bg-gray-700 p-2 rounded-lg shadow-xl mb-8">
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`
                  aspect-square flex items-center justify-center text-lg font-bold
                  ${cell.isFixed ? 'bg-gray-600' : 'bg-gray-800'}
                  ${!cell.isValid ? 'text-red-500' : cell.isFixed ? 'text-gray-300' : 'text-white'}
                  ${selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex ? 'ring-2 ring-indigo-500' : ''}
                  ${cell.isHighlighted ? 'animate-pulse bg-indigo-900/50' : ''}
                  transition-all duration-200
                  ${(rowIndex + 1) % 3 === 0 ? 'mb-1' : ''}
                  ${(colIndex + 1) % 3 === 0 ? 'mr-1' : ''}
                  hover:transform hover:scale-105
                  ${cell.isCorrect ? 'animate-bounce text-green-500' : ''}
                `}
              >
                {cell.value ? (
                  <span className="transform transition-all duration-300">
                    {cell.value}
                  </span>
                ) : cell.notes.length > 0 ? (
                  <div className="grid grid-cols-3 gap-0.5 p-0.5 text-[8px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                      <div key={n} className={cell.notes.includes(n) ? 'text-gray-400' : 'invisible'}>
                        {n}
                      </div>
                    ))}
                  </div>
                ) : null}
              </button>
            ))
          ))}
        </div>

        <div className="grid grid-cols-9 gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="aspect-square flex items-center justify-center text-xl font-bold bg-gray-700 rounded-lg hover:bg-gray-600 transition-all hover:transform hover:scale-110"
            >
              {num}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={useHint}
            disabled={gameState.points < HINT_COST}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              gameState.points >= HINT_COST
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            {content.hint} (-{HINT_COST} {content.points})
          </button>
        </div>

        {gameState.gameStatus !== 'playing' && (
          <div className={`p-4 rounded-lg text-center mb-8 ${
            gameState.gameStatus === 'won' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-4">
              {gameState.gameStatus === 'won' ? (
                <>
                  <Check className="w-5 h-5" />
                  {content.completed}
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5" />
                  {content.gameOver}
                </>
              )}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => startNewGame(gameState.currentLevel)}
                className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all"
              >
                {content.playAgain}
              </button>
              {gameState.gameStatus === 'lost' && (
                <button
                  onClick={() => {
                    const newGrid = grid.map((row, i) => row.map((cell, j) => ({
                      ...cell,
                      value: solution[i][j],
                      isValid: true
                    })));
                    setGrid(newGrid);
                  }}
                  className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                >
                  {content.showSolution}
                </button>
              )}
            </div>
          </div>
        )}

        {showBuyPoints && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">{content.buyPoints.title}</h3>
              <p className="mb-4">{content.buyPoints.description}</p>
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="font-mono text-lg mb-2">{content.buyPoints.phone}</p>
                <p className="text-sm text-gray-400">{content.buyPoints.rate}</p>
              </div>
              <button
                onClick={() => setShowBuyPoints(false)}
                className="w-full px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}