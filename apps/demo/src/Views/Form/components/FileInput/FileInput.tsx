import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import {
  FileAttachDemo,
  FileInputButton,
  FileUploadDemo,
  FormWithFileInput,
  FormWithFileInputButton,
} from "./_components";
import { Section } from "../../../../components/Demo";

export const FileInputDemo = () => {
  const [t] = useTranslation("form");

  const navigate = useNavigate();

  return (
    <Page
      title={t("fileInput.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("fileInput.usage.formWithFileInputButton")}>
        <FormWithFileInputButton />
      </Section>

      <Section title={t("fileInput.usage.fileInput")}>
        <FormWithFileInput />
      </Section>

      <Section title={t("fileInput.usage.fileInputButton")}>
        <FileInputButton />
      </Section>

      <Section title={t("fileInput.usage.fileUpload")}>
        <FileUploadDemo />
      </Section>

      <Section title={t("fileInput.usage.fileAttach")}>
        <FileAttachDemo />
      </Section>
    </Page>
  );
};
