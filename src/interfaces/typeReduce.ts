export type Action =
  | { type: "previous"; onload: { squareArray: number[]; oldCurrent: number } }
  | { type: "current"; onload: { current: number } };

export interface Istate {
  current: number;
  nextBlock: number[];
  previousBlock: number[];
}
