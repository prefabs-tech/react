import type { FC } from "react";

// components/FormComponents/FileInputBasic.tsx
import { Button } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import type { IFileInputBasicProperties } from "../types";

import { useOnDropFile, useOnRemoveFile } from "../hooks";
import { SelectedFile } from "../SelectedFile";

export const FileInputBasic: FC<IFileInputBasicProperties> = ({
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  inputButtonLabel = "Select",
  inputButtonLabelSelected = "Selected",
  inputMethod = "button",
  label,
  mode = "append",
  multiple = true,
  name,
  onChange,
  selectButtonProps,
  value = [],
}) => {
  const onDrop = useOnDropFile({ mode, multiple, name, onChange, value });
  const onRemove = useOnRemoveFile({ onChange, value });

  const {
    severity = "secondary",
    variant = "outlined",
    ...buttonProperties
  } = selectButtonProps || {};

  const { getInputProps, getRootProps, isDragAccept, isDragReject, isFocused } =
    useDropzone({
      multiple,
      noDrag: inputMethod == "button",
      onDrop,
      ...dropzoneOptions,
    });

  const className = useMemo(
    () =>
      `dropzone ${isFocused ? "focused" : ""} ${
        isDragAccept ? "accepted" : ""
      } ${isDragReject ? "rejected" : ""}`,
    [isFocused, isDragAccept, isDragReject],
  );

  const renderInputUi = () => {
    const { onClick } = getRootProps();

    if (inputMethod == "button") {
      return (
        <div className="input-button-wrapper">
          <Button
            label={
              value?.length
                ? inputButtonLabelSelected + ` (${value?.length})`
                : inputButtonLabel
            }
            onClick={(event) => {
              event.preventDefault();
              onClick?.(event);
            }}
            severity={severity}
            variant={variant}
            {...buttonProperties}
          />
          <input id={name} name={name} {...getInputProps()} />
        </div>
      );
    }

    return (
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>
    );
  };

  const renderSelectedFiles = () => {
    if (value?.length) {
      return (
        <ul className="selected">
          {value.map((file, index) => {
            return (
              <SelectedFile
                addDescriptionLabel={addDescriptionLabel}
                descriptionPlaceholder={descriptionPlaceholder}
                enableDescription={enableDescription}
                file={file}
                index={index}
                key={file.name}
                onDescriptionChange={(description) => {
                  file.description = description;
                }}
                onRemove={() => onRemove(index)}
              />
            );
          })}
        </ul>
      );
    }

    return <></>;
  };

  return (
    <div className="file-input">
      {label && <label htmlFor={name}>{label}</label>}
      {renderInputUi()}

      {renderSelectedFiles()}
    </div>
  );
};
