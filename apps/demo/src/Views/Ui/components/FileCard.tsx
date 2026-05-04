import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, FileCard, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FileCardDemo = () => {
  const { i18n, t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("fileCard.title")}
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
        <FileCard
          file={{
            description: "This is my file",
            downloadCount: 0,
            id: 0,
            lastDownloadedAt: Date.now(),
            originalFileName: "file1.png",
            size: 4,
            uploadedAt: Date.now(),
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
          }}
          locale={i18n?.language}
          onArchive={() => {}}
          onDelete={() => {}}
          onDownload={() => {}}
          onShare={() => {}}
          onView={() => {}}
        />
      </Section>
    </Page>
  );
};
