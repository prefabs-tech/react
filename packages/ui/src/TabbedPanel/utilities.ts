import { getStorage } from "../utils";

import type { TKeymap, TOrientation, TPosition, StorageType } from "./types";
import type { KeyboardEvent } from "react";

const getOrientation = (position: TPosition) => {
  let orientation: TOrientation;

  switch (position) {
    case "top":
    case "bottom":
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
    ArrowRight: orientation === "horizontal" ? nextTab : doNothing,
    ArrowDown: orientation === "vertical" ? nextTab : doNothing,
    ArrowLeft: orientation === "horizontal" ? previousTab : doNothing,
    ArrowUp: orientation === "vertical" ? previousTab : doNothing,
    Home: firstTab,
    End: lastTab,
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

export { getOrientation, onTabDown, clearSavedTabState };
