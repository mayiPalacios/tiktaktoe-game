import { Action } from "../interfaces/typeReduce";
import { Istate } from "../interfaces/typeReduce";

function reducer(state: Istate, action: Action): Istate {
  switch (action.type) {
    case "next": {
      const [currentElement, ...currentBlock] = state.nextBlock;
      return {
        nextBlock: currentBlock,
        previousBlock: [currentElement, ...state.previousBlock],
        current: currentElement,
      };
    }

    case "previous": {
      let currentElment;
      let currentBlock;
      if (state.previousBlock.length) {
        [currentElment, ...currentBlock] = state.previousBlock;
      } else {
        [currentElment, ...currentBlock] = action.onload.squareArray;
      }
      console.log(currentBlock + " este es el currentBlock");
      return {
        nextBlock: [currentElment, ...state.nextBlock],
        previousBlock: currentBlock,
        current: currentBlock[0],
      };
    }

    case "current": {
      return { ...state, current: action.onload.current };
    }

    default:
      return { current: -1, nextBlock: [], previousBlock: [] };
  }
}

export default reducer;
