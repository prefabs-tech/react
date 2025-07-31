import { FormFileInput, Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button } from "@prefabs.tech/react-ui";
import React from "react";

import { UploadBy } from "./FormWithFileInput";

export const FormWithFileInputButton: React.FC = () => {
  const { t } = useTranslation("files");

  const onSubmit = (values: any) => {
    const formData = new FormData();

    for (let name in values) {
      formData.set(name, values[name]);
    }

    // Implement your own form submission logic here.
  };

  return (
    <Provider onSubmit={onSubmit}>
      <UploadBy />
      <FormFileInput
        selectedFileDisplay="popup"
        inputMethod="button"
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
      />
      <div className="mb-4">
        <Button label={t("fileInput.actions.upload")} />
      </div>
    </Provider>
  );
};
