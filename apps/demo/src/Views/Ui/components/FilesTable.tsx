import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesTable, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FilesTableDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("filesTable.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <FilesTable
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
          files={[
            {
              description: "Initial project proposal for client review",
              downloadCount: 10,
              id: 0,
              lastDownloadedAt: new Date("2025-01-26").getTime(),
              originalFileName: "my file",
              uploadedAt: new Date("2025-01-14").getTime(),
              uploadedBy: { givenName: "Manish", surname: "Aryal" },
            },
            {
              description: "Final logo design for branding",
              downloadCount: 12,
              id: 1,
              lastDownloadedAt: Date.now(),
              originalFileName: "logo",
              uploadedAt: new Date("2025-02-17").getTime(),
              uploadedBy: { givenName: "Nabin", surname: "Dhital" },
            },
          ]}
          locale={i18n?.language}
          onFileArchive={() => {}}
          onFileDelete={() => {}}
          paginationOptions={{
            itemsPerPageControlLabel: t("filesTable.pagination.rowsPerPage"),
            pageInputLabel: t("filesTable.pagination.pageControl"),
          }}
          visibleColumns={[
            "originalFileName",
            "description",
            "uploadedBy",
            "uploadedAt",
            "lastDownloadedAt",
            "downloadCount",
            "actions",
          ]}
        />
      </Section>
    </Page>
  );
};
