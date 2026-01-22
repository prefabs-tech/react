import { describe, expect, test } from "vitest";

import defaultEnglishTranslation from "../../FormWidgets/CountryPicker/en.json";
import {
  getFallbackTranslation,
  getFlagClass,
  getLabel,
} from "../country-picker";

const frenchTranslation = {
  DE: "Allemagne",
  BR: "Brésil",
  CA: "Canada",
  CN: "Chine",
  ES: "Espagne",
  US: "États‑Unis",
  FR: "France",
  IT: "Italie",
  JP: "Japon",
  GB: "Royaume‑Uni",
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

describe("getFallbackTranslation", () => {
  test("Should return translation from locales if fallbackLocale exists in it", () => {
    const result = getFallbackTranslation("fr", locales);

    expect(result).toEqual(frenchTranslation);
  });

  test("Should return defaultEnglishTranslation if fallbackLocale is 'en' and not in locales", () => {
    const result = getFallbackTranslation("en", {});

    expect(result).toEqual(defaultEnglishTranslation);
  });

  test("Should prioritize locales['en'] over defaultEnglishTranslation if provided", () => {
    const englishTranslation = { FR: "France" };
    const locales = { en: englishTranslation };
    const result = getFallbackTranslation("en", locales);

    expect(result).toEqual(englishTranslation);
  });

  test("Should return null if fallbackLocale is not found and is not 'en'", () => {
    const result = getFallbackTranslation("de", locales);

    expect(result).toBeNull();
  });

  test("Should handle undefined locales gracefully", () => {
    const result = getFallbackTranslation("fr", undefined);

    expect(result).toBeNull();
  });

  test("Should return defaultEnglishTranslation when locales is undefined but fallback is 'en'", () => {
    const result = getFallbackTranslation("en", undefined);

    expect(result).toEqual(defaultEnglishTranslation);
  });
});

describe("getFlagClass", () => {
  test("Should generate basic class with code only", () => {
    const result = getFlagClass("US", "left", "normal");

    expect(result).toBe("flag-icon flag-icon-us");
  });

  test("Should handle lowercase and trimming of country code", () => {
    const result = getFlagClass("  GB  ", "left", "normal");

    expect(result).toBe("flag-icon flag-icon-gb");
  });

  test("Should add 'flag-icon-right' when position is 'right'", () => {
    const result = getFlagClass("fr", "right", "normal");

    expect(result).toBe("flag-icon flag-icon-fr flag-icon-right");
  });

  test("Should add 'flag-icon-right-edge' when position is 'right-edge'", () => {
    const result = getFlagClass("fr", "right-edge", "normal");

    expect(result).toBe("flag-icon flag-icon-fr flag-icon-right-edge");
  });

  test("Should add 'flag-icon-rounded' when style is 'circle'", () => {
    const result = getFlagClass("jp", "left", "circle");

    expect(result).toBe("flag-icon flag-icon-jp flag-icon-rounded");
  });

  test("Should add 'flag-icon-squared' when style is 'square'", () => {
    const result = getFlagClass("jp", "left", "square");

    expect(result).toBe("flag-icon flag-icon-jp flag-icon-squared");
  });

  test("Should combine multiple classes correctly", () => {
    const result = getFlagClass("ca", "right", "circle");

    expect(result).toBe(
      "flag-icon flag-icon-ca flag-icon-right flag-icon-rounded",
    );
  });

  test("Should handle undefined code gracefully", () => {
    const result = getFlagClass(undefined, "left", "normal");

    expect(result).toBe("flag-icon");
  });
});

describe("getLabel", () => {
  const frenchTranslation = {
    DE: "Allemagne",
    US: "États‑Unis",
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
        fallback: fallbackTranslation,
      },
      result: "Francia",
    },
    {
      name: "Should return fallback translation if locale is missing in locales",
      arguments: {
        code: "DE",
        locale: "it",
        locales: locales,
        fallback: fallbackTranslation,
      },
      result: "Germany",
    },
    {
      name: "Should return fallback translation if code is missing in specific locale",
      arguments: {
        code: "JP",
        locale: "fr",
        locales: { fr: { FR: "France" } },
        fallback: fallbackTranslation,
      },
      result: "Japan",
    },
    {
      name: "Should return the raw code if found nowhere",
      arguments: {
        code: "ZZ",
        locale: "fr",
        locales: locales,
        fallback: fallbackTranslation,
      },
      result: "ZZ",
    },
    {
      name: "Should handle undefined locales gracefully",
      arguments: {
        code: "US",
        locale: "fr",
        locales: undefined,
        fallback: fallbackTranslation,
      },
      result: "United States",
    },
    {
      name: "Should return code if locales is undefined and fallback is missing code",
      arguments: {
        code: "ZZ",
        locale: "en",
        locales: undefined,
        fallback: fallbackTranslation,
      },
      result: "ZZ",
    },
  ];

  testCases.map((testCase) => {
    test(testCase.name, () => {
      const result = getLabel(
        testCase.arguments.code,
        testCase.arguments.locale,
        testCase.arguments.locales,
        testCase.arguments.fallback,
      );

      expect(result).toBe(testCase.result);
    });
  });
});
