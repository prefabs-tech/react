import "./assets/css/index.css";

import { use } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next, useTranslation, Trans } from "react-i18next";

import LocaleSwitcher from "./components/LocaleSwitcher";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import type { AppConfig } from "@prefabs.tech/react-config";
import type { InitOptions } from "i18next";

const plugin = (options: InitOptions) => {
  use(LanguageDetector)
    .use(initReactI18next)
    .use(ChainedBackend)
    .init({
      ...options,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        backends: [
          resourcesToBackend((language, namespace, callback) => {
            import(`./locales/${language}/${namespace}.json`)
              .then((resources) => {
                callback(null, resources);
              })
              .catch((error) => {
                callback(error, null);
              });
          }),
        ],
      },
    });
};

declare module "@prefabs.tech/react-config" {
  export interface AppConfig {
    i18n: InitOptions & { showBadge?: boolean };
  }
}

export default plugin;

export { LocaleSwitcher, useTranslation, Trans };
