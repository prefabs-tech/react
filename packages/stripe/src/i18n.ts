import { registerTranslations as _registerTranslations } from "@prefabs.tech/react-i18n";

import { translations } from "./locales";

export const registerTranslations = () => {
  _registerTranslations(translations);
};
