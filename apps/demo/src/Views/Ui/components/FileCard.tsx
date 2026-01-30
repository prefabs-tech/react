import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FileCard, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const FileCardDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "file",
      type: "IFile",
      default: "-",
      description: t("fileCard.propertiesDescription.file"),
    },
    {
      id: 2,
      prop: "locale",
      type: "string",
      default: "undefined",
      description: t("fileCard.propertiesDescription.locale"),
    },
    {
      id: 3,
      prop: "messages",
      type: "FileMessages",
      default: "undefined",
      description: t("fileCard.propertiesDescription.messages"),
    },
    {
      id: 4,
      prop: "on[Action]",
      type: "(file: IFile) => void",
      default: "undefined",
      description: t("fileCard.propertiesDescription.actions"),
    },
    {
      id: 5,
      prop: "renderThumbnail",
      type: "(file: IFile) => ReactNode",
      default: "undefined",
      description: t("fileCard.propertiesDescription.renderThumbnail"),
    },
    {
      id: 6,
      prop: "showThumbnail",
      type: "boolean",
      default: "true",
      description: t("fileCard.propertiesDescription.showThumbnail"),
    },
    {
      id: 7,
      prop: "visibleFileDetails",
      type: "string[]",
      default: "['originalFileName', 'size', ...]",
      description: t("fileCard.propertiesDescription.visibleDetails"),
    },
    {
      id: 8,
      prop: "[action]ButtonProps",
      type: "ButtonProps",
      default: "undefined",
      description: t("fileCard.propertiesDescription.buttonProps"),
    },
  ];

  return (
    <Page
      title={t("fileCard.title")}
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
        <p>{t("common.usage", { component: "FileCard" })}</p>
        <FileCard
          file={{
            id: 0,
            originalFileName: "file1.png",
            description: "This is my file",
            size: 4,
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 0,
            lastDownloadedAt: Date.now(),
          }}
          locale={i18n?.language}
          onDownload={() => {}}
          onView={() => {}}
          onShare={() => {}}
          onArchive={() => {}}
          onDelete={() => {}}
        />
        <CodeBlock
          exampleCode={`import { FileCard } from "@prefabs.tech/react-ui";

const myFile = {
  id: 1,
  originalFileName: "document.pdf",
  description: "Quarterly Report",
  size: "2.4MB",
  uploadedBy: { givenName: "John", lastName: "Doe" },
  uploadedAt: Date.now(),
  downloadCount: 5,
  lastDownloadedAt: Date.now()
};

<FileCard
  file={myFile}
  locale="en"
  onDownload={(file) => console.log('Download', file)}
  onDelete={(file) => console.log('Delete', file)}
/>`}
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "FileCard",
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

      <Section title={t("fileCard.typeDefinitions", "Type Definitions")}>
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
