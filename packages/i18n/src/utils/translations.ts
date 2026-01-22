import { default as i18n } from "i18next";

export const registerTranslations = (translations: object) => {
  Object.entries(translations).forEach(([lang, namespaces]) => {
    Object.entries(namespaces).forEach(([ns, res]) => {
      i18n.addResourceBundle(lang, ns, res, true, false); // deep merge = true, overwrite = false → app wins
    });
  });
};
