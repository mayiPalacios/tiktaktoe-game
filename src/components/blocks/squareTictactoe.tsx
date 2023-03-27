import { useCallback, useEffect, useState, useReducer } from "react";
import { CalculateWinner } from "../../utils/calculateWinner";
import reducerTic from "../../utils/reducerTic";
import { IstateTic } from "../../interfaces/typeReduce";
import useTimeMachine from "../../hooks/useTimeMachine";

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
  const initialState: IstateTic = {
    current: -1,
    available: false,
  };

  const [available, dispatch] = useReducer(reducerTic, initialState);
  const timeMachine = useTimeMachine<string[]>(currentPlayer.moves);

  useEffect(() => {
    if (!available.available) {
      dispatch({
        type: "current",
        payload: { current: timeMachine.previousvalue.length - 1 },
      });
    }
  }, [timeMachine.previousvalue.length]);

  useEffect(() => {
    const isWinner = CalculateWinner(currentPlayer.moves);
    if (isWinner) {
      console.log(isWinner);
      setWinner(isWinner);
    }
  }, [currentPlayer.moves]);

  const handleButtonClick = useCallback(
    (index: number) => {
      if (winner !== "") {
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

  const handlePreviousBtn = useCallback(() => {
    dispatch({ type: "previous" });
  }, []);

  return (
    <div className="container__main">
      <div className="container__square--tictactoe">
        {!available.available &&
          currentPlayer.moves.map((event, index) => (
            <button
              key={`_${index + 1}`}
              onClick={() => handleButtonClick(index)}
            >
              {currentPlayer.moves[index]}
            </button>
          ))}
        {available.available &&
          timeMachine.previousvalue[available.current].map((event, index) => (
            <button
              key={`_${index + 1}`}
              onClick={() => handleButtonClick(index)}
            >
              {event}
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
        <button onClick={() => handlePreviousBtn()}>
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
