const defaultDateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
  ...defaultDateOptions,
  hour: "numeric",
  hour12: true,
  minute: "numeric",
};

export const formatDate = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  if (!date) {
    return null;
  }

  const dateFormatOptions = { ...defaultDateOptions, ...options };

  const formattedDate = new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateFormatOptions,
  );

  return formattedDate === "Invalid Date" ? null : formattedDate;
};

export const formatDateTime = (
  date: number | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  if (!date) {
    return null;
  }

  const dateTimeFormatOptions = { ...defaultDateTimeOptions, ...options };

  const formattedDateTime = new Date(date).toLocaleDateString(
    locale || "en-GB",
    dateTimeFormatOptions,
  );

  return formattedDateTime === "Invalid Date" ? null : formattedDateTime;
};
