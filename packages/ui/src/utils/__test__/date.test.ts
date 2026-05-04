import { describe, expect, test } from "vitest";

import { formatDate, formatDateTime } from "../date";

describe("formatDate unit test", () => {
  test("Should return a passed locale based formatted date", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "en-US";

    expect(formatDate(date, locale)).toBe("Jan 9, 2024");
  });

  test("Should return a default formatted date if locale is not passed", () => {
    const date = new Date("1/9/2024").getTime();

    expect(formatDate(date)).toBe("9 Jan 2024");
  });

  test("Should return formatted date according to the options provided", () => {
    const date = "2024-12-11T12:00:00Z";

    const locale = "en-GB";

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    };

    expect(formatDate(date, locale, options)).toBe("11 December 24");
  });

  test("Should return null if date is empty", () => {
    const date = "";

    expect(formatDate(date)).toBeNull();
  });

  test("Should return null if not a valid date", () => {
    const date = "date";

    expect(formatDate(date)).toBeNull();
  });

  test("Should throw error if invalid locale is passed", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "ne-N";

    try {
      formatDate(date, locale);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError("Invalid language tag: ne-n");
    }
  });
});

describe("formatDateTime unit test", () => {
  test("Should return null when no date is passed", () => {
    const date = "";

    expect(formatDateTime(date)).toBeNull();
  });

  test("Should return null if not a valid date", () => {
    const date = "date";

    expect(formatDateTime(date)).toBeNull();
  });

  test("Should return a string if valid date and locale is passed.", () => {
    const date = "2024-12-12T00:00:00Z";
    const locale = "ne-US";

    expect(formatDateTime(date, locale)).toBeTypeOf("string");
  });

  test("Should throw error if invalid locale is passed", () => {
    const date = new Date("1/9/2024").getTime();
    const locale = "ne-N";

    expect(() => {
      formatDateTime(date, locale);
    }).toThrowError("Invalid language tag: ne-n");
  });
});
