import { Column } from "@tanstack/react-table";
import { useState } from "react";

import { DatePicker } from "@/FormWidgets";

type DateFilterProperties<TData> = {
  column: Column<TData, unknown>;
};

export const TableDateFilter = <TData,>({
  column,
}: DateFilterProperties<TData>) => {
  const [dates, setDates] = useState<string[] | undefined>(undefined);

  const filterValue = column.getFilterValue() as string[] | null;

  const getFormattedDate = (date: Date | null) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const convertFilterValueToDate = (value: string[] | null) => {
    if (Array.isArray(filterValue)) {
      return filterValue.map((value) => new Date(value));
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean).map((_value) => new Date(_value));
    }

    return null;
  };

  return (
    <DatePicker
      inputRef={null}
      name="date-range"
      onChange={(date) => {
        if (!date) {
          setDates(undefined);
          column.setFilterValue(undefined);

          return;
        }

        const formatteddates = (date as Date[])
          .map(getFormattedDate)
          .filter((d) => d !== null);

        setDates(formatteddates as string[]);
        column.setFilterValue(
          formatteddates.length === 2 ? formatteddates : null,
        );
      }}
      value={convertFilterValueToDate(dates as string[])}
      selectionMode="range"
      placeholder={column.columnDef.filterPlaceholder || ""}
    />
  );
};
