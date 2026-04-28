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
        addDescriptionLabel={t("fileInput.description.label")}
        descriptionPlaceholder={t("fileInput.description.placeholder")}
        dropzoneMessage={t("fileInput.dropzoneMessage")}
        dropzoneOptions={{
          accept: {
            "image/*": [".jpeg", ".png"],
          },
        }}
        emptySelectionMessage={t("fileInput.emptySelectionMessage")}
        enableDescription
        inputButtonLabel={t("fileInput.buttons.label.inputButtonLabel")}
        inputButtonLabelSelected={t(
          "fileInput.buttons.label.inputButtonLabelSelected",
        )}
        inputMethod="button"
        name="images"
        onChange={onChange}
        selectButtonProps={{
          iconLeft: "pi pi-file",
        }}
        selectedFileDisplay="popup"
        value={[]}
      />
    </>
  );
};
