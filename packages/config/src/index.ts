import type { AppConfig, AppFeatures } from "./types";

import ConfigProvider, { configContext } from "./context/ConfigProvider";
import { parse } from "./utils";

export { configContext, ConfigProvider, parse };

export type { AppConfig, AppFeatures };
