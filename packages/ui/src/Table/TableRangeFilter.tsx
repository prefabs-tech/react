import { Column } from "@tanstack/react-table";

import { DebouncedInput } from "@/FormWidgets";

type DateFilterProperties<TData> = {
  column: Column<TData, unknown>;
  inputDebounceTime?: number;
};

export const TableRangeFilter = <TData,>({
  column,
  inputDebounceTime,
}: DateFilterProperties<TData>) => {
  const updateRangeFilter = (
    column: Column<TData, unknown>,
    index: number,
    value: string | number | readonly string[],
  ): void => {
    const filterValue = column.getFilterValue();

    const currentFilter: (number | undefined)[] = Array.isArray(filterValue)
      ? [...filterValue]
      : [undefined, undefined];

    currentFilter[index] = value !== "" ? Number(value) : undefined;

    const isFilterActive = currentFilter.some(
      (filterInput) => filterInput !== undefined,
    );

    column.setFilterValue(isFilterActive ? currentFilter : undefined);
  };

  const filterValue = column.getFilterValue() as (number | undefined)[];

  return (
    <div className="number-range-filter">
      <DebouncedInput
        defaultValue={
          Array.isArray(filterValue) && filterValue[0] !== undefined
            ? filterValue[0]
            : ""
        }
        debounceTime={inputDebounceTime}
        name="range-start"
        onInputChange={(value) => updateRangeFilter(column, 0, value)}
        placeholder={
          column.columnDef.filterPlaceholder?.split(",")[0] ??
          column.columnDef.filterPlaceholder
        }
        type="number"
      />
      <DebouncedInput
        defaultValue={
          Array.isArray(filterValue) && filterValue[1] !== undefined
            ? filterValue[1]
            : ""
        }
        debounceTime={inputDebounceTime}
        name="range-end"
        onInputChange={(value) => updateRangeFilter(column, 1, value)}
        placeholder={
          column.columnDef.filterPlaceholder?.split(",")[1] ??
          column.columnDef.filterPlaceholder
        }
        type="number"
      />
    </div>
  );
};
