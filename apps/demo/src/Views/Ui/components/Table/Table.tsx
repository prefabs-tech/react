import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  TDataTable,
  Page,
  Button,
  TableColumnDefinition,
  DebouncedInput,
} from "@prefabs.tech/react-ui";
import { FilterFunction, DatePicker } from "@prefabs.tech/react-ui";
import { Tag } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import {
  HORIZONTAL_CSS_CODE,
  TData,
  VERTICAL_CSS_CODE,
  data,
  formatDemoData,
  city,
  country,
} from "./data";
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
      filterPlaceholder: t("table.placeholder.search"),
    },
    {
      accessorKey: "name",
      header: () => <span>Full name</span>,
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholder.search"),
    },
    {
      accessorKey: "age",
      header: "Age",
      align: "right",
      dataType: "number",
      enableSorting: true,
      enableColumnFilter: true,
      filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
    },
    {
      accessorKey: "city",
      header: () => <span>City</span>,
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholder.select"),
      meta: {
        filterVariant: "multiselect",
        filterOptions: city,
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      enableColumnFilter: true,
      enableSorting: true,
      meta: {
        filterVariant: "select",
        filterOptions: country,
      },
      filterPlaceholder: t("table.placeholder.country"),
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
      </Section>

      <Section title={t("table.usage.filterable")}>
        <TDataTable
          visibleColumns={["email", "name", "age", "city", "country"]}
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
                filterVariant: "multiselect",
                filterOptions: city,
              },
            },
          ]}
          data={data}
          id="filterable-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.sortable")}>
        <TDataTable
          visibleColumns={["email", "name", "age", "city", "country"]}
          columns={columns.map((column) => ({
            ...column,
            enableSorting: true,
          }))}
          data={data}
          id="sortable-table"
          initialFilters={[{ id: "email", value: "s" }]}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.rowSelection")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
          id="row-selection-table"
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
          id="persistent-state"
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
          renderCustomPagination={(table) => {
            return <>Custom pagination</>;
          }}
          id="custom-pagination-table"
          initialSorting={[{ id: "email", desc: false }]}
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
          renderToolbarItems={(table) => {
            return (
              <>
                <Button label="Add record" />
              </>
            );
          }}
          id="custom-toolbar-actions-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
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
          id="custom-tooltip-table"
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.columnAction")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          id="column-action-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withFooter")}>
        <TDataTable
          columns={[...columns]}
          data={data}
          renderTableFooterContent={(table) => (
            <tr>
              <td>
                Total records: {table.getPreFilteredRowModel().flatRows.length}
              </td>
            </tr>
          )}
          id="table-with-footer"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.tableBorderVertical")}>
        <TDataTable
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          className="vertical"
          visibleColumns={["email", "name", "age", "city", "country"]}
          columns={[...columns]}
          data={data}
          id="vertical-border-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          title={t("table.cssCodeBlock.title")}
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
        />
      </Section>

      <Section title={t("table.usage.tableBorderHorizontal")}>
        <TDataTable
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          className="horizontal"
          visibleColumns={["email", "name", "age", "city", "country"]}
          columns={[...columns]}
          data={data}
          id="horizontal-border-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CodeBlock
          title={t("table.cssCodeBlock.title")}
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
        />
      </Section>

      <Section title={t("table.usage.withoutPagination")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          id="pagination-disabled-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withTitle")}>
        <TDataTable
          title={{ text: "Table title", align: "left" }}
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          id="table-with-title"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.builtInActionColumn")}>
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
              {
                label: "Edit",
                disabled: true,
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                label: "Share",
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
            displayActions: (rowData) => {
              return rowData.id !== 12;
            },
          }}
          id="builtin-action-table"
          initialSorting={[{ id: "email", desc: false }]}
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
          id="row-specific-action-table"
          initialSorting={[{ id: "email", desc: false }]}
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
          id="single-action-table"
          initialSorting={[{ id: "email", desc: false }]}
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
            mode: "menu",
          }}
          id="single-action-menu-table"
          initialSorting={[{ id: "email", desc: false }]}
        />
      </Section>

      <Section title={t("table.usage.multipleButtonAction")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          dataActionsMenu={{
            actions: [
              {
                icon: "pi pi-eye",
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
                icon: "pi pi-pencil",
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
                icon: "pi pi-share-alt",
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
                icon: "pi pi-trash",
                label: "Delete",
                severity: "danger",
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
            mode: "buttons",
          }}
          id="mutiple-button-action-table"
          initialSorting={[{ id: "email", desc: false }]}
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
                  placeholder={t("table.placeholder.search")}
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
          id="custom-filter-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
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
              filterPlaceholder: t("table.placeholder.search"),
            },
          ]}
          fetchData={() => {}}
          data={data.slice(10, 15)}
          id="equal-server-filter-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.cellDataFormatting")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              header: "Description",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
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
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
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
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
            },
            {
              accessorKey: "date",
              header: "Date",
              dataType: "date",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.date"),
              meta: {
                filterVariant: "dateRange",
              },
            },
            {
              accessorKey: "datetime",
              header: "Datetime",
              dataType: "datetime",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.date"),
              meta: {
                filterVariant: "dateRange",
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
          id="cell-data-formatting-table"
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customCellDataFormatting")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              header: "Description",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
            },
            {
              accessorKey: "quantity",
              header: () => "Quantity",
              enableSorting: true,
              dataType: "number",
              enableColumnFilter: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
            },
            {
              accessorKey: "amount",
              header: "Amount",
              dataType: "currency",
              enableSorting: true,
              enableColumnFilter: true,
              meta: {
                filterVariant: "range",
              },
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
            },
            {
              accessorKey: "date",
              header: "Date",
              dataType: "date",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.date"),
              meta: {
                filterVariant: "dateRange",
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
          customFormatters={{
            number: (value) => `~${value}`,
            currency: (value) => `$${value}`,
          }}
          id="custom-cell-data-formatting-table"
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
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
              filterPlaceholder: t("table.placeholder.search"),
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
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
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
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
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
                      placeholder={t("table.placeholder.startDate")}
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
                      placeholder={t("table.placeholder.endDate")}
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
          id="custom-static-filter-table"
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.divContent")}>
        <TDataTable
          className="center-aligned-content-table"
          columns={[
            {
              accessorKey: "email",
              header: "Email",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
            },
            {
              accessorKey: "name",
              header: "Name",
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.search"),
            },
            {
              accessorKey: "age",
              header: "Age",
              align: "right",
              dataType: "number",
              enableSorting: true,
              enableColumnFilter: true,
              filterPlaceholder: `${t("table.placeholder.min")},${t("table.placeholder.max")}`,
            },
            {
              accessorKey: "city",
              header: () => <span>City</span>,
              enableColumnFilter: true,
              enableSorting: true,
              filterPlaceholder: t("table.placeholder.select"),
              meta: {
                filterVariant: "multiselect",
                filterOptions: city,
              },
            },
            {
              accessorKey: "country",
              header: "Country",
              enableColumnFilter: true,
              enableSorting: true,
              meta: {
                filterVariant: "select",
                filterOptions: country,
              },
              filterPlaceholder: t("table.placeholder.country"),
            },
            {
              align: "center",
              accessorKey: "disabled",
              header: "Status",
              cell: ({ row: { original } }) => {
                const color = original.disabled ? "red" : "green";

                return (
                  <Tag
                    label={original.disabled ? "Disabled" : "Enabled"}
                    color={color}
                    fullWidth
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
                    case "true":
                      return true;
                    case "false":
                      return false;
                    default:
                      return value;
                  }
                });

                const cellValue = row.getValue(columnId);

                return updatedFilterValue.includes(cellValue);
              },
              meta: {
                filterVariant: "multiselect",
                filterOptions: [
                  {
                    value: "false",
                    label: "Enabled",
                  },
                  {
                    value: "true",
                    label: "Disabled",
                  },
                ],
              },
              filterPlaceholder: t("table.placeholder.status"),
            },
          ]}
          data={data.slice(10, 15)}
          id="div-content-table"
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>
    </Page>
  );
};
