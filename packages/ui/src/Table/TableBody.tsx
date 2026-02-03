import {
  Cell,
  flexRender,
  Table,
  NoInfer,
  Row,
  RowData,
} from "@tanstack/react-table";
import React from "react";

import { formatDate, formatDateTime } from "..";
import {
  TableCell,
  TableRow,
  TooltipWrapper,
  TableBody as TTableBody,
} from "./TableElements";
import { formatNumber, getAlignValue } from "./utils";

import type { TDataTableProperties } from "./types";

interface TableBodyProperties<TData extends RowData> extends Pick<
  TDataTableProperties<TData>,
  "enableRowSelection" | "customFormatters" | "emptyTableMessage" | "isLoading"
> {
  locale?: string;
  parsedColumnsLength: number;
  rowClassName?: string | ((options: { row: Row<TData> }) => string);
  table: Table<TData>;
}

export const TableBody = <TData extends RowData>({
  customFormatters = {},
  emptyTableMessage = "No results.",
  enableRowSelection,
  isLoading,
  locale,
  parsedColumnsLength,
  rowClassName,
  table,
}: TableBodyProperties<TData>) => {
  const renderTooltipContent = (
    cell: Cell<TData, unknown>,
  ): React.ReactNode => {
    const tooltip = cell.column.columnDef.tooltip;

    if (typeof tooltip === "string") {
      return tooltip;
    } else if (typeof tooltip === "function") {
      return tooltip(cell);
    }

    return cell.getValue() as string;
  };

  const getRowClassName = (row: Row<TData>) => {
    if (!rowClassName) {
      return "";
    }

    if (typeof rowClassName === "string") {
      return rowClassName;
    }

    return rowClassName({ row });
  };

  return (
    <TTableBody>
      {isLoading ? null : (
        <>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={getRowClassName(row)}
                data-id={(row.original as any).id ?? row.id} // eslint-disable-line @typescript-eslint/no-explicit-any
                key={row.id}
                {...(enableRowSelection && {
                  "data-selected": row.getIsSelected(),
                })}
              >
                {row.getVisibleCells().map((cell) => {
                  const getFormattedValueContext: typeof cell.getContext =
                    () => {
                      const cellContext = cell.getContext();
                      const renderValue = cellContext.getValue;
                      const dateOptions = cell.column.columnDef.dateOptions;
                      const defaultDateOptions: Intl.DateTimeFormatOptions = {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      };
                      const defaultDateTimeOptions: Intl.DateTimeFormatOptions =
                        {
                          ...defaultDateOptions,
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        };
                      const numberOptions = cell.column.columnDef.numberOptions;

                      const getFormattedValue = (): NoInfer<never> => {
                        const defaultCustomFormatters: Record<
                          string,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (value: any) => NoInfer<never>
                        > = {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          number: (value: any) =>
                            formatNumber({
                              value: Number(value),
                              locale: numberOptions?.locale ?? locale,
                              formatOptions: numberOptions?.formatOptions,
                            }) as NoInfer<never>,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          date: (value: any) =>
                            formatDate(
                              value,
                              dateOptions?.locale ?? locale,
                              dateOptions?.formatOptions ?? defaultDateOptions,
                            ) as NoInfer<never>,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          datetime: (value: any) =>
                            formatDateTime(
                              value,
                              dateOptions?.locale ?? locale,
                              dateOptions?.formatOptions ??
                                defaultDateTimeOptions,
                            ) as NoInfer<never>,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          currency: (value: any) =>
                            formatNumber({
                              value: Number(value),
                              locale: numberOptions?.locale ?? locale,
                              formatOptions: {
                                style: "currency",
                                currency: "USD",
                                ...(numberOptions?.formatOptions &&
                                  numberOptions.formatOptions),
                              },
                            }) as NoInfer<never>,
                          ...customFormatters,
                        };

                        const dataType: string =
                          cell.column.columnDef.dataType || "text";

                        return (
                          defaultCustomFormatters?.[dataType]?.(
                            renderValue(),
                          ) || renderValue()
                        );
                      };

                      return {
                        ...cellContext,
                        renderValue: () => getFormattedValue(),
                        getValue: () => getFormattedValue(),
                      };
                    };

                  return (
                    <TableCell
                      key={cell.id}
                      data-label={cell.column.id}
                      data-align={getAlignValue({
                        align: cell.column.columnDef.align,
                        dataType: cell.column.columnDef.dataType,
                      })}
                      className={`${
                        cell.column.id ? `cell-${cell.column.id}` : ``
                      } ${cell.column.columnDef.className || ""}`
                        .replace(/\s\s/, " ")
                        .trimEnd()}
                      style={{
                        width: cell.column.columnDef.width,
                        maxWidth: cell.column.columnDef.maxWidth,
                        minWidth: cell.column.columnDef.minWidth,
                      }}
                    >
                      {cell.column.columnDef.tooltip ? (
                        <TooltipWrapper
                          tooltipOptions={{
                            children: renderTooltipContent(cell),
                            ...cell.column.columnDef?.tooltipOptions,
                          }}
                          cellContent={flexRender(
                            cell.column.columnDef.cell,
                            getFormattedValueContext(),
                          )}
                        ></TooltipWrapper>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          getFormattedValueContext(),
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={parsedColumnsLength}>
                {emptyTableMessage}
              </TableCell>
            </TableRow>
          )}
        </>
      )}
    </TTableBody>
  );
};
