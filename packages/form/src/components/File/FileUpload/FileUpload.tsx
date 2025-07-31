import { useEffect, useState } from "react";

import { FormActions } from "@/components/FormActions";

import { FileDropzoneBasic } from "../FileDropzone";

import type { FileExtended, IFileUploadProperties } from "../types";
import type { FC } from "react";

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
        name={name}
        value={selectedFiles}
        label={label}
        multiple={multiple}
        mode={mode}
        dropzoneOptions={dropzoneOptions}
        enableDescription={enableDescription}
        addDescriptionLabel={addDescriptionLabel}
        descriptionPlaceholder={descriptionPlaceholder}
        dropzoneMessage={dropzoneMessage}
        onChange={(files) => {
          let modifiedFiles: FileExtended[] = files;

          if (onFileSelect) {
            modifiedFiles = onFileSelect(files);
          }

          setSelectedFiles(modifiedFiles);
        }}
        errorMessages={errorMessages}
      />

      <FormActions
        actions={[
          {
            id: "upload",
            type: "button",
            disabled: !selectedFiles.length,
            label: "Upload",
            onClick: () => onUpload(selectedFiles),
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
