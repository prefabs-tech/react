import { FileUpload } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

export const FileUploadDemo = () => {
  const { t } = useTranslation("files");

  return (
    <FileUpload
      addDescriptionLabel={t("fileInput.description.label")}
      cancelButtonOptions={{
        iconLeft: "pi pi-times",
        label: t("fileUpload.actions.cancel"),
      }}
      descriptionPlaceholder={t("fileInput.description.placeholder")}
      dropzoneMessage={t("fileInput.dropzoneMessage")}
      dropzoneOptions={{
        accept: {
          "image/*": [".jpeg", ".png"],
        },
      }}
      enableDescription
      name="images"
      onUpload={() => {}}
      uploadButtonOptions={{
        iconLeft: "pi pi-plus",
        label: t("fileUpload.actions.upload"),
      }}
      value={[]}
    />
  );
};
