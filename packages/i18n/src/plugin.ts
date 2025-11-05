import "./assets/css/index.css";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
import { initReactI18next } from "react-i18next";

import { translations } from "./locales";
import { registerTranslations } from "./utils/translations";

import type { InitOptions } from "i18next";

const plugin = (options: InitOptions) => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(ChainedBackend)
    .init({
      ...options,
      interpolation: {
        escapeValue: false,
      },
    });

  // merge default translatins from this package
  registerTranslations(translations);
};

export default plugin;
