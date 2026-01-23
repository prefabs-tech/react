import { describe, expect, test } from "vitest";

import defaultEnglishTranslation from "../../FormWidgets/CountryPicker/en.json";
import {
  getFallbackTranslation,
  getFlagClass,
  getLabel,
} from "../country-picker";

import type { Locales } from "../../types";

describe("getFallbackTranslation", () => {
  const frenchTranslation = {
    DE: "Allemagne",
    BR: "Brésil",
    CA: "Canada",
    CN: "Chine",
    ES: "Espagne",
    US: "États-Unis",
    FR: "France",
    IT: "Italie",
    JP: "Japon",
    GB: "Royaume-Uni",
    RU: "Russie",
  };

  const spanishTranslation = {
    DE: "Alemania",
    BR: "Brasil",
    CA: "Canadá",
    CN: "China",
    ES: "España",
    US: "Estados Unidos",
    FR: "Francia",
    IT: "Italia",
    JP: "Japón",
    GB: "Reino Unido",
    RU: "Rusia",
  };

  const locales = {
    fr: frenchTranslation,
    es: spanishTranslation,
  };

  const customEnglishTranslation = { FR: "France" };

  const testCases = [
    {
      name: "Should return translation from locales if fallbackLocale exists in it",
      arguments: {
        fallbackLocale: "fr",
        locales: locales,
      },
      result: frenchTranslation,
    },
    {
      name: "Should return defaultEnglishTranslation if fallbackLocale is 'en' and not in locales",
      arguments: {
        fallbackLocale: "en",
        locales: {},
      },
      result: defaultEnglishTranslation,
    },
    {
      name: "Should prioritize locales['en'] over defaultEnglishTranslation if provided",
      arguments: {
        fallbackLocale: "en",
        locales: { en: customEnglishTranslation },
      },
      result: customEnglishTranslation,
    },
    {
      name: "Should return null if fallbackLocale is not found and is not 'en'",
      arguments: {
        fallbackLocale: "de",
        locales: locales,
      },
      result: null,
    },
    {
      name: "Should handle undefined locales gracefully",
      arguments: {
        fallbackLocale: "fr",
        locales: undefined,
      },
      result: null,
    },
    {
      name: "Should return defaultEnglishTranslation when locales is undefined but fallback is 'en'",
      arguments: {
        fallbackLocale: "en",
        locales: undefined,
      },
      result: defaultEnglishTranslation,
    },
  ];

  testCases.map((testCase) => {
    test(testCase.name, () => {
      const result = getFallbackTranslation(
        testCase.arguments.fallbackLocale,
        testCase.arguments.locales as Locales,
      );

      expect(result).toEqual(testCase.result);
    });
  });
});

describe("getFlagClass", () => {
  const testCases = [
    {
      name: "Should generate basic class with code only",
      arguments: { code: "US", position: "left", style: "normal" },
      result: "flag-icon flag-icon-us",
    },
    {
      name: "Should handle lowercase and trimming of country code",
      arguments: { code: "  GB  ", position: "left", style: "normal" },
      result: "flag-icon flag-icon-gb",
    },
    {
      name: "Should add 'flag-icon-right' when position is 'right'",
      arguments: { code: "fr", position: "right", style: "normal" },
      result: "flag-icon flag-icon-fr flag-icon-right",
    },
    {
      name: "Should add 'flag-icon-right-edge' when position is 'right-edge'",
      arguments: { code: "fr", position: "right-edge", style: "normal" },
      result: "flag-icon flag-icon-fr flag-icon-right-edge",
    },
    {
      name: "Should add 'flag-icon-rounded' when style is 'circle'",
      arguments: { code: "jp", position: "left", style: "circle" },
      result: "flag-icon flag-icon-jp flag-icon-rounded",
    },
    {
      name: "Should add 'flag-icon-squared' when style is 'square'",
      arguments: { code: "jp", position: "left", style: "square" },
      result: "flag-icon flag-icon-jp flag-icon-squared",
    },
    {
      name: "Should combine multiple classes correctly",
      arguments: { code: "ca", position: "right", style: "circle" },
      result: "flag-icon flag-icon-ca flag-icon-right flag-icon-rounded",
    },
    {
      name: "Should handle undefined code gracefully",
      arguments: { code: undefined, position: "left", style: "normal" },
      result: "flag-icon",
    },
  ];

  testCases.map((testCase) => {
    test(testCase.name, () => {
      const result = getFlagClass(
        testCase.arguments.code as string,
        testCase.arguments.position,
        testCase.arguments.style,
      );

      expect(result).toBe(testCase.result);
    });
  });
});

describe("getLabel", () => {
  const frenchTranslation = {
    DE: "Allemagne",
    US: "États-Unis",
    FR: "France",
  };

  const spanishTranslation = {
    DE: "Alemania",
    US: "Estados Unidos",
    FR: "Francia",
  };

  const locales = {
    fr: frenchTranslation,
    es: spanishTranslation,
  };

  const fallbackTranslation = {
    US: "United States",
    FR: "France",
    DE: "Germany",
    JP: "Japan",
  };

  const testCases = [
    {
      name: "Should return translation from locales if available (ES -> FR)",
      arguments: {
        code: "FR",
        locale: "es",
        locales: locales,
        fallbackTranslation: fallbackTranslation,
      },
      result: "Francia",
    },
    {
      name: "Should return fallback translation if locale is missing in locales",
      arguments: {
        code: "DE",
        locale: "it",
        locales: locales,
        fallbackTranslation: fallbackTranslation,
      },
      result: "Germany",
    },
    {
      name: "Should return fallback translation if code is missing in specific locale",
      arguments: {
        code: "JP",
        locale: "fr",
        locales: { fr: { FR: "France" } },
        fallbackTranslation: fallbackTranslation,
      },
      result: "Japan",
    },
    {
      name: "Should return the raw code if found nowhere",
      arguments: {
        code: "ZZ",
        locale: "fr",
        locales: locales,
        fallbackTranslation: fallbackTranslation,
      },
      result: "ZZ",
    },
    {
      name: "Should handle undefined locales gracefully",
      arguments: {
        code: "US",
        locale: "fr",
        locales: undefined,
        fallbackTranslation: fallbackTranslation,
      },
      result: "United States",
    },
    {
      name: "Should return code if locales is undefined and fallback is missing code",
      arguments: {
        code: "ZZ",
        locale: "en",
        locales: undefined,
        fallbackTranslation: fallbackTranslation,
      },
      result: "ZZ",
    },
  ];

  testCases.map((testCase) => {
    const { code, locale, locales, fallbackTranslation } = testCase.arguments;

    test(testCase.name, () => {
      const result = getLabel(code, locale, locales, fallbackTranslation);

      expect(result).toBe(testCase.result);
    });
  });
});
