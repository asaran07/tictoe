import { useState } from 'react'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerFlag, setPlayerFlag] = useState(true);
  const [scores] = useState({ X: 0, O: 0 });

  const playerSymbol = playerFlag ? 'X' : 'O';
  const playerName = playerFlag ? 'Player 1' : 'Player 2';

  const handleClick = (index) => {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setPlayerFlag(!playerFlag);
  };

  return (
    <div className="mmx-auto p-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Tic Tac Toe</h1>
      
      <div className="mb-4 text-xl">
        Current turn: {playerName} ({playerSymbol})
      </div>
      
      <div className="mb-8 space-y-1">
        <div>Player 1 (X): {scores.X} wins</div>
        <div>Player 2 (O): {scores.O} wins</div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto">
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
    </div>
  );
}

export default App