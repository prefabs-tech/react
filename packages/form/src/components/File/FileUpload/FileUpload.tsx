import type { FC } from "react";

import { useEffect, useState } from "react";

import { FormActions } from "@/components/FormActions";

import type { FileExtended, IFileUploadProperties } from "../types";

import { FileDropzoneBasic } from "../FileDropzone";

export const FileUpload: FC<IFileUploadProperties> = ({
  actionsAlignment = "right",
  addDescriptionLabel,
  cancelButtonOptions,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  errorMessages,
  label,
  mode = "append",
  multiple,
  name,
  onCancel,
  onFileSelect,
  onUpload,
  reverseActionsOrder = false,
  uploadButtonOptions,
  value,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(
    value || [],
  );

  useEffect(() => {
    if (value) {
      setSelectedFiles(value);
    }
  }, [value]);

  return (
    <div className="file-upload">
      <FileDropzoneBasic
        addDescriptionLabel={addDescriptionLabel}
        descriptionPlaceholder={descriptionPlaceholder}
        dropzoneMessage={dropzoneMessage}
        dropzoneOptions={dropzoneOptions}
        enableDescription={enableDescription}
        errorMessages={errorMessages}
        label={label}
        mode={mode}
        multiple={multiple}
        name={name}
        onChange={(files) => {
          let modifiedFiles: FileExtended[] = files;

          if (onFileSelect) {
            modifiedFiles = onFileSelect(files);
          }

          setSelectedFiles(modifiedFiles);
        }}
        value={selectedFiles}
      />

      <FormActions
        actions={[
          {
            disabled: !selectedFiles.length,
            id: "upload",
            label: "Upload",
            onClick: () => onUpload(selectedFiles),
            type: "button",
            ...uploadButtonOptions,
          },
          {
            id: "cancel",
            label: "Cancel",
            onClick: () => {
              onCancel && onCancel();
              setSelectedFiles([]);
            },
            ...cancelButtonOptions,
          },
        ]}
        alignment={actionsAlignment}
        reverse={reverseActionsOrder}
      />
    </div>
  );
};
