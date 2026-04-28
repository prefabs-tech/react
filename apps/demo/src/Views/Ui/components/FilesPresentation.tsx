import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesPresentation, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FilesPresentationDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("filesPresentation.title")}
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
        <FilesPresentation
          files={[
            {
              description: "Important file for proposal",
              downloadCount: 5,
              id: 0,
              lastDownloadedAt: Date.now(),
              originalFileName: "file1.png",
              size: 1000,
              uploadedAt: new Date("2025-04-14").getTime(),
              uploadedBy: { givenName: "Manish", surname: "Aryal" },
            },
            {
              description: "Initial project proposal for client review",
              downloadCount: 4,
              id: 1,
              lastDownloadedAt: new Date("2025-03-26").getTime(),
              originalFileName: "document.pdf",
              size: 500,
              uploadedAt: new Date("2025-03-02").getTime(),
              uploadedBy: { givenName: "Gaurav", surname: "Sapkota" },
            },
            {
              description: "Proposal for project",
              downloadCount: 6,
              id: 2,
              lastDownloadedAt: new Date("2025-03-12").getTime(),
              originalFileName: "photo.jpeg",
              size: 1500,
              uploadedAt: new Date("2025-02-20").getTime(),
              uploadedBy: { givenName: "Deepak", surname: "Aryal" },
            },
            {
              description: "File containing client list",
              downloadCount: 3,
              id: 3,
              lastDownloadedAt: new Date("2025-03-08").getTime(),
              originalFileName: "manish.png",
              size: 2000,
              uploadedAt: new Date("2025-02-17").getTime(),
              uploadedBy: { givenName: "Lamdiki", surname: "Sherpa" },
            },
          ]}
          locale={i18n?.language}
          onEditDescription={() => {}}
          onFileDownload={() => {}}
          onFileView={() => {}}
          presentation="table"
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
        />
      </Section>
    </Page>
  );
};
