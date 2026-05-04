const data = [
  { id: 1, name: "jone" },
  { id: 2, name: "abhi" },
  { id: 3, name: "mike" },
  { id: 4, name: "tony" },
];

const biggerData = [
  { id: 1, name: "jone" },
  { id: 2, name: "abhi" },
  { id: 3, name: "mike" },
  { id: 4, name: "tony" },
  { id: 5, name: "tony" },
  { id: 6, name: "tony" },
  { id: 7, name: "tony" },
  { id: 8, name: "tony" },
  { id: 9, name: "tony" },
  { id: 10, name: "tony" },
  { id: 11, name: "tony" },
  { id: 12, name: "tony" },
  { id: 13, name: "tony" },
  { id: 14, name: "tony" },
  { id: 15, name: "tony" },
];

const fetcher = () => {
  return data;
};

const columns = [
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
  },
  {
    accessorKey: "name",
    header: () => <span>Name</span>,
  },
];

export { biggerData, columns, data, fetcher };
