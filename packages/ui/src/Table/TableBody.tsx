import {
  Cell,
  flexRender,
  NoInfer,
  Row,
  RowData,
  Table,
} from "@tanstack/react-table";
import React from "react";

import type { TDataTableProperties } from "./types";

import { formatDate, formatDateTime } from "..";
import {
  TableCell,
  TableRow,
  TooltipWrapper,
  TableBody as TTableBody,
} from "./TableElements";
import { formatNumber, getAlignValue } from "./utilities";

interface TableBodyProperties<TData extends RowData> extends Pick<
  TDataTableProperties<TData>,
  "customFormatters" | "emptyTableMessage" | "enableRowSelection" | "isLoading"
> {
  locale?: string;
  parsedColumnsLength: number;
  rowClassName?: ((options: { row: Row<TData> }) => string) | string;
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
                          hour12: false,
                          minute: "2-digit",
                        };
                      const numberOptions = cell.column.columnDef.numberOptions;

                      const getFormattedValue = (): NoInfer<never> => {
                        const defaultCustomFormatters: Record<
                          string,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (value: any) => NoInfer<never>
                        > = {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          currency: (value: any) =>
                            formatNumber({
                              formatOptions: {
                                currency: "USD",
                                style: "currency",
                                ...(numberOptions?.formatOptions &&
                                  numberOptions.formatOptions),
                              },
                              locale: numberOptions?.locale ?? locale,
                              value: Number(value),
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
                          number: (value: any) =>
                            formatNumber({
                              formatOptions: numberOptions?.formatOptions,
                              locale: numberOptions?.locale ?? locale,
                              value: Number(value),
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
                        getValue: () => getFormattedValue(),
                        renderValue: () => getFormattedValue(),
                      };
                    };

                  return (
                    <TableCell
                      className={`${
                        cell.column.id ? `cell-${cell.column.id}` : ``
                      } ${cell.column.columnDef.className || ""}`
                        .replace(/\s\s/, " ")
                        .trimEnd()}
                      data-align={getAlignValue({
                        align: cell.column.columnDef.align,
                        dataType: cell.column.columnDef.dataType,
                      })}
                      data-label={cell.column.id}
                      key={cell.id}
                      style={{
                        maxWidth: cell.column.columnDef.maxWidth,
                        minWidth: cell.column.columnDef.minWidth,
                        width: cell.column.columnDef.width,
                      }}
                    >
                      {cell.column.columnDef.tooltip ? (
                        <TooltipWrapper
                          cellContent={flexRender(
                            cell.column.columnDef.cell,
                            getFormattedValueContext(),
                          )}
                          tooltipOptions={{
                            children: renderTooltipContent(cell),
                            ...cell.column.columnDef?.tooltipOptions,
                          }}
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
