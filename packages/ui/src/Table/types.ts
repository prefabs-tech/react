import type {
  Cell,
  Column,
  ColumnFilter,
  ColumnFiltersState,
  PaginationState,
  Row,
  RowData,
  SortDirection,
  SortingState,
  Table,
  TableOptions,
  VisibilityState,
} from "@tanstack/react-table";
import type { ComponentProps, ReactNode } from "react";

import { Pagination } from "../Pagination";
import { Tooltip } from "../Tooltip";
import { DataActionsMenuProperties } from "./TableDataActions";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface ColumnDefBase<TData, TValue> {
    accessorKey?: string;
    align?: CellAlignmentType;
    className?: string;
    customFilterComponent?: (column: Column<TData, TValue>) => ReactNode;
    dataType?: CellDataType;
    dateOptions?: Omit<FormatDateType, "date">;
    filterPlaceholder?: string;
    maxWidth?: string;
    minWidth?: string;
    numberOptions?: Omit<FormatNumberType, "value">;
    tooltip?: ((cell: Cell<TData, TValue>) => ReactNode) | boolean | string;
    tooltipOptions?: Partial<
      Omit<ComponentProps<typeof Tooltip>, "elementRef">
    >;
    width?: string;
  }

  interface ColumnFilter {
    filterFn?: TFilterFn;
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  interface ColumnMeta<TData extends RowData, TValue> {
    filterOptions?: FilterOption[];
    filterVariant?: TFilterVariant;
    rangeFilterMax?: number;
    rangeFilterMin?: number;
    serverFilterFn?: TFilterFn;
  }
}

export type { ColumnDef as TableColumnDefinition } from "@tanstack/react-table";

export type CellAlignmentType = "center" | "left" | "right";

export type CellDataType =
  | "currency"
  | "date"
  | "datetime"
  | "number"
  | "text"
  | string;

/**
 * Change the type of Keys of T from NewType
 */
export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType,
> = {
  // Loop to every key. We gonna check if the key
  // is assignable to Keys. If yes, change the type.
  // Else, retain the type.
  [key in keyof T]: key extends Keys ? NewType : T[key];
};

export type FilterOption = {
  label: string;
  value: string;
};

export interface FilterProperties {
  columnFilterValue?: TFilterValue;
  columnType: number | string;
  filterFn?: TFilterFn;
  filterVariant?: TFilterVariant;
  handleChange: ({ filterFn, value }: TFilterValue) => void;
  placeholder?: string;

  selectOptions?: TSelectOption[];
}

export type FormatDateType = {
  date: Date | number | string;
  formatOptions?: Intl.DateTimeFormatOptions;
  locale?: string;
};

export type FormatNumberType = {
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  value: number;
};

export interface PersistentTableState {
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  pagination: PaginationState;
  sorting: SortingState;
}

export type StorageType = "localStorage" | "sessionStorage";

export interface TBaseTable {
  body: ReactNode;
  footer: ReactNode;
  header: ReactNode;
}

export type TCustomColumnFilter = ChangeTypeOfKeys<
  ColumnFilter,
  "value",
  TFilterValue
>;

export interface TDataTableProperties<TData extends RowData> extends Partial<
  Omit<TableOptions<TData>, "data" | "getCoreRowModel">
> {
  className?: string;
  columnActionBtnLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFormatters?: Record<string, (value: any) => string>;
  data: TData[];
  dataActionsMenu?:
    | ((data: TData) => DataActionsMenuProperties<TData>)
    | DataActionsMenuProperties<TData>;
  emptyTableMessage?: string;
  enableRowSelection?: boolean;
  fetchData?: (data: TRequestJSON) => void;
  globalFilter?: {
    key: string;
    placeholder: string;
    value: string;
  };
  handleResetState?: () => void;
  highlightHeader?: boolean;
  id?: string;
  initialFilters?: ColumnFiltersState;
  initialSorting?: SortingState;
  inputDebounceTime?: number;
  isLoading?: boolean;
  locale?: string;
  onRowSelectChange?: (table: Table<TData>) => void;
  paginated?: boolean;
  paginationOptions?: Omit<
    ComponentProps<typeof Pagination>,
    | "currentPage"
    | "defaultItemsPerPage"
    | "itemsPerPageOptions"
    | "onItemsPerPageChange"
    | "onPageChange"
    | "totalItems"
  >;
  persistState?: boolean;
  persistStateStorage?: StorageType;
  renderCustomPagination?: (table: Table<TData>) => React.ReactNode;
  renderSortIcons?: (direction: false | SortDirection) => React.ReactNode;
  renderTableFooterContent?: (table: Table<TData>) => React.ReactNode;
  renderToolbarItems?: (table: Table<TData>) => React.ReactNode;
  resetStateActionBtnLabel?: string;
  rowClassName?: ((options: { row: Row<TData> }) => string) | string;
  rowPerPage?: number;
  rowPerPageOptions?: number[];
  /**
   * Determines whether row for column-specific actions
   * should be displayed for the table columns.
   *
   * When set to `true`, the component will render a Toolbar with a button that can control the
   * visibility of the columns
   *
   * @default false
   */
  showColumnsAction?: boolean;
  showResetStateAction?: boolean;
  title?: {
    align?: "center" | "left" | "right";
    text: string;
  };
  totalRecords?: number;
  visibleColumns?: string[];
}

/* eslint-disable-next-line unicorn/prevent-abbreviations */
export type TFilterFn =
  | "between"
  | "contains"
  | "endsWith"
  | "equals"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "in"
  | "isEmpty"
  | "isNotEmpty"
  | "isNotNull"
  | "isNull"
  | "lessThan"
  | "lessThanOrEqual"
  | "like"
  | "notBetween"
  | "notEqual"
  | "notIn"
  | "notLike"
  | "startsWith";

export type TFilterValue = {
  filterFn: TFilterFn;
  value: boolean | number | string;
};

export type TFilterVariant =
  | "checkBox"
  | "date"
  | "dateRange"
  | "multiselect"
  | "range"
  | "select"
  | "text";

export interface TFooterProperties {
  detailComponent?: ReactNode;
  paginationComponent?: ReactNode;
}

export type TRequestJSON = {
  filter: TFilterRequest;
  limit: TLimit;
  offset: TOffset;
  sort: TSortRequest;
};

export type TSelectOption = { label: string; value: string };

export type TSortDirection = "" | "ASC" | "DESC";

export type TSortIcons = {
  asc: string;
  default: string;
  desc: string;
};

//TDataTable props

export interface TTableDetail {
  detail: string;
  showPrefix: string;
}
type TFilterRequest =
  | null
  | TSingleFilter
  | {
      AND: TFilterRequest[];
    }
  | {
      OR: TFilterRequest[];
    };

type TLimit = null | number;

type TOffset = null | number;

type TSingleFilter = {
  key: string;
  operator: string;
  value: string;
};

type TSingleSort = {
  direction: TSortDirection;
  key: string;
};

export type {
  FilterFn as FilterFunction,
  FilterFns as FilterFunctions,
} from "@tanstack/react-table";

type TSortRequest = null | TSingleSort[];
