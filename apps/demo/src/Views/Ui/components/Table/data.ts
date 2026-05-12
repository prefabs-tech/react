export type TData = {
  age: number;
  city: string;
  country: string;
  disabled?: boolean;
  email: string;
  id: number;
  name: string;
};

const city = [
  { label: "Atlanta", value: "Atlanta" },
  { label: "Austin", value: "Austin" },
  { label: "Boston", value: "Boston" },
  { label: "Charlotte", value: "Charlotte" },
  { label: "Chicago", value: "Chicago" },
  { label: "Dallas-Fort Worth", value: "Dallas-Fort Worth" },
  { label: "Denver", value: "Denver" },
  { label: "Detroit", value: "Detroit" },
  { label: "Houston", value: "Houston" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Miami Beach", value: "Miami Beach" },
  { label: "Minneapolis", value: "Minneapolis" },
  { label: "Nashville", value: "Nashville" },
  { label: "New York", value: "New York" },
  { label: "Philadelphia", value: "Philadelphia" },
  { label: "Phoenix", value: "Phoenix" },
  { label: "Portland", value: "Portland" },
  { label: "San Diego", value: "San Diego" },
  { label: "San Francisco Bay Area", value: "San Francisco Bay Area" },
  { label: "Seattle", value: "Seattle" },
];

const country = [
  { label: "Estonia", value: "Estonia" },
  { label: "France", value: "France" },
  {
    label: "United State of America",
    value: "United State of America",
  },
];

const data: TData[] = [
  {
    age: 28,
    city: "New York",
    country: "France",
    disabled: true,
    email: "john.doe@example.com",
    id: 1,
    name: "John Doe",
  },
  {
    age: 32,
    city: "Los Angeles",
    country: "France",
    disabled: true,
    email: "jane.smith@example.com",
    id: 2,
    name: "Jane Elizabeth Smith",
  },
  {
    age: 25,
    city: "Chicago",
    country: "United State of America",
    disabled: false,
    email: "bob.j@example.com",
    id: 3,
    name: "Robert Johnson",
  },
  {
    age: 22,
    city: "San Franceancisco Bay Area",
    country: "United State of America",
    disabled: true,
    email: "alice.brown@example.com",
    id: 4,
    name: "Alice Brown",
  },
  {
    age: 35,
    city: "Houston",
    country: "United State of America",
    disabled: false,
    email: "charlie.w@example.com",
    id: 5,
    name: "Charles William Wilson Jr.",
  },
  {
    age: 30,
    city: "Miami Beach",
    country: "United State of America",
    disabled: false,
    email: "eva.martinez@example.com",
    id: 6,
    name: "Evangeline Martinez",
  },
  {
    age: 27,
    city: "Seattle",
    country: "United State of America",
    disabled: false,
    email: "david.lee@example.com",
    id: 7,
    name: "David Lawrence",
  },
  {
    age: 29,
    city: "Atlanta",
    country: "United State of America",
    disabled: false,
    email: "sophie.t@example.com",
    id: 8,
    name: "Sophia Turner",
  },
  {
    age: 31,
    city: "Dallas-Fort Worth",
    country: "United State of America",
    disabled: true,
    email: "michael.a@example.com",
    id: 9,
    name: "Michael Anthony Adams",
  },
  {
    age: 26,
    city: "Denver",
    country: "United State of America",
    disabled: false,
    email: "olivia.carter@example.com",
    id: 10,
    name: "Olivia Charlotte Carter",
  },
  {
    age: 34,
    city: "Boston",
    country: "United State of America",
    disabled: true,
    email: "ryan.cooper@example.com",
    id: 11,
    name: "Ryan Alexander Cooper",
  },
  {
    age: 33,
    city: "Phoenix",
    country: "United State of America",
    disabled: true,
    email: "emily.d@example.com",
    id: 12,
    name: "Emily Davis",
  },
  {
    age: 28,
    city: "Philadelphia",
    country: "United State of America",
    disabled: true,
    email: "daniel.white@example.com",
    id: 13,
    name: "Daniel William White",
  },
  {
    age: 24,
    city: "Austin",
    country: "France",
    disabled: false,
    email: "ava.m@example.com",
    id: 14,
    name: "Ava Rose Moore",
  },
  {
    age: 27,
    city: "San Diego",
    country: "United State of America",
    disabled: false,
    email: "nicholas.h@example.com",
    id: 15,
    name: "Nicholas Harrison",
  },
  {
    age: 29,
    city: "Portland",
    country: "France",
    disabled: true,
    email: "emma.t@example.com",
    id: 16,
    name: "Emma Grace Turner",
  },
  {
    age: 32,
    city: "Detroit",
    country: "France",
    disabled: true,
    email: "william.l@example.com",
    id: 17,
    name: "William Lewis Jr.",
  },
  {
    age: 26,
    city: "Minneapolis",
    country: "Estonia",
    disabled: true,
    email: "grace.murphy@example.com",
    id: 18,
    name: "Grace Margaret Murphy",
  },
  {
    age: 30,
    city: "Charlotte",
    country: "Estonia",
    disabled: false,
    email: "matthew.w@example.com",
    id: 19,
    name: "Matthew Wright",
  },
  {
    age: 31,
    city: "Nashville",
    country: "Estonia",
    disabled: false,
    email: "lily.adams@example.com",
    id: 20,
    name: "Lily Alexandra Adams",
  },
];

const formatDemoData = [
  {
    amount: 1_234_567.89,
    date: null,
    datetime: null,
    description: "Purchase of equipment",
    id: 1001,
    quantity: 420,
  },
  {
    amount: 987_654.32,
    date: new Date("2023-12-01T12:30:00"),
    datetime: new Date("2023-12-01T11:00:00"),
    description: "Office rent payment",
    id: 1002,
    quantity: 175,
  },
  {
    amount: 54321.0,
    date: new Date("2023-12-15T08:45:00"),
    datetime: new Date("2023-12-15T08:45:00"),
    description: "Marketing campaign expenses",
    id: 1003,
    quantity: 7890,
  },
  {
    amount: 654_321.12,
    date: new Date(),
    datetime: new Date(),
    description: "Product development costs",
    id: 1004,
    quantity: 2950,
  },
  {
    amount: 789_012.34,
    date: new Date("2023-12-05T09:15:00"),
    datetime: new Date("2023-12-05T09:15:00"),
    description: "Travel and accommodation",
    id: 1005,
    quantity: 53210,
  },
  {
    amount: 12345.67,
    date: new Date("2023-12-20T14:00:00"),
    datetime: new Date("2023-12-05T09:15:00"),
    description: "Employee salaries",
    id: 1006,
    quantity: 6430,
  },
  {
    amount: 234_567.89,
    date: new Date(),
    datetime: new Date(),
    description: "Product inventory replenishment",
    id: 1007,
    quantity: 98760,
  },
  {
    amount: 876_543.21,
    date: new Date("2023-12-10T18:45:00"),
    datetime: new Date("2023-12-10T18:45:00"),
    description: "New marketing materials",
    id: 1008,
    quantity: 123_450,
  },
  {
    amount: 13579.24,
    date: new Date("2023-12-25T11:30:00"),
    datetime: new Date("2023-12-25T11:30:00"),
    description: "Holiday season promotions",
    id: 1009,
    quantity: 45670,
  },
  {
    amount: 24680.36,
    date: new Date(),
    datetime: new Date(),
    description: "Office furniture upgrade",
    id: 1010,
    quantity: 78901,
  },
];

const VERTICAL_CSS_CODE = `.table-container.vertical .table-wrapper > table > tbody > tr,
.table-container.vertical .table-wrapper > table > tbody > tr > td,
.table-container.vertical .table-wrapper > table > thead tr > th {
  border: none;
}

.table-container.vertical .table-wrapper > table > tbody > tr > td,
.table-container.vertical .table-wrapper > table > thead tr > th {
  border-left: var(--dz-table-border);
  border-right: var(--dz-table-border);
}`;

const HORIZONTAL_CSS_CODE = `.table-container.horizontal .table-wrapper > table > tbody > tr > td,
.table-container.horizontal .table-wrapper > table > thead tr > th {
  border: none;
}`;

export {
  city,
  country,
  data,
  formatDemoData,
  HORIZONTAL_CSS_CODE,
  VERTICAL_CSS_CODE,
};
