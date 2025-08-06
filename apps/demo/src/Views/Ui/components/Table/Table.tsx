import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  TDataTable,
  Page,
  Button,
  TableColumnDefinition,
  DebouncedInput,
} from "@prefabs.tech/react-ui";
import { FilterFunction, DatePicker } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { TData, data, formatDemoData, cities, countries } from "./data";
import { CodeBlock, Section } from "../../../../components/Demo";

declare module "@prefabs.tech/react-ui" {
  interface FilterFunctions {
    inDateRangeFilter: FilterFunction<unknown>;
    customEqualStringFilter: FilterFunction<unknown>;
  }
}

export const TableDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const columns: Array<TableColumnDefinition<TData>> = [
    {
      accessorKey: "email",
      header: "Email",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
    },
    {
      accessorKey: "name",
      header: () => <span>Full name</span>,
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
    },
    {
      accessorKey: "age",
      header: "Age",
      align: "right",
      dataType: "number",
      enableSorting: true,
      enableColumnFilter: true,
      filterPlaceholder: "Min,Max",
    },
    {
      accessorKey: "city",
      header: () => <span>City</span>,
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Select",
      meta: {
        filterVariant: "multiselect",
        filterOptions: cities,
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      enableColumnFilter: true,
      enableSorting: true,
      meta: {
        filterVariant: "select",
        filterOptions: countries,
      },
      filterPlaceholder: "Select country",
    },
  ];

  const propertiesData = [
    {
      id: 1,
      prop: "className",
      type: "string",
      default: '""',
      description: t("table.propertiesDescription.className"),
    },
    {
      id: 2,
      prop: "columnActionBtnLabel",
      type: "string",
      default: '"Columns"',
      description: t("table.propertiesDescription.columnActionBtnLabel"),
    },
    {
      id: 3,
      prop: "customFormatters",
      type: "Record<string, (value: any) => string>",
      default: "-",
      description: t("table.propertiesDescription.customFormatters"),
    },
    {
      id: 4,
      prop: "dataActionsMenu",
      type: "(data: TData) => DataActionsMenuProperties<TData> | DataActionsMenuProperties<TData>",
      default: "-",
      description: t("table.propertiesDescription.dataActionsMenu"),
    },
    {
      id: 5,
      prop: "data",
      type: "TData[]",
      default: "-",
      description: t("table.propertiesDescription.data"),
    },
    {
      id: 6,
      prop: "emptyTableMessage",
      type: "string",
      default: "No results.",
      description: t("table.propertiesDescription.emptyTableMessage"),
    },
    {
      id: 7,
      prop: "enableRowSelection",
      type: "boolean",
      default: "false",
      description: t("table.propertiesDescription.enableRowSelection"),
    },
    {
      id: 8,
      prop: "globalFilter",
      type: "{ key: string; value: string; placeholder: string }",
      default: "-",
      description: t("table.propertiesDescription.globalFilter"),
    },
    {
      id: 9,
      prop: "id",
      type: "string",
      default: "-",
      description: t("table.propertiesDescription.id"),
    },
    {
      id: 10,
      prop: "initialFilters",
      type: "ColumnFiltersState",
      default: "[]",
      description: t("table.propertiesDescription.initialFilters"),
    },
    {
      id: 11,
      prop: "initialSorting",
      type: "SortingState",
      default: "[]",
      description: t("table.propertiesDescription.initialSorting"),
    },
    {
      id: 12,
      prop: "isLoading",
      type: "boolean",
      default: "false",
      description: t("table.propertiesDescription.isLoading"),
    },
    {
      id: 13,
      prop: "inputDebounceTime",
      type: "number",
      default: "-",
      description: t("table.propertiesDescription.inputDebounceTime"),
    },
    {
      id: 14,
      prop: "paginated",
      type: "boolean",
      default: "true",
      description: t("table.propertiesDescription.paginated"),
    },
    {
      id: 15,
      prop: "paginationOptions",
      type: "Omit<PaginationProps, 'currentPage' | 'totalItems' | 'onPageChange' | 'onItemsPerPageChange' | 'itemsPerPageOptions' | 'defaultItemsPerPage'>",
      default: "-",
      description: t("table.propertiesDescription.paginationOptions"),
    },
    {
      id: 16,
      prop: "persistState",
      type: "boolean",
      default: "false",
      description: t("table.propertiesDescription.persistState"),
    },
    {
      id: 17,
      prop: "persistStateStorage",
      type: "StorageType",
      default: '"localStorage"',
      description: t("table.propertiesDescription.persistStateStorage"),
    },
    {
      id: 18,
      prop: "resetStateActionBtnLabel",
      type: "string",
      default: '"Reset all"',
      description: t("table.propertiesDescription.resetStateActionBtnLabel"),
    },
    {
      id: 19,
      prop: "rowClassName",
      type: "string | ((options: { row: Row<TData> }) => string)",
      default: "-",
      description: t("table.propertiesDescription.rowClassName"),
    },
    {
      id: 20,
      prop: "rowPerPage",
      type: "number",
      default: "-",
      description: t("table.propertiesDescription.rowPerPage"),
    },
    {
      id: 21,
      prop: "rowPerPageOptions",
      type: "number[]",
      default: "[10, 20, 30]",
      description: t("table.propertiesDescription.rowPerPageOptions"),
    },
    {
      id: 22,
      prop: "showResetStateAction",
      type: "boolean",
      default: "-",
      description: t("table.propertiesDescription.showResetStateAction"),
    },
    {
      id: 23,
      prop: "totalRecords",
      type: "number",
      default: "0",
      description: t("table.propertiesDescription.totalRecords"),
    },
    {
      id: 24,
      prop: "visibleColumns",
      type: "string[]",
      default: "[]",
      description: t("table.propertiesDescription.visibleColumns"),
    },
    {
      id: 25,
      prop: "title",
      type: "{ text: string; align?: 'left' | 'center' | 'right' }",
      default: "-",
      description: t("table.propertiesDescription.title"),
    },
    {
      id: 26,
      prop: "showColumnsAction",
      type: "boolean",
      default: "false",
      description: t("table.propertiesDescription.showColumnsAction"),
    },
    {
      id: 27,
      prop: "fetchData",
      type: "(data: TRequestJSON) => void",
      default: "-",
      description: t("table.propertiesDescription.fetchData"),
    },
    {
      id: 28,
      prop: "handleResetState",
      type: "() => void",
      default: "-",
      description: t("table.propertiesDescription.handleResetState"),
    },
    {
      id: 29,
      prop: "onRowSelectChange",
      type: "(table: Table<TData>) => void",
      default: "-",
      description: t("table.propertiesDescription.onRowSelectChange"),
    },
    {
      id: 30,
      prop: "renderCustomPagination",
      type: "(table: Table<TData>) => React.ReactNode",
      default: "-",
      description: t("table.propertiesDescription.renderCustomPagination"),
    },
    {
      id: 31,
      prop: "renderSortIcons",
      type: "(direction: false | SortDirection) => React.ReactNode",
      default: "-",
      description: t("table.propertiesDescription.renderSortIcons"),
    },
    {
      id: 32,
      prop: "renderTableFooterContent",
      type: "(table: Table<TData>) => React.ReactNode",
      default: "-",
      description: t("table.propertiesDescription.renderTableFooterContent"),
    },
    {
      id: 33,
      prop: "renderToolbarItems",
      type: "(table: Table<TData>) => React.ReactNode",
      default: "-",
      description: t("table.propertiesDescription.renderToolbarItems"),
    },
  ];

  const inDateRangeFilter: FilterFunction<any> = (
    row,
    columnId,
    value: [Date, Date],
  ) => {
    if (!value[0] || !value[1]) {
      return true;
    }

    const rowData = row.getValue(columnId);

    const date = new Date(rowData as Date);

    if (isNaN(date.getTime())) return false;

    return (
      value[0].getTime() <= date.getTime() &&
      date.getTime() < value[1].getTime()
    );
  };

  const customEqualStringFilter: FilterFunction<any> = (
    row,
    columnId,
    value: string,
  ) => {
    if (value.includes(row.getValue(columnId) as string)) {
      return true;
    }

    return false;
  };

  return (
    <Page
      title={t("table.title")}
      subtitle={t("table.subtitle")}
      className="demo-data-tables-page"
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "TDataTable" })}</p>
        <CodeBlock exampleCode="import { TDataTable } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section title={t("table.usage.basic")}>
        <TDataTable
          columns={columns}
          data={data}
          id="invitations-table"
          showResetStateAction
          initialSorting={[{ id: "email", desc: false }]}
          rowClassName={({ row: { original } }) => {
            return `row-${original.id}`;
          }}
        ></TDataTable>
        <CodeBlock
          // eslint-disable-next-line no-template-curly-in-string
          exampleCode='const countries = [
  { label: "Estonia", value: "Estonia" },
  { label: "France", value: "France" },
  {
    label: "United State of America",
    value: "United State of America",
  },
];

const cities = [
  { value: "Atlanta", label: "Atlanta" },
  { value: "Austin", label: "Austin" },
  { value: "Boston", label: "Boston" },
  ...
];

const columns: Array<TableColumnDefinition<TData>> = [
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    enableSorting: true,
    filterPlaceholder: "Search",
  },
  {
    accessorKey: "name",
    header: () => <span>Full name</span>,
    enableColumnFilter: true,
    enableSorting: true,
    filterPlaceholder: "Search",
  },
  {
    accessorKey: "age",
    header: "Age",
    align: "right",
    dataType: "number",
    enableSorting: true,
    enableColumnFilter: true,
    filterPlaceholder: "Min,Max",
  },
  {
    accessorKey: "city",
    header: () => <span>City</span>,
    enableColumnFilter: true,
    enableSorting: true,
    filterPlaceholder: "Select",
    meta: {
      filterVariant: "multiselect",
      filterOptions: cities,
    },
  },
  {
    accessorKey: "country",
    header: "Country",
    enableColumnFilter: true,
    enableSorting: true,
    meta: {
      filterVariant: "select",
      filterOptions: countries,
    },
    filterPlaceholder: t("table.placeholder.country"),
  },
]

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    city: "New York",
  },
  {
    id: 2,
    name: "Jane Elizabeth Smith",
    email: "jane.smith@example.com",
    age: 32,
    city: "Los Angeles",
  },
  ...
]

<TDataTable
  columns={columns}
  data={data}
  id="invitations-table"
  showResetStateAction
  initialSorting={[{ id: "email", desc: false }]}
  rowClassName={({ row: { original } }) => {
    return `row-${original.id}`;
  }}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.rowSelection")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          exampleCode='<TDataTable
  columns={[...columns]}
  data={data.slice(0, 5)}
  enableRowSelection={true}
  initialSorting={[{ id: "email", desc: false }]}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.customPaginationToolbarFooter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
            },
          ]}
          data={data.slice(0, 5)}
          renderCustomPagination={(table) => {
            return <>Custom pagination</>;
          }}
          renderToolbarItems={(table) => {
            return (
              <>
                <Button label="Add record" />
              </>
            );
          }}
          renderTableFooterContent={(table) => (
            <tr>
              <td>
                Total records: {table.getPreFilteredRowModel().flatRows.length}
              </td>
            </tr>
          )}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          exampleCode='<TDataTable
  columns={[
    ...columns,
    {
      accessorKey: "email",
    },
  ]}
  data={data.slice(0, 5)}
  renderCustomPagination={(table) => {
    return <>Custom pagination</>;
  }}
  renderToolbarItems={(table) => {
    return (
      <>
        <Button label="Add record" />
      </>
    );
  }}
  renderTableFooterContent={(table) => (
    <tr>
      <td>
        Total records: {table.getPreFilteredRowModel().flatRows.length}
      </td>
    </tr>
  )}
  initialSorting={[{ id: "email", desc: false }]}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.columnAction")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          exampleCode='<TDataTable
  columns={[...columns]}
  data={data.slice(10, 15)}
  showColumnsAction={true}
  columnActionBtnLabel="Columns"
  initialSorting={[{ id: "email", desc: false }]}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.columnTooltip")}>
        <TDataTable
          title={{
            text: t("table.usage.columnTooltip"),
            align: "left",
          }}
          columns={[
            ...columns,
            {
              accessorKey: "email",
              tooltip: true,
              tooltipOptions: {
                position: "right",
              },
            },
            {
              accessorKey: "city",
              tooltip: true,
              tooltipOptions: {
                position: "left",
              },
            },
            {
              accessorKey: "name",
              tooltip: true,
              tooltipOptions: {
                position: "top",
              },
            },
            {
              accessorKey: "age",
              tooltip: true,
              tooltipOptions: {
                position: "bottom",
              },
            },
          ]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          exampleCode='<TDataTable
  title={{
    text: t("table.usage.columnTooltip"),
    align: "left",
  }}
  columns={[
    ...columns,
    {
      accessorKey: "email",
      tooltip: true,
      tooltipOptions: {
        position: "right",
      },
    },
    {
      accessorKey: "city",
      tooltip: true,
      tooltipOptions: {
        position: "left",
      },
    },
    {
      accessorKey: "name",
      tooltip: true,
      tooltipOptions: {
        position: "top",
      },
    },
    {
      accessorKey: "age",
      tooltip: true,
      tooltipOptions: {
        position: "bottom",
      },
    },
  ]}
  data={data.slice(0, 5)}
  enableRowSelection={true}
  initialSorting={[{ id: "email", desc: false }]}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.rowSpecificActions")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          dataActionsMenu={{
            actions: [
              {
                label: "View",
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
              {
                label: "Edit",
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                disabled: true,
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                label: "Share",
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                disabled: (rowData) => {
                  ///your logic here
                  return rowData.id !== 11;
                },
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "share action");
                },
              },
              {
                label: "Delete",
                className: "danger",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "delete action");
                },
                requireConfirmationModal: true,
                confirmationOptions: {
                  header: "Are you sure!",
                  message: "You are going to delete this data.",
                },
              },
            ],
          }}
          initialSorting={[{ id: "email", desc: false }]}
        />
        <CodeBlock
          exampleCode='<TDataTable
  columns={[...columns]}
  data={data.slice(10, 15)}
  paginated={false}
  dataActionsMenu={{
    actions: [
      {
        label: "View",
        display: (rowData) => {
          return rowData.id !== 12;
        },
        onClick: (rowData) => {
          console.log(rowData, "view action");
        },
      },
      {
        label: "Edit",
        display: (rowData) => {
          return rowData.id !== 12;
        },
        disabled: true,
        onClick: (rowData) => {
          console.log(rowData, "edit action");
        },
      },
      {
        label: "Share",
        display: (rowData) => {
          return rowData.id !== 12;
        },
        disabled: (rowData) => {
          return rowData.id !== 11;
        ,
        onClick: (rowData) => {
          console.log(rowData, "share action");
        },
      },
      {
        label: "Delete",
        className: "danger",
        onClick: (rowData) => {
          console.log(rowData, "delete action");
        },
        requireConfirmationModal: true,
        confirmationOptions: {
          header: "Are you sure!",
          message: "You are going to delete this data.",
        },
      },
    ],
  }}
  initialSorting={[{ id: "email", desc: false }]}
/>'
        />
      </Section>

      <Section title={t("table.usage.singleActionColumn")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          dataActionsMenu={{
            actions: [
              {
                label: "View",
                icon: "pi pi-eye",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
            ],
          }}
          initialSorting={[{ id: "email", desc: false }]}
        />
        <CodeBlock
          exampleCode='<TDataTable
  columns={[...columns]}
  data={data.slice(10, 15)}
  paginated={false}
  dataActionsMenu={{
    actions: [
      {
        label: "View",
        icon: "pi pi-eye",
        onClick: (rowData) => {
          console.log(rowData, "view action");
        },
      },
    ],
  }}
  initialSorting={[{ id: "email", desc: false }]}
/>'
        />
      </Section>

      <Section title={t("table.usage.singleActionColumnWithMenu")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          dataActionsMenu={{
            actions: [
              {
                label: "View",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
            ],
            displayActionMenu: true,
          }}
          initialSorting={[{ id: "email", desc: false }]}
        />
        <CodeBlock
          exampleCode='<TDataTable
  columns={[...columns]}
  data={data.slice(10, 15)}
  paginated={false}
  dataActionsMenu={{
    actions: [
      {
        label: "View",
        onClick: (rowData) => {
          console.log(rowData, "view action");
        },
      },
    ],
    displayActionMenu: true,
  }}
  initialSorting={[{ id: "email", desc: false }]}
/>'
        />
      </Section>

      <Section title={t("table.usage.withCustomFilter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              customFilterComponent: (column) => (
                <DebouncedInput
                  defaultValue={column.getFilterValue() as string}
                  onInputChange={(value) => {
                    column.setFilterValue(value);
                  }}
                  placeholder={"Search"}
                  debounceTime={200}
                ></DebouncedInput>
              ),
              meta: {
                serverFilterFn: "contains",
              },
            },
          ]}
          fetchData={() => {}}
          data={data.slice(10, 15)}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          exampleCode='<TDataTable
  columns={[
    ...columns,
    {
      accessorKey: "email",
      enableColumnFilter: true,
      customFilterComponent: (column) => (
        <DebouncedInput
          defaultValue={column.getFilterValue() as string}
          onInputChange={(value) => {
            column.setFilterValue(value);
          }}
          placeholder={"Search"}
          debounceTime={200}
        ></DebouncedInput>
      ),
      meta: {
        serverFilterFn: "contains",
      },
    },
  ]}
  fetchData={() => {}}
  data={data.slice(10, 15)}
  initialSorting={[{ id: "email", desc: false }]}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.withEqualServerFilter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              meta: {
                serverFilterFn: "equals",
              },
              filterPlaceholder: "Search",
            },
          ]}
          fetchData={() => {}}
          data={data.slice(10, 15)}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          exampleCode='<TDataTable
  columns={[
    ...columns,
    {
      accessorKey: "email",
      enableColumnFilter: true,
      meta: {
        serverFilterFn: "equals",
      },
      filterPlaceholder: "Search",
    },
  ]}
  fetchData={() => {}}
  data={data.slice(10, 15)}
  initialSorting={[{ id: "email", desc: false }]}
></TDataTable>'
        />
      </Section>

      <Section title={t("table.usage.customStaticFilter")}>
        <TDataTable
          className="custom-static-filter-table"
          columns={[
            {
              accessorKey: "description",
              header: "Description",
              filterFn: "customEqualStringFilter",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: "Search",
            },
            {
              accessorKey: "quantity",
              header: () => "Quantity",
              enableSorting: true,
              dataType: "number",
              numberOptions: {
                locale: "en-IN",
              },
              enableColumnFilter: true,
              filterPlaceholder: "Min,Max",
            },
            {
              accessorKey: "amount",
              header: "Amount",
              dataType: "currency",
              enableSorting: true,
              numberOptions: {
                locale: "en-US",
                formatOptions: {
                  currency: "EUR",
                },
              },
              enableColumnFilter: true,
              meta: {
                filterVariant: "range",
              },
              filterPlaceholder: "Min,Max",
            },
            {
              accessorKey: "date",
              header: "Date",
              dataType: "date",
              enableColumnFilter: true,
              enableSorting: true,
              filterFn: "inDateRangeFilter",
              customFilterComponent(column) {
                return (
                  <div className="filter-date">
                    <DatePicker
                      inputRef={null}
                      name="start-date"
                      onChange={(date) =>
                        column.setFilterValue((old: [Date, Date]) => [
                          date,
                          old?.[1],
                        ])
                      }
                      value={(column.getFilterValue() as [Date, Date])?.[0]}
                      placeholder={"Start date"}
                    />
                    <DatePicker
                      inputRef={null}
                      name="end-date"
                      onChange={(date) =>
                        column.setFilterValue((old: [Date, Date]) => [
                          old?.[0],
                          date,
                        ])
                      }
                      value={(column.getFilterValue() as [Date, Date])?.[1]}
                      placeholder={"End date"}
                    />
                  </div>
                );
              },
            },
            {
              id: "action",
              header: () => <i className="pi pi-cog"></i>,
              dataType: "other",
              cell: () => (
                <Button iconLeft="pi pi-eye" variant="textOnly" rounded />
              ),
            },
          ]}
          data={formatDemoData}
          paginated={false}
          filterFns={{
            inDateRangeFilter: inDateRangeFilter,
            customEqualStringFilter: customEqualStringFilter,
          }}
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
        <CodeBlock
          // eslint-disable-next-line no-template-curly-in-string
          exampleCode='const formatDemoData = [
  {
    id: 1001,
    amount: 1_234_567.89,
    quantity: 420,
    date: null,
    datetime: null,
    description: "Purchase of equipment",
  },
  {
    id: 1002,
    amount: 987_654.32,
    quantity: 175,
    date: new Date("2023-12-01T12:30:00"),
    datetime: new Date("2023-12-01T11:00:00"),
    description: "Office rent payment",
  },
  ...
]

<TDataTable
  className="custom-static-filter-table"
  columns={[
    {
      accessorKey: "description",
      header: "Description",
      filterFn: "customEqualStringFilter",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
    },
    {
      accessorKey: "quantity",
      header: () => "Quantity",
      enableSorting: true,
      dataType: "number",
      numberOptions: {
        locale: "en-IN",
      },
      enableColumnFilter: true,
      filterPlaceholder: "Min,Max",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      dataType: "currency",
      enableSorting: true,
      numberOptions: {
        locale: "en-US",
        formatOptions: {
          currency: "EUR",
        },
      },
      enableColumnFilter: true,
      meta: {
        filterVariant: "range",
      },
      filterPlaceholder: "Min,Max",
    },
    {
      accessorKey: "date",
      header: "Date",
      dataType: "date",
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: "inDateRangeFilter",
      customFilterComponent(column) {
        return (
          <div className="filter-date">
            <DatePicker
              inputRef={null}
              name="start-date"
              onChange={(date) =>
                column.setFilterValue((old: [Date, Date]) => [
                  date,
                  old?.[1],
                ])
              }
              value={(column.getFilterValue() as [Date, Date])?.[0]}
              placeholder={"Start date"}
            />
            <DatePicker
              inputRef={null}
              name="end-date"
              onChange={(date) =>
                column.setFilterValue((old: [Date, Date]) => [
                  old?.[0],
                  date,
                ])
              }
              value={(column.getFilterValue() as [Date, Date])?.[1]}
              placeholder={"End date"}
            />
          </div>
        );
      },
    },
    {
      id: "action",
      header: () => <i className="pi pi-cog"></i>,
      dataType: "other",
      cell: () => (
        <Button iconLeft="pi pi-eye" variant="textOnly" rounded />
      ),
    },
  ]}
  data={formatDemoData}
  paginated={false}
  filterFns={{
    inDateRangeFilter: inDateRangeFilter,
    customEqualStringFilter: customEqualStringFilter,
  }}inDateRangeFilter
  initialSorting={[{ id: "quantity", desc: true }]}
></TDataTable>'
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "TDataTableProperties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: t("propertiesTable.header.properties"),
            },
            {
              accessorKey: "type",
              header: t("propertiesTable.header.type"),
            },
            {
              accessorKey: "default",
              header: t("propertiesTable.header.default"),
            },
            {
              accessorKey: "description",
              header: t("propertiesTable.header.description"),
            },
          ]}
          data={propertiesData}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
