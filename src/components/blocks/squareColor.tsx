import { memo, useState } from "react";
import { ColorObject } from "../../interfaces/InterfacesSquareColor";
import { ColorValue } from "../../interfaces/InterfacesSquareColor";

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
  const [clickedDivs, setClickedDivs] = useState<ColorObject[]>([]);
  const [currentDivIndex, setCurrentDivIndex] = useState<number>(-1);

  const handleDivClick = (value: ColorObject, index: number) => {
    setClickedDivs((prevState) => [...prevState, value]);
    console.log(index);
    setCurrentDivIndex(index);
  };

  const handleBackClick = () => {
    if (currentDivIndex > 0) {
      setCurrentDivIndex((prevState) => prevState - 1);
    }
  };

  return (
    <div className="container__block">
      {divColors.map((colorObj, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            backgroundColor: colorObj.value,
            opacity: currentDivIndex === index ? 1 : 0.5,
          }}
          onClick={() => handleDivClick(colorObj, index)}
        />
      ))}
      <button onClick={handleBackClick}>Retroceder</button>
    </div>
  );
};
export default memo(SquareColor);
