import type { KeyboardEvent } from "react";

import type { StorageType, TKeymap, TOrientation, TPosition } from "./types";

import { getStorage } from "../utils";

const getOrientation = (position: TPosition) => {
  let orientation: TOrientation;

  switch (position) {
    case "bottom":
    case "top":
      orientation = "horizontal";
      break;

    case "left":
    case "right":
      orientation = "vertical";
      break;

    default:
      orientation = "horizontal";
      break;
  }

  return orientation;
};

const onTabDown = (
  active: number,
  event: KeyboardEvent<HTMLButtonElement>,
  count: number,
  handleFocus: (value: number) => void,
  orientation: TOrientation,
) => {
  const nextTab = () => handleFocus((active + 1) % count);
  const previousTab = () => handleFocus((active - 1 + count) % count);
  const firstTab = () => handleFocus(0);
  const lastTab = () => handleFocus(count - 1);

  const doNothing = () => {};

  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
  const keyMap: TKeymap = {
    ArrowDown: orientation === "vertical" ? nextTab : doNothing,
    ArrowLeft: orientation === "horizontal" ? previousTab : doNothing,
    ArrowRight: orientation === "horizontal" ? nextTab : doNothing,
    ArrowUp: orientation === "vertical" ? previousTab : doNothing,
    End: lastTab,
    Home: firstTab,
  };

  const action = keyMap[event.key];
  if (action) {
    event.preventDefault();
    action();
  }
};

const clearSavedTabState = (
  key: string,
  storageType: StorageType = "localStorage",
) => {
  const storage = getStorage(storageType);

  storage.removeItem(key);
};

export { clearSavedTabState, getOrientation, onTabDown };
