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
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [replay, setReplay] = useState(false);
  const [index, setIndex] = useState(0);
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
  console.log(timeMachine.previousvalue.length - 1);

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
      setShowAlert(true);
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

  const handleNextBtn = useCallback(() => {
    dispatch({
      type: "next",
      payload: { arrayNext: timeMachine.previousvalue.length },
    });
  }, [timeMachine.getPreviousValue]);

  const handleResumeBtn = useCallback(() => {
    dispatch({
      type: "current",
      payload: {
        current: timeMachine.previousvalue.length - 1,
        isAvailable: false,
      },
    });
  }, [timeMachine.getPreviousValue]);

  const handleRestartBtn = useCallback(() => {
    setCurrentPlayer({ moves: Array(9).fill(""), whoisNext: true });
    setWinner("");
    setReplay(false);
    dispatch({
      type: "current",
      payload: { current: 0, isAvailable: false },
    });
  }, []);

  const handleReplay = useCallback(() => {
    setReplay(true);
    setInterval(() => {
      setIndex((event) => {
        if (event + 1 < timeMachine.previousvalue.length) {
          return event + 1;
        }
        return event;
      });
    }, 500);
  }, []);

  return (
    <div className="container__main">
      {showAlert && (
        <div className="container__alert">
          <div className="alert__content" id="cookiesPopup">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1021/1021100.png"
              alt="cookies-img"
            />
            <p>The Winner is {winner}</p>
            <button className="btn__accept" onClick={() => setShowAlert(false)}>
              <h2>Amazing</h2>
            </button>
          </div>
        </div>
      )}

      <div className="container__square--tictactoe">
        {!available.available &&
          !replay &&
          currentPlayer.moves.map((event, index) => (
            <button
              key={`_${index + 1}`}
              onClick={() => handleButtonClick(index)}
              disabled={false}
            >
              {currentPlayer.moves[index]}
            </button>
          ))}
        {available.available &&
          !replay &&
          timeMachine.previousvalue[available.current].map((event, index) => (
            <button
              key={`_${index + 1}`}
              onClick={() => handleButtonClick(index)}
              disabled={true}
            >
              {event}
            </button>
          ))}
        {replay &&
          timeMachine.previousvalue[index].map((event, index) => (
            <button
              key={`_${index + 1}`}
              onClick={() => handleButtonClick(index)}
              disabled={true}
            >
              {event}
            </button>
          ))}
      </div>

      <div className="container__sidebar--btn">
        <button
          onClick={() => {
            handleNextBtn();
          }}
          disabled={!available.available}
        >
          <span>Next</span>
        </button>
        {winner === "" ? (
          <button onClick={handleResumeBtn} disabled={!available.available}>
            <span>Resume</span>
          </button>
        ) : (
          <button onClick={handleReplay}>
            <span>Replay</span>
          </button>
        )}

        <button
          disabled={available.current <= 1}
          onClick={() => handlePreviousBtn()}
        >
          <span>Previous</span>
        </button>

        <div>
          <span>Next Move</span>
          <div id="div__next--move">
            <h1>
              {winner === "" ? (currentPlayer.whoisNext ? "X" : "O") : winner}
            </h1>
          </div>
          <button onClick={handleRestartBtn}>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default SquareTictactoe;
