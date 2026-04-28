import type { FC } from "react";

// components/FormComponents/FileAttachBasic.tsx
import { Button } from "@prefabs.tech/react-ui";
import React from "react";
import { useDropzone } from "react-dropzone";

import type { IFileAttachBasicProperties } from "../types";

import { useOnDropFile } from "../hooks";

export const FileAttachBasic: FC<IFileAttachBasicProperties> = ({
  dropzoneOptions,
  mode = "append",
  multiple = true,
  name,
  onChange,
  selectButtonProps,
  value = [],
}) => {
  const onDrop = useOnDropFile({ mode, multiple, name, onChange, value });

  const { getInputProps, getRootProps } = useDropzone({
    multiple,
    noDrag: true,
    onDrop,
    ...dropzoneOptions,
  });

  const renderInputUi = () => {
    const { onClick } = getRootProps();

    return (
      <div className="input-button-wrapper">
        <Button
          onClick={(event) => {
            event.preventDefault();
            onClick?.(event);
          }}
          {...selectButtonProps}
        />
        <input id={name} name={name} {...getInputProps()} />
      </div>
    );
  };

  return <div className="file-input attach">{renderInputUi()}</div>;
};
