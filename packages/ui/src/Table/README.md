# Datatable component

## Installation

### npm

```
npm install @prefabs.tech/react-ui
```

### yarn

```
yarn add @prefabs.tech/react-ui
```

### pnpm

```
pnpm add @prefabs.tech/react-ui
```

## Usage

```
import React from "react";

import "@prefabs.tech/react-ui/dist/TableTheme.css";

import { Table, TRequestJSON } from "@prefabs.tech/react-ui";
import { getData } from "./services";

import type { TableColumnDefinition } from "@prefabs.tech/react-ui";

type DataType = {
  id: number;
  name: string;
}


const Page: React.FC<Properties> = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const handleFetch = async (requestJSON: TRequestJSON) => {
    const response = await getData(requestJSON);
    setData(response.data);
    setTotal(response.total);
  };

  const columns = useMemo<TableColumnDefinition<DataType>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span>ID</span>,
        size: 40,
      },
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={data}
      totalItems={total}
      fetcher={handleFetch}
    />
  );
};


export default Page
```

## Props

### Datatable

| Prop                 | Type                                                         | Description                                                             | Default                                                                                                                    | Required |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| columns              | `ColumnDef<T>[]`                                             | Column definition used to structure the table                           | `[]`                                                                                                                       | Yes      |
| data                 | `T[]`                                                        | Type of response data                                                   | `[]`                                                                                                                       | Yes      |
| fetcher              | `(requestJSON: TRequestJSON) => void;`                       | Callback triggered by table on interactions like pagination, sort, etc. | `() => {}`                                                                                                                 | Yes      |
| filterMenuToggleIcon | `string`                                                     | Menu icon that expands or collapses table header in smaller screens     | `"adjustments.svg"`                                                                                                        | No       |
| enableMultiSort      | `boolean`                                                    | Enables multi sort                                                      | `false`                                                                                                                    | No       |
| isLoading            | `boolean`                                                    | Used to track loading state by table                                    | `false`                                                                                                                    | No       |
| inputDebounceTime    | `number`                                                     | Debounce time for input fields inside table                             | `300`                                                                                                                      | No       |
| fixedHeader          | `boolean`                                                    | Makes header sticky                                                     | `true`                                                                                                                     | No       |
| filterIcons          | `{ expanded: string; notExpanded: string;}`                  | Icons for column filter button                                          | `{ expanded: "filter.svg", notExpanded: "filter.svg"}`                                                                     | No       |
| hideScrollBar        | `boolean`                                                    | Hides scrollbar when table overflows (> max height)                     | `true`                                                                                                                     | No       |
| paginated            | `boolean`                                                    | Show/Hide pagination buttons                                            | `true`                                                                                                                     | No       |
| paginationIcons      | `{start: string;previous: string;next: string;end: string;}` | Icon for pagination buttons                                             | `{start: "double-chevron-left.svg;previous: "chevron-left.svg;next: "chevron-right.svg";end: "double-chevron-right.svg";}` | No       |
| rowsPerPageOptions   | `number[]`                                                   | Options for number of items in table                                    | `[10, 20, 30]`                                                                                                             | No       |
| showPageControl      | `boolean`                                                    | Show/Hide page controls (left section of footer)                        | `true`                                                                                                                     | No       |
| showTotalNumber      | `boolean`                                                    | Show/Hide current page and total page                                   | `true`                                                                                                                     | No       |
| sortable             | `boolean`                                                    | Enable/Disable sorting in the table                                     | `true`                                                                                                                     | No       |
| sortIcons            | `{asc: string;desc: string;default: string;}`                | Icons for sort button for different state                               | `{asc: "arrow-up.svg",desc: "arrow-down.svg",default: "arrow-up-down.svg"}`                                                | No       |
| title                | `string`                                                     | Caption for the table                                                   | None                                                                                                                       | No       |
| totalItems           | `number`                                                     | Total number of items for selected filters in the server                | `0`                                                                                                                        | Yes      |
