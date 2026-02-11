import { describe, expect, test } from "vitest";

import { formatNumber } from "../../utilities";

describe("FormatNumber unit test", () => {
  test("Should return a US locale based formatted number", () => {
    const value = 10_000_000;
    const locale = "en-US";

    expect(formatNumber({ value, locale })).toBe("10,000,000");
  });

  test("Should return a Indian locale based formatted number", () => {
    const value = 10_000_000;
    const locale = "en-IN";

    expect(formatNumber({ value, locale })).toBe("1,00,00,000");
  });

  test("Should return a USD currency formatted number", () => {
    const value = 10_000_000;
    const locale = "en-US";

    expect(
      formatNumber({
        value,
        locale,
        formatOptions: {
          style: "currency",
          currency: "USD",
        },
      }),
    ).toBe("$10,000,000.00");
  });

  test("Should throw error if invalid locale is passed", () => {
    const value = 100_000;
    const locale = "ne-N";

    try {
      formatNumber({ value, locale });
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError("Invalid language tag: ne-n");
    }
  });
});
