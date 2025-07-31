import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FilesList, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FilesListDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

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
      <Section>
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
          onFileDownload={() => {}}
          onFileView={() => {}}
        />
      </Section>
    </Page>
  );
};
