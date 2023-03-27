import { IstateTic } from "../interfaces/typeReduce";
import { Taction } from "../interfaces/typeReduce";

function reducerTic(state: IstateTic, action: Taction): IstateTic {
  switch (action.type) {
    case "previous": {
      const previousPosition = state.current - 1;
      if (previousPosition > 0) {
        return { current: previousPosition, available: true };
      }
      return { current: 1, available: true };
    }

    case "current": {
      const available = action.payload.isAvailable;
      const { current } = action.payload;
      return {
        current,
        available: available !== undefined ? available : state.available,
      };
    }

    case "next": {
      const res = state.current + 1;
      if (res < action.payload.arrayNext) {
        return { ...state, current: res };
      }
      return { current: state.current, available: false };
    }

    default:
      return { current: -1, available: false };
  }
}

export default reducerTic;
