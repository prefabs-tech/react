import { getStorage } from "../utils";

import type { TOrientation, TPosition, StorageType } from "./types";

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

const clearSavedTabState = (
  key: string,
  storageType: StorageType = "localStorage",
) => {
  const storage = getStorage(storageType);

  storage.removeItem(key);
};

export { getOrientation, clearSavedTabState };
