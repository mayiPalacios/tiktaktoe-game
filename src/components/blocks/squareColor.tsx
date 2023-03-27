import { memo, useCallback, useReducer, useState } from "react";
import usePreviousValue from "../../hooks/usePreviousValue";
import useTimeMachine from "../../hooks/useTimeMachine";
import { ColorObject } from "../../interfaces/InterfacesSquareColor";
import { ColorValue } from "../../interfaces/InterfacesSquareColor";
import reducer from "../../utils/reducer";
import { Istate } from "../../interfaces/typeReduce";
import TimeMachine from "../../pages/timeMachine/timeMachine";

const divColors: ColorObject[] = [
  { value: "red" as ColorValue, type: "bg" },
  { value: "gray" as ColorValue, type: "bg" },
  { value: "yellow" as ColorValue, type: "bg" },
  { value: "green" as ColorValue, type: "bg" },
  { value: "blue" as ColorValue, type: "bg" },
  { value: "indigo" as ColorValue, type: "bg" },
  { value: "pink" as ColorValue, type: "bg" },
  { value: "black" as ColorValue, type: "bg" },
  { value: "fuchsia" as ColorValue, type: "bg" },
  { value: "darkblue" as ColorValue, type: "bg" },
  { value: "turquoise" as ColorValue, type: "bg" },
  { value: "orange" as ColorValue, type: "bg" },
  { value: "brown" as ColorValue, type: "bg" },
  { value: "#b5ddbb" as ColorValue, type: "bg" },
  { value: "current" as ColorValue, type: "bg" },
  { value: "violet" as ColorValue, type: "bg" },
];

const SquareColor = () => {
  const [currentDivIndex, setCurrentDivIndex] = useState<number>(-1);
  const [available, setAvailable] = useState<boolean>(false);
  const initialState: Istate = {
    current: currentDivIndex,
    nextBlock: [],
    previousBlock: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const previousCurrent = useTimeMachine<number>(currentDivIndex);
  console.log(previousCurrent.getPreviousValue() + " getpre");
  const handleDivClick = (index: number) => {
    setCurrentDivIndex(index);
    dispatch({ type: "current", onload: { current: index } });
  };

  const handleBackClick = useCallback(() => {
    dispatch({
      type: "previous",
      onload: {
        squareArray: [...previousCurrent.previousvalue],
        oldCurrent: previousCurrent.getPreviousValue(),
      },
    });
    setAvailable(true);
  }, [previousCurrent]);

  const handleNextClick = useCallback(() => {
    dispatch({
      type: "next",
      onload: {
        squareArray: [...previousCurrent.previousvalue],
        oldCurrent: previousCurrent.getPreviousValue(),
      },
    });
    setAvailable(true);
  }, [previousCurrent]);

  const handleResumeClick = useCallback(() => {
    dispatch({ type: "resume", onload: { current: currentDivIndex } });
    setAvailable(false);
  }, [previousCurrent]);

  return (
    <div className="container__main">
      <div className="container__block">
        {divColors.map((colorObj, index) => (
          <button
            key={`_${index + 1}`}
            style={{
              border: "1px solid black",
              backgroundColor: colorObj.value,
              opacity: state.current === index ? 1 : 0.5,
            }}
            disabled={available}
            onClick={() => handleDivClick(index)}
          />
        ))}
      </div>
      <div className="container__sidebar--btn">
        <button
          onClick={handleBackClick}
          disabled={
            state.current === previousCurrent.getPreviousValue() ||
            previousCurrent.getPreviousValue() === undefined
          }
        >
          <span>Previous</span>
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentDivIndex === state.current}
        >
          <span>Next</span>
        </button>
        <button onClick={handleResumeClick} disabled={!available}>
          <span>Resume</span>
        </button>
      </div>
    </div>
  );
};
export default memo(SquareColor);
