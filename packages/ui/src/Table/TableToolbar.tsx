import type { RowData, Table } from "@tanstack/react-table";

import type { TDataTableProperties } from "./types";

import { Button } from "../Buttons";
import { Checkbox } from "../FormWidgets";
import { Popup } from "../Popup";
import { SortableList } from "../SortableList";
import { TableToolbar as TTableToolbar } from "./TableElements";

interface TToolbar<T> extends Pick<
  TDataTableProperties<T>,
  | "dataActionsMenu"
  | "enableRowSelection"
  | "handleResetState"
  | "renderToolbarItems"
  | "showColumnsAction"
  | "showResetStateAction"
> {
  columnActionButtonLabel: string;
  resetActionButtonLabel: string;
  table: Table<T>;
}

export const TableToolbar = <TData extends RowData>({
  columnActionButtonLabel,
  dataActionsMenu,
  enableRowSelection,
  handleResetState,
  renderToolbarItems,
  resetActionButtonLabel,
  showColumnsAction,
  showResetStateAction,
  table,
}: TToolbar<TData>) => {
  const items = table
    .getAllLeafColumns()
    .filter((column) => column.id !== "select" && column.id !== "actions")
    .map((column, index) => ({
      data: column,
      id: index,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (data: any) => {
        let header = data.columnDef.header;

        if (typeof data.columnDef.header === "function") {
          header = data.columnDef.header();
        }

        return (
          <Checkbox
            checked={data.getIsVisible()}
            label={header}
            onChange={() => data.toggleVisibility()}
          />
        );
      },
    }));

  return (
    <TTableToolbar
      children={
        <>
          {showResetStateAction ? (
            <Button
              label={resetActionButtonLabel}
              onClick={handleResetState}
              severity="secondary"
              variant="outlined"
            />
          ) : null}

          {showColumnsAction ? (
            <Popup
              content={
                <SortableList
                  items={items}
                  onSort={(sorted) => {
                    table.setColumnOrder([
                      ...(enableRowSelection ? ["select"] : []),
                      ...sorted.map((item) => item.data.id),
                      ...(dataActionsMenu ? ["actions"] : []),
                    ]);
                  }}
                />
              }
              trigger={
                <Button
                  label={columnActionButtonLabel}
                  severity="secondary"
                  variant="outlined"
                />
              }
            />
          ) : null}

          {renderToolbarItems ? renderToolbarItems(table) : null}
        </>
      }
    />
  );
};
