import "./assets/css/index.css";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import type { AppConfig } from "@prefabs.tech/react-config";
import type { InitOptions } from "i18next";

import { default as i18n } from "i18next";
import { Trans, useTranslation } from "react-i18next";

import LocaleSwitcher from "./components/LocaleSwitcher";
import plugin from "./plugin";
import { registerTranslations } from "./utils/translations";

declare module "@prefabs.tech/react-config" {
  export interface AppConfig {
    i18n: InitOptions;
  }
}

export default plugin;

export { i18n, LocaleSwitcher, registerTranslations, Trans, useTranslation };
