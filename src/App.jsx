import { useState } from 'react'
import './App.css'

function App() {
  const [Values, setValues] = useState(Array(9).fill(null));
  const [icon, setIcon] = useState('X');
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isDraw, setIsDraw] = useState(false);

  const winner = calculateWinner(Values);

  const handleClick = (index) => {
    if (Values[index] || winner) return;

    const newValues = [...Values];
    newValues[index] = icon;
    setValues(newValues);
    setIcon(icon === 'X' ? 'O' : 'X');

    const winResult = calculateWinner(newValues);
    if (winResult) {
      setWinningLine(winResult.line);
      setScores((prev) => ({ ...prev, [winResult.winner]: prev[winResult.winner] + 1 }));
    } else if (newValues.every(cell => cell !== null)) {
      setIsDraw(true);
    }
  };

  const resetGame = () => {
    setValues(Array(9).fill(null));
    setIcon('X');
    setWinningLine(null);
    setIsDraw(false);
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  return (
    <div className='bg-[url(/src/assets/gradient-bg.jpg)] bg-cover bg-center h-screen w-screen flex flex-col items-center justify-center gap-4'>
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">Tic Tac Toe</h1>

      {/* Scoreboard */}
      <div className="flex gap-4 text-white text-xl font-semibold">
        <div className="bg-purple-700 px-3 py-1 rounded">X: {scores.X}</div>
        <div className="bg-purple-700 px-3 py-1 rounded">O: {scores.O}</div>
      </div>

      {/* Game Board */}
      <div className='bg-white rounded-lg p-3 opacity-90 grid grid-cols-3 grid-rows-3 gap-2'>
        {Values.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`border-2 border-gray-300 w-20 h-20 flex items-center justify-center text-3xl font-extrabold cursor-pointer transition-all duration-300 ${
              winningLine?.includes(index) ? 'bg-green-500 text-white animate-pulse' : 'hover:bg-gray-200'
            }`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Game Status */}
      <div
        className={`mt-2 text-xl font-bold ${
          winner ? 'text-green-300 animate-bounce' : isDraw ? 'text-yellow-400 animate-pulse' : 'text-white'
        }`}
      >
        {winner && `🎉 Winner: ${winner.winner}`}
        {!winner && isDraw && `🤝 It's a Draw!`}
        {!winner && !isDraw && `Next Player: ${icon}`}
      </div>

      {/* Restart Button */}
      <button
        onClick={resetGame}
        className="mt-2 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;
