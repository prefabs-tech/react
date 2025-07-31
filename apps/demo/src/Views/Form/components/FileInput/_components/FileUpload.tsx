import { FileUpload } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";

export const FileUploadDemo = () => {
  const { t } = useTranslation("files");

  return (
    <FileUpload
      name="images"
      dropzoneOptions={{
        accept: {
          "image/*": [".jpeg", ".png"],
        },
      }}
      value={[]}
      enableDescription
      dropzoneMessage={t("fileInput.dropzoneMessage")}
      addDescriptionLabel={t("fileInput.description.label")}
      descriptionPlaceholder={t("fileInput.description.placeholder")}
      onUpload={() => {}}
      uploadButtonOptions={{
        label: t("fileUpload.actions.upload"),
        iconLeft: "pi pi-plus",
      }}
      cancelButtonOptions={{
        label: t("fileUpload.actions.cancel"),
        iconLeft: "pi pi-times",
      }}
    />
  );
};
