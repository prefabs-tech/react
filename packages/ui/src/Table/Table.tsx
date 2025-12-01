import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  PaginationState,
  Updater,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { getStorage } from "../utils";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_PER_OPTIONS,
  DEFAULT_PAGE_SIZE,
} from "./constants";
import { TableBody } from "./TableBody";
import { DataActionsMenu } from "./TableDataActions";
import { Table, TableFooter } from "./TableElements";
import { TableHeader } from "./TableHeader";
import { TableToolbar } from "./TableToolbar";
import {
  getRequestJSON,
  getParsedColumns,
  saveTableState,
  getSavedTableState,
  isDefined,
} from "./utils";
import { Checkbox } from "../FormWidgets";
import LoadingIcon from "../LoadingIcon";
import { Pagination } from "../Pagination";
import { FILTER_FUNCTIONS_ENUM } from "./enums";

import type { PersistentTableState, TDataTableProperties } from "./types";
import type { ColumnDef, RowData } from "@tanstack/react-table";

const DataTable = <TData extends RowData>({
  className = "",
  columnActionBtnLabel: columnActionButtonLabel = "Columns",
  columns = [],
  customFormatters,
  data,
  dataActionsMenu,
  emptyTableMessage,
  enableRowSelection = false,
  enableSortingRemoval = false,
  highlightHeader,
  id,
  initialFilters = [],
  initialSorting = [],
  inputDebounceTime,
  isLoading = false,
  locale,
  paginated = true,
  paginationOptions,
  persistState = true,
  persistStateStorage = "localStorage",
  resetStateActionBtnLabel: resetStateActionButtonLabel = "Reset all",
  rowClassName,
  rowPerPage,
  rowPerPageOptions = DEFAULT_PAGE_PER_OPTIONS,
  showColumnsAction = false,
  showResetStateAction,
  title,
  totalRecords = 0,
  visibleColumns = [],
  fetchData,
  onRowSelectChange,
  renderCustomPagination,
  renderSortIcons,
  renderTableFooterContent,
  renderToolbarItems,
  ...tableOptions
}: TDataTableProperties<TData>) => {
  // Try to synchronously hydrate persisted state to avoid a visual "flash"
  // from defaults -> restored state. We also clamp the restored pageIndex
  // to a valid range when possible.
  const hasHydratedFromStorage = useRef<boolean>(false);

  const computeInitialPersistentState = (): PersistentTableState => {
    const base: PersistentTableState = {
      sorting: initialSorting,
      columnFilters: initialFilters,
      columnVisibility: {},
      pagination: {
        pageIndex: DEFAULT_PAGE_INDEX,
        pageSize: rowPerPage || DEFAULT_PAGE_SIZE,
      },
    };

    if (!persistState || !id) return base;

    try {
      const syncStorage = getStorage(persistStateStorage);
      const saved = getSavedTableState(id, syncStorage);

      if (!saved) return base;

      hasHydratedFromStorage.current = true;

      const {
        columnFilters: savedColumnFilters,
        columnVisibility: savedColumnVisibility,
        pagination: savedPagination,
        sorting: savedSorting,
      } = saved;

      const pageSize = rowPerPageOptions.includes(savedPagination.pageSize)
        ? savedPagination.pageSize
        : base.pagination.pageSize;

      let pageIndex =
        typeof savedPagination.pageIndex === "number"
          ? savedPagination.pageIndex
          : base.pagination.pageIndex;

      // compute page count where possible and clamp pageIndex
      let pageCount: number | undefined;
      if (fetchData) {
        pageCount =
          totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : undefined;
      } else {
        pageCount = Math.ceil((data?.length ?? 0) / pageSize);
      }

      if (typeof pageCount === "number") {
        pageIndex = Math.max(
          0,
          Math.min(pageIndex, Math.max(0, pageCount - 1)),
        );
      }

      return {
        sorting: savedSorting ?? base.sorting,
        columnFilters: savedColumnFilters ?? base.columnFilters,
        columnVisibility: savedColumnVisibility ?? base.columnVisibility,
        pagination: {
          pageIndex,
          pageSize,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return base;
    }
  };

  const persistentStateReference = useRef<PersistentTableState>(
    computeInitialPersistentState(),
  );

  const [sorting, setSorting] = useState<SortingState>(
    persistentStateReference.current.sorting,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    persistentStateReference.current.columnFilters,
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    persistentStateReference.current.columnVisibility,
  );
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>(
    persistentStateReference.current.pagination,
  );

  const handleColumnSortChange = (event_: Updater<SortingState>) => {
    const updatedSorting =
      typeof event_ === "function" ? event_(sorting) : event_;

    setSorting(updatedSorting);

    table.setPageIndex(0);
  };

  const handleColumnFilterChange = (event_: Updater<ColumnFiltersState>) => {
    const updatedColumnFilter =
      typeof event_ === "function" ? event_(columnFilters) : event_;

    if (!Array.isArray(updatedColumnFilter)) {
      return [];
    }

    const updatedFilters = updatedColumnFilter.map((filter) => {
      const column = table.getColumn(filter.id);

      if (column?.columnDef.meta?.filterVariant === "range") {
        const [min, max] = filter.value as [number, number];

        let filterOperator:
          | FILTER_FUNCTIONS_ENUM.BETWEEN
          | FILTER_FUNCTIONS_ENUM.GREATER_THAN_OR_EQUAL
          | FILTER_FUNCTIONS_ENUM.LESS_THAN_OR_EQUAL
          | undefined;

        if (isDefined(min) && isDefined(max)) {
          filterOperator = FILTER_FUNCTIONS_ENUM.BETWEEN;
        } else if (isDefined(min)) {
          filterOperator = FILTER_FUNCTIONS_ENUM.GREATER_THAN_OR_EQUAL;
        } else if (isDefined(max)) {
          filterOperator = FILTER_FUNCTIONS_ENUM.LESS_THAN_OR_EQUAL;
        }

        return {
          ...filter,
          filterFn: filterOperator,
        };
      }

      return {
        ...filter,
        filterFn: column?.columnDef.meta?.serverFilterFn,
      };
    });

    setColumnFilters(updatedFilters);

    table.setPageIndex(0);
  };

  const handleResetState = () => {
    setSorting(initialSorting);
    setColumnFilters(initialFilters);
    setColumnVisibility({});
    setPagination({
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: rowPerPage || DEFAULT_PAGE_SIZE,
    });
  };

  const parsedColumns = useMemo(() => {
    let parsedColumns: ColumnDef<TData, unknown>[] = getParsedColumns({
      visibleColumns,
      columns,
    });

    if (enableRowSelection) {
      parsedColumns = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onChange={() =>
                table.toggleAllPageRowsSelected(
                  !table.getIsAllPageRowsSelected(),
                )
              }
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected(!row.getIsSelected())}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
          enableColumnFilter: false,
          enableGlobalFilter: false,
          align: "center",
        },
        ...parsedColumns,
      ];
    }

    if (
      (dataActionsMenu && visibleColumns.length === 0) ||
      (dataActionsMenu && visibleColumns.includes("actions"))
    ) {
      const defaultActionColumn: ColumnDef<TData, unknown> = {
        id: "actions",
        header: () => <i className="pi pi-cog"></i>,
        align: "center",
        cell: ({ row: { original } }) => {
          const actionsMenu =
            typeof dataActionsMenu === "function"
              ? dataActionsMenu(original)
              : dataActionsMenu;

          const filteredActions = (actionsMenu?.actions ?? []).filter(
            (action) => {
              if (typeof action.display === "function") {
                return action.display(data);
              } else if (typeof action.display === "boolean") {
                return action.display;
              } else {
                return true;
              }
            },
          );

          if (!filteredActions?.length) return null;

          return <DataActionsMenu {...actionsMenu} data={original} />;
        },
      };

      parsedColumns = [...parsedColumns, defaultActionColumn];
    }

    parsedColumns.forEach((column) => {
      if (column.meta?.filterVariant === "multiselect" && !column.filterFn) {
        column.filterFn = (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) {
            return row;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return filterValue.some((value: any) =>
            row.getValue<unknown[]>(columnId)?.includes(value),
          );
        };
      } else if (
        column.meta?.filterVariant === "dateRange" &&
        !column.filterFn
      ) {
        column.filterFn = (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) {
            return true;
          }

          const rowValue = row.getValue<string | Date | number>(columnId);
          if (!rowValue) return false;

          const rowData = (
            typeof rowValue === "string"
              ? rowValue
              : new Date(rowValue).toISOString()
          ).split("T")[0];

          const [startDate, endDate] = filterValue.map(
            (date: string) => date.split("T")[0],
          );

          return rowData >= startDate && rowData <= endDate;
        };
      } else if (
        (column.meta?.filterVariant === "range" ||
          column.dataType === "number") &&
        !column.filterFn
      ) {
        column.filterFn = (row, columnId, filterValue) => {
          if (!Array.isArray(filterValue)) {
            return true;
          }

          const [min, max] = filterValue;
          const value = row.getValue(columnId) as number;

          if (min !== undefined && max !== undefined) {
            return value >= min && value <= max;
          } else if (min !== undefined) {
            return value >= min;
          } else if (max !== undefined) {
            return value <= max;
          }

          return true;
        };
      }
    });

    return parsedColumns;
  }, [visibleColumns, columns]);

  const table = useReactTable<TData>({
    data,
    columns: parsedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: handleColumnFilterChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleColumnSortChange,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
    enableSortingRemoval: enableSortingRemoval,
    manualFiltering: !!fetchData,
    manualSorting: !!fetchData,
    manualPagination: !!fetchData,
    ...(!!fetchData && {
      pageCount: Math.ceil(totalRecords / pagination.pageSize),
    }),
    ...tableOptions,
  });

  const mappedSelectedRows = table.getFilteredSelectedRowModel();
  const totalItems = fetchData
    ? totalRecords
    : table.getFilteredRowModel().rows?.length;
  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  useEffect(() => {
    onRowSelectChange && onRowSelectChange(table);
  }, [mappedSelectedRows]);

  useEffect(() => {
    if (visibleColumns.length !== 0) {
      table.setColumnOrder(["select", ...visibleColumns]);
    }
  }, [visibleColumns, parsedColumns]);

  useEffect(() => {
    // Records the table state change without any rerender
    if (persistState && id) {
      persistentStateReference.current = {
        sorting,
        columnFilters,
        columnVisibility,
        pagination,
      };
    }
  }, [id, pagination, persistState, sorting, columnFilters, columnVisibility]);

  useEffect(() => {
    // Restore the table state from storage. If we already hydrated
    // synchronously above, skip re-applying it here. When applying a
    // pagination from storage ensure the pageIndex is clamped to a valid
    // range when possible.
    if (!persistState || !id) {
      return;
    }

    if (hasHydratedFromStorage.current) {
      // still return a cleanup that will save state on unmount
      return () => {
        saveTableState(id, persistentStateReference.current, storage);
      };
    }

    const savedState = getSavedTableState(id, storage);

    if (savedState) {
      const {
        columnFilters,
        columnVisibility,
        pagination: savedPagination,
        sorting,
      } = savedState;

      setColumnFilters(columnFilters);
      setColumnVisibility(columnVisibility);
      setSorting(sorting);

      if (rowPerPageOptions.includes(savedPagination.pageSize)) {
        // Clamp pageIndex if we can compute a pageCount
        const pageSize = savedPagination.pageSize;
        let pageIndex =
          typeof savedPagination.pageIndex === "number"
            ? savedPagination.pageIndex
            : DEFAULT_PAGE_INDEX;

        let pageCount: number | undefined;
        if (fetchData) {
          pageCount =
            totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : undefined;
        } else {
          pageCount = Math.ceil((data?.length ?? 0) / pageSize);
        }

        if (typeof pageCount === "number") {
          pageIndex = Math.max(
            0,
            Math.min(pageIndex, Math.max(0, pageCount - 1)),
          );
        }

        setPagination({ pageIndex, pageSize });
      }
    }

    return () => {
      saveTableState(id, persistentStateReference.current, storage);
    };
  }, [id, persistState]);

  useEffect(() => {
    if (persistState && !id) {
      throw new Error('Id is required when prop "persistState" is true');
    }

    // Store the table state in storage on page refresh
    const handleBeforeUnload = () => {
      if (persistState && id) {
        saveTableState(id, persistentStateReference.current, storage);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id, persistState]);

  useEffect(() => {
    // client side rendering with no pagination
    if (!fetchData && !paginated) {
      setPagination((previous) => ({
        ...previous,
        pageSize: data.length,
      }));
    }
  }, [fetchData, data, paginated]);

  useEffect(() => {
    if (fetchData) {
      const requestJSON = getRequestJSON(sorting, columnFilters, {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });

      fetchData(requestJSON);
    }
  }, [
    columnFilters,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    fetchData,
  ]);

  return (
    <div id={id} className={("table-container " + className).trimEnd()}>
      {title ? (
        <span children={title.text} data-align={title.align || "center"} />
      ) : null}

      {showColumnsAction || renderToolbarItems || showResetStateAction ? (
        <TableToolbar
          table={table}
          showColumnsAction={showColumnsAction}
          columnActionButtonLabel={columnActionButtonLabel}
          dataActionsMenu={dataActionsMenu}
          showResetStateAction={showResetStateAction}
          renderToolbarItems={renderToolbarItems}
          resetActionButtonLabel={resetStateActionButtonLabel}
          handleResetState={handleResetState}
          enableRowSelection={enableRowSelection}
        />
      ) : null}

      <Table>
        <TableHeader
          table={table}
          renderSortIcons={renderSortIcons}
          inputDebounceTime={inputDebounceTime}
          highlight={highlightHeader}
        />

        <TableBody
          customFormatters={customFormatters}
          emptyTableMessage={emptyTableMessage}
          enableRowSelection={enableRowSelection}
          locale={locale}
          parsedColumnsLength={parsedColumns.length}
          rowClassName={rowClassName}
          table={table}
          isLoading={isLoading}
        />

        {renderTableFooterContent ? (
          <TableFooter children={renderTableFooterContent(table)} />
        ) : null}
      </Table>

      {(!!fetchData || paginated) && totalItems > 0 ? (
        <>
          {renderCustomPagination ? (
            renderCustomPagination(table)
          ) : (
            <Pagination
              currentPage={pagination.pageIndex}
              defaultItemsPerPage={pagination.pageSize}
              onPageChange={(currentPage) => {
                table.setPageIndex(currentPage);
              }}
              itemsPerPageOptions={rowPerPageOptions}
              onItemsPerPageChange={(itemsPerPage) => {
                table.setPageSize(itemsPerPage);
                table.setPageIndex(0);
              }}
              totalItems={totalItems}
              {...paginationOptions}
            ></Pagination>
          )}
        </>
      ) : null}

      {isLoading ? (
        <div className="loading-overlay">
          <LoadingIcon color="#55575f" fontSize={"0.5rem"}></LoadingIcon>
        </div>
      ) : null}
    </div>
  );
};

export { DataTable };
