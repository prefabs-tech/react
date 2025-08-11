import { TABLE_STATE_PREFIX } from "./constants";
import { getStorage } from "../utils";
import { FILTER_FUNCTIONS_ENUM, FILTER_OPERATORS_ENUM } from "./types";

import type {
  CellAlignmentType,
  CellDataType,
  FormatNumberType,
  PersistentTableState,
  StorageType,
  TFilterFn as TFilterFunction_,
  TFilterFn as TFilterFunction,
  TRequestJSON,
  TSortDirection,
} from "./types";
import type {
  ColumnFilter,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

// Type for the return value

/**
 * Maps filter functions to their corresponding operators
 * @param filterFunction The filter function to map
 * @returns An object with the operator and optional not flag
 */
export const getFilterOperator = (filterFunction: TFilterFunction_) => {
  switch (filterFunction) {
    // Existing cases
    case FILTER_FUNCTIONS_ENUM.CONTAINS:
      return { operator: FILTER_OPERATORS_ENUM.CONTAINS };
    case FILTER_FUNCTIONS_ENUM.STARTS_WITH:
      return { operator: FILTER_OPERATORS_ENUM.STARTS_WITH };
    case FILTER_FUNCTIONS_ENUM.ENDS_WITH:
      return { operator: FILTER_OPERATORS_ENUM.ENDS_WITH };
    case FILTER_FUNCTIONS_ENUM.EQUALS:
      return { operator: FILTER_OPERATORS_ENUM.EQUALS };
    case FILTER_FUNCTIONS_ENUM.NOT_EQUAL:
      return { operator: FILTER_OPERATORS_ENUM.EQUALS, not: true };
    case FILTER_FUNCTIONS_ENUM.GREATER_THAN:
      return { operator: FILTER_OPERATORS_ENUM.GREATER_THAN };
    case FILTER_FUNCTIONS_ENUM.GREATER_THAN_OR_EQUAL:
      return { operator: FILTER_OPERATORS_ENUM.GREATER_THAN_OR_EQUAL };
    case FILTER_FUNCTIONS_ENUM.LESS_THAN:
      return { operator: FILTER_OPERATORS_ENUM.LESS_THAN };
    case FILTER_FUNCTIONS_ENUM.LESS_THAN_OR_EQUAL:
      return { operator: FILTER_OPERATORS_ENUM.LESS_THAN_OR_EQUAL };
    case FILTER_FUNCTIONS_ENUM.IS_NULL:
      return { operator: FILTER_OPERATORS_ENUM.NULL };
    case FILTER_FUNCTIONS_ENUM.IS_NOT_NULL:
      return { operator: FILTER_OPERATORS_ENUM.NULL, not: true };
    case FILTER_FUNCTIONS_ENUM.IS_EMPTY:
      return { operator: FILTER_OPERATORS_ENUM.EMPTY };
    case FILTER_FUNCTIONS_ENUM.IS_NOT_EMPTY:
      return { operator: FILTER_OPERATORS_ENUM.EMPTY, not: true };
    case FILTER_FUNCTIONS_ENUM.LIKE:
      return { operator: FILTER_OPERATORS_ENUM.LIKE };
    case FILTER_FUNCTIONS_ENUM.NOT_LIKE:
      return { operator: FILTER_OPERATORS_ENUM.LIKE, not: true };
    case FILTER_FUNCTIONS_ENUM.IN:
      return { operator: FILTER_OPERATORS_ENUM.IN };
    case FILTER_FUNCTIONS_ENUM.NOT_IN:
      return { operator: FILTER_OPERATORS_ENUM.IN, not: true };
    case FILTER_FUNCTIONS_ENUM.BETWEEN:
      return { operator: FILTER_OPERATORS_ENUM.BETWEEN };
    case FILTER_FUNCTIONS_ENUM.NOT_BETWEEN:
      return { operator: FILTER_OPERATORS_ENUM.BETWEEN, not: true };

    default:
      throw new Error(`Unhandled filter function: ${filterFunction}`);
  }
};

const isRangeFilter = (
  filterFunction: TFilterFunction_ | undefined = FILTER_FUNCTIONS_ENUM.IN,
) => {
  return [
    FILTER_FUNCTIONS_ENUM.BETWEEN,
    FILTER_FUNCTIONS_ENUM.IN,
    FILTER_FUNCTIONS_ENUM.NOT_BETWEEN,
    FILTER_FUNCTIONS_ENUM.NOT_IN,
  ].includes(filterFunction as FILTER_FUNCTIONS_ENUM);
};

const getRangeFilter = (filterState: ColumnFilter) => {
  if (!Array.isArray(filterState.value)) {
    return null;
  }

  const values = filterState.value.filter((value) => value && value !== null);

  if (values.length < 1) {
    return null;
  }

  return {
    key: filterState.id,
    ...getFilterOperator(filterState.filterFn || FILTER_FUNCTIONS_ENUM.IN),
    value: values.join(","),
  };
};

const getSortDirection = (desc: boolean): TSortDirection => {
  switch (desc) {
    case false:
      return "ASC";
    case true:
      return "DESC";
    default:
      return "";
  }
};

export const getRequestJSON = (
  sortingState?: SortingState,
  filterState?: ColumnFiltersState,
  paginationState?: PaginationState,
): TRequestJSON => {
  const getFilter = () => {
    if (!filterState || filterState.length === 0) return null;

    const updatedFilterState = filterState.filter((filter) => {
      // Check if the filter value is defined or not
      if (Array.isArray(filter.value)) {
        return filter.value.length > 0;
      }

      if (typeof filter.value === "string") {
        return filter.value.trim() !== "";
      }

      return filter.value != null;
    });

    if (updatedFilterState.length === 0) return null;

    if (updatedFilterState.length === 1) {
      if (isRangeFilter(updatedFilterState[0].filterFn)) {
        return getRangeFilter(updatedFilterState[0]);
      }

      return {
        key: updatedFilterState[0].id,
        ...getFilterOperator(
          updatedFilterState[0].filterFn || FILTER_FUNCTIONS_ENUM.CONTAINS,
        ),
        value: String(updatedFilterState[0].value),
      };
    }

    return {
      AND: updatedFilterState.map((filter) => {
        if (isRangeFilter(filter.filterFn)) {
          return getRangeFilter(filter);
        }

        return {
          key: filter.id,
          ...getFilterOperator(
            filter.filterFn || FILTER_FUNCTIONS_ENUM.CONTAINS,
          ),
          value: String(filter.value),
        };
      }),
    };
  };

  const getLimit = () => {
    if (
      !paginationState ||
      (paginationState && Object.keys(paginationState).length === 0)
    )
      return null;

    return paginationState.pageSize;
  };

  const getOffset = () => {
    if (
      !paginationState ||
      (paginationState && Object.keys(paginationState).length === 0)
    )
      return null;

    return paginationState.pageIndex * paginationState.pageSize;
  };

  const getSort = () => {
    if (!sortingState || sortingState.length === 0) return null;

    if (sortingState.length > 1) {
      return sortingState.map((state) => ({
        key: state.id,
        direction: getSortDirection(state.desc),
      }));
    }

    return [
      {
        key: sortingState[0].id,
        direction: getSortDirection(sortingState[0].desc),
      },
    ];
  };

  return {
    filter: getFilter(),
    limit: getLimit(),
    sort: getSort(),
    offset: getOffset(),
  };
};

export const getParsedColumns = ({
  columns,
  visibleColumns,
  childColumns,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childColumns?: Array<any>;
  visibleColumns: string[];
}) => {
  const parsedColumns = new Map();

  if (childColumns) {
    childColumns.forEach((column) =>
      parsedColumns.set(
        column.accessorKey || column.id || column.header,
        column,
      ),
    );
  }

  const updateColumn = ({
    enableColumnFilter,
    enableSorting,
    enableGlobalFilter,
    enableMultiSort,
  }: {
    enableColumnFilter?: boolean;
    enableSorting?: boolean;
    enableGlobalFilter?: boolean;
    enableMultiSort?: boolean;
  }) => {
    return {
      enableColumnFilter:
        typeof enableColumnFilter === "undefined" ? false : enableColumnFilter,

      enableSorting:
        typeof enableSorting === "undefined" ? false : enableSorting,

      enableGlobalFilter:
        typeof enableGlobalFilter === "undefined" ? false : enableGlobalFilter,

      enableMultiSort:
        typeof enableMultiSort === "undefined" ? false : enableMultiSort,
    };
  };

  //Merge duplicate fields to one based on column id value
  for (const column of columns) {
    const columnIdentifier = column.accessorKey || column.id || column.header;

    if (column.columns) {
      if (parsedColumns.get(columnIdentifier)) {
        parsedColumns.set(columnIdentifier, {
          ...parsedColumns.get(columnIdentifier),
          ...column,
          columns: [
            ...getParsedColumns({
              columns: column.columns,
              visibleColumns,
              childColumns: parsedColumns.get(columnIdentifier).columns || [],
            }),
          ],
        });
      } else {
        parsedColumns.set(columnIdentifier, {
          ...column,
          columns: [
            ...getParsedColumns({ columns: column.columns, visibleColumns }),
          ],
          ...updateColumn({
            enableColumnFilter: column.enableColumnFilter,
            enableGlobalFilter: column.enableGlobalFilter,
            enableMultiSort: column.enableMultiSort,
            enableSorting: column.enableSorting,
          }),
        });
      }
    } else if (
      visibleColumns.length !== 0 &&
      !visibleColumns.includes(columnIdentifier)
    ) {
      continue;
    } else if (parsedColumns.get(columnIdentifier)) {
      parsedColumns.set(columnIdentifier, {
        ...parsedColumns.get(columnIdentifier),
        ...column,
      });
    } else {
      parsedColumns.set(columnIdentifier, {
        ...column,
        ...updateColumn({
          enableColumnFilter: column.enableColumnFilter,
          enableGlobalFilter: column.enableGlobalFilter,
          enableMultiSort: column.enableMultiSort,
          enableSorting: column.enableSorting,
        }),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedColumnsList: any[] = [];

  for (const parsedColumnId of parsedColumns.keys()) {
    if (!visibleColumns.includes(parsedColumnId)) {
      if (parsedColumns.get(parsedColumnId)?.columns?.length == 0) {
        continue;
      }
    }

    parsedColumnsList.push(parsedColumns.get(parsedColumnId));
  }

  return parsedColumnsList;
};

export const formatNumber = ({
  value,
  locale = "en-GB",
  formatOptions,
}: FormatNumberType) => {
  // for detail use case visit- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

  if (typeof value !== "number" || isNaN(value)) {
    return value;
  }

  const formatter = new Intl.NumberFormat(locale, formatOptions);

  return formatter.format(value);
};

export const getAlignValue = ({
  align,
  dataType,
}: {
  align?: CellAlignmentType;
  dataType?: CellDataType;
  header?: boolean;
}) => {
  if (align) {
    return align;
  }

  if (dataType == "other") {
    return "center";
  } else if (dataType == "number" || dataType == "currency") {
    return "right";
  } else {
    return "left";
  }
};

export const getSavedTableState = (
  id: string,
  storage: Storage,
): PersistentTableState | null => {
  try {
    const savedState = storage.getItem(`${TABLE_STATE_PREFIX}-${id}`);

    return savedState && JSON.parse(savedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[Dz table] Could not restore table state", error);
  }

  return null;
};

export const saveTableState = (
  id: string,
  value: PersistentTableState,
  storage: Storage,
) => {
  try {
    storage.setItem(`${TABLE_STATE_PREFIX}-${id}`, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[Dz table] Could not store table state", error);
  }
};

export const clearSavedTableStates = (
  storageType: StorageType = "localStorage",
) => {
  const storage = getStorage(storageType);

  Object.keys(storage).forEach((key) => {
    if (key.startsWith(TABLE_STATE_PREFIX)) {
      storage.removeItem(key);
    }
  });
};
