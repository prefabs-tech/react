import type { FC } from "react";

// components/FormComponents/FileDropzoneBasic.tsx
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import type { IFileDropzoneBasicProperties } from "../types";

import { useOnDropFile, useOnRemoveFile } from "../hooks";
import { SelectedFile } from "../SelectedFile";

export const FileDropzoneBasic: FC<IFileDropzoneBasicProperties> = ({
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  enableDescription = false,
  errorMessages,
  label,
  mode = "append",
  multiple = true,
  name,
  onChange,
  value = [],
}) => {
  const onDrop = useOnDropFile({ mode, multiple, name, onChange, value });
  const onRemove = useOnRemoveFile({ onChange, value });

  const {
    fileRejections,
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    multiple: multiple,
    onDrop,
    ...dropzoneOptions,
  });

  const className = useMemo(
    () =>
      `dropzone ${isFocused ? "focused" : ""} ${
        isDragAccept ? "accepted" : ""
      } ${isDragReject || fileRejections.length ? "rejected" : ""}`,
    [fileRejections, isFocused, isDragAccept, isDragReject],
  );

  const getErrorMessage = (code: string) => {
    switch (code) {
      case "file-invalid-type":
        return errorMessages?.fileInvalidType;
      case "file-too-large":
        return errorMessages?.fileTooLarge;
      case "file-too-small":
        return errorMessages?.fileTooSmall;
      case "too-many-files":
        return errorMessages?.tooManyFiles;
      default:
        return errorMessages?.default;
    }
  };

  const fileRejectionItems = fileRejections.map(({ errors, file }) => (
    <div className="dz-file-error" key={file.name}>
      <strong>{file.name}</strong>
      <ul>
        {errors.map((error) => (
          <li data-error-code={error.code} key={error.code}>
            {getErrorMessage(error.code) || error.message}
          </li>
        ))}
      </ul>
    </div>
  ));

  const renderErrors = () => {
    return fileRejections.length > 0 ? (
      <div className="dz-file-errors">{fileRejectionItems}</div>
    ) : (
      <></>
    );
  };

  return (
    <div className="file-input">
      {label && <label htmlFor={name}>{label}</label>}
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>

      {renderErrors()}

      {!!value?.length && (
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
      )}
    </div>
  );
};
