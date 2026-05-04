import React, { useState } from "react";

import type { FileExtended, IFileInputProperties } from "../types";

import { FileInputBasic } from "./FileInputBasic";

export const FileInput = ({
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  inputButtonLabel,
  inputButtonLabelSelected,
  inputMethod,
  label,
  mode = "update",
  multiple = false,
  name,
  onChange,
  selectButtonProps,
  value = [],
}: IFileInputProperties) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(value);

  return (
    <FileInputBasic
      addDescriptionLabel={addDescriptionLabel}
      descriptionPlaceholder={descriptionPlaceholder}
      dropzoneMessage={dropzoneMessage}
      dropzoneOptions={dropzoneOptions}
      enableDescription={enableDescription}
      inputButtonLabel={inputButtonLabel}
      inputButtonLabelSelected={inputButtonLabelSelected}
      inputMethod={inputMethod}
      label={label}
      mode={mode}
      multiple={multiple}
      name={name}
      onChange={(files) => {
        setSelectedFiles(files);
        onChange(files);
      }}
      selectButtonProps={selectButtonProps}
      value={selectedFiles}
    />
  );
};
