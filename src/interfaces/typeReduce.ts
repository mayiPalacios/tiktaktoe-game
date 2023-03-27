export type Action =
  | { type: "next"; onload: { squareArray: number[]; oldCurrent: number } }
  | { type: "previous"; onload: { squareArray: number[]; oldCurrent: number } }
  | { type: "resume"; onload: { current: number } }
  | { type: "current"; onload: { current: number } };

export interface Istate {
  current: number;
  nextBlock: number[];
  previousBlock: number[];
}

export interface IstateTic {
  current: number;
  available: boolean;
}
