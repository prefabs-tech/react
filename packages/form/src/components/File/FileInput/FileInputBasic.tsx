// components/FormComponents/FileInputBasic.tsx
import { Button } from "@prefabs.tech/react-ui";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { useOnDropFile, useOnRemoveFile } from "../hooks";
import { SelectedFile } from "../SelectedFile";

import type { IFileInputBasicProperties } from "../types";
import type { FC } from "react";

export const FileInputBasic: FC<IFileInputBasicProperties> = ({
  name,
  inputMethod = "button",
  inputButtonLabel = "Select",
  inputButtonLabelSelected = "Selected",
  label,
  mode = "append",
  multiple = true,
  value = [],
  dropzoneOptions,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  onChange,
  selectButtonProps,
}) => {
  const onDrop = useOnDropFile({ mode, name, onChange, value, multiple });
  const onRemove = useOnRemoveFile({ value, onChange });

  const {
    severity = "secondary",
    variant = "outlined",
    ...buttonProperties
  } = selectButtonProps || {};

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      noDrag: inputMethod == "button",
      onDrop,
      multiple,
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
                key={file.name}
                file={file}
                index={index}
                enableDescription={enableDescription}
                addDescriptionLabel={addDescriptionLabel}
                descriptionPlaceholder={descriptionPlaceholder}
                onRemove={() => onRemove(index)}
                onDescriptionChange={(description) => {
                  file.description = description;
                }}
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
