import { Action } from "../interfaces/typeReduce";
import { Istate } from "../interfaces/typeReduce";

function reducer(state: Istate, action: Action): Istate {
  switch (action.type) {
    case "previous": {
      let currentElment;
      let currentBlock;
      if (state.previousBlock.length) {
        [currentElment, ...currentBlock] = state.previousBlock;
      } else {
        [currentElment, ...currentBlock] = action.onload.squareArray;
      }
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
