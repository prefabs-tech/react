import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesPresentation, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FilesPresentationDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

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
      <Section>
        <FilesPresentation
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
      </Section>
    </Page>
  );
};
