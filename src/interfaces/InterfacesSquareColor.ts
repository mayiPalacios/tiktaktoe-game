type Color = "red" | "gray" | "yellow" | "green" | "blue" | "indigo" | "pink";

type PropertyType = "bg" | "text";

export type ColorValue = `${Color}`;

export interface ColorObject {
  value: ColorValue;
  type: PropertyType;
}
