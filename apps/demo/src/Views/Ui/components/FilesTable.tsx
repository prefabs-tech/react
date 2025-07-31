import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesTable, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FilesTableDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

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
      <Section>
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
      </Section>
    </Page>
  );
};
