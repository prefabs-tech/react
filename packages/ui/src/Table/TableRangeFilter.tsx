import { Column } from "@tanstack/react-table";

import { DebouncedInput } from "@/FormWidgets";

import { isDefined } from "./utilities";

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
    value: number | readonly string[] | string,
  ): void => {
    const filterValue = column.getFilterValue();

    const currentFilter: (number | undefined)[] = Array.isArray(filterValue)
      ? [...filterValue]
      : [undefined, undefined];

    const numericValue = value !== "" ? Number(value) : undefined;

    if (numericValue !== undefined) {
      const { rangeFilterMax, rangeFilterMin } = column.columnDef.meta ?? {};

      if (rangeFilterMin !== undefined && numericValue < rangeFilterMin) {
        currentFilter[index] = rangeFilterMin;
      } else if (
        rangeFilterMax !== undefined &&
        numericValue > rangeFilterMax
      ) {
        currentFilter[index] = rangeFilterMax;
      } else {
        currentFilter[index] = numericValue;
      }
    } else {
      currentFilter[index] = undefined;
    }

    const isFilterActive = currentFilter.some(
      (filterInput) => filterInput !== undefined,
    );

    column.setFilterValue(isFilterActive ? currentFilter : undefined);
  };

  const filterValue = column.getFilterValue() as (number | undefined)[];
  const key = column.id || String(column.columnDef.accessorKey);
  const meta = column.columnDef.meta;

  const clampRangeValue = (value: string): string => {
    if (
      meta?.rangeFilterMin === undefined &&
      meta?.rangeFilterMax === undefined
    ) {
      return value;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return value;
    }

    if (
      meta.rangeFilterMin !== undefined &&
      numericValue < meta.rangeFilterMin
    ) {
      return String(meta.rangeFilterMin);
    }

    if (
      meta.rangeFilterMax !== undefined &&
      numericValue > meta.rangeFilterMax
    ) {
      return String(meta.rangeFilterMax);
    }

    return value;
  };

  return (
    <div className="number-range-filter">
      <DebouncedInput
        debounceTime={inputDebounceTime}
        defaultValue={
          Array.isArray(filterValue) && isDefined(filterValue[0])
            ? filterValue[0]
            : ""
        }
        max={meta?.rangeFilterMax}
        min={meta?.rangeFilterMin}
        name={`range-start-${key}`}
        onInputChange={(value) => updateRangeFilter(column, 0, value)}
        placeholder={
          column.columnDef.filterPlaceholder?.split(",")[0] ??
          column.columnDef.filterPlaceholder
        }
        sanitizeValue={clampRangeValue}
        type="number"
      />
      <DebouncedInput
        debounceTime={inputDebounceTime}
        defaultValue={
          Array.isArray(filterValue) && isDefined(filterValue[1])
            ? filterValue[1]
            : ""
        }
        max={meta?.rangeFilterMax}
        min={meta?.rangeFilterMin}
        name={`range-end-${key}`}
        onInputChange={(value) => updateRangeFilter(column, 1, value)}
        placeholder={
          column.columnDef.filterPlaceholder?.split(",")[1] ??
          column.columnDef.filterPlaceholder
        }
        sanitizeValue={clampRangeValue}
        type="number"
      />
    </div>
  );
};
