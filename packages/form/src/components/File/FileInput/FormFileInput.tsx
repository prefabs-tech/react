import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { IFormFileInputProperties } from "../types";

import { FileInputBasic } from "./FileInputBasic";

export const FormFileInput = ({
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
  selectButtonProps,
}: IFormFileInputProperties) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
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
          name={field.name}
          onChange={(files) => field.onChange(files)}
          selectButtonProps={selectButtonProps}
          value={field.value}
        />
      )}
    />
  );
};
