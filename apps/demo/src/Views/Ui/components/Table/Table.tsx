import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import {
  Button,
  DebouncedInput,
  Page,
  TableColumnDefinition,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { DatePicker, FilterFunction } from "@prefabs.tech/react-ui";
import { Tag } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";
import {
  city,
  country,
  data,
  formatDemoData,
  HORIZONTAL_CSS_CODE,
  TData,
  VERTICAL_CSS_CODE,
} from "./data";

declare module "@prefabs.tech/react-ui" {
  interface FilterFunctions {
    customEqualStringFilter: FilterFunction<unknown>;
    inDateRangeFilter: FilterFunction<unknown>;
  }
}

export const TableDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const columns: Array<TableColumnDefinition<TData>> = [
    {
      accessorKey: "email",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholder.search"),
      header: "Email",
    },
    {
      accessorKey: "name",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholder.search"),
      header: () => <span>Full name</span>,
    },
    {
      accessorKey: "age",
      align: "right",
      dataType: "number",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
      header: "Age",
      meta: {
        rangeFilterMax: 20,
        rangeFilterMin: 1,
      },
    },
    {
      accessorKey: "city",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholder.select"),
      header: () => <span>City</span>,
      meta: {
        filterOptions: city,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "country",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholder.country"),
      header: "Country",
      meta: {
        filterOptions: country,
        filterVariant: "select",
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (isNaN(date.getTime())) {
      return false;
    }

    return (
      value[0].getTime() <= date.getTime() &&
      date.getTime() < value[1].getTime()
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const propertiesData = [
    {
      default: "-",
      description: t("table.propertiesDescription.className"),
      prop: "className",
      type: "string",
    },
    {
      default: "'Columns'",
      description: t("table.propertiesDescription.columnActionButtonLabel"),
      prop: "columnActionBtnLabel",
      type: "string",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.columnsData"),
      prop: "columns",
      type: "Array<ColumnDef>",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.customFormatters"),
      prop: "customFormatters",
      type: "Record<string, (value) => string>",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.data"),
      prop: "data",
      type: "Array<TData>",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.dataActionMenu"),
      prop: "dataActionMenu",
      type: "((data: TData) => DataActionsMenuProperties<TData>) | DataActionsMenuProperties<TData>",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.emptyTableMessage"),
      prop: "emptyTableMessage",
      type: "string",
    },
    {
      default: "false",
      description: t("table.propertiesDescription.enableRowSelection"),
      prop: "enableRowSelection",
      type: "boolean",
    },
    {
      default: "false",
      description: t("table.propertiesDescription.enableSortingRemoval"),
      prop: "enableSortingRemoval",
      type: "boolean",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.highlightHeader"),
      prop: "highlightHeader",
      type: "boolean",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.id"),
      prop: "id",
      type: "string",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.initialFilters"),
      prop: "initialFilters",
      type: "ColumnFiltersState",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.initialSorting"),
      prop: "initialSorting",
      type: "SortingState",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.inputDebounceTime"),
      prop: "inputDebounceTime",
      type: "number",
    },
    {
      default: "false",
      description: t("table.propertiesDescription.isLoading"),
      prop: "isLoading",
      type: "boolean",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.locale"),
      prop: "locale",
      type: "string",
    },
    {
      default: "true",
      description: t("table.propertiesDescription.paginated"),
      prop: "paginated",
      type: "boolean",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.paginationOptions"),
      prop: "paginationOptions",
      type: "object",
    },
    {
      default: "true",
      description: t("table.propertiesDescription.persistState"),
      prop: "persistState",
      type: "boolean",
    },
    {
      default: "localStorage",
      description: t("table.propertiesDescription.persistStateStorage"),
      prop: "persistStateStorage",
      type: "localStorage | sessionStorage",
    },
    {
      default: "Reset all",
      description: t("table.propertiesDescription.resetButtonLabel"),
      prop: "resetStateActionBtnLabel",
      type: "string",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.rowClassName"),
      prop: "rowClassName",
      type: "string | ((options: { row: Row<TData> }) => string)",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.rowPerPage"),
      prop: "rowPerPage",
      type: "number",
    },
    {
      default: "[10, 20, 30]",
      description: t("table.propertiesDescription.rowPerPageOptions"),
      prop: "rowPerPageOptions",
      type: "number[]",
    },
    {
      default: "false",
      description: t("table.propertiesDescription.showColumnAction"),
      prop: "showColumnsAction",
      type: "boolean",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.showResetButton"),
      prop: "showResetStateAction",
      type: "boolean",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.titleInfo"),
      prop: "title",
      type: "{ text: string; align?: 'left' | 'center' | 'right' }",
    },
    {
      default: "0",
      description: t("table.propertiesDescription.totalRecords"),
      prop: "totalRecords",
      type: "number",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.visibleColumns"),
      prop: "visibleColumns",
      type: "string[]",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.fetchData"),
      prop: "fetchData",
      type: "(data: TRequestJSON) => void",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.handleResetState"),
      prop: "handleResetState",
      type: "function",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.onRowSelectChange"),
      prop: "onRowSelectChange",
      type: "(table: Table<TData>) => void",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.renderCustomPagination"),
      prop: "renderCustomPagination",
      type: "(table: Table<TData>) => React.ReactNode",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.renderSortIcons"),
      prop: "renderSortIcons",
      type: "(direction: false | SortDirection) => React.ReactNode",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.renderTableFooterContent"),
      prop: "renderTableFooterContent",
      type: "(table: Table<TData>) => React.ReactNode",
    },
    {
      default: "-",
      description: t("table.propertiesDescription.renderToolbarItems"),
      prop: "renderToolbarItems",
      type: "(table: Table<TData>) => React.ReactNode",
    },
  ];

  return (
    <Page
      className="demo-data-tables-page"
      subtitle={t("table.subtitle")}
      title={t("table.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Table" })}</p>
        <CodeBlock exampleCode='import { TDataTable } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("table.usage.basic")}>
        <TDataTable
          columns={columns}
          data={data}
          id="invitations-table"
          initialSorting={[{ desc: false, id: "email" }]}
          rowClassName={({ row: { original } }) => {
            return `row-${original.id}`;
          }}
          showResetStateAction
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.filterable")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              filterPlaceholder: t("table.placeholder.search"),
            },
            {
              accessorKey: "name",
              enableColumnFilter: true,
              filterPlaceholder: t("table.placeholder.search"),
            },
            {
              accessorKey: "city",
              enableColumnFilter: true,
              filterPlaceholder: t("table.placeholder.select"),
              meta: {
                filterOptions: city,
                filterVariant: "multiselect",
              },
            },
          ]}
          data={data}
          id="filterable-table"
          initialSorting={[{ desc: false, id: "email" }]}
          visibleColumns={["email", "name", "age", "city", "country"]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.sortable")}>
        <TDataTable
          columns={columns.map((column) => ({
            ...column,
            enableSorting: true,
          }))}
          data={data}
          id="sortable-table"
          initialFilters={[{ id: "email", value: "s" }]}
          initialSorting={[{ desc: false, id: "email" }]}
          visibleColumns={["email", "name", "age", "city", "country"]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.rowSelection")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
          id="row-selection-table"
          initialSorting={[{ desc: false, id: "email" }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.persistentState")}>
        <p>
          Use the id and persistentState props to make the table remember states
          such as sorting, filtering, and visible columns, even after a page
          refresh.
        </p>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              filterPlaceholder: t("table.placeholder.search"),
            },
          ]}
          data={data}
          id="persistent-state"
          initialSorting={[{ desc: false, id: "email" }]}
          persistState
          showColumnsAction
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customPagination")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
            },
          ]}
          data={data.slice(0, 5)}
          id="custom-pagination-table"
          initialSorting={[{ desc: false, id: "email" }]}
          renderCustomPagination={(table) => {
            return <>Custom pagination</>;
          }}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customToolbarActions")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
            },
          ]}
          data={data.slice(0, 5)}
          id="custom-toolbar-actions-table"
          initialSorting={[{ desc: false, id: "email" }]}
          renderToolbarItems={(table) => {
            return (
              <>
                <Button label="Add record" />
              </>
            );
          }}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.columnTooltip")}>
        <TDataTable
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
          id="custom-tooltip-table"
          initialSorting={[{ desc: false, id: "email" }]}
          title={{
            align: "left",
            text: t("table.usage.columnTooltip"),
          }}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.columnAlignment")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              align: "left",
            },
            {
              accessorKey: "city",
              align: "center",
            },
          ]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
          id="column-alignment-table"
          initialSorting={[{ desc: false, id: "email" }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.columnAction")}>
        <TDataTable
          columnActionBtnLabel="Columns"
          columns={[...columns]}
          data={data.slice(10, 15)}
          id="column-action-table"
          initialSorting={[{ desc: false, id: "email" }]}
          showColumnsAction={true}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withFooter")}>
        <TDataTable
          columns={[...columns]}
          data={data}
          id="table-with-footer"
          initialSorting={[{ desc: false, id: "email" }]}
          renderTableFooterContent={(table) => (
            <tr>
              <td>
                Total records: {table.getPreFilteredRowModel().flatRows.length}
              </td>
            </tr>
          )}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.tableBorderVertical")}>
        <TDataTable
          className="vertical"
          columnActionBtnLabel="Columns"
          columns={[...columns]}
          data={data}
          id="vertical-border-table"
          initialSorting={[{ desc: false, id: "email" }]}
          showColumnsAction={true}
          visibleColumns={["email", "name", "age", "city", "country"]}
        ></TDataTable>
        <CodeBlock
          exampleCode={VERTICAL_CSS_CODE}
          subheader={
            <>
              <p>{t("table.cssCodeBlock.messages.addVertical")}</p>
              <p>
                <strong>{t("table.cssCodeBlock.messages.note")}</strong> In this
                example, we are using custom class&nbsp;
                <code>.vertical</code> in our table. Replace it with class used
                in your table.
              </p>
            </>
          }
          title={t("table.cssCodeBlock.title")}
        />
      </Section>

      <Section title={t("table.usage.tableBorderHorizontal")}>
        <TDataTable
          className="horizontal"
          columnActionBtnLabel="Columns"
          columns={[...columns]}
          data={data}
          id="horizontal-border-table"
          initialSorting={[{ desc: false, id: "email" }]}
          showColumnsAction={true}
          visibleColumns={["email", "name", "age", "city", "country"]}
        ></TDataTable>
        <CodeBlock
          exampleCode={HORIZONTAL_CSS_CODE}
          subheader={
            <>
              <p>{t("table.cssCodeBlock.messages.addHorizontal")}</p>
              <p>
                <strong>{t("table.cssCodeBlock.messages.note")}</strong> In this
                example, we are using custom class
                <code>.horizontal</code> in our table. Replace it with class
                used in your table.
              </p>
            </>
          }
          title={t("table.cssCodeBlock.title")}
        />
      </Section>

      <Section title={t("table.usage.withoutPagination")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          id="pagination-disabled-table"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withTitle")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          id="table-with-title"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
          title={{ align: "left", text: "Table title" }}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.builtInActionColumn")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
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
              {
                disabled: true,
                label: "Edit",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                disabled: (rowData) => {
                  ///your logic here
                  return rowData.id !== 11;
                },
                label: "Share",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "share action");
                },
              },
              {
                className: "danger",
                confirmationOptions: (rowData) => {
                  return {
                    header: t("table.confirmation.header"),
                    message: t("table.confirmation.message.deleteUserData", {
                      user: rowData?.name,
                    }),
                  };
                },
                label: "Delete",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "delete action");
                },
                requireConfirmationModal: true,
              },
            ],
            displayActions: (rowData) => {
              return rowData.id !== 12;
            },
          }}
          id="builtin-action-table"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
        />
      </Section>

      <Section title={t("table.usage.rowSpecificActions")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          dataActionsMenu={{
            actions: [
              {
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                icon: "pi pi-eye",
                label: "View",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
              {
                disabled: true,
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                icon: "pi pi-pencil",
                label: "Edit",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                disabled: (rowData) => {
                  ///your logic here
                  return rowData.id !== 11;
                },
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                icon: "pi pi-share-alt",
                label: "Share",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "share action");
                },
              },
              {
                confirmationOptions: (rowData) => {
                  return {
                    header: t("table.confirmation.header"),
                    message: (
                      <p>
                        <Trans
                          component={{ strong: <strong /> }}
                          i18nKey="ui:table.confirmation.message.deleteUser"
                          values={{ user: rowData?.name }}
                        ></Trans>
                      </p>
                    ),
                  };
                },
                icon: "pi pi-trash",
                label: "Delete",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "delete action");
                },
                requireConfirmationModal: true,
                severity: "danger",
              },
            ],
          }}
          id="row-specific-action-table"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
        />
      </Section>

      <Section title={t("table.usage.singleActionColumn")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          dataActionsMenu={{
            actions: [
              {
                icon: "pi pi-eye",
                label: "View",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
            ],
          }}
          id="single-action-table"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
        />
      </Section>

      <Section title={t("table.usage.singleActionColumnWithMenu")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
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
            mode: "dropdown",
          }}
          id="single-action-menu-table"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
        />
      </Section>

      <Section title={t("table.usage.multipleButtonAction")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          dataActionsMenu={{
            actions: [
              {
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                icon: "pi pi-eye",
                label: "View",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
              {
                disabled: true,
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                icon: "pi pi-pencil",
                label: "Edit",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                disabled: (rowData) => {
                  ///your logic here
                  return rowData.id !== 11;
                },
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                icon: "pi pi-share-alt",
                label: "Share",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "share action");
                },
              },
              {
                confirmationOptions: {
                  header: "Are you sure!",
                  message: "You are going to delete this data.",
                },
                icon: "pi pi-trash",
                label: "Delete",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "delete action");
                },
                requireConfirmationModal: true,
                severity: "danger",
              },
            ],
            mode: "buttons",
          }}
          id="mutiple-button-action-table"
          initialSorting={[{ desc: false, id: "email" }]}
          paginated={false}
        />
      </Section>

      <Section title={t("table.usage.withCustomFilter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              customFilterComponent: (column) => (
                <DebouncedInput
                  debounceTime={200}
                  defaultValue={column.getFilterValue() as string}
                  onInputChange={(value) => {
                    column.setFilterValue(value);
                  }}
                  placeholder={t("table.placeholder.search")}
                ></DebouncedInput>
              ),
              enableColumnFilter: true,
              meta: {
                serverFilterFn: "contains",
              },
            },
          ]}
          data={data.slice(10, 15)}
          fetchData={() => {}}
          id="custom-filter-table"
          initialSorting={[{ desc: false, id: "email" }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withEqualServerFilter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              filterPlaceholder: t("table.placeholder.search"),
              meta: {
                serverFilterFn: "equals",
              },
            },
          ]}
          data={data.slice(10, 15)}
          fetchData={() => {}}
          id="equal-server-filter-table"
          initialSorting={[{ desc: false, id: "email" }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.cellDataFormatting")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
              header: "Description",
            },
            {
              accessorKey: "quantity",
              dataType: "number",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: () => "Quantity",
              numberOptions: {
                locale: "en-IN",
              },
            },
            {
              accessorKey: "amount",
              dataType: "currency",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: "Amount",
              meta: {
                filterVariant: "range",
              },
              numberOptions: {
                formatOptions: {
                  currency: "EUR",
                },
                locale: "en-US",
              },
            },
            {
              accessorKey: "date",
              dataType: "date",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.date"),
              header: "Date",
              meta: {
                filterVariant: "dateRange",
              },
            },
            {
              accessorKey: "datetime",
              dataType: "datetime",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.date"),
              header: "Datetime",
              meta: {
                filterVariant: "dateRange",
              },
            },
            {
              cell: () => (
                <Button iconLeft="pi pi-eye" rounded variant="textOnly" />
              ),
              dataType: "other",
              header: () => <i className="pi pi-cog"></i>,
              id: "action",
            },
          ]}
          data={formatDemoData}
          id="cell-data-formatting-table"
          initialSorting={[{ desc: true, id: "quantity" }]}
          paginated={false}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customCellDataFormatting")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
              header: "Description",
            },
            {
              accessorKey: "quantity",
              dataType: "number",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: () => "Quantity",
            },
            {
              accessorKey: "amount",
              dataType: "currency",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: "Amount",
              meta: {
                filterVariant: "range",
              },
            },
            {
              accessorKey: "date",
              dataType: "date",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.date"),
              header: "Date",
              meta: {
                filterVariant: "dateRange",
              },
            },
            {
              cell: () => (
                <Button iconLeft="pi pi-eye" rounded variant="textOnly" />
              ),
              dataType: "other",
              header: () => <i className="pi pi-cog"></i>,
              id: "action",
            },
          ]}
          customFormatters={{
            currency: (value) => `$${value}`,
            number: (value) => `~${value}`,
          }}
          data={formatDemoData}
          id="custom-cell-data-formatting-table"
          initialSorting={[{ desc: true, id: "quantity" }]}
          paginated={false}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customStaticFilter")}>
        <TDataTable
          className="custom-static-filter-table"
          columns={[
            {
              accessorKey: "description",
              enableColumnFilter: true,
              enableSorting: true,
              filterFn: "customEqualStringFilter",
              filterPlaceholder: t("table.placeholder.search"),
              header: "Description",
            },
            {
              accessorKey: "quantity",
              dataType: "number",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: () => "Quantity",
              numberOptions: {
                locale: "en-IN",
              },
            },
            {
              accessorKey: "amount",
              dataType: "currency",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: "Amount",
              meta: {
                filterVariant: "range",
              },
              numberOptions: {
                formatOptions: {
                  currency: "EUR",
                },
                locale: "en-US",
              },
            },
            {
              accessorKey: "date",
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
                      placeholder={t("table.placeholder.startDate")}
                      value={(column.getFilterValue() as [Date, Date])?.[0]}
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
                      placeholder={t("table.placeholder.endDate")}
                      value={(column.getFilterValue() as [Date, Date])?.[1]}
                    />
                  </div>
                );
              },
              dataType: "date",
              enableColumnFilter: true,
              enableSorting: true,
              filterFn: "inDateRangeFilter",
              header: "Date",
            },
            {
              cell: () => (
                <Button iconLeft="pi pi-eye" rounded variant="textOnly" />
              ),
              dataType: "other",
              header: () => <i className="pi pi-cog"></i>,
              id: "action",
            },
          ]}
          data={formatDemoData}
          filterFns={{
            customEqualStringFilter: customEqualStringFilter,
            inDateRangeFilter: inDateRangeFilter,
          }}
          id="custom-static-filter-table"
          initialSorting={[{ desc: true, id: "quantity" }]}
          paginated={false}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.divContent")}>
        <TDataTable
          className="center-aligned-content-table"
          columns={[
            {
              accessorKey: "email",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
              header: "Email",
            },
            {
              accessorKey: "name",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
              header: "Name",
            },
            {
              accessorKey: "age",
              align: "right",
              dataType: "number",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
              header: "Age",
            },
            {
              accessorKey: "city",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.select"),
              header: () => <span>City</span>,
              meta: {
                filterOptions: city,
                filterVariant: "multiselect",
              },
            },
            {
              accessorKey: "country",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.country"),
              header: "Country",
              meta: {
                filterOptions: country,
                filterVariant: "select",
              },
            },
            {
              accessorKey: "disabled",
              align: "center",
              cell: ({ row: { original } }) => {
                const color = original.disabled ? "red" : "green";

                return (
                  <Tag
                    color={color}
                    fullWidth
                    label={original.disabled ? "Disabled" : "Enabled"}
                  />
                );
              },
              enableColumnFilter: true,
              enableSorting: true,
              filterFn: (row, columnId, filterValue) => {
                if (!filterValue || filterValue.length === 0) {
                  return true;
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const updatedFilterValue = filterValue.map((value: any) => {
                  switch (value) {
                    case "false":
                      return false;
                    case "true":
                      return true;
                    default:
                      return value;
                  }
                });

                const cellValue = row.getValue(columnId);

                return updatedFilterValue.includes(cellValue);
              },
              filterPlaceholder: t("table.placeholder.status"),
              header: "Status",
              meta: {
                filterOptions: [
                  {
                    label: "Enabled",
                    value: "false",
                  },
                  {
                    label: "Disabled",
                    value: "true",
                  },
                ],
                filterVariant: "multiselect",
              },
            },
          ]}
          data={data.slice(10, 15)}
          id="div-content-table"
          initialSorting={[{ desc: false, id: "email" }]}
        ></TDataTable>
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
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={propertiesData}
          paginated={false}
          persistState={false}
        />
      </Section>

      <Section title={t("headers.types")}>
        <CodeBlock
          exampleCode='
interface ColumnFilter {
  id: string;
  value: unknown;
}

interface ColumnSort {
  desc: boolean;
  id: string;
}

interface DataActionsMenuItem
  extends Omit<MenuItem, "disabled" | "display" | "onClick"> {
  requireConfirmationModal?: boolean;
  onClick?: (arguments_) => void | Promise<void>;
  confirmationOptions?: IModalProperties | ((data) => IModalProperties);
  disabled?: boolean | ((data) => boolean);
  display?: boolean | ((data) => boolean);
}

interface DataActionsMenuProperties<TData> {
  actions?: DataActionsMenuItem[];
  autoModeCount?: number;
  data?: TData;
  mode?: "auto" | "buttons" | "dropdown";
  displayActions?: boolean | ((data: TData) => boolean);
}

type ColumnFiltersState = ColumnFilter[];
type SortDirection = "asc" | "desc";
type SortingState = ColumnSort[];

type TRequestJSON = {
  filter: TFilterRequest;
  sort: TSortRequest;
  offset: TOffset;
  limit: TLimit;
};
'
        />
      </Section>
    </Page>
  );
};
