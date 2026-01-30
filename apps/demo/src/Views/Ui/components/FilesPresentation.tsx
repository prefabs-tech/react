import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  Button,
  FilesPresentation,
  Page,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const FilesPresentationDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "files",
      type: "IFile[]",
      default: "[]",
      description: t("filesPresentation.propertiesDescription.files"),
    },
    {
      id: 2,
      prop: "listProps",
      type: "Partial<FilesListProps>",
      default: "undefined",
      description: t("filesPresentation.propertiesDescription.listProps"),
    },
    {
      id: 3,
      prop: "locale",
      type: "string",
      default: "undefined",
      description: t("filesPresentation.propertiesDescription.locale"),
    },
    {
      id: 4,
      prop: "onFile[Action]",
      type: "(file: IFile) => void",
      default: "undefined",
      description: t("filesPresentation.propertiesDescription.actions"),
    },
    {
      id: 5,
      prop: "presentation",
      type: '"list" | "table"',
      default: '"list"',
      description: t("filesPresentation.propertiesDescription.presentation"),
    },
    {
      id: 6,
      prop: "tableProps",
      type: "Partial<FilesTableProps>",
      default: "undefined",
      description: t("filesPresentation.propertiesDescription.tableProps"),
    },
    {
      id: 7,
      prop: "visibleFileDetails",
      type: "string[]",
      default: "undefined",
      description: t("filesPresentation.propertiesDescription.visibleDetails"),
    },
  ];

  return (
    <Page
      title={t("filesPresentation.title")}
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
        <p>{t("common.usage", { component: "FilesPresentation" })}</p>
        <FilesPresentation
          locale={i18n?.language}
          visibleFileDetails={[
            "originalFileName",
            "description",
            "size",
            "uploadedBy",
            "uploadedAt",
            "downloadCount",
            "lastDownloadedAt",
            "actions",
          ]}
          presentation="table"
          onEditDescription={() => {}}
          onFileDownload={() => {}}
          onFileView={() => {}}
          files={[
            {
              id: 0,
              originalFileName: "file1.png",
              uploadedBy: { givenName: "Manish", surname: "Aryal" },
              uploadedAt: new Date("2025-04-14").getTime(),
              downloadCount: 5,
              description: "Important file for proposal",
              size: 1000,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 1,
              originalFileName: "document.pdf",
              uploadedBy: { givenName: "Gaurav", surname: "Sapkota" },
              uploadedAt: new Date("2025-03-02").getTime(),
              downloadCount: 4,
              description: "Initial project proposal for client review",
              size: 500,
              lastDownloadedAt: new Date("2025-03-26").getTime(),
            },
            {
              id: 2,
              originalFileName: "photo.jpeg",
              uploadedBy: { givenName: "Deepak", surname: "Aryal" },
              uploadedAt: new Date("2025-02-20").getTime(),
              downloadCount: 6,
              description: "Proposal for project",
              size: 1500,
              lastDownloadedAt: new Date("2025-03-12").getTime(),
            },
            {
              id: 3,
              originalFileName: "manish.png",
              uploadedBy: { givenName: "Lamdiki", surname: "Sherpa" },
              uploadedAt: new Date("2025-02-17").getTime(),
              downloadCount: 3,
              description: "File containing client list",
              size: 2000,
              lastDownloadedAt: new Date("2025-03-08").getTime(),
            },
          ]}
        />
        <CodeBlock
          exampleCode={`import { FilesPresentation } from "@prefabs.tech/react-ui";

const myFiles = [
  { id: 1, originalFileName: "doc.pdf", size: 1024, ... },
  { id: 2, originalFileName: "img.png", size: 2048, ... }
];

<FilesPresentation
  files={myFiles}
  presentation="table"
  locale="en"
  onFileDownload={(file) => console.log(file)}
/>

<FilesPresentation
  files={myFiles}
  presentation="list"
  locale="en"
  listProps={{ showFileThumbnail: true }}
/>`}
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "FilesPresentation",
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

      <Section
        title={t("filesPresentation.typeDefinitions", "Type Definitions")}
      >
        <CodeBlock
          exampleCode={`interface IFilesPresentationProperties {
  presentation?: "list" | "table";
  files: Array<IFile>;
  locale?: string;
  messages?: TableMessages;
  onFileArchive?: (file: IFile) => void;
  onFileDownload?: (file: IFile) => void;
  onFileDelete?: (file: IFile) => void;
  onEditDescription?: (file: IFile) => void;
  onFileShare?: (file: IFile) => void;
  onFileView?: (file: IFile) => void;
  visibleFileDetails?: string[];
  listProps?: Partial<ComponentProps<typeof FilesList>>;
  tableProps?: Partial<ComponentProps<typeof FilesTable>>;
}`}
        />
      </Section>
    </Page>
  );
};
