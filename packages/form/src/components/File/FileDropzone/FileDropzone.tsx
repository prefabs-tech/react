import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { FileExtended, IFileDropzoneProperties } from "../types";

import { FileDropzoneBasic } from "./FileDropzoneBasic";

export const FileDropzone = ({
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  label,
  mode = "update",
  multiple,
  name,
}: IFileDropzoneProperties) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FileDropzoneBasic
            addDescriptionLabel={addDescriptionLabel}
            descriptionPlaceholder={descriptionPlaceholder}
            dropzoneMessage={dropzoneMessage}
            dropzoneOptions={dropzoneOptions}
            enableDescription={enableDescription}
            label={label}
            mode={mode}
            multiple={multiple}
            name={field.name}
            onChange={(files: FileExtended[]) => field.onChange(files)}
            value={field.value}
          />
        )}
      />
    </>
  );
};
