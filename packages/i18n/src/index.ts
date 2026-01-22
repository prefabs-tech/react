import "./assets/css/index.css";

import { default as i18n } from "i18next";
import { useTranslation, Trans } from "react-i18next";

import LocaleSwitcher from "./components/LocaleSwitcher";
import plugin from "./plugin";
import { registerTranslations } from "./utils/translations";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import type { AppConfig } from "@prefabs.tech/react-config";
import type { InitOptions } from "i18next";

declare module "@prefabs.tech/react-config" {
  export interface AppConfig {
    i18n: InitOptions;
  }
}

export default plugin;

export { i18n, LocaleSwitcher, Trans, useTranslation, registerTranslations };
