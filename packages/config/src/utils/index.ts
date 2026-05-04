export const parse = (
  value: boolean | number | string | undefined,
  fallback: bigint | boolean | null | number | string,
) => {
  if (typeof value === "undefined") {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  switch (typeof fallback) {
    case "boolean":
      return !!JSON.parse(value as string);

    case "number":
      return JSON.parse(value as string);

    default:
      return value;
  }
};
