import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesList, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const FilesListDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "files",
      type: "IFile[]",
      default: "[]",
      description: t("filesList.propertiesDescription.files"),
    },
    {
      id: 2,
      prop: "locale",
      type: "string",
      default: "undefined",
      description: t("filesList.propertiesDescription.locale"),
    },
    {
      id: 3,
      prop: "messages",
      type: "FileMessages",
      default: "undefined",
      description: t("filesList.propertiesDescription.messages"),
    },
    {
      id: 4,
      prop: "onFile[Action]",
      type: "(file: IFile) => void",
      default: "undefined",
      description: t("filesList.propertiesDescription.actions"),
    },
    {
      id: 5,
      prop: "renderFileThumbnail",
      type: "(file: IFile) => ReactNode",
      default: "undefined",
      description: t("filesList.propertiesDescription.renderThumbnail"),
    },
    {
      id: 6,
      prop: "showFileThumbnail",
      type: "boolean",
      default: "true",
      description: t("filesList.propertiesDescription.showThumbnail"),
    },
    {
      id: 7,
      prop: "visibleFileDetails",
      type: "string[]",
      default: "undefined",
      description: t("filesList.propertiesDescription.visibleDetails"),
    },
    {
      id: 8,
      prop: "[action]ButtonProps",
      type: "ButtonProps",
      default: "undefined",
      description: t("filesList.propertiesDescription.buttonProps"),
    },
    {
      id: 9,
      prop: "[action]ConfirmationProps",
      type: "ConfirmationModalProps",
      default: "undefined",
      description: t("filesList.propertiesDescription.confirmationProps"),
    },
  ];

  return (
    <Page
      title={t("filesList.title")}
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
        <p>{t("common.usage", { component: "FilesList" })}</p>
        <FilesList
          files={[
            {
              id: 0,
              originalFileName: "file1.png",
              uploadedBy: { givenName: "Manish", lastName: "Aryal" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 1,
              originalFileName: "document.pdf",
              uploadedBy: { givenName: "Gaurav", lastName: "Sapkota" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 2,
              originalFileName: "photo.jpeg",
              uploadedBy: { givenName: "Deepak", lastName: "Aryal" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 3,
              originalFileName: "manish.png",
              uploadedBy: { givenName: "Lamdiki", lastName: "Sherpa" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
          ]}
          locale={i18n?.language}
          onFileDownload={() => {}}
          onFileView={() => {}}
        />
        <CodeBlock
          exampleCode={`import { FilesList } from "@prefabs.tech/react-ui";

const myFiles = [
  { 
    id: 1, 
    originalFileName: "document.pdf", 
    uploadedBy: { givenName: "John", lastName: "Doe" },
    uploadedAt: Date.now(),
    downloadCount: 5
  },
  // ... more files
];

<FilesList
  files={myFiles}
  locale="en"
  onFileDownload={(file) => console.log('Download', file)}
  onFileView={(file) => console.log('View', file)}
/>`}
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "FilesList",
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

      <Section title={t("filesList.typeDefinitions", "Type Definitions")}>
        <CodeBlock
          exampleCode={`interface IFile {
  id: number | string;
  originalFileName: string;
  description?: string;
  size?: number | string;
  uploadedBy?: { givenName?: string; lastName?: string; email?: string };
  uploadedAt?: number | string | Date;
  downloadCount?: number;
  lastDownloadedAt?: number | string | Date;
  [key: string]: any;
}

type FileMessages = {
  archiveAction?: string;
  archiveConfirmationHeader?: string;
  archiveConfirmationMessage?: string;
  downloadAction?: string;
  editDescriptionAction?: string;
  deleteAction?: string;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
  downloadCountHeader?: string;
  lastDownloadedAtHeader?: string;
  renameAction?: string;
  shareAction?: string;
  uploadedByHeader?: string;
  uploadedAtHeader?: string;
  viewAction?: string;
};`}
        />
      </Section>
    </Page>
  );
};
