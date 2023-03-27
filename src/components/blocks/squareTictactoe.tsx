import { useCallback, useEffect, useState } from "react";
import { CalculateWinner } from "../../utils/calculateWinner";

interface Iplayer {
  moves: string[];
  whoisNext: boolean;
}

const SquareTictactoe = () => {
  const [winner, setWinner] = useState<string>("");
  const [currentPlayer, setCurrentPlayer] = useState<Iplayer>({
    moves: Array(9).fill(""),
    whoisNext: true,
  });

  useEffect(() => {
    const isWinner = CalculateWinner(currentPlayer.moves);
    if (isWinner) {
      console.log(isWinner);
      setWinner(isWinner);
    }
  }, [currentPlayer.moves]);

  const handleButtonClick = useCallback(
    (index: number) => {
      if (winner) {
        return;
      }
      const newMoves = currentPlayer.moves.slice();
      newMoves[index] = currentPlayer.whoisNext ? "X" : "O";
      setCurrentPlayer((prevPlayer) => ({
        moves: newMoves,
        whoisNext: !prevPlayer.whoisNext,
      }));
    },
    [winner, currentPlayer]
  );

  return (
    <div className="container__main">
      <div className="container__square--tictactoe">
        {currentPlayer.moves.map((event, index) => (
          <button
            key={`_${index + 1}`}
            onClick={() => handleButtonClick(index)}
          >
            {currentPlayer.moves[index]}
          </button>
        ))}
      </div>
      <div className="container__sidebar--btn">
        <button>
          <span>Next</span>
        </button>
        <button>
          <span>Resume</span>
        </button>
        <button>
          <span>Previous</span>
        </button>
        <div>
          <span>Next Move</span>
          <div id="div__next--move"></div>
          <button>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default SquareTictactoe;
