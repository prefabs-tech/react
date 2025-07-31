import { FileInput } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import React from "react";

export const FileInputButton: React.FC = () => {
  const { t } = useTranslation("files");

  const onChange = () => {
    // Implement your own form submission logic here.
  };

  return (
    <>
      <FileInput
        selectedFileDisplay="popup"
        inputMethod="button"
        value={[]}
        emptySelectionMessage={t("fileInput.emptySelectionMessage")}
        inputButtonLabel={t("fileInput.buttons.label.inputButtonLabel")}
        inputButtonLabelSelected={t(
          "fileInput.buttons.label.inputButtonLabelSelected",
        )}
        name="images"
        dropzoneOptions={{
          accept: {
            "image/*": [".jpeg", ".png"],
          },
        }}
        enableDescription
        dropzoneMessage={t("fileInput.dropzoneMessage")}
        addDescriptionLabel={t("fileInput.description.label")}
        descriptionPlaceholder={t("fileInput.description.placeholder")}
        selectButtonProps={{
          iconLeft: "pi pi-file",
        }}
        onChange={onChange}
      />
    </>
  );
};
