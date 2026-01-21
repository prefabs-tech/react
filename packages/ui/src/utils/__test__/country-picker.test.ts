import { describe, expect, test } from "vitest";

import defaultEnglishTranslation from "../../FormWidgets/CountryPicker/en.json";
import { getFallbackTranslation, getFlagClass } from "../country-picker";

const locales = {
  fr: { key: "Bonjour" },
  es: { key: "Hola" },
};

describe("getFallbackTranslation", () => {
  test("Should return translation from locales if fallbackLocale exists in it", () => {
    const result = getFallbackTranslation("fr", locales);
    expect(result).toEqual({ key: "Bonjour" });
  });

  test("Should return defaultEnglishTranslation if fallbackLocale is 'en' and not in locales", () => {
    const result = getFallbackTranslation("en", {});
    expect(result).toEqual(defaultEnglishTranslation);
  });

  test("Should prioritize locales['en'] over defaultEnglishTranslation if provided", () => {
    const customEn = { key: "Hello Custom" };
    const localesWithEn = { en: customEn };
    const result = getFallbackTranslation("en", localesWithEn);
    expect(result).toEqual(customEn);
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
