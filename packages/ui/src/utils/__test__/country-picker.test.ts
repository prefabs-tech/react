import { describe, expect, test } from "vitest";

import defaultEnglishTranslation from "../../FormWidgets/CountryPicker/en.json";
import {
  getFallbackTranslation,
  getFlagClass,
  getLabel,
  sortByLabel,
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
      arguments: {
        fallbackLocale: "fr",
        locales: locales,
      },
      name: "Should return translation from locales if fallbackLocale exists in it",
      result: frenchTranslation,
    },
    {
      arguments: {
        fallbackLocale: "en",
        locales: {},
      },
      name: "Should return defaultEnglishTranslation if fallbackLocale is 'en' and not in locales",
      result: defaultEnglishTranslation,
    },
    {
      arguments: {
        fallbackLocale: "en",
        locales: { en: customEnglishTranslation },
      },
      name: "Should prioritize locales['en'] over defaultEnglishTranslation if provided",
      result: customEnglishTranslation,
    },
    {
      arguments: {
        fallbackLocale: "de",
        locales: locales,
      },
      name: "Should return null if fallbackLocale is not found and is not 'en'",
      result: null,
    },
    {
      arguments: {
        fallbackLocale: "fr",
        locales: undefined,
      },
      name: "Should handle undefined locales gracefully",
      result: null,
    },
    {
      arguments: {
        fallbackLocale: "en",
        locales: undefined,
      },
      name: "Should return defaultEnglishTranslation when locales is undefined but fallback is 'en'",
      result: defaultEnglishTranslation,
    },
  ];

  testCases.map((testCase) => {
    const { fallbackLocale, locales } = testCase.arguments;

    test(testCase.name, () => {
      const result = getFallbackTranslation(fallbackLocale, locales as Locales);

      expect(result).toEqual(testCase.result);
    });
  });
});

describe("getFlagClass", () => {
  const testCases = [
    {
      arguments: { code: "US", position: "left", style: "normal" },
      name: "Should generate basic class with code only",
      result: "flag-icon flag-icon-us",
    },
    {
      arguments: { code: "  GB  ", position: "left", style: "normal" },
      name: "Should handle lowercase and trimming of country code",
      result: "flag-icon flag-icon-gb",
    },
    {
      arguments: { code: "fr", position: "right", style: "normal" },
      name: "Should add 'flag-icon-right' when position is 'right'",
      result: "flag-icon flag-icon-fr flag-icon-right",
    },
    {
      arguments: { code: "fr", position: "right-edge", style: "normal" },
      name: "Should add 'flag-icon-right-edge' when position is 'right-edge'",
      result: "flag-icon flag-icon-fr flag-icon-right-edge",
    },
    {
      arguments: { code: "jp", position: "left", style: "circle" },
      name: "Should add 'flag-icon-rounded' when style is 'circle'",
      result: "flag-icon flag-icon-jp flag-icon-rounded",
    },
    {
      arguments: { code: "jp", position: "left", style: "square" },
      name: "Should add 'flag-icon-squared' when style is 'square'",
      result: "flag-icon flag-icon-jp flag-icon-squared",
    },
    {
      arguments: { code: "ca", position: "right", style: "circle" },
      name: "Should combine multiple classes correctly",
      result: "flag-icon flag-icon-ca flag-icon-right flag-icon-rounded",
    },
    {
      arguments: { code: undefined, position: "left", style: "normal" },
      name: "Should handle undefined code gracefully",
      result: "flag-icon",
    },
  ];

  testCases.map((testCase) => {
    const { code, position, style } = testCase.arguments;

    test(testCase.name, () => {
      const result = getFlagClass(code, position, style);

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
      arguments: {
        code: "FR",
        fallbackTranslation: fallbackTranslation,
        locale: "es",
        locales: locales,
      },
      name: "Should return translation from locales if available (ES -> FR)",
      result: "Francia",
    },
    {
      arguments: {
        code: "DE",
        fallbackTranslation: fallbackTranslation,
        locale: "it",
        locales: locales,
      },
      name: "Should return fallback translation if locale is missing in locales",
      result: "Germany",
    },
    {
      arguments: {
        code: "JP",
        fallbackTranslation: fallbackTranslation,
        locale: "fr",
        locales: { fr: { FR: "France" } },
      },
      name: "Should return fallback translation if code is missing in specific locale",
      result: "Japan",
    },
    {
      arguments: {
        code: "ZZ",
        fallbackTranslation: fallbackTranslation,
        locale: "fr",
        locales: locales,
      },
      name: "Should return the raw code if found nowhere",
      result: "ZZ",
    },
    {
      arguments: {
        code: "US",
        fallbackTranslation: fallbackTranslation,
        locale: "fr",
        locales: undefined,
      },
      name: "Should handle undefined locales gracefully",
      result: "United States",
    },
    {
      arguments: {
        code: "ZZ",
        fallbackTranslation: fallbackTranslation,
        locale: "en",
        locales: undefined,
      },
      name: "Should return code if locales is undefined and fallback is missing code",
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

describe("sortByLabel", () => {
  const optionAlpha = { label: "Alpha", value: 1 };
  const optionBeta = { label: "Beta", value: 2 };
  const optionZebra = { label: "Zebra", value: 3 };
  const optionNoLabel = { label: undefined, value: 4 };
  const optionEmptyLabel = { label: "", value: 5 };

  const testCases = [
    {
      arguments: {
        optionA: optionAlpha,
        optionB: optionBeta,
      },
      name: "Should return negative number when Option A comes alphabetically before Option B",
      result: -1,
    },
    {
      arguments: {
        optionA: optionZebra,
        optionB: optionAlpha,
      },
      name: "Should return positive number when Option A comes alphabetically after Option B",
      result: 1,
    },
    {
      arguments: {
        optionA: optionAlpha,
        optionB: { ...optionAlpha, value: 99 },
      },
      name: "Should return 0 when labels are identical",
      result: 0,
    },
    {
      arguments: {
        optionA: optionNoLabel,
        optionB: optionAlpha,
      },
      name: "Should return 1 (move A to end) if Option A has no label",
      result: 1,
    },
    {
      arguments: {
        optionA: optionAlpha,
        optionB: optionNoLabel,
      },
      name: "Should return -1 (move B to end) if Option B has no label",
      result: -1,
    },
    {
      arguments: {
        optionA: optionEmptyLabel,
        optionB: optionAlpha,
      },
      name: "Should return 1 (move A to end) if Option A has an empty string label",
      result: 1,
    },
    {
      arguments: {
        optionA: optionNoLabel,
        optionB: optionNoLabel,
      },
      name: "Should return 1 (move A to end) if both options have missing labels",
      result: 1,
    },
  ];

  testCases.map((testCase) => {
    const { optionA, optionB } = testCase.arguments;

    test(testCase.name, () => {
      const result = sortByLabel(optionA, optionB);

      expect(result).toBe(testCase.result);
    });
  });
});
