import { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerFlag, setPlayerFlag] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const playerSymbol = playerFlag ? 'X' : 'O';
  const playerName = playerFlag ? 'Player 1' : 'Player 2';

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return;
    
    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    
    const winner = checkWinner(newBoard);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    } else {
      setPlayerFlag(!playerFlag);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerFlag(true);
  };

  const resetAll = () => {
    resetGame();
    setScores({ X: 0, O: 0 });
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Tic Tac Toe</h1>
      
      <div className="mb-4 text-xl">
        {winner ? `Winner: Player ${winner === 'X' ? '1' : '2'} (${winner})` :
         isDraw ? 'Game Draw!' :
         `Current turn: ${playerName} (${playerSymbol})`}
      </div>
      
      <div className="mb-8 space-y-1">
        <div>Player 1 (X): {scores.X} wins</div>
        <div>Player 2 (O): {scores.O} wins</div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto mb-4">
        {board.map((square, index) => (
          <button 
            key={index} 
            className="aspect-square rounded-lg bg-white dark:bg-gray-800 
                     border-2 border-gray-700 
                     text-2xl font-bold 
                     hover:bg-gray-100 dark:hover:bg-gray-700
                     transition-colors duration-200
                     p-0"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <div className="space-x-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          New Game
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}

export default App;