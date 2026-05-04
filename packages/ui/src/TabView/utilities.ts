import type { StorageType, TOrientation, TPosition } from "./types";

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

const clearSavedTabState = (
  key: string,
  storageType: StorageType = "localStorage",
) => {
  const storage = getStorage(storageType);

  storage.removeItem(key);
};

export { clearSavedTabState, getOrientation };
