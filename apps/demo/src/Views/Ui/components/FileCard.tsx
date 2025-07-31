import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FileCard, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FileCardDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

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
      <Section>
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
          onDownload={() => {}}
          onView={() => {}}
          onShare={() => {}}
          onArchive={() => {}}
          onDelete={() => {}}
        />
      </Section>
    </Page>
  );
};
