import { flexRender, RowData, Table } from "@tanstack/react-table";
import React, { SyntheticEvent, useCallback, useState } from "react";

import { DebouncedInput, Select } from "@/FormWidgets";

import type { TDataTableProperties } from "./types";

import { TableDateFilter } from "./TableDateFilter";
import {
  ColumnHeader,
  TableRow,
  TableHeader as TTableHeader,
} from "./TableElements";
import { TableRangeFilter } from "./TableRangeFilter";
import { getAlignValue } from "./utilities";

interface THeaderProperty<T> extends Pick<
  TDataTableProperties<T>,
  "inputDebounceTime" | "renderSortIcons"
> {
  highlight?: boolean;
  table: Table<T>;
}

export const TableHeader = <TData extends RowData>({
  highlight = false,
  inputDebounceTime,
  renderSortIcons,
  table,
}: THeaderProperty<TData>) => {
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);

  const handleSort = useCallback(
    (event: SyntheticEvent, sortHandler?: (event: SyntheticEvent) => void) => {
      event.stopPropagation();
      if (sortHandler) {
        sortHandler(event);
      }
    },
    [],
  );

  const renderHeaderRow = () =>
    table.getHeaderGroups().map((headerGroup) => (
      <TableRow className="header-row" key={headerGroup.id}>
        {headerGroup.headers.map(
          ({ colSpan, column, getContext, id, isPlaceholder }) => {
            const {
              columnDef,
              getCanSort,
              getIsSorted,
              getToggleSortingHandler,
            } = column;

            const isSorted = ["asc", "desc"].includes(getIsSorted() as string);
            const activeColumnClass = isSorted && highlight ? "highlight" : "";

            if (!isFilterRowVisible && column.getCanFilter()) {
              setIsFilterRowVisible(true);
            }

            const getSortIcon = () => {
              if (renderSortIcons) {
                return renderSortIcons(getIsSorted());
              }

              switch (getIsSorted()) {
                case "asc":
                  return <i className="pi pi-sort-up-fill"></i>;
                case "desc":
                  return <i className="pi pi-sort-down-fill"></i>;
                default:
                  return <i className="pi pi-sort"></i>;
              }
            };

            return (
              <ColumnHeader
                className={`column-${id} ${
                  columnDef.className || ""
                } ${activeColumnClass} ${
                  columnDef.enableSorting ? "sortable" : ""
                }`
                  .replace(/\s\s/, " ")
                  .trimEnd()}
                colSpan={colSpan}
                data-align={getAlignValue({
                  align: columnDef.align,
                  dataType: columnDef.dataType,
                })}
                key={id}
                onClick={(event) => {
                  if (getCanSort()) {
                    handleSort(event, getToggleSortingHandler());
                  }
                }}
                style={{
                  maxWidth: columnDef.maxWidth,
                  minWidth: columnDef.minWidth,
                  width: columnDef.width,
                }}
              >
                <>
                  {isPlaceholder ? null : (
                    <>
                      {flexRender(columnDef.header, getContext())}

                      {getCanSort() ? (
                        <span className="sort-state">{getSortIcon()}</span>
                      ) : null}
                    </>
                  )}
                </>
              </ColumnHeader>
            );
          },
        )}
      </TableRow>
    ));

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderColumnFilter = (column: any) => {
    if (column.columnDef.customFilterComponent) {
      return column.columnDef.customFilterComponent(column);
    }

    const columnFilterValue = column.getFilterValue();
    const variant = column.columnDef.meta?.filterVariant;

    if (variant === "select") {
      return (
        <Select
          enableTooltip
          matchMenuTriggerWidth={false}
          name="select"
          onChange={(value) => column.setFilterValue(value)}
          options={column.columnDef.meta?.filterOptions || []}
          placeholder={column.columnDef.filterPlaceholder || ""}
          tooltipOptions={{
            offset: 15,
            position: "top",
          }}
          value={(columnFilterValue as string) || ""}
        />
      );
    }

    if (variant === "multiselect") {
      return (
        <Select
          enableTooltip
          matchMenuTriggerWidth={false}
          multiple
          name="multiselect"
          onChange={(value) => {
            if (!value || value.length === 0) {
              column.setFilterValue(undefined);
            } else {
              column.setFilterValue(value);
            }
          }}
          options={column.columnDef.meta?.filterOptions || []}
          placeholder={column.columnDef.filterPlaceholder || ""}
          tooltipOptions={{
            offset: 15,
            position: "top",
          }}
          value={(columnFilterValue as string[]) || []}
        />
      );
    }

    if (variant === "dateRange") {
      return <TableDateFilter column={column} />;
    }

    if (variant === "range" || column.columnDef.dataType === "number") {
      return (
        <TableRangeFilter
          column={column}
          inputDebounceTime={inputDebounceTime}
        />
      );
    }

    return (
      <DebouncedInput
        debounceTime={inputDebounceTime}
        defaultValue={columnFilterValue as string}
        onInputChange={(value) => column.setFilterValue(value)}
        placeholder={column.columnDef.filterPlaceholder || ""}
      />
    );
  };

  const renderFilterRow = () => {
    if (!isFilterRowVisible) {
      return null;
    }

    return (
      <TableRow className="header-row filters" key="filters">
        {table.getVisibleLeafColumns().map((column) => {
          if (!column.getCanFilter()) {
            return <ColumnHeader key={"filter" + column.id}></ColumnHeader>;
          }

          const activeColumnClass =
            column.getIsFiltered() && highlight ? "highlight" : "";

          const filterColumnClass = column.getCanFilter()
            ? `filter ${column.columnDef.meta?.filterVariant}`
            : "";

          return (
            <ColumnHeader
              className={`${
                column.id ? `column-${column.id}` : ``
              } ${activeColumnClass} ${
                column.columnDef.className || ""
              } ${filterColumnClass}`
                .replace(/\s\s/, " ")
                .trimEnd()}
              data-align={getAlignValue({
                align: column.columnDef.align,
                dataType: column.columnDef.dataType,
              })}
              data-label={column.id}
              key={"filter" + column.id}
              style={{
                maxWidth: column.columnDef.maxWidth,
                minWidth: column.columnDef.minWidth,
                width: column.columnDef.width,
              }}
            >
              {renderColumnFilter(column)}
            </ColumnHeader>
          );
        })}
      </TableRow>
    );
  };

  return (
    <TTableHeader>
      {renderHeaderRow()}
      {renderFilterRow()}
    </TTableHeader>
  );
};
