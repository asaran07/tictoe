import { useState } from 'react'
import './App.css'

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
    <>
      <h1>Tic Tac Toe</h1>
      
      <div className="status">
        Current turn: {playerName} ({playerSymbol})
      </div>
      
      <div className="scores">
        Player 1 (X): {scores.X} wins
        Player 2 (O): {scores.O} wins
      </div>

      <div className="board">
        {board.map((square, index) => (
          <button 
            key={index} 
            className="square" 
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
    </>
  );
}

export default App