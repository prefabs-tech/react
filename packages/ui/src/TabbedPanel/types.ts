import type { ReactElement } from "react";

type Properties = {
  children: ReactElement | ReactElement[];
  defaultActiveIndex?: number;
  id?: string;
  onTabChange?: (index: number) => void;
  persistState?: boolean;
  persistStateStorage?: StorageType;
  position?: TPosition;
};

type StorageType = "localStorage" | "sessionStorage";

type TKeymap = {
  [key: string]: () => void;
};

type TOrientation = "horizontal" | "vertical";

type TPosition = "bottom" | "left" | "right" | "top";

export type { Properties, StorageType, TKeymap, TOrientation, TPosition };
