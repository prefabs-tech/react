import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesTable, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const FilesTableDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "columns",
      type: "ColumnDef[]",
      default: "[]",
      description: t("filesTable.propertiesDescription.columns"),
    },
    {
      id: 2,
      prop: "fetchFiles",
      type: "(args: TRequestJSON) => void",
      default: "undefined",
      description: t("filesTable.propertiesDescription.fetchFiles"),
    },
    {
      id: 3,
      prop: "files",
      type: "IFile[]",
      default: "[]",
      description: t("filesTable.propertiesDescription.files"),
    },
    {
      id: 4,
      prop: "isLoading",
      type: "boolean",
      default: "false",
      description: t("filesTable.propertiesDescription.isLoading"),
    },
    {
      id: 5,
      prop: "locale",
      type: "string",
      default: "undefined",
      description: t("filesTable.propertiesDescription.locale"),
    },
    {
      id: 6,
      prop: "messages",
      type: "TableMessages",
      default: "undefined",
      description: t("filesTable.propertiesDescription.messages"),
    },
    {
      id: 7,
      prop: "onFile[Action]",
      type: "(file: IFile) => void",
      default: "undefined",
      description: t("filesTable.propertiesDescription.actions"),
    },
    {
      id: 8,
      prop: "totalRecords",
      type: "number",
      default: "undefined",
      description: t("filesTable.propertiesDescription.totalRecords"),
    },
    {
      id: 9,
      prop: "visibleColumns",
      type: "string[]",
      default: '["originalFileName", "uploadedBy", "uploadedAt", "actions"]',
      description: t("filesTable.propertiesDescription.visibleColumns"),
    },
  ];

  return (
    <Page
      title={t("filesTable.title")}
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
        <p>{t("common.usage", { component: "FilesTable" })}</p>
        <FilesTable
          onFileDelete={() => {}}
          onFileArchive={() => {}}
          files={[
            {
              id: 0,
              originalFileName: "my file",
              description: "Initial project proposal for client review",
              uploadedBy: { givenName: "Manish", surname: "Aryal" },
              uploadedAt: new Date("2025-01-14").getTime(),
              lastDownloadedAt: new Date("2025-01-26").getTime(),
              downloadCount: 10,
            },
            {
              id: 1,
              originalFileName: "logo",
              description: "Final logo design for branding",
              uploadedBy: { givenName: "Nabin", surname: "Dhital" },
              uploadedAt: new Date("2025-02-17").getTime(),
              lastDownloadedAt: Date.now(),
              downloadCount: 12,
            },
          ]}
          locale={i18n?.language}
          visibleColumns={[
            "originalFileName",
            "description",
            "uploadedBy",
            "uploadedAt",
            "lastDownloadedAt",
            "downloadCount",
            "actions",
          ]}
          columns={[
            {
              id: "uploadedBy",
              tooltip: ({ row: { original } }) => {
                return `${original.uploadedBy.givenName} ${original.uploadedBy.lastName}`;
              },
            },
            {
              accessorKey: "uploadedAt",
              tooltip: true,
            },
          ]}
          paginationOptions={{
            pageInputLabel: t("filesTable.pagination.pageControl"),
            itemsPerPageControlLabel: t("filesTable.pagination.rowsPerPage"),
          }}
        />
        <CodeBlock
          exampleCode={`import { FilesTable } from "@prefabs.tech/react-ui";

const myFiles = [
  { id: 1, originalFileName: "doc.pdf", size: 1024, uploadedBy: {...}, ... },
  { id: 2, originalFileName: "img.png", size: 2048, uploadedBy: {...}, ... }
];

<FilesTable
  files={myFiles}
  locale="en"
  visibleColumns={[
    "originalFileName", 
    "size", 
    "uploadedBy", 
    "actions"
  ]}
  onFileDownload={(file) => handleDownload(file)}
  onFileDelete={(file) => handleDelete(file)}
  fetchFiles={(requestParams) => loadData(requestParams)}
  totalRecords={100}
  isLoading={loading}
/>`}
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "FilesTable",
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
          data={data}
          paginated={false}
          persistState={false}
        />
      </Section>

      <Section title={t("filesTable.typeDefinitions", "Type Definitions")}>
        <CodeBlock
          exampleCode={`interface IFile {
  id: number | string;
  originalFileName: string;
  description?: string;
  size?: number;
  uploadedBy: any;
  uploadedAt: number;
  downloadCount?: number;
  lastDownloadedAt?: number;
}

type TableMessages = {
  searchPlaceholder?: string;
  tableEmpty?: string;
  fileSizeHeader?: string;
} & FileMessages;

type FilesTableProperties = Partial<
  Omit<TDataTableProperties<IFile>, "data" | "visibleColumns" | "fetchData">
> & {
  files: Array<IFile>;
  locale?: string;
  messages?: TableMessages;
  visibleColumns?: string[];
  fetchFiles?: (args: TRequestJSON) => void;
  onFileArchive?: (file: IFile) => void;
  onFileDownload?: (file: IFile) => void;
  onFileDelete?: (file: IFile) => void;
  onEditDescription?: (file: IFile) => void;
  onFileShare?: (file: IFile) => void;
  onFileView?: (file: IFile) => void;
};`}
        />
      </Section>
    </Page>
  );
};
