import {
  Provider,
  FileDropzone,
  useFormContext,
  Email,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button } from "@prefabs.tech/react-ui";
import React from "react";

export const FormWithFileInput: React.FC = () => {
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
      <FileDropzone
        name="images"
        mode="append"
        multiple={true}
        dropzoneOptions={{
          accept: {
            "image/*": [".jpeg", ".png"],
          },
        }}
        enableDescription
        dropzoneMessage={t("fileInput.dropzoneMessage")}
        addDescriptionLabel={t("fileInput.description.label")}
        descriptionPlaceholder={t("fileInput.description.placeholder")}
      />
      <div className="mb-4">
        <Button label={t("fileInput.actions.upload")} />
      </div>
    </Provider>
  );
};

export const UploadBy = () => {
  const { t } = useTranslation("files");
  const {
    formState: { submitCount },
  } = useFormContext();

  return (
    <>
      <Email
        label={t("fileUpload.fields.uploadedBy.label")}
        name="uploadedBy"
        placeholder={t("fileUpload.fields.uploadedBy.placeholder")}
        submitCount={submitCount}
      />
    </>
  );
};
