import { FormFileInput, Provider } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button } from "@prefabs.tech/react-ui";
import React from "react";

import { UploadBy } from "./FormWithFileInput";

export const FormWithFileInputButton: React.FC = () => {
  const { t } = useTranslation("files");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    const formData = new FormData();

    for (const name in values) {
      formData.set(name, values[name]);
    }

    // Implement your own form submission logic here.
  };

  return (
    <Provider onSubmit={onSubmit}>
      <UploadBy />
      <FormFileInput
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
        selectButtonProps={{
          iconLeft: "pi pi-file",
        }}
        selectedFileDisplay="popup"
      />
      <div className="mb-4">
        <Button label={t("fileInput.actions.upload")} />
      </div>
    </Provider>
  );
};
